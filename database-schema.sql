-- SuperApp Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  phone TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'customer', -- 'admin', 'courier', 'vendor', 'customer'
  created_at TIMESTAMP DEFAULT NOW()
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  description TEXT,
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  price NUMERIC,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- COURIERS
CREATE TABLE IF NOT EXISTS couriers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  full_name TEXT,
  phone TEXT,
  status TEXT DEFAULT 'offline',
  current_lat NUMERIC,
  current_lon NUMERIC,
  last_updated TIMESTAMP
);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  code TEXT UNIQUE,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  status TEXT DEFAULT 'pending',
  payment_method TEXT, -- transfer | cod
  payment_proof_url TEXT,
  total NUMERIC,
  courier_id UUID REFERENCES couriers(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  qty INTEGER,
  price NUMERIC
);

-- GUEST ORDERS
CREATE TABLE IF NOT EXISTS guest_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE,
  name TEXT,
  phone TEXT,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_proof_url TEXT,
  total NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

-- CHECKOUT FIELDS (custom field builder)
CREATE TABLE IF NOT EXISTS checkout_fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT,
  name TEXT UNIQUE,
  type TEXT, -- "text", "textarea", "select", "date"
  is_required BOOLEAN DEFAULT FALSE,
  options TEXT[], -- for select
  show_on_guest BOOLEAN DEFAULT TRUE,
  show_on_login BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- SETTINGS (CMS KEY/VALUE)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- BANNERS
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  subtitle TEXT,
  image_url TEXT,
  link_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- TRACKING LOGS (lokasi kurir)
CREATE TABLE IF NOT EXISTS tracking_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  courier_id UUID REFERENCES couriers(id),
  order_id UUID REFERENCES orders(id),
  latitude NUMERIC,
  longitude NUMERIC,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- EMPLOYEES
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  full_name TEXT,
  role TEXT,
  base_salary NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

-- PAYROLLS
CREATE TABLE IF NOT EXISTS payrolls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  period_start DATE,
  period_end DATE,
  total_salary NUMERIC,
  status TEXT DEFAULT 'unpaid',
  generated_at TIMESTAMP DEFAULT NOW()
);

-- NOTIFICATIONS (template untuk WA/email)
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT, -- email | whatsapp | inapp
  target_role TEXT,
  template_title TEXT,
  template_body TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- VENDORS (mitra)
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  business_name TEXT,
  phone TEXT,
  address TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample settings
INSERT INTO settings (key, value) VALUES
('bank_name', 'BCA'),
('bank_account', '1234567890 a.n SuperApp Indonesia'),
('footer_text', '© 2025 SuperApp Indonesia'),
('contact_whatsapp', '0822xxxxxx'),
('enable_cod', 'true'),
('enable_transfer', 'true'),
('enable_ewallet', 'true')
ON CONFLICT (key) DO NOTHING;

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Makanan', 'Berbagai jenis makanan lezat'),
('Minuman', 'Minuman segar dan sehat'),
('Snack', 'Camilan dan makanan ringan')
ON CONFLICT DO NOTHING;

-- Insert sample products (you'll need to get the category IDs first)
-- This is just an example - adjust the category_id values based on your actual data
INSERT INTO products (name, description, price, category_id, is_featured) VALUES
('Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam, dan sayuran', 25000, (SELECT id FROM categories WHERE name = 'Makanan' LIMIT 1), true),
('Mie Ayam', 'Mie ayam dengan bakso dan pangsit', 20000, (SELECT id FROM categories WHERE name = 'Makanan' LIMIT 1), true),
('Es Teh Manis', 'Teh manis dingin yang menyegarkan', 5000, (SELECT id FROM categories WHERE name = 'Minuman' LIMIT 1), false),
('Kopi Hitam', 'Kopi hitam premium', 8000, (SELECT id FROM categories WHERE name = 'Minuman' LIMIT 1), false),
('Keripik Singkong', 'Keripik singkong renyah', 10000, (SELECT id FROM categories WHERE name = 'Snack' LIMIT 1), false)
ON CONFLICT DO NOTHING;

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkout_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE couriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Public read access for categories, products, settings, banners
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON banners FOR SELECT USING (true);
CREATE POLICY "Public read access" ON checkout_fields FOR SELECT USING (true);

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Orders policies
CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can read own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can create order items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Guest orders - public read with code
CREATE POLICY "Public read guest orders with code" ON guest_orders FOR SELECT USING (true);
CREATE POLICY "Public create guest orders" ON guest_orders FOR INSERT WITH CHECK (true);

-- Admin policies (you'll need to set up admin role detection)
-- For now, we'll use a simple approach - you can enhance this later
CREATE POLICY "Admin full access users" ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Add more admin policies as needed for other tables
-- CREATE POLICY "Admin full access [table]" ON [table] FOR ALL USING (
--   EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
-- );