import path, { sep } from "path"
import { append, concat, identity, toPairs } from "ramda"

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import postcss from "postcss"
import handlebars from "handlebars"
import purgecss from "@fullhuman/postcss-purgecss"

import { DefinePlugin } from "webpack"
import { config, envvars, plugin, rule } from "./.webpack/helpers"

const forceTypeChecking = () => () => append(new ForkTsCheckerWebpackPlugin())
const defineRuntimeEnvironment = () => (env: "local" | "prod") =>
  append(
    new DefinePlugin({
      "process.env": toPairs(envvars(env)).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: JSON.stringify(value) }),
        {}
      ),
    })
  )

// const enableHMRForDevelopment = () => (env: "local" | "prod") =>
//   env === "prod" ? identity : append(new ReactRefreshWebpackPlugin())

const workerLoader = () => () =>
  append({
    test: /\.worker\.js$/,
    use: {
      loader: require.resolve("worker-loader"),
    },
  })

const tsxLoader = () => (env: "local" | "prod") =>
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
          ...(env === "local" ? [require.resolve("react-refresh/babel")] : []),
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

/**
 * @todo
 */
const prepareAllTheStaticResources = () => (env: "local" | "prod") => {
  const { DEPLOY_BASENAME, DEPLOY_OUTPUT, DEPLOY_BUNDLENAME } = envvars(env)
  return concat([
    new CopyPlugin({
      patterns: [
        {
          from: "static/index.css",
          to: `index.css`,
          transform: {
            transformer: (content: Buffer) =>
              postcss([
                require("postcss-import"),
                require("tailwindcss"),
                require("autoprefixer"),
                ...(env === "prod"
                  ? [
                      purgecss({
                        content: ["./src/**/*.tsx", "./static/**/*.html"],
                        extractors: [
                          {
                            extractor: (content: string) =>
                              content.match(/[A-z0-9-:\/]+/g)?.map((v) => v.toString()) || [],
                            extensions: ["tsx", "html"],
                          },
                        ],
                      }),
                    ]
                  : []),
              ])
                .process(content, {
                  from: `static${sep}index.css`,
                  to: `index.css`,
                })
                .then((v) => v.css),
            cache: true,
          } as any,
        },
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
        ...(env === "prod"
          ? [
              {
                from: `static${sep}index.html`,
                to: `404.html`,
                transform: (content: Buffer) =>
                  handlebars.compile(content.toString())({
                    basename: DEPLOY_BASENAME,
                    bundlename: DEPLOY_BUNDLENAME,
                  }),
              },
            ]
          : []),
        { from: "static", to: "." },
      ],
    }),
  ])
}

/* actual configuration */

export default config(
  plugin(forceTypeChecking()),
  plugin(defineRuntimeEnvironment()),
  // plugin(enableHMRForDevelopment()),
  plugin(prepareAllTheStaticResources()),
  rule(tsxLoader()),
  rule(workerLoader()),
  rule(jsLoader())
)((environment) => ({
  entry: ["./src/index.tsx"],
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
  optimization: {
    usedExports: environment === "prod",
    minimize: environment === "prod",
  },
  output: {
    path: path.resolve(__dirname, envvars(environment).DEPLOY_OUTPUT),
    filename: envvars(environment).DEPLOY_BUNDLENAME,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
}))
