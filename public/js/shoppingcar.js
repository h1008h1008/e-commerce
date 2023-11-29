document.addEventListener("DOMContentLoaded", function () {
  var productDatalist;
  function handleQuantity(itemElement) {
    const quantityElement = itemElement.querySelector(".Number");
    const iconpElements = itemElement.querySelectorAll(".Iconp");
    const iconmElements = itemElement.querySelectorAll(".Iconm");

    console.log(iconpElements);
    iconpElements.forEach((iconpElement, index) => {
      iconpElement.addEventListener("click", () => {
        let num = iconpElement.getAttribute("value");
        num = productDatalist.findIndex(
          (product) => product.productindex === num
        );
        productDatalist[num].quantity += 1;
        quantity = productDatalist[num].quantity;
        quantityElement.textContent = quantity;
        updateTotalPrice();
        updateProducts(productDatalist);
      });
    });

    iconmElements.forEach((iconmElement, index) => {
      iconmElement.addEventListener("click", () => {
        let num = iconmElement.getAttribute("value");
        num = productDatalist.findIndex(
          (product) => product.productindex === num
        );
        if (productDatalist[num].quantity > 0) {
          productDatalist[num].quantity -= 1;
          quantity = productDatalist[num].quantity;
          quantityElement.textContent = quantity;
          if (num >= 0 && num < productDatalist.length && quantity == 0) {
            productDatalist[num].shoppingtag = "0";
            const templates = Handlebars.compile(sources);

            const containers = document.querySelector(".shopbag");
            if (containers) {
              containers.innerHTML = "";
              productDatalist.forEach((productData) => {
                const shoppingHTML = templates({
                  productDatalist: [productData],
                });
                containers.innerHTML += shoppingHTML;
              });
            } else {
              console.error("Container element not found");
            }
            updateTotalPrice();
            itemElement.remove();
          }
          updateProducts(productDatalist);
          localStorage.setItem(
            "productDatalist",
            JSON.stringify(productDatalist)
          );
          return;
        }
      });
    });
  }
  function updateTotalPrice() {
    const totalpriceElement = document.querySelector(".totalprice");
    let totalPrice = 0;
    productDatalist.forEach((productData) => {
      const price = parseFloat(
        productData.productPrice.replace("$", "").trim()
      );
      const quantity = productData.quantity;
      const subtotal = price * quantity;
      totalPrice += subtotal;
    });
    const formattedTotalPrice = "$ " + totalPrice.toFixed(2);
    totalpriceElement.textContent = formattedTotalPrice;
  }
  async function renderProducts() {
    sources = `{{#each productDatalist}}
                {{#eq shoppingtag "1"}}
                <li class="BagItem p-2 bg-white rounded-xl justify-start items-center gap-4 flex">
                    <div class="ProductImage w-16 h-16 justify-center items-center flex">
                    <img class="Image w-16 h-16" src="{{ imageUrlsquare }}" />
                    </div>
                </li>
                {{/eq}}
            {{/each}}`;

    const templates = Handlebars.compile(sources);
    const containers = document.querySelector(".shopbag");
    if (containers) {
      containers.innerHTML = "";
      productDatalist.forEach((productData) => {
        const shoppingHTML = templates({ productDatalist: [productData] });
        containers.innerHTML += shoppingHTML;
      });
    } else {
      console.error("Container element not found");
    }
    sources1 = `{{#each productDatalist}}
        <div class="ItemInBag w-full self-stretch px-6 py-8 bg-white rounded-3xl justify-start items-start gap-4 inline-flex mb-4">
          <div class="ProductImage w-52 h-64 flex-col justify-center items-center inline-flex">
            <img class="Image w-52 h-80" src="https://via.placeholder.com/204x280" />
          </div>
          <div class="ContentArea grow shrink basis-0 p-2 flex-col justify-start items-start gap-2 inline-flex">
            <div class="Header self-stretch h-16 flex-col justify-center items-start gap-2 flex">
              <div class="Title px-2 justify-start items-start gap-2 inline-flex">
                <div class="ItemName text-stone-900 text-3xl font-normal font-['Cabin']">{{ productName }}</div>
              </div>
              <div class="Subtitle px-2 justify-start items-start gap-2 inline-flex">
                <div class="ItemType text-zinc-600 text-xl font-normal font-['Cabin']">{{ productDescription }}</div>
              </div>
            </div>
            <div class="SmallDescription self-stretch p-2 justify-start items-center gap-2.5 inline-flex">
              <div class="LoremIpsumDolorSitAmetConsecteturAdipiscingElitUtAliquam text-stone-900 text-xl font-normal font-['Cabin']">{{productDescriptionshort}}</div>
            </div>
            <div class="Rating self-stretch p-2 justify-start items-start gap-2 inline-flex">
              <div class="Stars pr-4 justify-center items-center gap-2 flex">
                <div class="Star01 w-6 h-6 relative"></div>
                <div class="Star02 w-6 h-6 relative"></div>
                <div class="Star03 w-6 h-6 relative"></div>
                <div class="Star04 w-6 h-6 relative"></div>
                <div class="Star05 w-6 h-6 relative"></div>
              </div>
              <div class="55 text-emerald-700 text-xl font-normal font-['Cabin']">{{productstar}}</div>
            </div>
            <div class="PriceRating self-stretch p-2 justify-between items-center inline-flex">
              <div class="Price p-2 justify-start items-start gap-2.5 flex">
                <div class="999 text-stone-900 text-xl font-normal font-['Cabin']">{{ productPrice }}</div>
              </div>
              <div class="Quantity p-2 justify-start items-center gap-2.5 flex">
                <div class="Price h-8 justify-start items-center gap-4 flex">
                  <div class="Button h-6 w-6 p-2 rounded-lg justify-center items-center gap-2 flex ">
                    <div class="Icon w-4 h-4 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="Iconm" viewBox="0 0 16 16" value={{productindex}}>
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="Number text-stone-900 text-xl font-normal font-['Cabin']">{{quantity}}</div>
                  <div class="Button  h-6 w-6 p-2 rounded-lg justify-center items-center gap-2 flex">
                    <div class="Icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="Iconp" viewBox="0 0 16 16" value={{productindex}}>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {{/each}}`;

    const templates1 = Handlebars.compile(sources1);
    const containers1 = document.querySelector(".mainproduct");
    if (containers1 && !auth) {
      containers1.innerHTML = "";
      productDatalist.forEach((productData) => {
        const shoppingHTML = templates1({ productDatalist: [productData] });
        containers1.innerHTML += shoppingHTML;
      });
    } else {
      console.error("Container element not found");
    }
    productDatalist = productDatalist.filter(
      (product) => product.shoppingtag === "1"
    );
    const itemElements = document.querySelectorAll(".ItemInBag");
    itemElements.forEach((itemElement) => {
      handleQuantity(itemElement);
      updateTotalPrice();
    });
  }
  async function updateProducts(productDataList) {
    try {
      const response = await fetch("/api/update-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDataList),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full Response:", data);
      console.log(data.message);
    } catch (error) {
      console.error(
        "There was an error updating the product data on the server:",
        error
      );
    }
  }
  fetch("/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      productDatalist = data.products;
      auth = data.auth;
      if (auth == 0) {
        const storedResultObject = localStorage.getItem("productDatalist");
        if (storedResultObject) {
          productDatalist = JSON.parse(storedResultObject);
          renderProducts();
        }
      }

      renderProducts();
    })
    .catch((error) => {
      console.error("There was an error fetching the product data:", error);
    });
});
