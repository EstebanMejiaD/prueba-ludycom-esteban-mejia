import { CrearUsuarioDto, LoginUsuarioDto, ActualizarUsuarioDto } from './dto';
import {Controller, Post, Body, Query, Get, Req, Res, Patch, BadRequestException} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Auth } from './decorators/auth.decorator';
import { RolesPermitidos } from './interfaces/roles-permitidos';

@Controller('usuarios')
export class UsuarioController {

    constructor( private readonly usuarioService: UsuarioService ) {}

    
    @Post()
    registrarUsuario(@Body() crearUsuarioDto: CrearUsuarioDto) {
        console.log(crearUsuarioDto)
        if (!crearUsuarioDto.id_area || !crearUsuarioDto.nro_de_documento || !crearUsuarioDto.salario) {
            throw new BadRequestException('Los campos id_area, nro_de_documento y salario son obligatorios para usuarios comunes');
        }
        return this.usuarioService.registrarUsuario(crearUsuarioDto);
    }
    
    
    @Post('iniciar_sesion')
    iniciarSesion(@Body() iniciarSesionDto: LoginUsuarioDto) {
        return this.usuarioService.iniciarSession(iniciarSesionDto);
    }
    
    
    @Post('register_admin')
    registrarAdmin(@Body() crearUsuarioDto: CrearUsuarioDto) {
        return this.usuarioService.registrarUsuario(crearUsuarioDto, true);
    }
    
    @Auth()
    @Post('cerrar_session')
    // Obtener el token de autenticación desde el header de la petición
    cerrarSession(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.usuarioService.cerrarSession(token);
    }
    

    @Auth()
    @Get()
    recuperarInformacionDeUsuario(@Req() req) {
        delete req.user.password;
        return req.user;
    }


    @Auth(RolesPermitidos.administrador)
    @Get('recuperar_usuarios')
    recuperarTodosLosUsuarios(@Query('page') page: number, @Query('limit') limit: number) {
        if (page && limit) return this.usuarioService.recuperarTodosLosUsuarios(page, limit);
        if (page) return this.usuarioService.recuperarTodosLosUsuarios(page);
        if (limit) return this.usuarioService.recuperarTodosLosUsuarios(1, limit);
        return this.usuarioService.recuperarTodosLosUsuarios();
    }
    
    @Auth()
    @Patch('actualizar_datos')
    actualizarDatos(@Body() actualizarUsuarioDto: ActualizarUsuarioDto, @Req() req) {
        return this.usuarioService.actualizarDatos(actualizarUsuarioDto, +req.user.id);
    }
    
    @Auth()
    @Patch('eliminar_usuario')
    eliminarUsuario(@Req() req) {
        return this.usuarioService.eliminarUsuario(+req.user.id);
    }
    
    
    @Get('exportar_datos')
    async exportarSesiones(@Req() req, @Res() res) {
        const sesiones = await this.usuarioService.exportarUsuarios()
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + "datos de los usuarios.xlsx");
        //@ts-ignore
        return sesiones.xlsx.write(res).then(() => {
            res.end();
          });
    }


    

    

}
