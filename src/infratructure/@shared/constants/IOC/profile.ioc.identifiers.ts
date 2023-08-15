export const PROFILE_IOC_IDS = {
    SERVICE: Symbol.for('ProfileServices'),
    REPOSITORY: Symbol.for('ProfileRepository'),
    USECASE:{
        CREATE: Symbol.for('ProfileCreateUseCase'),
    },
    FACTORY: Symbol.for('ProfileFactory')
  };