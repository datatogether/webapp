import { Schema, arrayOf } from 'normalizr'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const sessionUserSchema = new Schema('session');
const sshKeySchema = new Schema('ssh_keys', { idAttribute : 'sha256' });
const userSchema = new Schema('users');
const groupsSchema = new Schema('groups');
const contextSchema = new Schema('context');
const messageSchema = new Schema('messages');

// Schemas for Github API responses.
const Schemas = {
  SESSION_USER : sessionUserSchema,
  SSH_KEY : sshKeySchema,
  SSH_KEY_ARRAY : arrayOf(sshKeySchema),
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  GROUP : groupsSchema,
  GROUP_ARRAY : arrayOf(groupsSchema),
  CONTEXT : contextSchema,
  CONTEXT_ARRAY : arrayOf(contextSchema),
  MESSAGE : messageSchema,
  MESSAGE_ARRAY: arrayOf(messageSchema),
}

export default Schemas