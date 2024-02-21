import { ConfigModule } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
})

export const jwtModuleOptions: JwtModuleOptions = {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
}