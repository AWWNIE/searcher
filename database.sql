-- Create the products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO products (name, category, description, price) VALUES
    ('Laptop Pro 15', 'Electronics', 'High-performance laptop with 16GB RAM', 1299.99),
    ('Wireless Mouse', 'Electronics', 'Ergonomic wireless mouse with USB receiver', 29.99),
    ('Office Chair', 'Furniture', 'Comfortable ergonomic office chair', 249.99),
    ('Standing Desk', 'Furniture', 'Adjustable height standing desk', 399.99),
    ('Coffee Maker', 'Appliances', 'Programmable coffee maker with thermal carafe', 89.99),
    ('Blender', 'Appliances', 'High-speed blender for smoothies', 59.99),
    ('Running Shoes', 'Sports', 'Lightweight running shoes with cushioning', 79.99),
    ('Yoga Mat', 'Sports', 'Non-slip yoga mat with carrying strap', 24.99),
    ('Mechanical Keyboard', 'Electronics', 'RGB mechanical gaming keyboard', 149.99),
    ('LED Monitor 27"', 'Electronics', '4K LED monitor with HDR support', 449.99),
    ('Bookshelf', 'Furniture', '5-tier wooden bookshelf', 129.99),
    ('Toaster Oven', 'Appliances', 'Convection toaster oven', 119.99),
    ('Basketball', 'Sports', 'Official size basketball', 34.99),
    ('Desk Lamp', 'Furniture', 'Adjustable LED desk lamp', 39.99),
    ('Headphones', 'Electronics', 'Noise-canceling wireless headphones', 199.99),
    ('Microwave', 'Appliances', '1000W microwave oven', 149.99),
    ('Dumbbell Set', 'Sports', 'Adjustable dumbbell set 5-50 lbs', 299.99),
    ('Tablet', 'Electronics', '10-inch tablet with stylus', 499.99),
    ('Sofa', 'Furniture', '3-seater fabric sofa', 699.99),
    ('Air Fryer', 'Appliances', 'Digital air fryer with presets', 129.99);
