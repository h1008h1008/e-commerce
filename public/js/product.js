document.addEventListener("DOMContentLoaded", function () {
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
        }
      }
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
      function renderProducts() {
        if (containers) {
          containers.innerHTML = "";
          productDatalist.forEach((productData) => {
            const shoppingHTML = templates({ productDatalist: [productData] });
            containers.innerHTML += shoppingHTML;
          });
        } else {
          console.error("Container element not found");
        }
      }
      renderProducts();
      var buttons = document.querySelectorAll(".Button");
      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          var num = button.getAttribute("value");
          if (num >= 0 && num < productDatalist.length) {
            productDatalist[num].shoppingtag = "1";
            renderProducts();
            localStorage.setItem(
              "productDatalist",
              JSON.stringify(productDatalist)
            );
            updateProducts(productDatalist);
            console.log(`Product ${num + 1} shoppingtag updated to 1`);
          } else {
            console.error("Invalid product index");
          }
        });
      });
    })
    .catch((error) => {
      console.error("There was an error fetching the product data:", error);
    });
});
