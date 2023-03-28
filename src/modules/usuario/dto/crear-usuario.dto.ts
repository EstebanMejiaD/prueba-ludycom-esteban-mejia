import {IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength} from 'class-validator';


export class CrearUsuarioDto {

    
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    nombre: string;

    
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    apellido: string;
    
    
    @IsOptional()
    @IsString({ message: 'El número de documento debe ser una cadena de texto' })
    @MinLength(3, { message: 'El número de documento debe tener al menos 3 caracteres' })
    nro_de_documento?: string;
    
    
    @IsOptional()
    @IsDecimal({locale: 'es-ES'}, { message: 'El salario debe ser un número decimal' })
    @MinLength(3, { message: 'El salario debe tener al menos 3 caracteres' })
    salario?: number;

    
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    fecha_de_nacimiento: Date;

   
    @IsString({ message: 'El correo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío' })
    @MinLength(3, { message: 'El correo debe tener al menos 3 caracteres' })
    @IsEmail({}, { message: 'El correo debe ser un correo válido' })
    correo?: string;


    
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
    
    
    @IsOptional()
    @IsNumber({}, { message: 'El id del area debe ser un número' })
    id_area?: number;
    
    

}
