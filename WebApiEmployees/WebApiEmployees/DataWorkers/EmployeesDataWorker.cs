using System.Linq;
using WebApiEmployees.Common;
using WebApiEmployees.Models;
using System.Linq.Dynamic;

namespace WebApiEmployees.DataWorkers
{
  public class EmployeesDataWorker
  {
    private IQueryable<Employee> employees;

    private IQueryable<EmployeeDto> employeesDto;
    public EmployeesDataWorker(IQueryable<Employee> employees)
    {
      this.employees = employees;
    }

    public IQueryable<Employee> Serch(string searchValue)
    {
      return employees = employees.Where(s => s.LastName.Contains(searchValue)
                               || s.FirstName.Contains(searchValue));
    }
    public int GetCountOfEmployees()
    {
      return employees.Count();
    }
    public IQueryable<EmployeeDto> FormatDto()
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
    public IQueryable<EmployeeDto> OrderData( string orderColumnName, OrderType orderType)
    {
      return employeesDto = employeesDto.OrderBy(orderColumnName + " " + orderType.ToString());
    }
    public IQueryable<EmployeeDto>  GetPage(int pageNumber, int pageSize)
    {
      return employeesDto = employeesDto.Skip(pageNumber * pageSize).Take(pageSize);
    }
  }
}