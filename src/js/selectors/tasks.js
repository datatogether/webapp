

export function selectTasks(state) {
  const { tasks } = state.entities;
  return Object.keys(tasks).map(k => tasks[k]);
}

export function selectTask(state, id = "") {
  if (!state.entities.tasks[id]) { return undefined; }
  const p = Object.assign({}, state.entities.tasks[id]);
  p.stats || (p.stats = {});
  if (p.subTasks) {
    p.subTasks = p.subTasks.map(subId => state.entities.tasks[subId]);
  }
  return p;
}
