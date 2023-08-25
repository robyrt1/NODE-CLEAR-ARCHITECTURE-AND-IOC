import { Container } from 'inversify';
import { flow } from 'lodash';
import databaseBindings from './bindings/db/database.bindings';
import usersBindings from './bindings/modules/users/users.bindings';
import authBindings from './bindings/modules/auth/auth.bindings';
import profileBindings from './bindings/modules/profile/profile.bindings';
import cacheBindings from './bindings/cache/cache.bindings';

const container = flow(databaseBindings, usersBindings, authBindings, profileBindings,cacheBindings)(new Container());

export default container;
