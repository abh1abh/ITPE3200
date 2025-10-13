

using Microsoft.EntityFrameworkCore;
using MyShop.Models;

namespace MyShop.DAL;

public class CustomerRepository : ICustomerRepository 
{
    private readonly ItemDbContext _db;

    public CustomerRepository(ItemDbContext db)
    {
        _db = db;
    }

    public async Task<List<Customer>> GetAll()
    {
        return await _db.Customers.ToListAsync();
    }

}