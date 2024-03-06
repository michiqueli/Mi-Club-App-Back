import { Controller, Get, Post, Body, UseGuards, Inject, Res, Request, UseFilters } from '@nestjs/common';
import { Response,  } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GoogleAuthGuard } from '../../common/guards/google.guard';
import { AllExceptionFilter } from '../../common/filters/exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { VERSION } from '../../common/constants';

@ApiTags('Auth')
@UseFilters(AllExceptionFilter)
@Controller(`api/${VERSION}/auth`)
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {}
  
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin(){
    return { msg: 'OK' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Request() req: any, @Res({ passthrough: true }) res: Response) {

    const jwt = await this.authService.login(req.user);

    res.cookie('authorization', jwt.token, {
      expires: new Date(Date.now() + 60000 * 60)
    })

    res.json(jwt)


  }

  
}
