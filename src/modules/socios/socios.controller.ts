import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { SociosService } from './socios.service';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { VERSION } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from 'src/common/filters/exception.filter';


@ApiTags('Socios')
@UseFilters(AllExceptionFilter)
@Controller(`api/${VERSION}/socios`)
export class SociosController {
  constructor(private readonly sociosService: SociosService) {}

  @Post()
  create(@Body() createSocioDto: CreateSocioDto) {
    return this.sociosService.create(createSocioDto);
  }

  @Get()
  findAll() {
    return this.sociosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sociosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocioDto: UpdateSocioDto) {
    return this.sociosService.update(+id, updateSocioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sociosService.remove(+id);
  }
}
