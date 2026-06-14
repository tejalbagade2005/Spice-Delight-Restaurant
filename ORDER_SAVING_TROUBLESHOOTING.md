# ORDER SAVING TROUBLESHOOTING GUIDE

## Problem: Orders Not Saving in Database

---

## BACKEND CHECKS

### 1. Check Spring Boot Console Logs
When placing an order, look for these log messages:

```
✅ SUCCESS:
🛒 [POST /orders] Received order:
   Name: Pizza
   Price: 250.0
   Image: https://...
   Date: 4/19/2026, 2:11 PM
   Payment Method: COD
✅ [ORDER SAVED] ID: 7, Name: Pizza

❌ FAILURE:
❌ [VALIDATION FAILED] Order name is null or empty
❌ [VALIDATION FAILED] Order price is invalid: 0
❌ [ERROR SAVING ORDER] Exception: ...
```

### 2. Check Database Connection
- **Current DB**: H2 (in-memory, resets on restart)
- **To use MySQL**: See `application-mysql.properties`

### 3. Verify Order Entity Getters/Setters
Required fields in Order.java:
- ✅ id (auto-generated)
- ✅ name (String)
- ✅ price (double)
- ✅ image (String)
- ✅ date (String)
- ✅ paymentMethod (String)
- ✅ All getters and setters defined

### 4. Check Repository Interface
```java
public interface OrderRepository extends JpaRepository<Order, Long> {}
```
✅ Must extend JpaRepository with correct generic types

---

## FRONTEND CHECKS

### 1. Check Browser Console (DevTools)
Open Developer Tools (F12) and check Console tab for:

```
✅ SUCCESS:
🛒 [PLACE ORDER] Cart items:
   Item 1: {id: 1, name: "Pizza", price: 250, ...}
🚀 [PLACE ORDER] Sending POST for item: {name: "Pizza", price: 250, ...}
📨 [PLACE ORDER] Response status for Pizza : 200
✅ [PLACE ORDER] API Response for Pizza : {id: 7, name: "Pizza", ...}
✨ [PLACE ORDER] All orders placed successfully!

❌ FAILURE:
❌ [VALIDATION] Invalid item: {name: "", price: 0}
❌ [PLACE ORDER] HTTP Error for Pizza : 400
```

### 2. Check Network Tab
1. Open DevTools → Network tab
2. Place an order
3. Look for POST request to `http://localhost:8080/orders`
4. Check Response:
   - Status: 200 (success) or 400/500 (error)
   - Body: Should show the saved order with ID

### 3. Verify Cart Items
Before checkout, ensure:
- ✅ Item has a name
- ✅ Item has a price > 0
- ✅ Item has a quantity > 0
- ✅ paymentMethod is set ("COD" or "ONLINE")

---

## TEST API WITH POSTMAN

### 1. POST New Order
```
URL: POST http://localhost:8080/orders
Headers: Content-Type: application/json

Body:
{
  "name": "Test Pizza",
  "price": 250,
  "image": "https://example.com/pizza.jpg",
  "date": "2026-04-19",
  "paymentMethod": "COD"
}

Expected Response (200):
{
  "id": 7,
  "name": "Test Pizza",
  "price": 250.0,
  "image": "https://example.com/pizza.jpg",
  "date": "2026-04-19",
  "paymentMethod": "COD"
}
```

### 2. GET All Orders
```
URL: GET http://localhost:8080/orders

Expected Response (200):
[
  {
    "id": 7,
    "name": "Test Pizza",
    "price": 250.0,
    "image": "https://example.com/pizza.jpg",
    "date": "2026-04-19",
    "paymentMethod": "COD"
  }
]
```

### 3. DELETE All Orders
```
URL: DELETE http://localhost:8080/orders

Expected Response (200):
All orders deleted
```

---

## COMMON ISSUES & SOLUTIONS

### Issue: "Order name is null or empty"
**Cause**: Item name not sent or empty string
**Solution**: Check cart item has valid name property

### Issue: "Order price is invalid"
**Cause**: Price is 0 or negative
**Solution**: 
- Check item.price is a number > 0
- Check item.qty is counted: `price * qty`

### Issue: HTTP 500 Error
**Cause**: Database connection or entity mapping error
**Solution**:
- Check application.properties database URL
- Check Order entity has all required fields
- Check OrderRepository is properly autowired

### Issue: Orders saved but price wrong
**Cause**: Frontend not multiplying price by quantity
**Solution**: Ensure `price: (item.price ?? 0) * (item.qty ?? 1)`

### Issue: Payment method always NULL
**Cause**: paymentMethod not sent from frontend
**Solution**: Ensure paymentMethod is included in JSON body

---

## DEBUG WORKFLOW

1. **Check Frontend (Browser Console)**
   - Are items being sent? (🛒 [PLACE ORDER] Cart items)
   - What data is being sent? (🚀 [PLACE ORDER] Sending POST)
   - What response received? (📨 [PLACE ORDER] Response status)

2. **Check Backend (Spring Boot Console)**
   - Did server receive the request? (🛒 [POST /orders] Received order)
   - What validation errors? (❌ [VALIDATION FAILED])
   - Was order saved? (✅ [ORDER SAVED] ID)

3. **Check Database**
   - Execute: GET http://localhost:8080/orders
   - Verify order appears in response

4. **Test with Postman**
   - Manually POST the same request
   - Isolates frontend vs backend issue

---

## DATABASE VERIFICATION

### H2 Database (Current)
- Type: In-memory
- Resets on application restart
- Good for development/testing

### Switch to MySQL
1. Uncomment MySQL settings in `application-mysql.properties`
2. Create MySQL database first
3. Add MySQL connector to pom.xml
4. Restart Spring Boot
5. Data persists between restarts

---

## KEY VALIDATION RULES

✅ **Order will be saved if:**
- name is not null and not empty
- price > 0
- All fields properly formatted JSON

❌ **Order will NOT be saved if:**
- name is missing or empty
- price is 0 or negative
- JSON parsing fails
- Database connection error

---

## NEXT STEPS

1. Open browser DevTools (F12)
2. Place an order and watch Console
3. Note any error messages
4. Check Spring Boot console for [POST /orders] logs
5. Test API with Postman for isolated testing
6. Share error messages for specific troubleshooting
