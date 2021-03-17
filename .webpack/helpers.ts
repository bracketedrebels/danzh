import dotenv from "dotenv"
import { Configuration } from "webpack"

export const envvars = (env: "local" | "prod") =>
  dotenv.config({ path: `${__dirname}/../.env.${env}` }).parsed as {
    GITHUB_AUTH_TOKEN: string
    GITHUB_API_URL: string
    DEPLOY_BASENAME: string
    DEPLOY_OUTPUT: string
    DEPLOY_BUNDLENAME: string
  }

export const rule = (
  v: (
    env: "local" | "prod"
  ) => (
    acc: Required<Required<Configuration>["module"]>["rules"]
  ) => Required<Required<Configuration>["module"]>["rules"]
) => (env: "local" | "prod", conf: Configuration) =>
  ({
    ...conf,
    module: {
      ...(conf.module || {}),
      rules: v(env)(conf.module?.rules || []),
    },
  } as Configuration)

export const config = (
  ...args: Array<(env: "local" | "prod", config: Configuration) => Configuration>
) => (initial: (env: "local" | "prod") => Configuration) => ({
  environment = "local" as "local" | "prod",
}) => args.reduce((acc, v) => v(environment, acc), initial(environment))

export const plugin = (
  v: (
    env: "local" | "prod"
  ) => (conf: Required<Configuration>["plugins"]) => Required<Configuration>["plugins"]
) => (env: "local" | "prod", conf: Configuration) =>
  ({
    ...conf,
    plugins: v(env)(conf.plugins || []),
  } as Configuration)
