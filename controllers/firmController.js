const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique name with original extension
    },
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmname, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);

        if (!vendor) {
            res.status(404).json({ messege: "vendor not found" });
        }
        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id,
        });

        const sevedFirm = await firm.save();
        vendor.firm.push(sevedFirm);
        await vendor.save();

        return res.status(200).json({ message: "firm added succefully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deletefirmByID = async (req, res) => {
    try {
        const firmID = req.params.firmId;
        const deletedfirm = await Firm.findByIdAndDelete(productId);

        if (!deletedfirm) {
            return res.status(404).json({ error: "no firm found" });
        }
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
};

module.exports = { addFirm: [upload.single("image"), addFirm], deletefirmByID };
