const express = require("express");
const app = express();
const axios = require("axios");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");

const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "uasst_apotik_db",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke MySQL gagal: " + err.message);
  } else {
    console.log("Terhubung ke MySQL");
  }
});

app.use(express.json());

app.post("/transaksi", async (req, res) => {
  const { nama, produk, jumlah_barang, harga } = req.body;

  let diskon = 0;

  try {
    const response = await axios.get(
      `http://localhost:3001/karyawan?nama=${nama}`
    );
    const karyawanData = response.data;

      if (karyawanData) {
        diskon = 0.2;
      }
  } catch (error) {
  }

  const idPenjualan = uuidv4();

  const totalharga = harga * jumlah_barang;

  const hargaDiskon = totalharga * diskon;
  const totalBayar = totalharga - hargaDiskon;

  const sql =
    "INSERT INTO penjualan (id, produk, harga, jumlah_beli, total_harga, diskon, total_bayar) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [idPenjualan, produk, harga, jumlah_barang, diskon, totalharga, totalBayar],
    (err, result) => {
      if (err) {
        return res.status(500).send("Gagal membuat transaksi baru");
      } else {
        return res.json({
          message: "Transaksi berhasil dibuat",
          idPenjualan,
          hargaDiskon,
          totalBayar,
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server JAYA TERANG berjalan di http://localhost:${port}`);
});
