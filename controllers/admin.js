const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  const loggedIn = req.get('Cookie');

  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: loggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const userId = req.user._id;   // to get the user id info. This line is same as one line below it
  const userId = req.user;    // mongoose automatically only extract the user id info since the schema only states so

  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId: userId
  });

  product.save()
  .then(result => {
    console.log('postAddProduct_result..... ', result);
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  const loggedIn = req.get('Cookie');

  Product
  .findById(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
      isAuthenticated: loggedIn
    });
  })
  .catch(err => {console.log(err)});
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  //const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);

  Product.findById(prodId)
  .then(product => {
    console.log('postEditProduct_product..... ', product);
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save();
  })
  .then(result => {
    console.log('postEditProduct_result..... ', result);
    res.redirect('/admin/products');
  })
  .catch(err => {console.log(err)});
};

exports.getProducts = (req, res, next) => {
  const loggedIn = req.get('Cookie');

  Product
  .find()
  //.select('title price -_id')   // function available after find(), to select only certain documents from the collection. In example, show only 'title', 'price', & DONOT show '_id' (using '-' infront)
  //.populate('userId')   // populate the related 'User' document (set by using 'ref' in model schema) into 'userId' document/path
  //.populate('userId', 'username')   // populate the related 'User' document (set by using 'ref' in model schema) into 'userId' document/path. But, only show 'username' & '_id' ('_id' will always show unless excluded)
  /* .populate({
    path: 'userId',
    select: 'username -_id'   // populate 'User' document. But, only show 'username', exclude '_id'
  }) */
  .then(products => {
    console.log('getProducts..... ', products);

    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      isAuthenticated: loggedIn
    });
  })
  .catch(err => {console.log(err)});
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
  .then(result => {
    console.log('postDeleteProduct_result..... ', result);
    res.redirect('/admin/products');
  })
  .catch(err => {console.log(err)});
};