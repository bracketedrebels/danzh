import path, { sep } from "path"
import { append, concat, identity } from "ramda"

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import postcss from "postcss"
import handlebars from "handlebars"
import purgecss from "@fullhuman/postcss-purgecss"
import dotenv from "dotenv-webpack"

import { Configuration, DefinePlugin } from "webpack"

/* helpers definitions */

const rule = (
  v: (
    env: Environment
  ) => (
    acc: Required<Required<Configuration>["module"]>["rules"]
  ) => Required<Required<Configuration>["module"]>["rules"]
) => (env: Environment, conf: Configuration) =>
  ({
    ...conf,
    module: {
      ...(conf.module || {}),
      rules: v(env)(conf.module?.rules || []),
    },
  } as Configuration)

const config = (
  ...args: Array<(env: Required<Environment>, config: Configuration) => Configuration>
) => ({
  environment = "local",
  output = "dist",
  basename = "/",
  bundlename = "bundle.js",
}: Environment) =>
  args.reduce(
    (acc, v) =>
      v(
        {
          environment,
          output: path.resolve(__dirname, output),
          basename,
          bundlename,
        },
        acc
      ),
    {
      entry: ["./src/index.tsx"],
      devServer: {
        historyApiFallback: true,
        compress: true,
        hot: true,
      },
      optimization: {
        usedExports: environment !== "local",
        minimize: environment !== "local",
      },
      output: {
        path: path.resolve(__dirname, output),
        filename: bundlename,
      },
      resolve: {
        extensions: [".js", ".ts", ".tsx"],
      },
    } as Configuration
  )

const plugin = (
  v: (
    env: Required<Environment>
  ) => (conf: Required<Configuration>["plugins"]) => Required<Configuration>["plugins"]
) => (env: Required<Environment>, conf: Configuration) =>
  ({
    ...conf,
    plugins: v(env)(conf.plugins || []),
  } as Configuration)

const forceTypeChecking = () => () => append(new ForkTsCheckerWebpackPlugin())
const defineRuntimeEnvironment = () => ({ environment }: Required<Environment>) => {
  return append(new dotenv({ path: `.env.${environment}` }))
}

const enableHMRForDevelopment = () => ({ environment }: Environment) =>
  environment === "prod" ? identity : append(new ReactRefreshWebpackPlugin())

const workerLoader = () => () =>
  append({
    test: /\.worker\.js$/,
    use: {
      loader: require.resolve("worker-loader"),
    },
  })

const tsxLoader = () => (env: Environment) =>
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
          ...(env.environment === "local" ? [require.resolve("react-refresh/babel")] : []),
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
const prepareAllTheStaticResources = () => ({
  output,
  environment,
  basename,
  bundlename,
}: Environment) =>
  concat([
    new CopyPlugin({
      patterns: [
        {
          from: "static/index.css",
          to: `${output}${sep}index.css`,
          transform: {
            transformer: (content: Buffer) =>
              postcss([
                require("postcss-import"),
                require("tailwindcss"),
                require("autoprefixer"),
                ...(environment === "prod"
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
                  to: `${output}${sep}index.css`,
                })
                .then((v) => v.css),
            cache: true,
          } as any,
        },
        {
          from: `static${sep}index.html`,
          to: `${output}${sep}index.html`,
          transform: {
            transformer: (content: Buffer) =>
              handlebars.compile(content.toString())({ basename, bundlename }),
            cache: true,
          } as any,
        },
        ...(environment === "prod"
          ? [
              {
                from: `static${sep}index.html`,
                to: `${output}${sep}404.html`,
                transform: (content: Buffer) =>
                  handlebars.compile(content.toString())({
                    basename,
                    bundlename,
                  }),
              },
            ]
          : []),
        { from: "static", to: output },
      ],
    }),
  ])

type Environment = {
  environment?: "local" | "prod"
  output?: string
  bundlename?: string
  basename?: string
}

/* actual configuration */

export default config(
  plugin(forceTypeChecking()),
  plugin(defineRuntimeEnvironment()),
  plugin(enableHMRForDevelopment()),
  plugin(prepareAllTheStaticResources()),
  rule(tsxLoader()),
  rule(workerLoader()),
  rule(jsLoader())
)
