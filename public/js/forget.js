document.getElementById("resetbtn").addEventListener("click", function (e) {
  e.preventDefault();

  const emailaddress = document.getElementById("emailaddress").value;

  fetch("/authen/forget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailaddress }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("信箱更改密碼")
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
