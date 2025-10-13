using Microsoft.AspNetCore.Mvc;
using MyShop.Models;
using Microsoft.EntityFrameworkCore;
using MyShop.ViewModels;
using MyShop.DAL;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;

namespace MyShop.Controllers;

public class OrderController : Controller
{
    private readonly IOrderRepository _orderRepository;
    private readonly IItemRepository _itemRepository;
        private readonly ILogger<OrderController> _logger;


    public OrderController(IOrderRepository orderRepository, IItemRepository itemRepository, ILogger<OrderController> logger)
    {
        _orderRepository = orderRepository;
        _itemRepository = itemRepository;
        _logger = logger;
    }

    public async Task<IActionResult> Table()
    {
        var orders = await _orderRepository.GetAll();
        if (orders == null)
        {
            _logger.LogError("[OrderController] Order list not found while executing _orderRepository.GetAll()");
            return NotFound("Order list not found");
        }
        return View(orders);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> CreateOrderItem()
    {
        var items = await _itemRepository.GetAll(); // should i use my item repository or a new method in my order repo?
        var orders = await _orderRepository.GetAll();

        if (items == null)
            {
                _logger.LogError("[OrderController] Items not found while preparing CreateOrderItem");
                return NotFound("Items not found");
            }

        if (orders == null)
        {
            _logger.LogError("[OrderController] Orders not found while preparing CreateOrderItem");
            return NotFound("Orders not found");
        }

        var createOrderItemViewModel = new CreateOrderItemViewModel
        {
            OrderItem = new OrderItem(),

            ItemSelectList = items.Select(item => new SelectListItem
            {
                Value = item.ItemId.ToString(),
                Text = item.ItemId.ToString() + ": " + item.Name
            }).ToList(),

            OrderSelectList = orders.Select(order => new SelectListItem
            {
                Value = order.OrderId.ToString(),
                Text = "Order" + order.OrderId.ToString() + ", Date: " + order.OrderDate + ", Customer: " + order.Customer.Name
            }).ToList(),
        };

        return View(createOrderItemViewModel);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateOrderItem(OrderItem orderItem)
    {

        try
        {
            var item = await _itemRepository.GetItemById(orderItem.ItemId);
            var order = await _orderRepository.GetOrderById(orderItem.OrderId);

            if (item == null || order == null)
            {
                return BadRequest("Item or Order not found.");
            }

            var newOrderItem = new OrderItem
            {
                ItemId = orderItem.ItemId,
                Quantity = orderItem.Quantity,
                OrderId = orderItem.OrderId,
                OrderItemPrice = orderItem.Quantity * item.Price
            };
            await _orderRepository.AddOrderItem(newOrderItem);
            return RedirectToAction(nameof(Table));
        }
        catch
        {
            return BadRequest("OrderItem creation failed.");
        }
    }
}