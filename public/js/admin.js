document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.item-action .bg-red-500').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productIndex = this.getAttribute('value');
            fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productIndex: productIndex }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
        });
    });

});
