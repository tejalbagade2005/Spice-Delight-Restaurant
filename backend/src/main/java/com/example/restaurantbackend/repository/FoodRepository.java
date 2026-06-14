package com.example.restaurantbackend.repository;

import com.example.restaurantbackend.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}