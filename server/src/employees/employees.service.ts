import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { Tag, TagDocument } from '../tags/schemas/tag.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);

  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
    @InjectModel(Tag.name)
    private readonly tagModel: Model<TagDocument>,
  ) {}

  /**
   * Creates a new employee.
   *
   * @param dto Employee creation payload
   * @returns Created employee
   * @throws HttpException if validation fails
   */
  public async createEmployee(dto: CreateEmployeeDto): Promise<Employee> {
    try {
      if (dto.tags?.length) {
        await this.validateTagsExist(dto.tags);
      }

      const employee = await this.employeeModel.create({
        ...dto,
        dateOfBirth: new Date(dto.dateOfBirth),
      });

      this.logger.log(`Employee created [id=${employee.id}]`);
      return employee;
    } catch (err) {
      this.logger.error('Error creating employee', err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('Failed to create employee', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns all employees.
   *
   * @returns List of employees
   */
  public async findAllEmployees(): Promise<Employee[]> {
    try {
      const employees = await this.employeeModel.find().populate('tags').exec();

      this.logger.log(`Fetched ${employees.length} employees`);
      return employees;
    } catch (err) {
      this.logger.error('Error fetching employees', err);
      throw new HttpException('Failed to fetch employees', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Finds an employee by ID.
   *
   * @param id Employee identifier
   * @returns Found employee
   * @throws HttpException if employee not found
   */
  public async findEmployeeById(id: string): Promise<Employee> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid employee id', HttpStatus.BAD_REQUEST);
      }

      const employee = await this.employeeModel.findById(id).populate('tags').exec();

      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Fetched employee [id=${id}]`);
      return employee;
    } catch (err) {
      this.logger.error(`Error fetching employee id=${id}`, err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('Failed to fetch employee', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Updates an employee by ID.
   *
   * @param id Employee identifier
   * @param dto Update payload
   * @returns Updated employee
   */
  public async updateEmployeeById(id: string, dto: UpdateEmployeeDto): Promise<Employee> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid employee id', HttpStatus.BAD_REQUEST);
      }
      if (dto.tags?.length) {
        await this.validateTagsExist(dto.tags);
      }

      const employee = await this.employeeModel
        .findByIdAndUpdate(
          id,
          {
            ...dto,
            ...(dto.dateOfBirth && {
              dateOfBirth: new Date(dto.dateOfBirth),
            }),
          },
          { new: true },
        )
        .populate('tags')
        .exec();

      if (!employee) {
        this.logger.warn(`Attempt to update non-existing employee [id=${id}]`);
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Employee updated [id=${id}]`);
      return employee;
    } catch (err) {
      this.logger.error(`Error updating employee id=${id}`, err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('Failed to update employee', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Removes an employee by ID.
   *
   * @param id Employee identifier
   * @throws HttpException if employee not found
   */
  public async removeEmployeeById(id: string): Promise<void> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid employee id', HttpStatus.BAD_REQUEST);
      }

      const result = await this.employeeModel.findByIdAndDelete(id).exec();
      if (!result) {
        this.logger.warn(`Attempt to delete non-existing employee [id=${id}]`);
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Employee deleted [id=${id}]`);
    } catch (err) {
      this.logger.error(`Error deleting employee id=${id}`, err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('Failed to delete employee', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Validates that all provided tags exist.
   *
   * @param tagIds List of tag IDs
   * @throws HttpException of any tag does not exist
   */
  private async validateTagsExist(tagIds: string[]): Promise<void> {
    const objectIds = tagIds.map((id) => new Types.ObjectId(id));
    const count = await this.tagModel
      .countDocuments({
        _id: { $in: objectIds },
      })
      .exec();

    if (count !== tagIds.length) {
      this.logger.warn(
        `Invalid tag reference(s) provided: expected=${tagIds.length}, found=${count}`,
      );
      throw new HttpException('One or more tags do not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
