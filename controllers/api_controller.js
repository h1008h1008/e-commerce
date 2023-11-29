const { ProductMain, CartProduct, Cart } = require("../models/modelsforapp");
const { sign, verify } = require("jsonwebtoken");

const api_controller = {
  returnProductHandler: async (req, res) => {
    let productDatalist;
    await ProductMain.findAll()
      .then((products) => {
        productDatalist = products.map((product, index) => {
          return {
            productLink: `/product/${index}`,
            imageUrl: product.image_url,
            imageUrlsquare: "https://via.placeholder.com/64x64",
            productName: product.name,
            productDescription: product.description,
            productDescriptionshort: product.specification,
            productDescriptionlong: product.specification,
            productstar: "4.0/5",
            productPrice: `$ ${product.price.toFixed(2)}`,
            shoppingtag: "0",
            productindex: `${index}`,
            quantity: 1,
          };
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    const token = req.cookies["access-token"];
    if (token) {
      verify(token, "jwtsecretplschange", async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        let memberId = decoded.id;
        if (memberId) {
          const Cart1 = await Cart.findOne({ where: { member_id: memberId } });
          const existtable = await CartProduct.findOne({
            where: { cart_id: Cart1.id },
          });
          if (existtable) {
            const productCountMap = existtable["product_id_and_count"];
            productDatalist.forEach((product) => {
              const productId = product.productindex;
              if (
                productCountMap &&
                productCountMap.hasOwnProperty(productId)
              ) {
                product.shoppingtag = "1";
                product.quantity = productCountMap[productId];
              }
            });
          } else {
            await CartProduct.create({
              cart_id: Cart1.id,
              product_id_and_count: null,
            });
          }

          const responseData = {
            products: productDatalist,
            auth: 1,
          };
          res.json(responseData);
        }
      });
    } else {
      const responseData = {
        products: productDatalist,
        auth: 0,
      };
      res.json(responseData);
    }
  },
  updateProductHandler: (req, res) => {
    const updatedProductDataList = req.body;
    const filteredProducts = updatedProductDataList.filter(
      (product) => product.shoppingtag === "1"
    );
    const resultObject = filteredProducts.reduce((accumulator, product) => {
      accumulator[product.productindex] = product.quantity;
      return accumulator;
    }, {});

    const token = req.cookies["access-token"];
    if (token) {
      verify(token, "jwtsecretplschange", async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        let memberId = decoded.id;
        if (memberId) {
          const Cart1 = await Cart.findOne({ where: { member_id: memberId } });
          const existtable = await CartProduct.findOne({
            where: { cart_id: Cart1.id },
          });
          if (existtable) {
            existtable.product_id_and_count = resultObject;
            await existtable.save();
          } else {
            await CartProduct.create({
              cart_id: Cart1.id,
              product_id_and_count: resultObject,
            });
          }
        }
      });
    }
    res.json({ message: "Products updated successfully!" });
  },
};

module.exports = api_controller;
