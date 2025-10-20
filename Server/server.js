require('dotenv').config();
const express = require('express');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/product-routes')
const adminOrderRouter = require('./routes/admin/order-routes')
const shopProductRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopOrderRouter = require('./routes/shop/order-routes')

const app = express();
const PORT = process.env.PORT || 5000;

connectToDb()

app.use(cors({
  origin: "http://localhost:5173",
  methods : ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders : [
  //   "Content-Type",
  //   "Authorization",
  //   "Cache-Control",
  //   "Expires",
  //   "Pragma"
  // ],
  credentials : true,
}))

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/admin/orders', adminOrderRouter)
app.use('/api/shop/products', shopProductRouter)
app.use('/api/shop/cart', shopCartRouter) 
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)


app.listen(PORT, ()=>{
  console.log(`server started on ${PORT}`);
});