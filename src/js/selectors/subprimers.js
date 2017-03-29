

export function selectSubprimers(state) {
  const { subprimers } = state.entities;
  return Object.keys(subprimers).map(k => subprimers[k]);
}

export function selectSubprimer(state, id = "") {
  return state.entities.subprimers[id];
}

export function selectSubprimerUndescribedUrls(state, id = "") {
  const pages = state.pagination.subprimerUndescribedUrls;
  if (!pages[id]) {
    return [];
  }

  return pages[id].ids.map(urlId => state.entities.urls[urlId]);
}

export function selectRecentSubprimers(state) {
  const pages = state.pagination.subprimers;
  if (!pages.created) {
    return [];
  }
  return pages.created.ids.map(id => state.entities.subprimers[id]);
}

export function selectSubprimerAttributedUrls(state, id = "") {
  const pages = state.pagination.subprimerAttributedUrls;
  if (!pages[id]) {
    return [];
  }
  return pages[id].ids.map(urlId => state.entities.urls[urlId]);
}
