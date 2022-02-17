const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    seller: {
      type: String,
      required: true
    },
    name: {
      type: String, 
      required: true
    }, 
    unitPrice: {
      type: Number, 
      required: true
    },
    qtyOnSale: {
      type: Number,
      required: true,
      min: 0,
      // validate : {
      //   validator : Number.isInteger,
      //   message   : 'Quantity available number must be an integer (whole number)'
      // }
    }
});

const transactionSchema = new mongoose.Schema({
  buyer: {
    type: String, 
    required: true
  },
  seller: {
    type: String, 
    required: true, 
  },
  productName: {
    type: String, 
    required: true
  },
  pricePerUnit: {
    type: Number, 
    required: true
  },
  qtyBought: {
    type: Number,
    required: true,
    min: 0,
    validate : {
      validator : Number.isInteger,
      message   : 'Quantity bought must be an integer (whole number)'
    }
  },
  timeOfTransaction: {
    type: Date,
    required: true
  }
});

const sellerSchema = new mongoose.Schema({
    accountName: {
      type: String, 
      required: true,
      unique: true
    },
    username: {
      type: String, 
      required: true,
      unique: true
    },
    hashedPassword: {
        type: String, 
        required: true
    },
    accountBalance: {
        type: Number, 
        default: 10000
    }, 
    productsSelling: [productSchema],
    transactions: [transactionSchema]
});


const Product = mongoose.model('Product', productSchema);
const Seller = mongoose.model('Seller', sellerSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = {
  Product: Product, 
  Seller: Seller,
  Transaction: Transaction
}

