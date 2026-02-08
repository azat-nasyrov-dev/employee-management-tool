import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiOperation({ summary: 'Create employee' })
  @ApiResponse({
    status: 201,
    description: 'Employee successfully created',
    type: Employee,
  })
  @Post()
  public async createEmployee(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return await this.employeesService.createEmployee(dto);
  }

  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'List of employees',
    type: [Employee],
  })
  @Get()
  public async findAllEmployees(): Promise<Employee[]> {
    return await this.employeesService.findAllEmployees();
  }

  @ApiOperation({ summary: 'Get employee by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Employee found',
    type: Employee,
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found',
  })
  @Get(':id')
  public async findById(@Param('id') id: string): Promise<Employee> {
    return await this.employeesService.findEmployeeById(id);
  }

  @ApiOperation({ summary: 'Update employee by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Employee successfully updated',
    type: Employee,
  })
  @Patch(':id')
  public async updateEmployeeById(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeesService.updateEmployeeById(id, dto);
  }

  @ApiOperation({ summary: 'Delete employee by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 204,
    description: 'Employee successfully deleted',
  })
  @Delete(':id')
  public async removeEmployeeById(@Param('id') id: string): Promise<void> {
    return await this.employeesService.removeEmployeeById(id);
  }
}
