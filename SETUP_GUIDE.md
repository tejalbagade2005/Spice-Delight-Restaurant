# Full-Stack Food Ordering App - Setup & Verification Guide

## ✅ Current Status

Your full-stack application is **fully configured and ready to run**! All components are properly connected:

### Backend (Spring Boot)
- ✅ REST Controller with all endpoints (GET, POST, DELETE)
- ✅ Order Entity with correct fields (id, name, price, image, date)
- ✅ CORS enabled for http://localhost:3000
- ✅ Database configuration (H2 default, MySQL optional)
- ✅ MySQL connector dependency added

### Frontend (React)
- ✅ CartContext with API integration
- ✅ useEffect for loading orders on page load
- ✅ useState for storing orders
- ✅ map() for rendering orders
- ✅ Error handling with user-friendly messages

### Integration
- ✅ Correct API endpoints: http://localhost:8080/orders
- ✅ Proper JSON request/response handling
- ✅ CORS headers properly configured
- ✅ Navigation to /my-orders after successful order placement

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ (for frontend)
- Java 8+ (for backend)
- Maven (for building backend)
- MySQL 5.7+ (optional, H2 is default)

### Step 1: Start the Backend

```bash
cd backend

# Build the backend
mvn clean install

# Run the backend server
mvn spring-boot:run
```

**Expected Output:**
```
... 
Started RestaurantBackendApplication in X.XXX seconds
... 
Server running on port 8080
```

✅ Backend is ready at: `http://localhost:8080/orders`

### Step 2: Start the Frontend

```bash
# From project root
npm install
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view restaurant-portfolio in the browser.
  http://localhost:3000
```

✅ Frontend is ready at: `http://localhost:3000`

---

## 🧪 Verification Checklist

### 1. **Test Fetch Orders (GET)**
```
Frontend loads → My Orders page shows loading → "No Orders Yet" message
✅ This means: Backend is responding to GET http://localhost:8080/orders
```

**Browser Console Check:**
```
🔄 [FETCH ORDERS] Fetching from http://localhost:8080/orders
📨 [FETCH ORDERS] Response status: 200
✅ [FETCH ORDERS] Raw API response: []
```

### 2. **Test Place Order (POST)**

1. Go to Menu page
2. Add items to cart
3. Click Cart → Checkout
4. Click "Confirm Order"
5. Should see: ✅ "Order Placed Successfully!"
6. Redirects to: /my-orders

**Browser Console Check:**
```
🚀 [PLACE ORDER] Sending POST for item: {name: "Pizza", price: 12.99, image: "...", date: "..."}
📨 [PLACE ORDER] Response status for Pizza: 201
✅ [PLACE ORDER] API Response for Pizza: {id: 1, name: "Pizza", price: 12.99, ...}
✨ [PLACE ORDER] All orders placed successfully!
```

**Backend Console Check:**
```
Order{id=1, name='Pizza', price=12.99, image='...', date='...'}
```

### 3. **Test View Orders (GET)**

After placing an order, the My Orders page should display:
- Order image
- Order name
- Order price
- Order date
- Delete button for each order

### 4. **Test Delete Order (DELETE)**

1. Go to My Orders page
2. Click "Delete" on any order
3. Confirm deletion
4. Order should disappear from list

**Browser Console Check:**
```
🗑️ [DELETE ORDER] Sending DELETE request to http://localhost:8080/orders/1
📨 [DELETE ORDER] Response status: 200
📨 [DELETE ORDER] Response body: Deleted
```

### 5. **Test Error Handling**

**Scenario A: Backend Down**
1. Stop the backend server
2. Try to fetch orders from frontend
3. Should show: ⚠️ "Cannot connect to backend at http://localhost:8080"

**Scenario B: Invalid Data**
1. Try to place order with empty cart
2. Should show: ❌ "Cart is empty!"

---

## 🛠️ Database Configuration

### Using H2 (Default - Current)
No additional setup needed. Data is in-memory and resets when backend restarts.

**Current config in `application.properties`:**
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
```

### Switching to MySQL (Persistent Storage)

1. **Create MySQL database:**
```sql
CREATE DATABASE restaurant_db;
USE restaurant_db;
```

2. **Update `backend/src/main/resources/application.properties`:**

Comment out H2 lines:
```properties
# spring.datasource.url=jdbc:h2:mem:testdb
# spring.datasource.driver-class-name=org.h2.Driver
# spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

Uncomment MySQL lines:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/restaurant_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

3. **Rebuild backend:**
```bash
mvn clean install
mvn spring-boot:run
```

Tables will be created automatically from `schema.sql`.

---

## 📋 API Endpoints Reference

### GET /orders
**Purpose:** Fetch all orders
```bash
curl http://localhost:8080/orders
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "Pizza",
    "price": 12.99,
    "image": "https://...",
    "date": "2024-01-15T10:30:00"
  }
]
```

### POST /orders
**Purpose:** Place a new order
```bash
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizza",
    "price": 12.99,
    "image": "https://...",
    "date": "2024-01-15T10:30:00"
  }'
```

### DELETE /orders/{id}
**Purpose:** Delete a specific order
```bash
curl -X DELETE http://localhost:8080/orders/1
```

### DELETE /orders
**Purpose:** Delete all orders
```bash
curl -X DELETE http://localhost:8080/orders
```

---

## 🔍 Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS Error in console | Backend CORS not configured | ✅ Already fixed in code |
| 405 Method Not Allowed | Endpoint doesn't exist | ✅ All endpoints are defined |
| 404 Not Found | Wrong URL | Check: `http://localhost:8080/orders` |
| null values in orders | Missing Order fields | ✅ All fields have defaults |
| Orders not visible | Frontend not fetching | Check console for `[FETCH ORDERS]` logs |
| Backend not responding | Server not running | Run: `mvn spring-boot:run` |
| Port 8080 already in use | Another app using port | Kill process: `lsof -i :8080` (Mac/Linux) or `netstat -ano` (Windows) |

---

## 📦 Updated Dependencies

**New Addition to pom.xml:**
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

This allows the backend to connect to MySQL when configured.

---

## 📝 File Structure

```
restaurant-portfolio/
├── backend/
│   ├── pom.xml (✅ Updated with MySQL connector)
│   └── src/main/java/com/example/restaurantbackend/
│       ├── controller/OrdersController.java (✅ All endpoints defined)
│       ├── model/Order.java (✅ All fields present)
│       └── repository/OrderRepository.java
│       └── WebConfig.java (✅ CORS configured)
├── src/
│   ├── App.jsx
│   ├── index.js (✅ CartProvider wraps app)
│   └── context/
│       └── CartContext.jsx (✅ All API calls correct)
└── SETUP_GUIDE.md (← You are here)
```

---

## ✨ Next Steps

1. **Start Backend:** `cd backend && mvn spring-boot:run`
2. **Start Frontend:** `npm start`
3. **Run Verification Checklist** above
4. **Enjoy your food ordering app!** 🍕🍔🍜

---

## 💡 Tips

- **Development Mode:** Keep browser DevTools console open to see debug logs
- **Test Multiple Orders:** Place 2-3 orders to verify list functionality
- **Check Network Tab:** In DevTools, Network tab shows all API calls
- **Use MySQL for Production:** H2 is in-memory and data doesn't persist across restarts

---

## 📚 Additional Resources

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [REST API Best Practices](https://restfulapi.net/)
