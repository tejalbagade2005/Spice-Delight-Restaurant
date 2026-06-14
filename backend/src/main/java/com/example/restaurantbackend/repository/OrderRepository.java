package com.example.restaurantbackend.repository;

import com.example.restaurantbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}