const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({extended: true}));
app.use(session({ secret: 'notagoodsecret' }));
const { Seller, Product, Transaction } = require('./schemas');
mongoose.connect('*MongoDB URI (Private)*', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch(err => {
    console.log("MONGO CONNECTION ERROR!");
    console.log(err);
  });
app.get('/', async (req, res) => {
  let loggedIn;
  let sessionMessage = req.session.message;
  let sessionMeter = req.session.meter;
  if(sessionMeter) {
    req.session.meter++;
  }
  sessionMeter = req.session.meter;
  if(req.session.sellerId) {
    const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
    loggedIn = true;
    res.render('home', { loggedIn, loggedInSeller, sessionMessage, sessionMeter });
  } else {
    loggedIn = false;
    const allTransactions = await Transaction.find();
    res.render('home', { loggedIn, allTransactions, sessionMessage, sessionMeter });
  }
});
app.get('/products', async (req, res) => {
  const allSellers = await Seller.find();
  const allProducts = await Product.find();
  let loggedIn;
  let sessionMessage = req.session.message;
  let sessionMeter = req.session.meter;
  if(sessionMeter) {
    req.session.meter++;
  }
  sessionMeter = req.session.meter;
  if(req.session.sellerId) {
    const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
    loggedIn = true;
    res.render('products', { loggedIn, loggedInSeller, allProducts, allSellers, sessionMessage, sessionMeter });
  } else {
    loggedIn = false;
    res.render('products', { loggedIn, allProducts, allSellers, sessionMessage, sessionMeter});
  }
});
app.get('/sellers', async (req, res) => {
  const allSellers = await Seller.find();
  let loggedIn;
  let sessionMessage = req.session.message;
  let sessionMeter = req.session.meter;
  if(sessionMeter) {
    req.session.meter++;
  }
  sessionMeter = req.session.meter;
  if(req.session.sellerId) {
    const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
    loggedIn = true;
    res.render('sellers', { loggedIn, loggedInSeller, allSellers, sessionMessage, sessionMeter });
  } else {
    loggedIn = false;
    res.render('sellers', { loggedIn, allSellers, sessionMessage, sessionMeter });
  }
});
app.get('/transactions', async (req, res) => {
  let loggedIn;
  let sessionMessage = req.session.message;
  let sessionMeter = req.session.meter;
  if(sessionMeter) {
    req.session.meter++;
  }
  sessionMeter = req.session.meter;
  const allTransactions = await Transaction.find();
  if(req.session.sellerId) {
    const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
    loggedIn = true;
    res.render('transactions', { loggedIn, loggedInSeller, allTransactions, sessionMessage, sessionMeter });
  } else {
    loggedIn = false;
    res.render('transactions', { loggedIn, allTransactions, sessionMessage, sessionMeter });
  }
});
app.get('/sellers/:sellerId', async (req, res) => {
  const allProducts = await Product.find();
  const requestedSeller = await Seller.findOne({ _id: req.params.sellerId });
  let loggedIn;
  let sessionMessage = req.session.message;
  let sessionMeter = req.session.meter;
  if(sessionMeter) {
    req.session.meter++;
  }
  sessionMeter = req.session.meter;
  if(req.session.sellerId) {
    const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
    loggedIn = true;
     return res.render('seller', { loggedIn, loggedInSeller, requestedSeller, allProducts, sessionMessage, sessionMeter });
  } else {
    loggedIn = false;
    return res.render('seller', { loggedIn, requestedSeller, allProducts, sessionMessage, sessionMeter });
  }
});
app.get('/signup', async (req, res) => {
  let loggedIn;
  let sessionMessage = req.session.message;
  let sessionMeter = req.session.meter;
  if(sessionMeter) {
    req.session.meter++;
  }
  sessionMeter = req.session.meter;
  if(req.session.sellerId) {
    const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
    loggedIn = true;
    res.render('signup', { loggedIn, loggedInSeller, sessionMessage, sessionMeter });
  } else {
    loggedIn = false;
    res.render('signup', { loggedIn, sessionMessage, sessionMeter });
  }
});
app.get('/addnewproduct', async (req, res) => {
  let loggedIn;
  let sessionMessage = req.session.message;
  let sessionMeter = req.session.meter;
  if(sessionMeter) {
    req.session.meter++;
  }
  sessionMeter = req.session.meter;
  if(req.session.sellerId) {
    const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
    loggedIn = true;
    res.render('addnewproduct', { loggedIn, loggedInSeller, sessionMessage, sessionMeter });
  } else {
    res.redirect('/');
  }
});
app.post('/signup', async (req, res) => {
  try {
    const { accountname, username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const newSeller = new Seller({
      accountName: accountname,
      username: username,
      hashedPassword: hash
    });
    await newSeller.save();
    req.session.sellerId = newSeller._id;
    loggedIn = true;
    console.log(`New Account Created: '${newSeller.accountName}'`);
    console.log(`${newSeller.accountName} signs in`);
    return res.redirect('/');
  } catch(err) {
    console.log("Catch error from signup post route!", err);
    return res.redirect('/');
  }
}); 
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const seller = await Seller.findOne({ username: username});
    const validPassword = await bcrypt.compare(password, seller.hashedPassword);
    if(validPassword) {
      req.session.sellerId = seller._id;
    }
    console.log(`${seller.username} logs in`);
    return res.redirect('back');
  } catch(err) {
    console.log("Error in /login post route!", err);
    return res.redirect('back');
  }
});
app.post('/logout', async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.session.sellerId });
    req.session.sellerId = null;
    console.log(`${seller.username} logs out`);
    req.session.meter = 1;
    req.session.message = "You just signed out!";
    return res.redirect('/');
  } catch(err) {
    req.session.sellerId = null;
    console.log('Error in /logout route!', err);
    req.session.meter = 1;
    req.session.message = "You just signed out!";
    return res.redirect('/');
  }
});
app.post('/addnewproduct', async (req, res) => {
  const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
  const { productname, unitprice, qty } = req.body;
  const newProduct = new Product({
    seller: loggedInSeller.accountName,
    name: productname,
    unitPrice: unitprice,
    qtyOnSale: qty
  });
  await newProduct.save();
  loggedInSeller.productsSelling.push(newProduct);
  await loggedInSeller.save();
  req.session.message = `You just added ${newProduct.qtyOnSale} units of ${newProduct.name} to  your stock!`;
  req.session.meter = 1;
  return res.redirect('/');
});
app.post('/buy', async (req, res) => {
  if(req.session.sellerId) {
    const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
    const { prodName, unitPrice, qty } = req.body;   
    const product = await Product.findOne({ name: prodName });
    //Make sure qty ordered is less than qty in stock AND buyer's account balance > order
    if((product.qtyOnSale >= qty) && (loggedInSeller.accountBalance >= unitPrice*qty)) {
      const newTransaction = new Transaction({
        buyer: loggedInSeller.accountName, 
        seller:  product.seller, 
        productName: product.name, 
        pricePerUnit: unitPrice, 
        qtyBought: qty, 
        timeOfTransaction: Date.now()
      });
      await newTransaction.save();
      //Adjust qtyOnSale value in both product mongoDB doc and associated seller's mongoDB subdoc 
      product.qtyOnSale = product.qtyOnSale - qty;
      await product.save();
      const associatedSeller = await Seller.findOne({ accountName: product.seller });
      for(let productOnSale of associatedSeller.productsSelling) {
        if(productOnSale.name === prodName) {
          productOnSale.qtyOnSale = productOnSale.qtyOnSale - qty;
        } 
      }
      await associatedSeller.save();
      //Add transaction to both buyer and seller's transaction arrays..
      //Or just add one transaction entry if buyer and seller is the same person/organisation
      //Also make account balance changes
      if(loggedInSeller.accountName !== product.seller) {
        loggedInSeller.transactions.push(newTransaction);
        loggedInSeller.accountBalance = loggedInSeller.accountBalance - (qty*unitPrice);
        await loggedInSeller.save();
        const seller = await Seller.findOne({ accountName: product.seller });
        seller.transactions.push(newTransaction);
        seller.accountBalance = seller.accountBalance + (qty*unitPrice);
        await seller.save();
        console.log(`${newTransaction.buyer} buys ${newTransaction.qtyBought} unit${newTransaction.qtyBought > 1 ? "s" : ""} of ${newTransaction.productName} from ${newTransaction.seller}`);
        req.session.message = `You just bought ${newTransaction.qtyBought} unit${newTransaction.qtyBought > 1 ? "s" : ""} of ${newTransaction.productName} from ${newTransaction.seller}!`;
        req.session.meter = 1;
      } else {
        loggedInSeller.transactions.push(newTransaction);
        await loggedInSeller.save();
        console.log(`${newTransaction.buyer} buys/takes ${newTransaction.qtyBought} unit${newTransaction.qtyBought > 1 ? "s" : ""} of ${newTransaction.productName} from it's own stock`);
        req.session.message = `You just bought ${newTransaction.qtyBought} unit${newTransaction.qtyBought > 1 ? "s" : ""} of ${newTransaction.productName} from your own stock!`;
        req.session.meter = 1;
      }        
    } else {
      console.log(`Transaction unable to go through!`);
      req.session.message = `Unable to make that transaction!`;
      req.session.meter = 1;
    }
    return res.redirect('back');
  } else {
    req.session.message = `Must be logged in to make transactions! Login or signup above!`;
    req.session.meter = 1;
    return res.redirect('back');
  }
});
app.post('/deleteproduct', async (req, res) => {
  const loggedInSeller = await Seller.findOne({ _id: req.session.sellerId });
  const { prodName } = req.body;
  //Delete from Product model 
  await Product.deleteOne({ name: prodName });
  //Delete product from loggedInSeller's 'productsSelling' subdoc array
  for(let prod of loggedInSeller.productsSelling) {
    if(prod.name === prodName) {
      prod.remove();
    }
  }
  await loggedInSeller.save();
  req.session.message = `You just removed all of ${prodName} from your stock!`;
  req.session.meter = 1;
  return res.redirect('back');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
