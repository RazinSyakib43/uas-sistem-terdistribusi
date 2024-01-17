const { sequelize } = require("../../config/perusahaanADB");
const { DataTypes } = require("sequelize");

const Karyawan = sequelize.define(
  "karyawan",
  {
    id_karyawan: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["id_karyawan"],
        },
      ],
    },
    nama_karyawan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "karyawan",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  {
    classMethods: {
      associate: function (models) {
        Karyawan.hasMany(models.Transaksi);
      },
    },
  }
);

sequelize.sync({ force: true });

module.exports = Karyawan;
