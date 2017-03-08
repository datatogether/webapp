

export function selectMessagesByRoom(state, room) {
  const { messages } = state.entities;
  return Object.keys(messages).map(id => messages[id]);
}