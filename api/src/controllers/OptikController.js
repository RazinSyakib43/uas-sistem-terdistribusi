require("dotenv").config();

const axios = require("axios");

const Barang = require("../models/optik/barangModel");
const Transaksi = require("../models/optik/transaksiModel");
const Karyawan = require("../models/perusahaan-a/karyawanModel");

const getAllBarang = async (req, res) => {
  try {
    const barang = await Barang.findAll({});

    res.status(200).json({
      code: 200,
      status: "Success",
      error: false,
      message: "Get all barang success",
      data: barang,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Error",
      error: true,
      message: error.message,
    });
  }
};

const createBarang = async (req, res) => {
  try {
    const { nama_barang, harga_barang, stok_barang } = req.body;

    const barang = await Barang.create({
      nama_barang,
      harga_barang,
      stok_barang,
    });

    res.status(201).json({
      code: 201,
      status: "Success",
      error: false,
      message: "Create barang success",
      data: barang,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Error",
      error: true,
      message: error.message,
    });
  }
};

const getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll({});

    res.status(200).json({
      code: 200,
      status: "Success",
      error: false,
      message: "Get all transaksi success",
      data: transaksi,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Error",
      error: true,
      message: error.message,
    });
  }
};

const createTransaksi = async (req, res) => {
  const { id_barang, id_karyawan, nama_pelanggan, jumlah_barang } = req.body;

  let diskon = 0;
  let namaKaryawan = null;

  if (id_karyawan) {
    try {
      const response = await axios.get(
        `http://localhost:5000/perusahaan-a/karyawan/${id_karyawan}`
      );

      const karyawanData = response.data;

      console.log("karyawanData", karyawanData);

      namaKaryawan = karyawanData.data.nama_karyawan;

      console.log("namaKaryawan", namaKaryawan);

      if (karyawanData) {
        diskon = 0.2;
      }
    } catch (error) {
    }
  }

  try {
    const barang = await Barang.findOne({
      where: {
        id_barang: id_barang,
      }
    });

    hargaBarang = barang.dataValues.harga_barang;

    const total_harga = hargaBarang * jumlah_barang;
    const hargaDiskon = total_harga * diskon;
    const total_bayar = total_harga - hargaDiskon;

    const transaksi = await Transaksi.create({
      id_barang,
      id_karyawan,
      jumlah_barang,
      nama_pelanggan: nama_pelanggan,
      nama_karyawan: namaKaryawan,
      total_harga,
      diskon: diskon,
      total_bayar,
    });

    res.status(201).json({
      code: 201,
      status: "Success",
      error: false,
      message: "Create transaksi success",
      data: transaksi,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Error",
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBarang,
  createBarang,
  getAllTransaksi,
  createTransaksi
};
