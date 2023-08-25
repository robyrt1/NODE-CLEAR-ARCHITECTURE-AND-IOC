import "reflect-metadata";
import { IUserRepositoryInterface } from '../../../domain/users/repository/user.repository';
import { IUsersPatchUseCase, UsersPatchUseCase } from './patch.usecase'
import { HTTPCODE } from "../../../infratructure/@shared/constants/httpCode";


describe("FEATURE - Use case", ()=>{
  let userRepository:IUserRepositoryInterface;
  let usersPatchUseCase:IUsersPatchUseCase;

  beforeEach(()=>{
    userRepository = {
      getAll: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      getByProp: jest.fn(),
      patch: jest.fn(),
    },
    usersPatchUseCase = new UsersPatchUseCase(userRepository);
  })

  describe("SCENARIO - always-mocked repository", ()=>{
    describe("WHEN - cat method is called", ()=>{
      it("THEN - should return an object", async()=>{
        const input  = {
          id: 1,
          ds_senha: "robert123456",
          nm_usuario: "Robert Mendes",
        }

        const getByPropSpy = jest.spyOn(userRepository, "getByProp").mockResolvedValueOnce({
          id: 1,
          nm_usuario: "robert.mendes",
          ds_usuario: "Robert Mendes",
          ds_senha: "d914eaa3fee19b872efb9d31344e65c4e1290e5a",
        });

        const patchSpy = jest.spyOn(userRepository, "getByProp").mockResolvedValueOnce({
          id: 1,
          nm_usuario: "robert.mendes",
          ds_usuario: "Robert Mendes",
          ds_senha: "d914eaa3fee19b872efb9d31344e65c4e1290e5a",
        });

        const expectedUser = {
          id:1,
          nm_usuario:"robert.mendes",
          ds_usuario:"Robert Mendes",
        }

        const sut = await usersPatchUseCase.execute(input);

        expect(sut).toHaveProperty("id")
        expect(sut.id).toBe(expectedUser.id);
        expect(sut).toHaveProperty("nm_usuario")
        expect(sut.nm_usuario).toBe(expectedUser.nm_usuario);
        expect(sut).toHaveProperty("ds_usuario")
        expect(sut.ds_usuario).toBe(expectedUser.ds_usuario);
        expect(getByPropSpy).toBeCalled()
        expect(getByPropSpy).toBeCalledWith('nr_sequencia', [input.id as never])
      })

      it("THEN - there should be an error with this message: 'User does not exist.'", async()=>{
        const input  = {
          id: 1,
          ds_senha: "robert123456",
          nm_usuario: "Robert Mendes",
        }

        const getByPropSpy = jest.spyOn(userRepository, "getByProp").mockResolvedValueOnce(null);

        const expectedUser = {
          statusCode: HTTPCODE.BAD_REQUEST,
          message: 'Usuario não existe.'
        }

        try {
          await usersPatchUseCase.execute(input);
          
        } catch (error) {
          const sut = error as { statusCode: number, message: string};
          expect(sut).toHaveProperty('statusCode')
          expect(sut.statusCode).toBe(expectedUser.statusCode)
          expect(sut).toHaveProperty('message')
          expect(sut.message).toBe(expectedUser.message)
          expect(getByPropSpy).toBeCalled()
          expect(getByPropSpy).toBeCalledWith('nr_sequencia', [input.id as never])
        }


      })
    })
  })
})