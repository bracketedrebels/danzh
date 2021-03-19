import path, { sep } from "path"
import { append, concat, toPairs } from "ramda"

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import postcss from "postcss"
import handlebars from "handlebars"
import purgecss from "@fullhuman/postcss-purgecss"

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

const prepareAllTheStaticResources = () => (env: ContextualEnvironmentDescriptor) => {
  const { DEPLOY_BASENAME, DEPLOY_BUNDLENAME } = envvars(env)
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
          },
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
  plugin(prepareAllTheStaticResources()),
  rule(tsxLoader()),
  rule(workerLoader()),
  rule(jsLoader())
)((env) => ({
  entry: ["./src/index.tsx"],
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
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
