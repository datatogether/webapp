

export function metadataId(userId, subjectId) {
  return `${userId}.${subjectId}`;
}

export function selectMetadata(state, userId, subjectId) {
  const { metadata } = state.entities;
  return metadata[metadataId(userId, subjectId)];
}
