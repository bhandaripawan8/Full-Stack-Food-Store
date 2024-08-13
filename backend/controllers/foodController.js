import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Saving the Food" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error getting images" });
  }
};


// remove food item
const removeFood = async (req, res) => {
  try {
    const foodId = req.body.id;
    if (!foodId) {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
      }
    });
    await foodModel.findByIdAndDelete(foodId);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.error('Error removing food:', error);
    res.status(500).json({ success: false, message: 'Error removing food item' });
  }
};

export { addFood, listFood, removeFood };
