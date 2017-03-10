

export function metadataId(userId, subjectHash) {
  return `${userId}.${subjectHash}`;
}

export function selectLocalMetadata(state, userId, subjectHash) {
  return state.locals.metadata[metadataId(userId, subjectHash)];
}

export function selectMetadata(state, userId, subjectHash) {
  return state.entities.metadata[metadataId(userId, subjectHash)];
}
