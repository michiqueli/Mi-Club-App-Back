import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';

import { VERSION } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '../../common/filters/exception.filter';

ApiTags('Cuotas')
@UseFilters(AllExceptionFilter)
@Controller(`api/${VERSION}/cuotas`)
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Post()
  create(@Body() createCuotaDto: CreateCuotaDto) {
    return this.cuotasService.create(createCuotaDto);
  }

  @Get()
  findAll() {
    return this.cuotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuotasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuotaDto: UpdateCuotaDto) {
    return this.cuotasService.update(id, updateCuotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuotasService.remove(id);
  }

  @Get('/filterByYear/:year')
  filterByYear(@Param('year') year: number) {
    return this.cuotasService.filterByYear(year)
  }
}