import 'reflect-metadata'
import { IUserRepositoryInterface } from '../../../domain/users/repository/user.repository'
import { IUsersGetAllUseCase, UsersGetAllUseCase } from './getAll.usecase'

const dataExpectation = [
  {
  "id": 8,
  "nm_usuario": "daniel.rg",
  "ds_usuario": "daniel healthd",
  "ds_senha": "40bd001563085fc35165329ea1ff5c5ecbdbbeef"
  },
  {
  "id": 1,
  "nm_usuario": "robert.mendes",
  "ds_usuario": "robert mendes",
  "ds_senha": "8bae5a9f7b06ac8101216d8aae488b3514113732"
  }
  ]

describe("FEATURE: USE CASE",()=>{
  let userRepository:IUserRepositoryInterface;
  let usersGetAllUseCase:IUsersGetAllUseCase

  beforeEach(()=>{
    userRepository = {
      getAll: jest.fn().mockResolvedValue([
        {
        "id": 8,
        "nm_usuario": "daniel.rg",
        "ds_usuario": "daniel healthd",
        "ds_senha": "40bd001563085fc35165329ea1ff5c5ecbdbbeef"
        },
        {
        "id": 1,
        "nm_usuario": "robert.mendes",
        "ds_usuario": "robert mendes",
        "ds_senha": "8bae5a9f7b06ac8101216d8aae488b3514113732"
        }
        ]),
        findByName: jest.fn()
    },
    usersGetAllUseCase = new UsersGetAllUseCase(userRepository)
  })

  describe("SCENARIO - repository is mock",()=>{
    describe("WHEN: cat method is called ", ()=>{
      it("THEN - should return an object array", async ()=>{
        const sut = await usersGetAllUseCase.execute()
        expect(sut).toMatchObject(dataExpectation)
      })
    } )
  })
})