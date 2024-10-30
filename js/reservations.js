document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('kBoaEvGCIeVQAbKBj');  // Initialize with your user ID

    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted!');

            // Collect form data
            const formData = new FormData(reservationForm);
            const reservationDetails = {};
            
            for (let [key, value] of formData.entries()) {
                reservationDetails[key] = value;
            }

            // Send email to the restaurant
            emailjs.send("service_3ilw8me", "template_125hcp5", reservationDetails)
            .then(function(response) {
                console.log('Restaurant email sent!', response.status, response.text);
                
                // Send confirmation email to the customer
                return emailjs.send("service_8o8m27j", "template_125hcp5", reservationDetails);
            })
            .then(function(response) {
                console.log('Customer email sent!', response.status, response.text);
                
                // Store reservation details and redirect
                localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));
            
                // Get the current path
                const currentPath = window.location.pathname;
            
                // Check if we're on GitHub Pages
                if (currentPath.includes('/Website Designs/Business/Coffee Shop/htdocs/')) {
                    // We're on GitHub Pages, use the full path
                    window.location.href = '/Website Designs/Business/Coffee Shop/htdocs/confirmation.html';
                } else {
                    // We're on local machine or another setup, use relative path
                    window.location.href = 'confirmation.html';
                }
            })

            .catch(function(error) {
                console.error('Failed to send email:', error);
                alert('There was an error processing your reservation. Please try again.');
            });
        });
    }
});
