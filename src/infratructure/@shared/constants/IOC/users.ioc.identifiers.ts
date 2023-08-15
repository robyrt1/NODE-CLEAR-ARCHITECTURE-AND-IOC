export const USERS_IOC_IDS = {
    SERVICE: Symbol.for('UsersService'),
    REPOSITORY: Symbol.for('UsersRepository'),
    USECASE:{
        CREATE: Symbol.for('UsersCreateUseCase'),
        GETALL: Symbol.for('UsersGetAllUseCase'),
        FINDBYNAMES: Symbol.for('UsersFindByNameUseCase'),
        UPDATE: Symbol.for('UsersUpdateUseCase'),
        PUTCH: Symbol.for('UsersParchUseCase')
    },
    FACTORY: Symbol.for('UsersFactory') 
  };