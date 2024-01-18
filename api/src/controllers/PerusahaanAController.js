require("dotenv").config();

const Karyawan = require("../models/perusahaan-a/karyawanModel");

const getAllKaryawan = async (req, res) => {
  try {
    const karyawan = await Karyawan.findAll({});

    res.status(200).json({
      code: 200,
      status: "Success",
      error: false,
      message: "Get all karyawan success",
      data: karyawan,
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

const getKaryawanById = async (req, res) => {
  try {
    const { id } = req.params;

    const karyawan = await Karyawan.findOne({
      where: {
        id_karyawan: id,
      },
    });

    res.status(200).json({
      code: 200,
      status: "Success",
      error: false,
      message: "Get karyawan by id success",
      data: karyawan,
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

const createKaryawan = async (req, res) => {
  try {
    const { nama_karyawan, jabatan, no_hp } = req.body;

    const karyawan = await Karyawan.create({
      nama_karyawan,
      jabatan,
      no_hp,
    });

    res.status(201).json({
      code: 201,
      status: "Success",
      error: false,
      message: "Create karyawan success",
      data: karyawan,
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

const updateKaryawan = async (req, res) => {
  try {
    const { id } = req.query;
    const { nama_karyawan, jabatan, no_hp } = req.body;

    const karyawan = await Karyawan.update(
      {
        nama_karyawan,
        jabatan,
        no_hp,
      },
      {
        where: {
          id_karyawan: id,
        },
      }
    );

    res.status(200).json({
      code: 200,
      status: "Success",
      error: false,
      message: "Update karyawan success",
      data: karyawan,
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

const deleteKaryawan = async (req, res) => {
  try {
    const { id } = req.query;

    const karyawan = await Karyawan.destroy({
      where: {
        id_karyawan: id,
      },
    });

    res.status(200).json({
      code: 200,
      status: "Success",
      error: false,
      message: "Delete karyawan success",
      data: karyawan,
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
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
};
