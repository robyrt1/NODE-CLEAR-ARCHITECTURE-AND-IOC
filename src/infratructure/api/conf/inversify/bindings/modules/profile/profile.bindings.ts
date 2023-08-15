import { Container } from 'inversify';
import { flow } from 'lodash';
import profileRepositoriesBindings from './profile.repositories.bindings';
import profileServicesBindings from './profile.services.bindings';
import profileUsecasesBindings from './profile.usecases.bindings';
import profileFactoriesBindings from './profile.factories.bindings';

export default (container: Container): Container =>
  flow(
    profileRepositoriesBindings,
    profileServicesBindings,
    profileUsecasesBindings,
    profileFactoriesBindings,
  )(container);
