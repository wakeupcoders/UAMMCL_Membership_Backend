const Ordinary = require("../models/Ordinary");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require('mongoose');

const router = require("express").Router();

//CREATE

router.post("/", async (req, res, next) => {
  // const { error } = productSchema.validate(req.body);
  // if (error) {
  //   return next(CustomErrorHandler.validationError(error.details[0].message));
  // }
  try {
    const savedOrdinary = await new Ordinary(req.body).save();
    res.status(200).json(savedOrdinary);
  } catch (err) {
    res.status(500).json(err);
  }
});


// //UPDATE
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id, {
//       $set: req.body,
//     }, { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     if (req.params.id === "bulkdelete") {
//       await Product.deleteMany({ _id: { $in: req.body.pids } });
//       return res.status(200).json("Products has been deleted...");
//     }
//     await Product.findByIdAndDelete(req.params.id);
//     return res.status(200).json("Product has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET PRODUCT
// router.get("/find/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// //GET ALL PRODUCTS
// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   const { page, perpage } = req.query;
//   const options = {
//     page: parseInt(page, 10),
//     limit: parseInt(perpage, 10),
//   };
//   try {
//     let products, featuredproducts, trendingproducts;

//     if (qNew) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Product.paginate({}, options);
//       featuredproducts = await Product.find({ inFeatured: true }).sort({ createdAt: -1 });
//       trendingproducts = await Product.find({ inTrending: true }).sort({ createdAt: -1 });
//     }

//     products.featuredProducts = featuredproducts;
//     products.trendingproducts = trendingproducts;
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;