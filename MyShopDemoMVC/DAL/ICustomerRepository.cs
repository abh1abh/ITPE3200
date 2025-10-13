using MyShop.Models;

namespace MyShop.DAL;
public interface ICustomerRepository
{
    Task<List<Customer>> GetAll();
}