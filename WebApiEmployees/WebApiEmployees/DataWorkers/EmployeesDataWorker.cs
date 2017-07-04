using System.Linq;
using WebApiEmployees.Common;
using WebApiEmployees.Models;
using System.Linq.Dynamic;
using WebApiEmployees.Interfaces;
using System;

namespace WebApiEmployees.DataWorkers
{
  public class EmployeesDataWorker:IDataWorker<IQueryable<Employee>>
  {
   // private IQueryable<Employee> employees;

    private IQueryable<EmployeeDto> employeesDto;
    //public EmployeesDataWorker(IQueryable<Employee> employees)
    //{
    //   employeesDto = employees.Select(employee =>
      
    // );
    //}
    public IQueryable<EmployeeDto> InitializeDto(IQueryable<Employee> employees)
    {
      return employeesDto = employees.Select(employee =>
        new EmployeeDto
        {
          FirstName = employee.FirstName,
          LastName = employee.LastName,
          Title = employee.Title,
          ProductsSold = (from order in employee.Orders select order.Order_Details.Sum(od => od.Quantity)).Sum(),
          RefersTo = employee.ReportsToEmployee.FirstName + " " + employee.ReportsToEmployee.LastName
        }
      );
    }

    public IQueryable<EmployeeDto> Serch(string searchValue)
    {
      if (employeesDto == null)
        new ArgumentNullException("employeesDto must be initialized");

      return employeesDto = employeesDto.Where(s => s.LastName.Contains(searchValue)
                               || s.FirstName.Contains(searchValue));
    }
    public int GetCountOfEmployees()
    {
      if (employeesDto == null)
        new ArgumentNullException("employeesDto must be initialized");
      return employeesDto.Count();
    }
 
    public IQueryable<EmployeeDto> OrderData( string orderColumnName, OrderType orderType)
    {
      if (employeesDto == null)
        new ArgumentNullException("employeesDto must be initialized");
      return employeesDto = employeesDto.OrderBy(orderColumnName + " " + orderType.ToString());
    }
    public IQueryable<EmployeeDto>  GetPage(int pageNumber, int pageSize)
    {
      if (employeesDto == null)
        new ArgumentNullException("employeesDto must be initialized");
      return employeesDto = employeesDto.Skip(pageNumber * pageSize).Take(pageSize);
    }
  }
}