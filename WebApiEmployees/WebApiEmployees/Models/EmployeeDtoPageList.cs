using System.Linq;

namespace WebApiEmployees.Models
{
  public class EmployeeDtoPage
  {
    public IQueryable<EmployeeDto> Employees { get; set; }
    public int TotalCount { get; set; }
  }
}