import { Module } from "@nestjs/common";
import { EmailService } from "./mailer.service";

@Module({
    providers: [
       EmailService
    ]
})
export class MailerModule {}