using System.Linq;
using System.Runtime.Serialization;

namespace WebApiEmployees.Models
{
  [DataContract]
  public class EmployeeDto
  {
    [DataMember]
    public string FirstName { get; set; }
    [DataMember]
    public string LastName { get; set; }
    [DataMember]
    public string Title { get; set; }
    [DataMember]
    public int ProductsSold { get; set; }
    [DataMember]
    public string RefersTo { get; set; }
  }
}