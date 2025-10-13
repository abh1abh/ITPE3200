using Microsoft.EntityFrameworkCore;
using MyShop.Models;

namespace MyShop.DAL;

public class OrderRepository : IOrderRepository
{
    private readonly ItemDbContext _db;

    public OrderRepository(ItemDbContext db)
    {
        _db = db;
    }

    public async Task<List<Order>> GetAll()
    {
        return await _db.Orders.ToListAsync();
    }

    public async Task<Order?> GetOrderById(int id)
    {
        return await _db.Orders.FindAsync(id);
    }

    public async Task AddOrderItem(OrderItem orderItem)
    {
        _db.OrderItems.Add(orderItem);
        await _db.SaveChangesAsync();
    }
}