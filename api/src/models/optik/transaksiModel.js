const { sequelize } = require("../../config/optikDB");
const { DataTypes } = require("sequelize");
const Barang = require("./barangModel");
const Karyawan = require("../perusahaan-a/karyawanModel");

const Transaksi = sequelize.define(
  "transaksi",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["id_campaign"],
        },
      ],
    },
    id_barang: {
      type: DataTypes.UUID,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["id_barang"],
        },
      ],
    },
    id_karyawan: {
      type: DataTypes.UUID,
      allowNull: true,
      indexes: [
        {
          unique: true,
          fields: ["id_karyawan"],
        },
      ],
    },
    nama_pelanggan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    nama_karyawan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    nama_barang: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    jumlah_barang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_harga: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    diskon: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_bayar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "transaksi",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  {
    classMethods: {
      associate: function (models) {
        Transaksi.belongsTo(models.Barang, {
          foreignKey: "id_barang",
          as: "barang",
        });

        Transaksi.belongsTo(models.Karyawan, {
          foreignKey: "id_karyawan",
          as: "karyawan",
        });
      },
    },
  }
);

Transaksi.belongsTo(Barang, {
  foreignKey: "id_barang",
  as: "barang",
});

sequelize.sync({ force: true });

module.exports = Transaksi;
