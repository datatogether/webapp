

export function selectSubprimers(state) {
  const { subprimers } = state.entities;
  return Object.keys(subprimers).map(k => subprimers[k]);
}

export function selectSubprimer(state, id = "") {
  return state.entities.subprimers[id];
}