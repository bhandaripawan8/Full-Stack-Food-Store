
import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async(req, res) =>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId})
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: 'Added to Cart'})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error'})
    }
}

// remove items from user Cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user and check if the item exists in the cart with a quantity greater than zero
        const user = await userModel.findOne({ _id: userId, [`cartData.${itemId}`]: { $gt: 0 } });

        if (!user) {
            return res.json({ success: false, message: 'Item not found in cart or quantity is already zero' });
        }

        // Decrement the item's quantity by 1
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $inc: { [`cartData.${itemId}`]: -1 } },
            { new: true } // Return the updated document
        );

        // If the quantity becomes 0, remove the item from the cart
        if (updatedUser.cartData[itemId] === 0) {
            await userModel.findByIdAndUpdate(
                userId,
                { $unset: { [`cartData.${itemId}`]: "" } } // Remove the item from the cart
            );
        }

        res.json({ success: true, message: 'Removed from Cart' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error' });
    }
};

// fetch user cart data
const getCart = async (req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success: true, cartData})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {addToCart, removeFromCart, getCart};