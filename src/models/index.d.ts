import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Todo {
  readonly id: string;
  readonly label?: string;
  readonly description?: string;
  readonly checked?: boolean;
  readonly Users?: (TodoUser | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly todos?: (TodoUser | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class TodoUser {
  readonly id: string;
  readonly todoID: string;
  readonly userID: string;
  readonly todo: Todo;
  readonly user: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TodoUser, TodoUserMetaData>);
  static copyOf(source: TodoUser, mutator: (draft: MutableModel<TodoUser, TodoUserMetaData>) => MutableModel<TodoUser, TodoUserMetaData> | void): TodoUser;
}