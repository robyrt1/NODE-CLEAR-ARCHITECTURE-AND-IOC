import 'reflect-metadata';
import UsersFactory, { IUsersFactory }  from './users.factory';
import { IDatabase } from '../../../infratructure/@shared/interfaces/database';

describe("FEATURE - factory", ()=>{
  let database:IDatabase;
  let usersFactory:IUsersFactory

  beforeEach(()=>{
    database = {
      connectAsync: jest.fn(),
      execQuery: jest.fn().mockResolvedValue({
        command:"SELCT",
        rowCount:"1",
        oid:"",
        fields:[{
          id: "1"
        }],
        rows: [{
          id:1
        }]
      }),
      execQuerySequence: jest.fn(),
    }
    usersFactory = new UsersFactory(database)
  })
  
  describe("SCENARIO - database is mock",()=>{
    describe("WHEN: cat method is called ", ()=>{
      it("THEN - should return an object array", async ()=>{
        const input = {
          nm_usuario:'robert.mendes',
          ds_usuario:'robert mendes',
        }

        const expectedUser = {
          id: 1,
          nm_usuario: "robert.mendes",
          ds_usuario: "robert mendes",
          ds_senha: "",
        }

        const sut = await usersFactory.create(input.nm_usuario, input.ds_usuario);

        expect(sut).toHaveProperty('id');
        expect(sut.id).toBe(expectedUser.id);
        expect(sut).toHaveProperty('nm_usuario');
        expect(sut.nm_usuario).toBe(input.nm_usuario);
        expect(sut).toHaveProperty('ds_usuario');
        expect(sut.ds_usuario).toBe(input.ds_usuario);
        expect(sut).toHaveProperty('ds_senha');
        expect(sut.ds_senha).toBe(expectedUser.ds_senha);
      })
    } )
  })
})