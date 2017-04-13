
export function concatUrlString(u, max = 80) {
  return (u.length < max) ? u : `${u.slice(0, max)}...`;
}

export function selectUrl(state, urlString = "") {
  const { urls } = state.entities;
  const id = Object.keys(urls).find(u => (u == urlString));
  if (!id) { return undefined; }

  let url = urls[id];
  url.state = state.urlStates[urlString] || {};
  return url;
}

export function selectUrlByHash(state, hash = "") {
  const { urls } = state.entities;
  const id = Object.keys(urls).find(u => (urls[u].hash == hash));
  if (!id) { return undefined; }

  let url = urls[id];
  url.state = state.urlStates[url.url] || {};
  return url;
}

export function fileSize(len = 0) {
  let rounded;
  if (len < 1000) {
    return `${len} bytes`;
  } else if (len < (1000 * 1000 * 1000)) {
    rounded = Math.round(len/1000);
    return `${rounded} kb`;
  } else if (len < (1000 * 1000 * 1000 * 1000)) {
    rounded = Math.round(len/1000/1000) / 100;
    return `${rounded} Mb`;
  } else {
    rounded = Math.round(len/1000/1000/1000) / 100;
    return `${rounded} Gb`;
  }
}

export function urlStats(url) {
  return {
    "last get": url.lastGet ? new Date(url.lastGet).toString() : "never",
    status: url.status,
    size: fileSize(url.contentLength),
    "content type": url.contentSniff,
  };
}

export function selectOutboundLinks(state, urlString = "") {
  const { urls, links } = state.entities;
  return Object.keys(links)
    .map(key => links[key])
    .filter(link => link.src.url == urlString)
    .map((link) => {
      let url = urls[link.dst.url] || link.dst;
      url.state = state.urlStates[link.dst.url] || {};
      return url;
    });
}

export function selectInboundLinks(state, urlString = "") {
  const { urls, links } = state.entities;
  return Object.keys(links)
    .map(key => links[key])
    .filter(link => link.dst.url == urlString)
    .map((link) => {
      let url = urls[link.src.url] || link.src;
      url.state = state.urlStates[link.dst.url] || {};
      return url;
    });
}
