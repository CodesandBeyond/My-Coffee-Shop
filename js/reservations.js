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
                window.location.href = 'confirmation.html';
            })
            .catch(function(error) {
                console.error('Failed to send email:', error);
                alert('There was an error processing your reservation. Please try again.');
            });
        });
    }
});
