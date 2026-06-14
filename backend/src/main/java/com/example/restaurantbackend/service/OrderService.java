package com.example.restaurantbackend.service;

import com.example.restaurantbackend.model.Order;
import com.example.restaurantbackend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order placeOrder(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order body is required");
        }

        if (order.getName() == null || order.getName().trim().isEmpty()) {
            order.setName("Unknown Item");
        }
        if (order.getQuantity() <= 0) {
            order.setQuantity(1);
        }
        if (order.getImage() == null) {
            order.setImage("");
        }
        if (order.getDate() == null || order.getDate().trim().isEmpty()) {
            order.setDate(new Date().toString());
        }
        if (order.getPrice() < 0) {
            order.setPrice(0);
        }
        if (order.getPaymentMethod() == null || order.getPaymentMethod().trim().isEmpty()) {
            order.setPaymentMethod("COD");
        }

        String paymentMethod = order.getPaymentMethod().trim().toUpperCase();
        if (!"COD".equals(paymentMethod) && !"ONLINE".equals(paymentMethod)) {
            paymentMethod = "COD";
        }
        order.setPaymentMethod(paymentMethod);

        return orderRepository.save(order);
    }

    public void deleteAllOrders() {
        orderRepository.deleteAll();
    }

    public boolean deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            return false;
        }

        orderRepository.deleteById(id);
        return true;
    }
}