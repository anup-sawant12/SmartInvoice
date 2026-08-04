Currently working on this project


# 🧾 SmartInvoice

SmartInvoice is a full-stack invoicing and billing web application designed for shop owners to manage their shop, products, and invoices from a single dashboard.

The application supports multi-user shop management, product CRUD operations, searchable product selection, quantity-based billing, and a live invoice preview.

## 🌐 Live Demo

https://smart-invoice-client.vercel.app/

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Logout

### 🏪 Shop Management
- Create Shop Profile
- Update Shop Details
- Shop Name, Address & Mobile Number
- GST Number
- Shop Logo Upload
- Cloudinary Image Storage
- One Shop per User

### 📦 Product Management
- Add Products
- View Products
- Edit Products
- Delete Products
- Search Products
- Shop-specific Products
- Product Pricing per Kilogram

### 🧾 Invoice Creation
- Customer Name & Mobile Number
- Searchable Product Dropdown
- Select Products from Existing Product Database
- Enter Quantity in Grams
- Automatic Price Calculation
- Add Multiple Products
- Prevent Duplicate Product Rows
- Automatic Subtotal Calculation
- Discount
- GST
- Grand Total Calculation

### 👁️ Live Invoice Preview
- Real-time Customer Details
- Real-time Product Updates
- Quantity Display
- Item-wise Total
- Subtotal
- Discount
- GST
- Grand Total

### 📊 Dashboard
- Modern SaaS Dashboard
- Quick Actions
- Product Navigation
- Invoice Navigation
- Shop Profile
- Reports Section
- Responsive Sidebar

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- React Select
- React Icons

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcryptjs

### Database

- MySQL
- Prisma ORM

### Cloud & Deployment

- Cloudinary — Shop logo storage
- Vercel — Frontend deployment

---

## 🏗️ Project Structure

```text
SmartInvoice/
│
├── client/
│   └── src/
│       ├── components/
│       │   ├── dashboard/
│       │   ├── invoice/
│       │   └── product/
│       │
│       ├── context/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       └── App.jsx
│
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── prisma/
    ├── routes/
    ├── services/
    ├── utils/
    ├── app.js
    └── server.js
```

---

## 🔄 Application Flow

```text
Register / Login
       ↓
   Dashboard
       ↓
Create Shop Profile
       ↓
 Manage Products
       ↓
 Create Invoice
       ↓
 Search Product
       ↓
Enter Quantity (grams)
       ↓
Automatic Calculation
       ↓
Live Invoice Preview
```

---

## 🧮 Invoice Calculation

Products are priced per kilogram while invoice quantities can be entered in grams.

The item total is calculated as:

```text
Item Total = (Price per Kg × Quantity in Grams) / 1000
```

Example:

```text
Product: Rice
Price: ₹80/kg
Quantity: 250g

Total = (80 × 250) / 1000
      = ₹20
```

---

## 🔒 Multi-User Architecture

SmartInvoice keeps shop data isolated between users.

```text
User
 │
 └── Shop
      │
      ├── Products
      │
      └── Bills
           │
           └── Bill Items
```

Each authenticated user can access only the products and billing information associated with their own shop.

---

## 🗃️ Database Models

The application uses the following primary Prisma models:

```text
User
Shop
Product
Bill
BillItem
```

### Relationships

```text
User       1 ─── 1 Shop

Shop       1 ─── N Products

Shop       1 ─── N Bills

Bill       1 ─── N BillItems

Product    1 ─── N BillItems
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd SmartInvoice
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the server directory.

```env
DATABASE_URL="your_mysql_database_url"

JWT_SECRET="your_jwt_secret"

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

Never commit the `.env` file to GitHub.

---

## 🗄️ Prisma Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

Optional — inspect the database using Prisma Studio:

```bash
npx prisma studio
```

---

## ▶️ Run Locally

### Backend

```bash
cd server
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend typically runs on:

```text
http://localhost:5173
```

---

## 🔌 Main API Modules

```text
/api/auth
/api/shop
/api/products
/api/bills
```

Protected endpoints require a JWT token:

```text
Authorization: Bearer <token>
```

---

## 🔮 Future Improvements

- Invoice PDF Generation
- Barcode / QR Code on Invoice
- Invoice Download & Print
- Invoice History
- Advanced Reports
- Daily / Monthly Sales Analytics
- Dashboard Revenue Statistics
- Customer Management
- Product Categories
- Invoice Filtering & Search
- Improved Mobile Billing Experience

---





## 🌐 Deployment

The frontend is deployed on Vercel.

**Live Application:**

https://smart-invoice-client.vercel.app/

---

## 👨‍💻 Author

**Anup Sawant**

---

## ⭐ Support

If you found this project useful, consider giving the repository a star.
