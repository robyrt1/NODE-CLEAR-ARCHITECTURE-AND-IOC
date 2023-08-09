export const USERS_IOC_IDS = {
    SERVICE: Symbol.for('UsersService'),
    REPOSITORY: Symbol.for('UsersRepository'),
    USECASE:{
        CREATE: Symbol.for('CreateUseCase'),
        GETALL: Symbol.for('GetAllUseCase')
    },
    FACTORY: Symbol.for('UsersFactory') 
  };