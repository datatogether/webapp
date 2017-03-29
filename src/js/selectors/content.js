
export function selectContent(state, hash) {
  return state.entities.content[hash];
}

export function selectContentConsensus(state, hash) {
  return state.entities.consensus[hash];
}

export function selectContentUrls(state, hash) {
  const { urls } = state.entities;

  return Object.keys(urls)
    .filter(u => urls[u].hash == hash)
    .map(url => urls[url]);
}

export function selectContentMetadata(state, hash) {
  const { metadata } = state.entities;
  return Object.keys(metadata)
    .filter(key => metadata[key].subject == hash)
    .map(key => metadata[key]);
}

export function selectRecentContentUrls(state) {
  const pages = state.pagination.contentRecentUrls;
  if (!pages.recent) {
    return [];
  }

  return pages.recent.ids.map(urlId => state.entities.urls[urlId]);
}