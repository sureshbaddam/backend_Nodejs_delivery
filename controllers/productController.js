
const Firm = require('../models/Firm');

const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Folder where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique name with original extension
    },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestseller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "no firm found" })
        }

        const product = new Product({
            productName,
            price,
            category,
            bestseller,
            description,
            image,
            firm: firm._id
        });

        const savedProduct = await product.save();

        firm.products.push(savedProduct);

        await firm.save();

        res.status(200).json({ savedProduct })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "intrnal server error  add product" });

    }
};

const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {

            return res.status(404).json({ error: " no firm found" })
        }
        const restarentName = firm.firmname;
        const products = await Product.find({ firm: firmId });
        res.status(200).json({ restarentName, products })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "intrnal server error  add product" });
    }
}


const deleteProductByID = async (req, res) => {
    try {
        const productID = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "no product found" })
        }
    } catch (error) {
        res.status(500).json({ error: "internal erver error" })
    }
}

module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductByID };
