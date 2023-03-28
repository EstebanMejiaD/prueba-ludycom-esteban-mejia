import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { MySQLDatabaseModule } from './framework/database/mysql/mysql-data.module';
import {AreaModule} from "./modules/area/area.module";

@Module({
	imports: [
		MySQLDatabaseModule,
		UsuarioModule,
		AreaModule
	],
	providers: [],
})
export class AppModule {}
