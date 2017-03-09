
// search through the state tree for
export function selectUserByUsername(state, username) {
  const { users } = state.entities;
  const userId = Object.keys(users).find(id => (users[id].username == username));
  return userId ? users[userId] : undefined;
}

export function selectUserById(state, id) {
  return state.entities.users[id];
}
