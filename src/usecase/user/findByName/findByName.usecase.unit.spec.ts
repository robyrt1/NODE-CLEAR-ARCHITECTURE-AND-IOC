import "reflect-metadata";
import { IUsersFindByNameUseCase, UsersFindByNameUseCase } from './findByName.usecase';
import { IUserRepositoryInterface } from "../../../domain/users/repository/user.repository";


describe("FEATURE - Use case",()=>{
  let userRepository:IUserRepositoryInterface;
  let usersFindByNameUseCase: IUsersFindByNameUseCase

  beforeEach(()=>{
    userRepository = {
        findByName: jest.fn()
    },
    usersFindByNameUseCase = new UsersFindByNameUseCase(userRepository)
  })

  describe("SCENARIO - repository is mock",()=>{
    describe("WHEN: cat method is called ", ()=>{
      it("THEN - should return an object array", async ()=>{
        const input = {
          name:"robert.mendes"
        }

        const expectedUsers = {
          id:1,
          nm_usuario:"robert.mendes",
          ds_usuario:"Robert Mendes",
          ds_senha:"8bae5a9f7b06ac8101216d8aae488b3514113732",
        }
        const findByNameSpy = jest.spyOn(userRepository, 'findByName').mockResolvedValueOnce(expectedUsers)

        const sut = await usersFindByNameUseCase.execute(input);

        expect(sut).toHaveProperty('id');
        expect(sut.id).toBe(1);
        expect(sut).toHaveProperty('nm_usuario');
        expect(sut.nm_usuario).toBe(expectedUsers.nm_usuario);
        expect(sut).toHaveProperty('ds_usuario');
        expect(sut.ds_usuario).toBe(expectedUsers.ds_usuario);
        expect(sut).toHaveProperty('ds_senha');
        expect(sut.ds_senha).toBe(expectedUsers.ds_senha);
        expect(findByNameSpy).toBeCalled();
        expect(findByNameSpy).toHaveBeenCalledWith(input.name);
      })
    } )
  })
})