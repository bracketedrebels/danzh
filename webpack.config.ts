import CopyPlugin from "copy-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import handlebars from "handlebars"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path, { sep } from "path"
import { append, concat, toPairs } from "ramda"
import { DefinePlugin } from "webpack"
import { config, ContextualEnvironmentDescriptor, envvars, plugin, rule } from "./.webpack/helpers"

const forceTypeChecking = () => () => append(new ForkTsCheckerWebpackPlugin())
const defineRuntimeEnvironment = () => (env: ContextualEnvironmentDescriptor) =>
  append(
    new DefinePlugin({
      "process.env": toPairs(envvars(env)).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: JSON.stringify(
            /^\$\{[^}{]+\}$/.test(value) ? process.env[value.slice(2, -1)] || "" : value
          ),
        }),
        {}
      ),
    })
  )

const workerLoader = () => () =>
  append({
    test: /\.worker\.js$/,
    use: {
      loader: require.resolve("worker-loader"),
    },
  })

const tsxLoader = () => () =>
  append({
    test: /\.ts(x)?$/,
    exclude: /node_modules/,
    use: {
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/typescript",
          ["@babel/env", { modules: false }],
        ],
        plugins: [
          "relay",
          "const-enum",
          ["@babel/plugin-transform-typescript", { allowNamespaces: true }],
        ],
      },
    },
  })

const jsLoader = () => () =>
  append({
    test: /\.js$/,
    use: {
      loader: require.resolve("source-map-loader"),
    },
    enforce: "pre" as const,
  })

const cssLoader = () => () =>
  append({
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
  })

const assetLoader = () => () =>
  append({
    test: /\.(?:png|jpg|gif)$/i,
    type: "asset/resource",
  })

const prepareAllTheStaticResources = () => (env: ContextualEnvironmentDescriptor) => {
  const { DEPLOY_BASENAME, DEPLOY_BUNDLENAME } = envvars(env)
  return concat([
    new CopyPlugin({
      patterns: [
        {
          from: `static${sep}index.html`,
          to: `index.html`,
          transform: {
            transformer: (content: Buffer) =>
              handlebars.compile(content.toString())({
                basename: DEPLOY_BASENAME,
                bundlename: DEPLOY_BUNDLENAME,
              }),
            cache: true,
          } as any,
        },
      ],
    }),
  ])
}

const miniCssExtractPlugin = () => () =>
  concat([
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
  ])

/* actual configuration */

export default config(
  plugin(forceTypeChecking()),
  plugin(defineRuntimeEnvironment()),
  plugin(prepareAllTheStaticResources()),
  plugin(miniCssExtractPlugin()),
  rule(tsxLoader()),
  rule(workerLoader()),
  rule(jsLoader()),
  rule(cssLoader()),
  rule(assetLoader())
)((env) => ({
  entry: ["./src/index.tsx", "./static/index.css"],
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    proxy: {},
  },
  optimization: {
    usedExports: env === "prod",
    minimize: env === "prod",
  },
  output: {
    path: path.resolve(__dirname, envvars(env).DEPLOY_OUTPUT),
    filename: envvars(env).DEPLOY_BUNDLENAME,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
}))
