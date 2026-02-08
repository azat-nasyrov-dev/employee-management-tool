import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  public async createEmployee(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return await this.employeesService.createEmployee(dto);
  }

  @Get()
  public async findAllEmployees(): Promise<Employee[]> {
    return await this.employeesService.findAllEmployees();
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<Employee> {
    return await this.employeesService.findEmployeeById(id);
  }

  @Patch(':id')
  public async updateEmployeeById(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeesService.updateEmployeeById(id, dto);
  }

  @Delete(':id')
  public async removeEmployeeById(@Param('id') id: string): Promise<void> {
    return await this.employeesService.removeEmployeeById(id);
  }
}
