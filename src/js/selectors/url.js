

export function selectUrl(state, url = "") {
  const { urls } = state.entities;
  const id = Object.keys(urls).find((u) => (u == url))
  return id ? urls[id] : undefined;
}