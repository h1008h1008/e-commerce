document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const label = document.querySelector('label[data-productindex]');
        const productIndex = label.getAttribute('data-productindex');
        

        
        if(productIndex == -1){
            const productData = {
                productName: document.getElementById('productName').value,
                productDescription: document.getElementById('productDescription').value,
                productPrice: document.getElementById('productPrice').value,
                productDescriptionshort: document.getElementById('productDescriptionshort').value,
                imageUrl: document.getElementById('productimageUrl').value,
            };
            fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('sucess');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        else{
            const productData = {
                productIndex : productIndex,
                name: document.getElementById('productName').value,
                description: document.getElementById('productDescription').value,
                price: document.getElementById('productPrice').value,
                specification: document.getElementById('productDescriptionshort').value,
                image_url: document.getElementById('productimageUrl').value,
            };
            fetch('/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    productData: productData
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('sucess');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        
    });
});
