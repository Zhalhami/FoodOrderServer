import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './api/routes/SpecialOffers.js';
import MainMenu from './api/routes/RestaurantMenu.js';
import AuthRoute from "./api/routes/authRoutes.js"
import AdminRoute from './api/routes/adminRoutes.js'
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:5000';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api', router);
app.use('/api', MainMenu)
app.use('/api', AuthRoute)
app.use('/api', AdminRoute)

app.get('/', (req, res) =>{
  res.send('Hello World');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
