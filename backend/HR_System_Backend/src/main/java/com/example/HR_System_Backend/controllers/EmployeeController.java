package com.example.HR_System_Backend.controllers;

import com.example.HR_System_Backend.models.Employee;
import com.example.HR_System_Backend.models.EmployeeDTO;
import com.example.HR_System_Backend.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/employees")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Employee>getEmployeeById(@PathVariable Long id){
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (employee.isPresent()){
            return new ResponseEntity<>(employee.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeDTO employeeDTO){
        Employee newEmployee = employeeService.saveEmployee(employeeDTO);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/{id}/updateManager")
    public ResponseEntity<Employee> updateManager(@RequestBody Long managerId, @PathVariable Long id){
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (!employee.isPresent()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        Optional<Employee> manager = employeeService.getEmployeeById(managerId);
        if (!manager.isPresent()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        Employee employeeToUpdate = employee.get();
        employeeToUpdate.setManager(manager.get());
        employeeService.saveEmployee(employeeToUpdate)
    }
}
