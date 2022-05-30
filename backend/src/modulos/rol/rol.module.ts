import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolController} from './rol.controller';
import {RolEntity} from './rol.entity';
import {RolService} from './rol.service';

@Module({
    imports: [TypeOrmModule.forFeature([RolEntity], 'default')],
    providers: [RolService],
    controllers: [RolController],
    exports: [RolService],
})
export class RolModule {
}
