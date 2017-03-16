

export function selectPrimers(state) {
  const { primers } = state.entities;
  return Object.keys(primers).map(k => primers[k]);
}

export function selectPrimer(state, id = "") {
  return state.entities.primers[id];
}