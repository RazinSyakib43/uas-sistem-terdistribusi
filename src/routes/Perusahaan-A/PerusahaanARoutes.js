const express = require("express");
const router = express.Router();

const {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
} = require("../../controllers/PerusahaanAController");

router.get("/karyawan/all", getAllKaryawan);
router.get("/karyawan/:id", getKaryawanById);
router.post("/karyawan", createKaryawan);
router.put("/karyawan/:id", updateKaryawan);
router.delete("/karyawan/:id", deleteKaryawan);

module.exports = router;
