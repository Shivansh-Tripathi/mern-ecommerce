# 🛍️ FOREVER — Full-Stack MERN E-Commerce Platform & Admin Panel

A modern, full-stack E-Commerce web application built with the **MERN** stack (MongoDB, Express.js, React, Node.js), featuring a responsive customer shopping storefront and a dedicated Admin Control Panel dashboard.

---

## 🚀 Features

### 🛒 Customer Storefront (`frontend`)
- **Product Catalog & Filtering**: Browse products by category (Men, Women, Kids) and subcategory (Topwear, Bottomwear, Winterwear, Dress), with price sorting and real-time search.
- **Product Detail View**: Multi-image thumbnail gallery, size selection (S, M, L, XL, XXL), product descriptions, customer reviews display, and related items.
- **Cart Management**: Add items with size selection, update quantities dynamically, calculate totals with delivery fees, and auto-sync cart state with the backend database.
- **User Authentication**: Register and log in securely with JWT token authentication and session persistence.
- **Order Placement & Tracking**: Place orders with Cash on Delivery (COD) or online payment methods, view past order history, and track delivery progress in real time.

### 🛡️ Admin Control Panel (`admin`)
- **Admin Authentication**: Secure login portal for store managers (`admin@gmail.com` / `adminpassword`).
- **Product Management**: Add new products with multiple image upload previews, category selection, subcategory selection, price configuration, size selector, and bestseller flags.
- **Inventory Listing**: View the complete product catalog table with one-click product deletion.
- **Order Management**: Inspect incoming customer orders, customer shipping details, item details, payment status, and update shipment status (`Order Placed`, `Packing`, `Shipped`, `Out for delivery`, `Delivered`).

### ⚙️ Backend REST API (`backend`)
- **Express.js API Architecture**: Decoupled routes, controllers, and database models.
- **MongoDB Database**: Persistent storage for Users, Products, Carts, and Orders via Mongoose schemas.
- **Cloudinary Integration**: Multi-image file uploads handled via `multer` middleware and Cloudinary CDN storage.
- **JWT Authorization Middleware**: Protected endpoints for authenticated users (`authUser`) and administrators (`adminAuth`).

---

## 🛠️ Technology Stack

- **Frontend & Admin**: React 19, Vite, TailwindCSS, React Router v7, React Toastify, Axios
- **Backend**: Node.js, Express 5, MongoDB / Mongoose, JWT (JsonWebToken), Bcryptjs, Multer, Cloudinary CDN

---

## 📁 Repository Structure

```
mern-ecommerce/
├── backend/                  # Node.js & Express REST API
│   ├── config/               # MongoDB & Cloudinary database configurations
│   ├── controller/           # User, Product, Cart, and Order business logic
│   ├── middleware/           # JWT & file upload authentication middlewares
│   ├── mongoose/             # User, Product, and Order database schemas
│   ├── routes/               # API route definitions
│   └── server.js             # Main Express server entry point
├── frontend/                 # React Customer Storefront App (Port 5173)
│   ├── src/assets/           # Store icons and product graphics
│   ├── src/components/       # Reusable UI components (Navbar, Hero, Footer, etc.)
│   ├── src/contex/           # Global ShopContext state manager
│   └── src/pages/            # Store pages (Home, Collection, Cart, Checkout, Orders)
└── admin/                    # React Admin Control Dashboard App (Port 5174)
    ├── src/components/       # Admin Header, Navigation Sidebar, Login view
    └── src/pages/            # Dashboard pages (Add Product, List Products, Orders)
```

---

## 🚦 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) URI string

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/Shivansh-Tripathi/mern-ecommerce.git
cd mern-ecommerce
```

Install dependencies in all 3 subdirectories:
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Install admin dependencies
cd ../admin && npm install
```

---

### 3. Environment Configuration (`backend/.env`)

Create a `.env` file inside the `backend/` directory:

```env
PORT=4000
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="jwt_secret_key_12345"
ADMIN_EMAIL="admin@gmail.com"
ADMIN_PASSWORD="adminpassword"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

---

### 4. Running the Applications

Open 3 separate terminal windows to launch the servers:

#### 🟢 1. Start Backend API Server:
```bash
cd backend
npm start
```
> Running on `http://localhost:4000`

#### 🔵 2. Start Frontend Storefront:
```bash
cd frontend
npm run dev
```
> Running on `http://localhost:5173`

#### 🟣 3. Start Admin Dashboard:
```bash
cd admin
npm run dev
```
> Running on `http://localhost:5174`

---

## 📡 API Endpoints Overview

| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/register` | Public | Register new user account |
| `POST` | `/api/user/login` | Public | User login & token generation |
| `POST` | `/api/user/admin/login` | Public | Administrator login |
| `GET` | `/api/product/list` | Public | Fetch all store products |
| `POST` | `/api/product/add` | Admin | Upload images & add product |
| `POST` | `/api/product/remove` | Admin | Delete product by ID |
| `POST` | `/api/cart/get` | User | Fetch user shopping cart |
| `POST` | `/api/cart/add` | User | Add item & size to cart |
| `POST` | `/api/cart/update` | User | Modify item quantity in cart |
| `POST` | `/api/order/place` | User | Create new customer order |
| `POST` | `/api/order/userorders` | User | Fetch customer order history |
| `POST` | `/api/order/list` | Admin | Fetch all customer orders |
| `POST` | `/api/order/status` | Admin | Update shipment status of order |

---

## 📜 License

This project is open-source and available under the [ISC License](LICENSE).
