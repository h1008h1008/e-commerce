require('dotenv').config();
const ecpay_payment = require('ecpay_aio_nodejs');
const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;
const options = {
    OperationMode: 'Test',
    MercProfile: {
        MerchantID: MERCHANTID,
        HashKey: HASHKEY,
        HashIV: HASHIV,
    },
    IgnorePayment: [
        //    "Credit",
        //    "WebATM",
        //    "ATM",
        //    "CVS",
        //    "BARCODE",
        //    "AndroidPay"
    ],
    IsProjectContractor: false,
};
let TradeNo;
const { ProductMain, Cart, CartProduct } = require('../models/modelsforapp');
const { verify } = require("jsonwebtoken");
const { Op } = require('sequelize')
async function getproduct() {
    let productDatalist;
    await ProductMain.findAll().then(products => {
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
    }).catch(error => {
        console.error('Error fetching products:', error);
    });
    return productDatalist;
}

async function checktoken(token, productDatalist) {
    if (token) {
        try {
            const decoded = await new Promise((resolve, reject) => {
                verify(token, 'jwtsecretplschange', (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            });

            const memberId = decoded.id;
            if (memberId) {
                const Cart1 = await Cart.findOne({ where: { member_id: memberId } });
                const existtable = await CartProduct.findOne({ where: { cart_id: Cart1.id } });
                if (existtable) {
                    const productCountMap = existtable["product_id_and_count"];
                    productDatalist.forEach((product) => {
                        const productId = product.productindex;
                        if (productCountMap && productCountMap.hasOwnProperty(productId)) {
                            product.shoppingtag = '1';
                            product.quantity = productCountMap[productId];
                        }
                    });
                    return productDatalist;
                } else {
                    await CartProduct.create({
                        cart_id: Cart1.id,
                        product_id_and_count: null,
                    });
                }
            }
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    return productDatalist;
}

const pay_controller = {
    renderpaymentPageHandler: async (req, res) => {
        const token = req.cookies["access-token"];
        let productDatalist = await getproduct();
        productDatalistnew = await checktoken(token, productDatalist);
        cartProductList = productDatalistnew.filter(product => product.shoppingtag === '1')
        let totalPrice = 0;
        let productstr = "";
        for (let i = 0; i < cartProductList.length; i++) {
            let product = cartProductList[i];
            let price = parseFloat(product.productPrice.replace('$', ''));
            let quantity = product.quantity;
            productstr += product.productName + " ";
            totalPrice += price * quantity;
        }
        let totalPriceStr = totalPrice.toString();
        const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'UTC',
        });
        TradeNo = 'test' + new Date().getTime();
        let base_param = {
            MerchantTradeNo: TradeNo,
            MerchantTradeDate,
            TotalAmount: totalPriceStr,
            TradeDesc: '測試交易描述',
            ItemName: productstr,
            ReturnURL: `${HOST}/return`,
            ClientBackURL: `${HOST}/clientReturn`,
        };
        const create = new ecpay_payment(options);

        const html = create.payment_client.aio_check_out_all(base_param);

        res.render('try', {
            title: 'Express',
            html: html,
        });
    },
    ReturnHandler: async (req, res) => {
        console.log('req.body:', req.body);

        const { CheckMacValue } = req.body;
        const data = { ...req.body };
        delete data.CheckMacValue;

        const create = new ecpay_payment(options);
        const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

        console.log(
            '確認交易正確性：',
            CheckMacValue === checkValue,
            CheckMacValue,
            checkValue,
        );


        res.send('1|OK');
    },
    renderReturnPageHandler: async (req, res) => {
        console.log('clientReturn:', req.body, req.query);
        res.render("index", { pageTitle: "Checkout Page" });
    },
}

module.exports = pay_controller