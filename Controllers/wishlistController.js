const wishlists = require('../Models/wishlistSchema')


//Add to wishlist
exports.addToWishlist = async(req,res)=>{
    const {id, title, price, image} = req.body
    //logic
    try {
        //check product in wishlist
        const item = await wishlists.findOne({id})
        if (item) {
            res.status(401).json("Product already in wishlist")
        } else {
            //add to wishlist
            const newProduct = new wishlists({
                id, title, price, image
            })
            //store to db
            await newProduct.save()
            res.status(200).json("Product added in wishlist")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}


//get wishlist from db
exports.getWhishlist = async(req,res)=>{
    try {
        const allWish = await wishlists.find()
        res.status(200).json(allWish)   //all wishlist products
    } catch (err) {
        res.status(401).json(err)
    }
}


//delete from wishlist
exports.deleteWishlist = async(req,res)=>{
    //get id from url
    const {id} = req.params //id
    try {
        const deleteItem = await wishlists.deleteOne({id})
        if (deleteItem) {
            //send remaining item to frontend
            const allitem = await wishlists.find()
            res.status(200).json(allitem)
        } 
    } catch (err) {
        res.status(401).json(err)
    }
}












