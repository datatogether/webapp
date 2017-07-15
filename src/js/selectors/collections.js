
export function selectLocalCollection(state, id) {
  return state.locals.collections[id];
}

export function selectCollection(state, id = "") {
  return state.entities.collections[id];
}

export function selectCollections(state) {
  const { collections } = state.entities;
  return Object.keys(collections).map(k => collections[k]);
}

export function selectCollectionsByKey(state, key) {
  const { collections } = state.entities;
  return Object.keys(collections).filter(id => collections[id].creator == key).map(id => collections[id]);
}