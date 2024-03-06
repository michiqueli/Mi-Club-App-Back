import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe, UseFilters } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { VERSION } from '../../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '../../common/filters/exception.filter';


@ApiTags('Usuarios')
@UseFilters(AllExceptionFilter)
@Controller(`api/${VERSION}/usuarios`)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
  
  @Patch('/restore/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuariosService.restore(id);
  }

}
