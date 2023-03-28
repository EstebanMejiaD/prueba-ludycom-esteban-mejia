import {BadRequestException, Body, Controller, Get, Patch, Post, Query} from "@nestjs/common";
import {AreaService} from "./area.service";
import {CrearAreaDto} from "./dto/crear-area.dto";
import {Auth} from "../usuario/decorators/auth.decorator";
import {ActualizarAreaDto} from "./dto/actualizar-area.dto";

@Controller('areas')
@Auth()
export class AreaController {
    constructor( private readonly areaService: AreaService) {}
    
    
    @Post()
    registrarArea(@Body() crearAreaDto: CrearAreaDto) {
        return this.areaService.crearArea(crearAreaDto);
    }
    
    
    
    @Get()
    recuperarArea(@Query('id') id: number) {
        if (!id) throw new BadRequestException('El id de la area es requerido')
        return this.areaService.obtenerArea(id);
    }
    
    
    @Get('todas')
    recuperarAreas(@Query('page') page: number, @Query('limit') limit: number) {
        if (page && limit) return this.areaService.obtenerAreas(page, limit);
        if (page) return this.areaService.obtenerAreas(page);
        if (limit) return this.areaService.obtenerAreas(1, limit);
        return this.areaService.obtenerAreas();
    }
    

    @Patch('actualizar')
    actualizarArea(@Query('id') id: number, @Body() actualizarAreaDto: ActualizarAreaDto) {
        if (!id) throw new BadRequestException('El id de la area es requerido')
        return this.areaService.actualizarArea(id, actualizarAreaDto);
    }
    
   
    @Patch('eliminar')
    eliminarArea(@Query('id') id: number) {{
        if (!id) throw new BadRequestException('El id de la area es requerido')
        return this.areaService.eliminarArea(id);
    }
    }
    
    
}
