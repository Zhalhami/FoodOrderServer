import express from "express";
import RestaurantMenu from "../models/RestaurantMenu.js";
const router = express.Router()
import mongoose from "mongoose";

router.get("/main-menu", async(req, res) =>{
    try{
        const menus = await RestaurantMenu.find();
        res.json(menus);
    }catch (error){
        res.status(500).json({error: "Server Error"})
    }
});

router.post("/main-menu", async (req, res) => {
    try{
        const {imgUrl, name, price} = req.body;
        const newMenu = new RestaurantMenu({
            imgUrl,
            name,
            price:Number(price)
        })
        await newMenu.save();
        res.status(201).json(newMenu);
    }catch (error){
        res.status(400).json({error: error.message})
    }
});

router.put('/main-menu/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedData = req.body;
      const updatedMenu = await RestaurantMenu.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedMenu) {
        return res.status(404).json({ error: "Menu not found" });
      }
  
      res.status(200).json({ message: "Menu updated successfully", menu: updatedMenu });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error in updating menu" });
    }
  });

router.delete('/main-menu/:id', async (req, res)=>{
    try{
        const deletedMenu = await RestaurantMenu.findOneAndDelete({ id: req.params._id })
        if (!deletedMenu){
            return res.status(404).json({error: "menu not found"})
        }
        res.status(201).json("Offer deleted Successfully")
    } catch (error){
        console.error('Error deleting menu:', error);
        res.status(500).json({error: "Server Error"})
    }
})



export default router;


