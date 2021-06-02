import dotenv from "dotenv"
import { Configuration } from "webpack"

export type ContextualEnvironmentDescriptor = "local" | "prod"

export type FileEnvironmentDescriptor = {
  ROUTING_BASENAME: string
  DEPLOY_BASENAME: string
  DEPLOY_OUTPUT: string
  DEPLOY_BUNDLENAME: string
  API_GQL_ENDPOINT: string

  // GITHUB_API_URL: string
  // OAUTH_AUTHORIZATION_URL_GITHUB: string
  // OAUTH_ACCESS_TOKEN_URL_GITHUB: string
  // OAUTH_CLIENTID_GITHUB: string
  // OAUTH_CLIENT_SECRET_GITHUB: string
}

export const envvars = (env: "local" | "prod") =>
  dotenv.config({ path: `${__dirname}/../.env.${env}` }).parsed as FileEnvironmentDescriptor

export const rule = (
  v: (
    env: ContextualEnvironmentDescriptor
  ) => (
    acc: Required<Required<Configuration>["module"]>["rules"]
  ) => Required<Required<Configuration>["module"]>["rules"]
) => (env: ContextualEnvironmentDescriptor, conf: Configuration) =>
  ({
    ...conf,
    module: {
      ...(conf.module || {}),
      rules: v(env)(conf.module?.rules || []),
    },
  } as Configuration)

export const config = (
  ...args: Array<(env: ContextualEnvironmentDescriptor, config: Configuration) => Configuration>
) => (initial: (env: ContextualEnvironmentDescriptor) => Configuration) => ({
  environment,
}: {
  environment: ContextualEnvironmentDescriptor
}) => args.reduce((acc, v) => v(environment, acc), initial(environment))

export const plugin = (
  v: (
    env: ContextualEnvironmentDescriptor
  ) => (conf: Required<Configuration>["plugins"]) => Required<Configuration>["plugins"]
) => (env: ContextualEnvironmentDescriptor, conf: Configuration) =>
  ({
    ...conf,
    plugins: v(env)(conf.plugins || []),
  } as Configuration)
