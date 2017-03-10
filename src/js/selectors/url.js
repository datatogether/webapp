

export function selectUrl(state, url = "") {
  const { urls } = state.entities;
  const id = Object.keys(urls).find(u => (u == url));
  return id ? urls[id] : undefined;
}

export function urlStats(url) {
  return { 
    "last get": new Date(url.lastGet).toString(),
    "status": url.status,
    "size": url.contentLength,
    "content type" : url.contentSniff,
  };
}

export function selectOutboundLinks(state, url = "") {
  const { urls, links } = state.entities;
  return Object.keys(links)
    .map(key => links[key])
    .filter(link => link.src.url == url)
    .map((link) => {
      return urls[link.dst.url] || link.dst;
    });
}

export function selectInboundLinks(state, url = "") {
  const { urls, links } = state.entities;
  return Object.keys(links)
    .map(key => links[key])
    .filter(link => link.dst.url == url)
    .map((link) => {
      return urls[link.src.url] || link.src;
    });
}
