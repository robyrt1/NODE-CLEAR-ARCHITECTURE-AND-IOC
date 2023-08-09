import { Container } from 'inversify';
import { flow } from 'lodash';
import databaseBindings from './bindings/db/database.bindings';
import usersBindings from './bindings/modules/users/users.bindings';

const container = flow(databaseBindings,usersBindings)(new Container())

export default container;