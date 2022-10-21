const express  = require("express");
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');

// Product controller
const addProductController = require('../controllers/Product/addProduct');
const editProductController = require('../controllers/Product/editProduct');
const getProductController = require('../controllers/Product/getProduct');
const deleteProductController = require('../controllers/Product/deleteProduct');

// Category controller
const addCategoryController = require('../controllers/Category/addCategory');
const getCategoryController = require('../controllers/Category/getCategory');
const updateCategoryController = require('../controllers/Category/updateCategory');
const deleteCategoryController = require('../controllers/Category/deleteCategory');

// Offers controller
const addOffersController = require('../controllers/Offers/addOffer');
const getOffersController = require('../controllers/Offers/getOffers');
const updateOffersController = require('../controllers/Offers/updateOffers');
const deleteOffersController = require('../controllers/Offers/deleteOffers');

//dashboard

const dashboardController = require('../controllers/dashboardController');

const router = express.Router();
const currentdate = new Date(); 

 


//  Get for Product
router.get('/allproduct',getProductController.view);
router.get('/viewproduct/:id',getProductController.singleproduct);
router.get('/relatedproducts/:catid/:prodid',getProductController.relatedproducts);
router.get('/offerproducts',getProductController.offerproducts);
router.get('/procategory',getCategoryController.category);
router.get('/productlimit/:count',getProductController.limitproduct);
router.get('/productstatus/',getProductController.productstatus);
router.get('/offers',getOffersController.offerlist);
router.get('/categoryproduct/:catid',getProductController.categoryproduct);

// Get for Dashbaord
router.get('/dashboard',dashboardController.dashboard);

// Post operation for product
router.post('/addproduct',addProductController.addproduct);
router.post('/addcategory',addCategoryController.addcategory);
router.post('/addoffer',addOffersController.addoffers);
// Post Operation for Dashboard
router.post('/login',dashboardController.login);


// Delete Operation product
router.delete('/deleteproduct/:prodid',deleteProductController.deleteproduct);
router.delete('/deletecategory/:cateid',deleteCategoryController.deletecategory);
router.delete('/deleteoffer/:offerid',deleteOffersController.deleteoffers);



// Update Category
router.put('/updatecategory/:cate_id',updateCategoryController.updatecategory);
// Update Password
router.put('/changepassword/:user_id',dashboardController.changePassword);
//update offers
router.put('/updateoffers',updateOffersController.updateoffers);

// update produt
router.put('/updateproduct',editProductController.updateproduct);

// test
// router.post('/test',productController.testImage);

module.exports = router;