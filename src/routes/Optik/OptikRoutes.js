const express = require("express");
const router = express.Router();

const {
  getAllBarang,
  createBarang,
  getAllTransaksi,
  createTransaksi
} = require("../../controllers/OptikController");

router.get("/barang", getAllBarang);
router.post("/barang", createBarang);
router.get("/transaksi", getAllTransaksi);
router.post("/transaksi", createTransaksi);

module.exports = router;
