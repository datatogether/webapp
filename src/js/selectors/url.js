

export function selectUrl(state, url = "") {
  const { urls } = state.entities;
  const id = Object.keys(urls).find((u) => (u == url))
  return id ? urls[id] : undefined;
}

export function selectOutboundLinks(state, url = "") {
  const { urls, links } = state.entities;
  return Object.keys(links)
    .map(key => links[key])
    .filter(link => link.src.url == url)
    .map(link => {
      return urls[link.dst.url] || link.dst;
    });
}