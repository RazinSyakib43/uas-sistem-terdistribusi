const express = require("express");
const router = express.Router();

// optik routes
const OptikRoutes = require("./Optik/OptikRoutes");
const PerusahaanARoutes = require("./Perusahaan-A/PerusahaanARoutes");

router.use("/optik", OptikRoutes);
router.use("/perusahaan-a", PerusahaanARoutes);

module.exports = router;