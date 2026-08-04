Currently working on this project

# 🧾 SmartInvoice

SmartInvoice is a full-stack billing and invoice management web application for shop owners. It allows users to manage shop details, products, and create invoices with real-time bill calculations and live preview.

## 🌐 Live Demo

https://smart-invoice-client.vercel.app/

## ✨ Features

- 🔐 JWT-based Authentication
- 🏪 Shop Profile Management
- 🖼️ Shop Logo Upload using Cloudinary
- 📦 Product CRUD Operations
- 🔍 Product Search
- 🧾 Invoice Creation
- 🔎 Searchable Product Dropdown
- ⚖️ Quantity-based billing in grams
- 🧮 Automatic price calculation
- 💰 Discount, GST & Grand Total
- 👁️ Live Invoice Preview
- 📊 Responsive Dashboard
- 👥 User-specific Shop & Product Data

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Select

**Backend**
- Node.js
- Express.js
- JWT
- bcryptjs

**Database**
- MySQL(NEON)
- Prisma ORM

**Cloud & Deployment**
- Cloudinary
- Vercel

## 🏗️ Architecture

```text
User
 └── Shop
      ├── Products
      └── Bills
           └── Bill Items
```

Each user has their own shop, products, and invoices.

## 🚀 Run Locally

Clone the repository:

```bash
git clone <your-repository-url>
```

Install dependencies:

```bash
cd client
npm install

cd ../server
npm install
```

Create a `.env` file in the server:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Setup Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Run backend:

```bash
npm run dev
```

Run frontend:

```bash
cd ../client
npm run dev
```

## 🔮 Future Improvements

- PDF Invoice Generation
- Barcode / QR Code
- Invoice History
- Sales Analytics & Reports
- Customer Management

## 👨‍💻 Author

**Anup Sawant**
