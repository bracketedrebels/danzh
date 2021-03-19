export default (text: string, variables?: Record<string, string | number | boolean>) => {
  return fetch(process.env.GITHUB_API_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  }).then((v) => v.json())
}
