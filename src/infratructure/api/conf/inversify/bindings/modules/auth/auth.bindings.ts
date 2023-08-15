import { Container } from 'inversify'
import { flow } from 'lodash'
import authUsecasesBindigs from './auth.usecases.bindigs'
import authSevicesBindings from './auth.sevices.bindings'

export default (container: Container): Container => 
    flow(authSevicesBindings,authUsecasesBindigs)(container)