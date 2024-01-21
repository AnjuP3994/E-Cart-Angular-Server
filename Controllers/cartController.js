const carts = require('../Models/cartSchema')
const cartController = require('../Models/cartSchema')


//add to cart
exports.addCart = async(req,res)=>{
    //get product details
    const {id, title, image, price, quantity} = req.body
    try {
        //check if product is already in cart
        const product = await carts.findOne({id})
        if (product) {
            //product is already in cart and update the quantity
            product.quantity += 1
            product.grandTotal = product.price*product.quantity //update the grand total
            product.save()
            res.status(200).json("Item updated successfully!")  //send response to the client
        } 
        else {
            //product is not in the cart and will added
            const newProduct = new carts({id, title, image, price, quantity, grandTotal:price})
            await newProduct.save() //product is saved successfully
            res.status(200).json("Item added successfully") //send response to the client
        }
    } catch (err) {
        res.status(404).json(err)
    }
}


//get cart
exports.getCart = async(req,res)=>{
    try {
        const allCartProducts = await carts.find()
        res.status(200).json(allCartProducts)
    } catch (err) {
        res.status(404).json(err)
    }
}


//delete from cart
exports.deleteCart = async(req,res)=>{
    const {id} = req.params //product id
    try {
        const removedProduct = await carts.deleteOne({id})
        if (removedProduct) {
            const allCart = await carts.find()
            res.status(200).json(allCart)   //pass remaining product to cart
        }
    } catch (err) {
        res.status(404).json(err)
    }
}


//increment cart
exports.incrementCart = async(req,res)=>{
    const {id} = req.params //product id
    try {
        //check if product in cart
        const cartProduct = await carts.findOne({id})
        if (cartProduct) {
            cartProduct.quantity += 1   //update quantity
            cartProduct.grandTotal = cartProduct.price * cartProduct.quantity   //update grandTotal
            await cartProduct.save()    //save
            //get all products after update
            const allCart = await carts.find()
            res.status(200).json(allCart)   //pass updated product to cart
        }
        else {
            res.status(404).json("Product not found")
        }
    } catch (err) {
        res.status(404).json(err)
    }
}


//decrement cart
exports.decrementCart = async(req,res)=>{
    const {id} = req.params //product id
    try {
        //check if product in cart
        const cartProduct = await carts.findOne({id})
        if (cartProduct) {
            cartProduct.quantity -= 1   //update quantity
            cartProduct.grandTotal = cartProduct.price * cartProduct.quantity   //update grandTotal
            await cartProduct.save()    //save
            if (cartProduct.quantity === 0) {
                await carts.deleteOne({ id });  // If quantity becomes zero, remove the product from the cart
            }
            //get all products after update
            const allCart = await carts.find()
            res.status(200).json(allCart)   //pass updated product to cart
        }
        else {
            res.status(404).json("Product not found")
        }
    } catch (err) {
        res.status(404).json(err)
    }
}

