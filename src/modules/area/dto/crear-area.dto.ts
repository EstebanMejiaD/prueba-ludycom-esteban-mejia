import { IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';


export class CrearAreaDto {
    
    
    @IsString({ message: 'El nombre del area debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del area no puede estar vacío' })
    @MinLength(3, { message: 'El nombre del area debe tener al menos 3 caracteres' })
    nombre: string;
    
   
    @IsNotEmpty({ message: 'El id del usuario no puede estar vacío' })
    @IsNumber({}, { message: 'El id del usuario debe ser un número' })
    id_lider: number;
}
