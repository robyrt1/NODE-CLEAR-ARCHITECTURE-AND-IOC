import { Container } from 'inversify'
import usersRepositoriesBindings from './users.repositories.bindings'
import { flow } from 'lodash'
import usersUsecasesBindings from './users.usecases.bindings'
import usersServicesBindings from './users.services.bindings'
import usersFactoriesBindings from './users.factories.bindings'

export default (container: Container): Container => 
    flow(usersFactoriesBindings,usersRepositoriesBindings,usersUsecasesBindings,usersServicesBindings)(container)