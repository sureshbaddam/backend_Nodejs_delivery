const Vendor = require('../models/Vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv')

dotEnv.config();
const secretKey = process.env.Key

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json({ error: "already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    await newVendor.save();

    res.status(201).json({ message: "vendor registerd successfully" });
    console.log("registered");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "invalid username or password" })
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" })

    res.status(201).json({ success: "login success", token })
    console.log(email, "this is token", token)
  } catch (error) {

    console.error("Login Error: ", error);
    res.status(500).json({ error: "Internal server error" });

  }
}


const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm')
    res.json({ vendors })

  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({ error: error.message });
  }
}


const getVendorBYId = async (req, res) => {
  const vendorId = req.params.id;

  try {
    const vendor = await Vendor.findById(vendorId).populate('firm');
    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" })
    }
    res.status(200).json({ vendor })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorBYId };
