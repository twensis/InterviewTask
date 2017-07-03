using System;
using System.Linq;
using System.Web.Http;
using WebApiEmployees.Common;
using WebApiEmployees.Models;
using System.Linq.Dynamic;
using WebApiEmployees.DataWorkers;

namespace WebApiEmployees.Controllers
{
  public class EmployeesController : ApiController
  {
    private NorthwindEntities db = new NorthwindEntities();

    // GET: api/Employees
    public EmployeeDtoPage GetEmployees(int pageSize, int pageNumber, string searchValue, string orderColumnName, OrderType orderType)
    {
      EmployeesDataWorker employeesDataWorker = new EmployeesDataWorker(db.Employees);

      if (!String.IsNullOrEmpty(searchValue))
      {
        employeesDataWorker.Serch(searchValue).Count();
      }

      int totalCount = employeesDataWorker.GetCountOfEmployees();

      employeesDataWorker.FormatDto();

      employeesDataWorker.OrderData(orderColumnName, orderType);

      IQueryable<EmployeeDto> employeesDto = employeesDataWorker.GetPage(pageNumber, pageSize);
     
      return new EmployeeDtoPage
      {
        Employees = employeesDto,
        TotalCount = totalCount
      };
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

  }
}