import { IUserRepositoryInterface } from './../../../domain/users/repository/user.repository';
import { Container } from 'inversify';
import { IUsersFactory } from '../../../domain/users/factory/users.factory';
import { CreateUseCase, ICreateUseCase } from '../create/create.usecase';
import { USERS_IOC_IDS } from '../../../infratructure/@shared/constants/IOC/users.ioc.identifiers';
const input = {
  nm_usuario: 'healthd',
  ds_usuario: 'healthd samel',
  cd_pessoa_fisica: '136',
};

describe('FEATURE: USE CASE create users', () => {
  let userRepositoryMock;
  let usersFactoryMock: IUsersFactory;
  let createUseCase: ICreateUseCase;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn(),
      findByName: jest.fn(),
    };
    usersFactoryMock = {
      create: jest.fn(),
    };

    const container = new Container();
    container.bind<IUserRepositoryInterface>(USERS_IOC_IDS.REPOSITORY).toConstantValue(userRepositoryMock);
    container.bind<IUsersFactory>(USERS_IOC_IDS.FACTORY).toConstantValue(usersFactoryMock);
    createUseCase = new CreateUseCase(
      container.get<IUserRepositoryInterface>(USERS_IOC_IDS.REPOSITORY),
      container.get<IUsersFactory>(USERS_IOC_IDS.FACTORY),
    );
  });

  describe('SCENARIO - usersRepository methods are mocked', () => {
    it('THEN - it should return an object containing the user id', async () => {
      const id = 324;

      const factorySpyon = jest.spyOn(usersFactoryMock, 'create').mockResolvedValueOnce({
        id: id as any,
        nm_usuario: input.nm_usuario,
        ds_usuario: input.ds_usuario,
        cd_pessoa_fisica: input.cd_pessoa_fisica,
      });

      const expectedResponse = {
        id: id,
        nm_usuario: input.nm_usuario,
        ds_usuario: input.ds_usuario,
        cd_pessoa_fisica: input.cd_pessoa_fisica,
      };

      const sut = await createUseCase.execute(input);

      expect(sut).toHaveProperty('id');
      expect(sut.id).toBe(id);
      expect(sut).toMatchObject(expectedResponse);
      //   expect(factorySpyon).toHaveBeenCalled();
    });
  });
});
