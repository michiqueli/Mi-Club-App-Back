import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtStrategy } from '../../config/strategies/jwt.strategy';

@Injectable()
export class AuthService {

  
  constructor(
    @Inject('USUARIOS_SERVICE') private readonly usuarioService: UsuariosService,
    private readonly jwtStrategy: JwtStrategy
  ){}

  async register(registerDto: RegisterDto) {
    return this.usuarioService.create(registerDto);
  }

  async login(user: LoginDto) {
   
    const verifyUser = await this.usuarioService.findByEmail(user.email);
    
    
    if (!verifyUser)
      throw new UnauthorizedException(`Wrong document or password`);

      if (user.password) {

        const isMatch = await bcrypt.compare(user.password, verifyUser.password);
    
        if (!isMatch) throw new UnauthorizedException(`Wrong email or password`);

        const jwtBody = await this.jwtStrategy.validate(verifyUser);

        return jwtBody;

      }

    const jwtBody = await this.jwtStrategy.validate(verifyUser);
    
    return jwtBody;

  }

  async validateUser(email: string, profile: RegisterDto){
    
    const user = await this.usuarioService.findByGoogleEmail(email);

    if(user) return user;

    const newUser =  this.usuarioService.create(profile);

    return newUser
  }

}
