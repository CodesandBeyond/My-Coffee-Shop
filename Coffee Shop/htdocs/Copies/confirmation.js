document.addEventListener('DOMContentLoaded', function() {
    const reservationDetails = JSON.parse(localStorage.getItem('reservationDetails'));

    // Debugging: Log the reservation details
    console.log('Retrieved Reservation Details:', reservationDetails);

    const confirmationDetails = document.getElementById('confirmation-details');

    if (confirmationDetails) {
        if (reservationDetails) {
            const nameElement = document.getElementById('conf-name');
            const emailElement = document.getElementById('conf-email');
            const dateElement = document.getElementById('conf-date');
            const timeElement = document.getElementById('conf-time');
            const guestsElement = document.getElementById('conf-guests');

            if (nameElement) nameElement.textContent = reservationDetails.name || 'N/A';
            if (emailElement) emailElement.textContent = reservationDetails.email || 'N/A';
            if (dateElement) dateElement.textContent = reservationDetails.date || 'N/A';
            if (timeElement) timeElement.textContent = reservationDetails.time || 'N/A';
            if (guestsElement) guestsElement.textContent = reservationDetails.guests || 'N/A';
        } else {
            confirmationDetails.innerHTML = '<p>No reservation details found.</p>';
        }
    } else {
        console.error('Confirmation details element not found in the DOM');
    }
});
