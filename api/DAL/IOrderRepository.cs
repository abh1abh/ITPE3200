using MyShop.Models;

namespace MyShop.DAL;

public interface IOrderRepository
{
    Task<List<Order>> GetAll();
    Task<Order?> GetOrderById(int id);
	Task AddOrderItem(OrderItem orderItem);
}