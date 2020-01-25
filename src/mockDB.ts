import { Department, Employee } from 'src/schema';

type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

class MockDB {
  private employees: Employee[];
  private departments: Department[];

  constructor(employees: Employee[] = [], departments: Department[] = []) {
    this.employees = employees;
    this.departments = departments;
  }

  getEmployee(id: string) {
    return this.employees.find(e => e.id === id);
  }

  getDepartment(id: string) {
    return this.departments.find(d => d.id === id);
  }

  createEmployee(employee: Without<Employee, 'id'>) {
    const newEmployee = { ...employee, id: this.generateID() };
    this.employees.push(newEmployee);

    return newEmployee;
  }

  createDepartment(department: Without<Department, 'id'>) {
    const newDepartment = { ...department, id: this.generateID() };
    this.departments.push(newDepartment);

    return newDepartment;
  }

  updateEmployee(employee: Employee) {
    const existing = this.getEmployee(employee.id);
    if (!existing) throw new Error(`Unable to update employee with id ${employee.id}`);
    Object.assign(existing, employee);
  }

  updateDepartment(department: Department) {
    const existing = this.getDepartment(department.id);
    if (!existing) throw new Error(`Unable to update department with id ${department.id}`);
    Object.assign(existing, department);
  }

  getEmployees() {
    return this.employees;
  }

  getDepartments() {
    return this.departments;
  }

  private generateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export const mockDB = new MockDB();
