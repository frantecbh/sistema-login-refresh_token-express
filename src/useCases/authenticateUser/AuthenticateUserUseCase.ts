import { client } from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface IAuthenticate{
  password: string
  username: string
}

class AuthenticateUserUseCase {

    async execute({username, password}: IAuthenticate){

      //verificar se usuário existe

      const userAlreadyExists = await client.user.findFirst({
        where: {
         username
        }
      })
      if(!userAlreadyExists){
            
      }
  //verificar se a senha inconrreta
      const passwordMatch = await compare(password, userAlreadyExists.password)

      if(!passwordMatch){
        throw new Error("User or password incorrect");   
      }

      //gerar tocken usuer
      const token = sign({}, '4bdff350efc73ec26baf755d4ac8154b', {
        subject: userAlreadyExists.id,
        expiresIn: '20s'

      })
      
      return {token}
    }
}

export { AuthenticateUserUseCase}