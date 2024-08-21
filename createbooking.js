import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the base URL for the API
const baseUrl = 'https://restful-booker.herokuapp.com/booking';

// Define your authorization token
const authToken = 'dbb17c11214c5e2 '  ;  // Replace with your actual token
export default function () {
    // Define booking details
    let bookingDetails = {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-08-16",
            checkout: "2024-08-17"
        },
        additionalneeds: "Breakfast"
    };

    // Send POST request to create a booking with authorization token
    let bookingRes = http.post(baseUrl, JSON.stringify(bookingDetails), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}` // Include the token here
        },
    });

    // Log the response body
    console.log('Create Booking Response:', bookingRes.body);

    // Validate the response
    check(bookingRes, {
        'booking status is 200': (r) => r.status === 200,
        'booking created successfully': (r) => {
            try {
                let responseJson = JSON.parse(r.body);
                return responseJson.bookingid !== undefined;
            } catch (e) {
                console.error('Error parsing response JSON:', e);
                return false;
            }
        },
    });

    
    sleep(1);
}
