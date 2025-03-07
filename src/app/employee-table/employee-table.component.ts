import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router){}

  ngOnInit(){
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(data);
    })
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e.id !== id);
      },
      error: (err) => {
        console.log('Error deleting employee', err);
      }
    })
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}

