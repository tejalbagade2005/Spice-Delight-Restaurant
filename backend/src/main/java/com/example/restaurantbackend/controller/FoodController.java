package com.example.restaurantbackend.controller;

import com.example.restaurantbackend.model.Food;
import com.example.restaurantbackend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/foods")
    public List<Food> getAllFoods() {
        // Remove existing placeholder data and replace with fresh default menu
        foodRepository.deleteAll();

        List<Food> foods = Arrays.asList(
            new Food("Burger", 120.0, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"),
            new Food("Pizza", 250.0, "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg"),
            new Food("Sandwich", 150.0, "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg"),
            new Food("Pasta", 200.0, "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"),
            new Food("French Fries", 100.0, "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"),
            new Food("Noodles", 180.0, "https://images.unsplash.com/photo-1585032226651-759b368d7246"),
            new Food("Momos", 90.0, "https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg"),
            new Food("Ice Cream", 80.0, "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f"),
            new Food("Milkshake", 140.0, "https://images.unsplash.com/photo-1572490122747-3968b75cc699"),
            new Food("Samosa", 40.0, "https://images.unsplash.com/photo-1601050690597-df0568f70950"),
            new Food("Mixed Vegetable Salad", 110.0, "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"),
            new Food("Cappuccino", 120.0, "https://images.unsplash.com/photo-1509042239860-f550ce710b93")
        );

        foodRepository.saveAll(foods);
        return foodRepository.findAll();
    }
}
