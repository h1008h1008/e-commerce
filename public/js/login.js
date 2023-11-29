document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginbtn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const emailaddress = document.getElementById("emailaddress").value;
      const password = document.getElementById("pwd").value;
      const storedResultObject = localStorage.getItem("productDatalist");
      let productDatalist;
      if (storedResultObject) {
        productDatalist = JSON.parse(storedResultObject);
      }
      fetch("/authen/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailaddress: emailaddress,
          password: password,
          productDatalist: productDatalist,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          localStorage.setItem("productDatalist", null);
          return response.json();
        })
        .then((data) => {
          alert(data.message);
        })

        .catch((error) => {
          console.log(error);
        });
    });
});
