const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('   Body:', JSON.stringify(req.body).substring(0, 100));
  }
  next();
});

// Mock data for testing without database
const MOCK_FOODS = [
  { id: 1, name: 'Pizza', price: 12.99, image: 'https://via.placeholder.com/200?text=Pizza' },
  { id: 2, name: 'Burger', price: 8.99, image: 'https://via.placeholder.com/200?text=Burger' },
  { id: 3, name: 'Pasta', price: 10.99, image: 'https://via.placeholder.com/200?text=Pasta' },
  { id: 4, name: 'Salad', price: 6.99, image: 'https://via.placeholder.com/200?text=Salad' }
];

const MOCK_ORDERS = [];

let dbConnected = false;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.connect((err) => {
  if (err) {
    console.error('❌ DATABASE CONNECTION ERROR:', err.message);
    console.warn('⚠️  Using MOCK DATA instead. Install PostgreSQL to use real database.');
    dbConnected = false;
  } else {
    console.log('✅ Connected to PostgreSQL database');
    dbConnected = true;
  }
});

const normalizeOrderItems = (items) => {
  let parsedItems = items;

  if (typeof items === 'string') {
    try {
      parsedItems = JSON.parse(items);
    } catch (err) {
      parsedItems = [];
    }
  }

  if (!Array.isArray(parsedItems)) {
    return [];
  }

  return parsedItems.map(item => ({
    itemName: item.itemName || item.name || 'Unknown item',
    price: item.price ?? 0,
    image: item.image || '',
    quantity: item.quantity ?? item.qty ?? 1
  }));
};

// Routes

// GET /foods - Fetch all menu items
app.get('/foods', async (req, res) => {
  try {
    if (!dbConnected) {
      console.log('📦 Using MOCK FOODS (DB not connected)');
      return res.json(MOCK_FOODS);
    }

    const result = await pool.query('SELECT * FROM foods');
    console.log('✅ Fetched foods from database:', result.rows.length, 'items');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ ERROR FETCHING FOODS - FULL STACK:');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    console.error('Full Error:', err);
    console.error('DB Config:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER
    });
    
    // Fallback to mock data on error
    console.log('⚠️  Fallback to MOCK DATA due to error');
    res.json(MOCK_FOODS);
  }
});

// POST /orders - Place an order
app.post('/orders', async (req, res) => {
  const { name, price, image } = req.body;
  
  console.log('📨 [POST /orders] Raw request body:', JSON.stringify(req.body).substring(0, 200));
  
  // Validation
  if (!name || typeof name !== 'string' || name.trim() === '') {
    console.error('❌ VALIDATION FAILED: name missing or invalid');
    return res.status(400).json({ 
      error: 'Invalid request: name required',
      received: { name }
    });
  }

  if (price == null || typeof price !== 'number' || price < 0) {
    console.error('❌ VALIDATION FAILED: price invalid');
    return res.status(400).json({ 
      error: 'Invalid request: price must be a number >= 0',
      received: { price }
    });
  }

  console.log('📝 Creating order:', { name, price, image });

  const order = {
    name: name.trim(),
    price,
    image: image || ''
  };

  console.log('Order to save:', order);

  try {
    if (!dbConnected) {
      // Mock order - save to memory (resets on server restart)
      const mockOrder = {
        id: MOCK_ORDERS.length + 1,
        ...order
      };
      MOCK_ORDERS.unshift(mockOrder);
      
      console.log('✅ Order created (MOCK):', mockOrder.id);
      return res.status(201).json(mockOrder);
    }

    const result = await pool.query(
      'INSERT INTO orders (name, price, image) VALUES ($1, $2, $3) RETURNING *',
      [order.name, order.price, order.image]
    );
    
    console.log('✅ Order saved to database:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ ERROR SAVING ORDER:', err.message);
    console.error('   Error code:', err.code);
    console.error('   Error detail:', err.detail);
    
    // Fallback to mock
    const mockOrder = {
      id: MOCK_ORDERS.length + 1,
      ...order
    };
    MOCK_ORDERS.unshift(mockOrder);
    
    console.log('⚠️  Fallback: Order saved to MOCK instead:', mockOrder.id);
    res.status(201).json(mockOrder);
  }
});

// GET /orders - Fetch all orders
app.get('/orders', async (req, res) => {
  console.log('📨 [GET /orders] Fetching all orders');
  
  try {
    if (!dbConnected) {
      console.log('📦 MOCK DATA: Returning', MOCK_ORDERS.length, 'orders');
      MOCK_ORDERS.forEach((order, idx) => {
        console.log(`   Order ${idx + 1}:`, { id: order.id, name: order.name, price: order.price, image: order.image });
      });
      return res.status(200).json(MOCK_ORDERS);
    }

    const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    console.log('✅ DATABASE: Returned', result.rows.length, 'orders');
    
    result.rows.forEach((order, idx) => {
      console.log(`   Order ${idx + 1}:`, { id: order.id, name: order.name, price: order.price, image: order.image });
    });
    
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ ERROR FETCHING ORDERS:', err.message);
    console.error('   Error code:', err.code);
    
    // Fallback to mock
    console.log('⚠️  Fallback: Returning MOCK ORDERS');
    res.status(200).json(MOCK_ORDERS);
  }
});

// DELETE /orders/:id - Delete a specific order
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const orderId = parseInt(id, 10);

  console.log('🗑️ [DELETE /orders/:id] Deleting order ID:', orderId);

  if (isNaN(orderId)) {
    console.error('❌ INVALID ID: Not a number');
    return res.status(400).json({ error: 'Invalid order ID' });
  }

  try {
    if (!dbConnected) {
      // Mock delete
      const index = MOCK_ORDERS.findIndex(order => order.id === orderId);
      if (index === -1) {
        console.error('❌ ORDER NOT FOUND in MOCK:', orderId);
        return res.status(404).json({ error: 'Order not found' });
      }
      
      const deletedOrder = MOCK_ORDERS.splice(index, 1)[0];
      console.log('✅ Order deleted from MOCK:', deletedOrder);
      return res.status(200).json({ message: 'Order deleted successfully' });
    }

    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [orderId]);
    
    if (result.rowCount === 0) {
      console.error('❌ ORDER NOT FOUND in DB:', orderId);
      return res.status(404).json({ error: 'Order not found' });
    }
    
    console.log('✅ Order deleted from database:', result.rows[0]);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('❌ ERROR DELETING ORDER:', err.message);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// DELETE /orders - Delete all orders
app.delete('/orders', async (req, res) => {
  console.log('🗑️ [DELETE /orders] Deleting all orders');

  try {
    if (!dbConnected) {
      // Mock delete all
      const count = MOCK_ORDERS.length;
      MOCK_ORDERS.length = 0; // Clear array
      console.log('✅ All orders deleted from MOCK:', count, 'orders');
      return res.status(200).json({ message: 'All orders deleted successfully' });
    }

    const result = await pool.query('DELETE FROM orders');
    console.log('✅ All orders deleted from database:', result.rowCount, 'orders');
    res.status(200).json({ message: 'All orders deleted successfully' });
  } catch (err) {
    console.error('❌ ERROR DELETING ALL ORDERS:', err.message);
    res.status(500).json({ error: 'Failed to delete orders' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    database: dbConnected ? 'connected' : 'disconnected (using mock data)',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('⚠️  Unhandled error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

app.listen(port, () => {
  const dbStatus = dbConnected ? '✅ Database: Connected' : '⚠️  Database: Offline (using mock data)';
  console.log(`
╔════════════════════════════════════╗
║  🚀 CAFE ERP Backend Started       ║
║  Port: ${port}                            ║
║  ${dbStatus}
║  Endpoints:                        ║
║    GET  /foods                     ║
║    GET  /orders                    ║
║    POST /orders                    ║
║    DELETE /orders                  ║
║    DELETE /orders/:id              ║
║    GET  /health                    ║
╚════════════════════════════════════╝
  `);
});