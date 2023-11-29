let isExpanded = false;
let productDatalist = [];
Handlebars.registerHelper("eq", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".MenuIcon").addEventListener("click", function () {
    if (isExpanded) {
      document.querySelector(".Navbar").style.width = "4rem";
    } else {
      document.querySelector(".Navbar").style.width = "16rem";
    }
    isExpanded = !isExpanded;
  });
});
