const { sequelize } = require("../../config/optikDB");
const { DataTypes } = require("sequelize");

const Barang = sequelize.define(
  "barang",
  {
    id_barang: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["id_barang"],
        },
      ],
    },
    nama_barang: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    harga_barang: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stok_barang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "barang",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  {
    classMethods: {
      associate: function (models) {
        Barang.hasMany(models.Transaksi);
      },
    },
  }
);

sequelize.sync({ force: true });

module.exports = Barang;
