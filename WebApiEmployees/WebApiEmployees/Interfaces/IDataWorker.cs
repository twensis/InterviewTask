using System.Linq;
using WebApiEmployees.Common;
using WebApiEmployees.Models;

namespace WebApiEmployees.Interfaces
{
  interface IDataWorker<T>
  {
    int GetCountOfEmployees();
  // IQueryable<EmployeeDto> FormatDto(T employees);
    IQueryable<EmployeeDto> Serch(string searchValue);
    IQueryable<EmployeeDto> OrderData(string orderColumnName, OrderType orderType);
    IQueryable<EmployeeDto> GetPage(int pageNumber, int pageSize);
  }
}