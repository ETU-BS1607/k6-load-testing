import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the base URL for the API
const baseUrl = 'https://restful-booker.herokuapp.com/booking';

// Export K6 test options
export const options = {
    vus: 1,           // Number of Virtual Users
    duration: '10s',  // Test duration
};

export default function () {
    // Specify the booking ID you want to update
    const bookingId = 750; // Replace with the actual booking ID

    // Define the updated booking details
    const updatedBookingDetails = {
        firstname: "etu",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
    };

    // Define the token for authorization
    const authToken = '1b7871f25ee25da'; // Replace with the actual token

    // Send PUT request to update the booking
    const updateBookingRes = http.put(`${baseUrl}/${bookingId}`, JSON.stringify(updatedBookingDetails), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`  // If using Bearer Token
            // 'Cookie': `token=${authToken}`  // If using Cookie Token
        },
    });

    // Log the response body
    console.log(`Update Booking Response: ${updateBookingRes.body}`);

    // Validate the response
    check(updateBookingRes, {
        'update status is 200': (r) => r.status === 200,
        'firstname is updated to etu': (r) => {
            try {
                let responseJson = JSON.parse(r.body);
                return responseJson.firstname === 'etu';
            } catch (e) {
                console.error('Error parsing response JSON:', e);
                return false;
            }
        },
    });

    // Pause between iterations
    sleep(1);
}
