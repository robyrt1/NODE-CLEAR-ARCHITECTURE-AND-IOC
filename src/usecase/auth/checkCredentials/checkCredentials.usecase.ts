import { inject, injectable } from 'inversify';
import { JWT_IOC_IDS } from '../../../infratructure/@shared/constants/jwt.ioc.identifiers';
import { IJwt } from '../../../domain/@shared/jwt/jwt.interface';
import { ICheckCredentialsUsecaseInputDto, ICheckCredentialsUsecaseOutputDto } from './checkCredentials.usecase.dto';
import { USERS_IOC_IDS } from '../../../infratructure/@shared/constants/IOC/users.ioc.identifiers';
import { IUsersFindByNameUseCase } from '../../user/findByName/findByName.usecase';
import { CryptographyShared } from '../../../infratructure/@shared/cryptography/cryptography.shared';
import { head } from 'lodash';

@injectable()
export class CheckCredentialsUsecase implements ICheckCredentialsUsecase {
  constructor(
    @inject(JWT_IOC_IDS.JWT) private jwtShared: IJwt,
    @inject(USERS_IOC_IDS.USECASE.FINDBYNAMES) private findByUseCase: IUsersFindByNameUseCase,
  ) {}

  async execute({
    user_name,
    password: passwordRequest,
  }: ICheckCredentialsUsecaseInputDto): Promise<ICheckCredentialsUsecaseOutputDto> {
    const user = await this.findByUseCase.execute({ name: user_name });
    const shouldNotUser = !!head([user]);

    if (!shouldNotUser) throw new Error('Usuário/Senha incorretos!');

    const { password, ...userDataToGenerateJWTtoken } = user;

    const isValidatePassword = await CryptographyShared.compare(passwordRequest, password);

    if (!isValidatePassword) throw new Error(`Credenciais erradas`);

    const token = this.jwtShared.genereted(userDataToGenerateJWTtoken);

    const data = { user: userDataToGenerateJWTtoken, token };

    return data;
  }
}

export interface ICheckCredentialsUsecase {
  execute(param: ICheckCredentialsUsecaseInputDto): Promise<ICheckCredentialsUsecaseOutputDto>;
}
