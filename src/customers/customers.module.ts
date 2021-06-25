import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers.controller';
import { Customer, CustomerSchema } from './customers.schema';
import { CustomersService } from './customers.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
    controllers: [CustomersController],
    providers: [CustomersService],
    exports: [CustomersService]
})
export class CustomersModule { }
