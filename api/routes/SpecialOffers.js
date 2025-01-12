import express from 'express';
import SpecialOffers from '../models/SpecialOffers.js';
import RestaurantMenu from '../models/RestaurantMenu.js';
import mongoose from 'mongoose';
const router = express.Router();


router.get('/special-offers', async (req, res) => {
    try {
      const offers = await SpecialOffers.find();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/special-offers', async (req, res) => {
    try {
      const { imgUrl, name, price, pricebefore } = req.body;
  
      // Validate input
      if (!imgUrl || !name || isNaN(price) || isNaN(pricebefore)) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
      // Create a new special offer
      const newOffer = new SpecialOffers({
        imgUrl,
        name,
        price: Number(price),
        pricebefore: Number(pricebefore),
      });
      await newOffer.save();
      res.status(201).json(newOffer);
    } catch (error) {
      console.error('Error in POST /special-offers:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  

  router.put('/special-offers/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Validate input data
      if (typeof updateData.name !== 'string' || typeof updateData.imgUrl !== 'string') {
        return res.status(400).json({ error: "Invalid data: 'name' and 'imgUrl' must be strings" });
      }
  
      if (isNaN(updateData.price) || isNaN(updateData.price)) {
        return res.status(400).json({ error: "Invalid data: 'price' and 'pricebefore' must be numbers" });
      }
  
      const updatedOffer = await SpecialOffers.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedOffer) {
        return res.status(404).json({ error: 'Offer not found' });
      }
      res.json(updatedOffer);
    } catch (error) {
      console.error('Error updating offer:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  router.delete('/special-offers/:id', async (req, res) => {
    try {
      const deletedOffer = await SpecialOffers.findOneAndDelete({ id: req.params._id });
      if (!deletedOffer) {
        return res.status(404).json({ error: 'Offer not found' });
      }
      res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  export default router;