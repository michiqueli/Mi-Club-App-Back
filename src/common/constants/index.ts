import { ConfigModule } from "@nestjs/config"

ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
})

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const VERSION = process.env.VERSION;
export const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUDINARY_API_SECRET;