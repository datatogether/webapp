

export function metadataId(userId, subjectHash) {
  return `${userId}.${subjectHash}`;
}

export function selectLocalMetadata(state, userId, subjectHash) {
  if (!userId || !subjectHash) { return undefined; }
  return state.locals.metadata[metadataId(userId, subjectHash)];
}

export function selectMetadata(state, userId, subjectHash) {
  if (!userId || !subjectHash) { return undefined; }
  return state.entities.metadata[metadataId(userId, subjectHash)];
}
