package com.example.restaurantbackend.controller;

import com.example.restaurantbackend.model.Order;
import com.example.restaurantbackend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(
    originPatterns = {"http://localhost:*", "http://127.0.0.1:*"},
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowCredentials = "true"
)
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        if (order == null) {
            return ResponseEntity.badRequest().build();
        }

        Order savedOrder = orderService.placeOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllOrders() {
        orderService.deleteAllOrders();
        return ResponseEntity.ok("All orders deleted");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        boolean deleted = orderService.deleteOrder(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
        return ResponseEntity.ok("Order deleted");
    }
}