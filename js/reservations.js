document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(reservationForm);
            const reservationDetails = {};
            
            for (let [key, value] of formData.entries()) {
                reservationDetails[key] = value;
            }
            
            localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));
            
            window.location.href = 'confirmation.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('kBoaEvGCIeVQAbKBj');  // Initialize with your user ID

    document.getElementById('reservation-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        console.log('Form submitted!');

        // Collect form data
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let time = document.getElementById('time').value;

        // Send email to the restaurant
        emailjs.send("service_3ilw8me", "template_125hcp5", {
        name: name,
        email: email,
        time: time
        }).then(function(response) {
        console.log('Restaurant email sent!', response.status, response.text);
        }, function(error) {
        console.error('Failed to send restaurant email:', error);
        });

        // Send confirmation email to the customer
        emailjs.send("service_8o8m27j", "template_125hcp5", {
        name: name,
        email: email,
        time: time
        }).then(function(response) {
        console.log('Customer email sent!', response.status, response.text);
        }, function(error) {
        console.error('Failed to send customer email:', error);
        });
    });
    });