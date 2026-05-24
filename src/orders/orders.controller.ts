import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('api/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //CREATE ORDER
  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({
    summary: 'Створити замовлення',
  })
  @ApiResponse({
    status: 201,
    description: 'Замовлення створено',
  })
  @ApiResponse({
    status: 400,
    description: 'Недостатній stock',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(@Body() dto: CreateOrderDto, @CurrentUser('sub') userId: number) {
    return this.ordersService.create(dto, userId);
  }

  // GET MY ORDERS / ALL FOR ADMIN
  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({
    summary: 'Мої замовлення (user) / всі (admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Список замовлень',
  })
  findAll(
    @Query() query: OrderQueryDto,

    @CurrentUser('sub') userId: number,

    @CurrentUser('role') role: Role,
  ) {
    return this.ordersService.findAll(query, userId, role);
  }

  // GET ONE ORDER
  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({
    summary: 'Отримати одне замовлення',
  })
  @ApiResponse({
    status: 200,
    description: 'Замовлення знайдено',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,

    @CurrentUser('sub')
    userId: number,

    @CurrentUser('role')
    role: Role,
  ) {
    return this.ordersService.findOne(id, userId, role);
  }

  // UPDATE STATUS
  @Patch(':id/status')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Змінити статус замовлення',
  })
  @ApiResponse({
    status: 200,
    description: 'Статус оновлено',
  })
  @ApiResponse({
    status: 400,
    description: 'Невалідний перехід статусу',
  })
  @ApiResponse({
    status: 403,
    description: 'Admin only',
  })
  updateStatus(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, dto);
  }

  // DELETE ORDER
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Видалити замовлення',
  })
  @ApiResponse({
    status: 200,
    description: 'Замовлення видалено',
  })
  @ApiResponse({
    status: 403,
    description: 'Admin only',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordersService.remove(id);
  }
}
