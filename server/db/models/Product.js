const conn = require('../conn');
const defaultProductImage = require('../../../public/images/defaultProductImage')

const Product = conn.define('product', {
  // id: {
  //   type: conn.Sequelize.UUID,
  //   defaultValue: conn.Sequelize.UUIDV4,
  //   primaryKey: true
  // },
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: conn.Sequelize.TEXT,
    defaultValue: defaultProductImage
    //allowNull: false,  commented out for now
  },
  stock: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: conn.Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Product;
