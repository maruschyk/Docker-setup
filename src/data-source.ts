import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';

import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [User, Product, Category, Order, OrderItem],

  migrations: ['src/migrations/*.ts'],
});
