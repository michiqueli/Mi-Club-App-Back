import { Inject, Injectable } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from "../../modules/auth/auth.service";

ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
})

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ){
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URL,
            scope: process.env.SCOPE.split(',')
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback){

        const user = await this.authService.validateUser(profile._json.email, {
            email: profile._json.email,
            name: profile._json.given_name,
            last_name: profile._json.family_name,
            password: null,
            dni: null,
            dob: null,
            phone: null
        });

        return user;

    }
}