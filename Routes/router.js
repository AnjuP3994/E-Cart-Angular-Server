const express = require('express');
const productController = require('../Controllers/productController');
const userController = require('../Controllers/userController')
const wishlistController = require('../Controllers/wishlistController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const cartController = require('../Controllers/cartController')

const router = new express.Router();

//get all products
router.get('/products/all-product', productController.getAllProducts);

//register
router.post('/user/register', userController.register);

//login
router.post('/user/login', userController.login);

//view product
router.get('/products/view/:id', productController.viewProduct)

//add to wishlist 
router.post('/products/wishlist', jwtMiddleware, wishlistController.addToWishlist)

//get wishlist 
router.get('/products/getwishlist', jwtMiddleware, wishlistController.getWhishlist)

//delete from wishlist 
router.delete('/products/deletewishlist/:id', jwtMiddleware, wishlistController.deleteWishlist)

//add to cart 
router.post('/products/cart', jwtMiddleware, cartController.addCart)

//get cart 
router.get('/products/getcart', jwtMiddleware, cartController.getCart)

//delete from cart 
router.delete('/products/deletecart/:id', jwtMiddleware, cartController.deleteCart)

//increment cart product
router.get('/products/incrementcart/:id', jwtMiddleware, cartController.incrementCart)

//decrement cart product
router.get('/products/decrementcart/:id', jwtMiddleware, cartController.decrementCart)


module.exports = router;






