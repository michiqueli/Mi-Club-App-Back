import { Controller, Post, UploadedFile, UseFilters, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ApiTags } from '@nestjs/swagger';
import { VERSION } from 'src/common/constants';
import { AllExceptionFilter } from '../../common/filters/exception.filter';
import { FilesValidationPipe } from '../../common/pipes/files.pipe';

@ApiTags('Upload')
@UseFilters(AllExceptionFilter)
@Controller(`api/${VERSION}/upload`)
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile(new FilesValidationPipe()) file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
}
