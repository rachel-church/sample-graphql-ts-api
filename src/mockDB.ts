import { employees } from './mockData';
import { Employee } from 'src/schema';

// --- Helper types --- //
type OptionalFields<T> = { [P in keyof T]?: T[P] | null }
type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// We are using a mock database connection that just updates local data.
// But our data source could be a true db connection, other APIs (rest, graphql, etc.), writing to a file, or a mix of all of the above
class MockDB {
  private employees: Employee[];

  constructor(employees: Employee[] = []) {
    this.employees = employees;
  }

  getEmployee(id: string) {
    return this.employees.find(e => e.id === id);
  }

  createEmployee(employee: Without<Employee, 'id'>) {
    const newEmployee = { ...employee, id: this.generateID() };
    this.employees.push(newEmployee);

    return newEmployee;
  }

  updateEmployee(id: string, employee: Without<OptionalFields<Employee>, 'id'>) {
    const existing = this.getEmployee(id);
    if (!existing) throw new Error(`Unable to update employee with id ${id}`);
    const updatedEmployee = { ...existing, ...employee };
    Object.assign(existing, updatedEmployee);

    return updatedEmployee as Employee;
  }

  getEmployees() {
    return this.employees;
  }

  private generateID() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Export a singleton with some initial data
export const mockDB = new MockDB(employees);
