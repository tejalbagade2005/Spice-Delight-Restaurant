-- MySQL: Delete old orders from database
-- Connect to your MySQL database first

-- OPTION 1: Delete all old orders
DELETE FROM orders;

-- OPTION 2: Delete orders older than specific date
-- DELETE FROM orders WHERE date < '2026-04-01';

-- OPTION 3: Delete only null/invalid orders
-- DELETE FROM orders WHERE name IS NULL OR price = 0;

-- OPTION 4: Reset auto increment (MySQL specific)
-- ALTER TABLE orders AUTO_INCREMENT = 1;

-- Verify deletion
-- SELECT COUNT(*) FROM orders;