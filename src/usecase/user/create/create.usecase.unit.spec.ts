import 'reflect-metadata';
import { IUserRepositoryInterface } from '../../../domain/users/repository/user.repository';
import { IUsersCreateUseCase, UsersCreateUseCase } from './create.usecase';
import { IUsersFactory } from '../../../domain/users/factory/users.factory';


describe("FEATURE - USE-CASE",()=>{
  let userRepository:IUserRepositoryInterface;
  let usersCreateUseCase:IUsersCreateUseCase
  let usersFactory:IUsersFactory;

  beforeEach(()=>{
    userRepository = {
      getAll: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
    },
    usersFactory = { create: jest.fn()},
    usersCreateUseCase = new UsersCreateUseCase(userRepository,usersFactory);
  })

    describe("SCENARIO - always-mocked repository",()=>{
      describe("WHEN: cat method is called ", ()=>{
        it("THEN - should return an object ", async ()=>{
          const input = {
            nm_usuario: "usuario.test",
            ds_usuario: "Usuáario testae"
          }
        
          const expectedUser = {
            id: 1,
            nm_usuario: "usuario.test",
            ds_usuario: "Usuáario testae",
            ds_senha: ""
          };

          const createSpy = jest
          .spyOn(usersFactory, 'create')
          .mockImplementation(() => Promise.resolve(expectedUser));

          const sut = await usersCreateUseCase.execute(input)

          expect(sut).toHaveProperty('id');
          expect(sut.id).toBe(1);
          expect(sut).toHaveProperty('nm_usuario');
          expect(sut.nm_usuario).toBe('usuario.test');
          expect(sut).toHaveProperty('ds_senha');
          expect(sut.ds_senha).toBe("");
          expect(createSpy).toHaveBeenCalled()
          expect(createSpy).toHaveBeenCalledWith(input.nm_usuario,input.ds_usuario);
        })
      })
  })
})