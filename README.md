🛒 Merkato Gebeya MERN eCommerce App

A full-stack eCommerce platform built using MongoDB, Express, React, Node.js, Redux Toolkit, and integrated with PayPal for online payments.
This project includes a complete admin dashboard, user shopping system, auth system, and robust route protection.

🔍 Overview

This project is a full-featured MERN eCommerce application supporting:

customer shopping flow

secure authentication

admin panel for product & order management

PayPal checkout

route-level protection using a custom CheckAuth component

The app uses Redux Toolkit for authentication & global state, and supports role-based redirection between admin and shopping interfaces.

⭐ Key Features
👤 Authentication

User register / login

Token validation using checkAuth()

Auth stored in sessionStorage (Render.com workaround)

Protected routes via CheckAuth wrapper

Unauthenticated users redirected to /unauth-page

🛒 Shopping

Homepage

Product listing page

Checkout page

PayPal payment

Payment success & cancel pages

User account page

🛠 Admin Panel

Dashboard overview

Manage Products (CRUD)

Manage Orders

Manage Featured Items

Fully protected admin routes

🧰 Tech Stack
Frontend:

React
Redux Toolkit  ,React Router
Tailwind CSS (if used) , Lucide Icons

Backend:

Node.js , Express
MongoDB + Mongoose  ,JWT Auth

PayPal Integration

🧭 Routes Overview
Public:

/ → Auto auth check

/auth/login

/auth/register

/unauth-page

* → 404 page

Admin (Protected):

/admin/dashboard

/admin/products

/admin/orders

/admin/features

Shopping (Protected):

/shop/home

/shop/listing

/shop/checkout

/shop/account

/shop/paypal-return

/shop/payment-success

/shop/paypal-cancel


🖼 Screenshots

![Home Page](https://res.cloudinary.com/dineyc77u/image/upload/v1763652914/nn1_vbmql6.jpg)
![category and Brand](https://res.cloudinary.com/dineyc77u/image/upload/v1763652914/nn2_apgwdx.jpg)
![Shopping List](https://res.cloudinary.com/dineyc77u/image/upload/v1763652914/nn3_yz6lwo.jpg)
![Shopping products list](https://res.cloudinary.com/dineyc77u/image/upload/v1763652913/nn5_g9e83e.jpg)
![Cart](https://res.cloudinary.com/dineyc77u/image/upload/v1763652913/nn6_lswty4.jpg)
![Product Details](https://res.cloudinary.com/dineyc77u/image/upload/v1763652913/nn6_lswty4.jpg)
![Footer](https://res.cloudinary.com/dineyc77u/image/upload/v1763652913/nn4_lqgh7c.jpg)
![Admin Products](https://res.cloudinary.com/dineyc77u/image/upload/v1763652913/nn9_ako3wu.jpg)
![Admin Dashhboard](https://res.cloudinary.com/dineyc77u/image/upload/v1763652913/nn8_rzmey3.jpg)
![Admin orders](https://res.cloudinary.com/dineyc77u/image/upload/v1763652913/nn10_ckhsb5.jpg)
