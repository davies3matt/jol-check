// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, User, TodoUser } = initSchema(schema);

export {
  Todo,
  User,
  TodoUser
};