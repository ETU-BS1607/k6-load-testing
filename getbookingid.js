import http from 'k6/http';
import { check, sleep } from 'k6';

const bookingUrl = 'https://restful-booker.herokuapp.com/booking/750';

export default function () {
    const params = {
        headers: {
            'Accept': 'application/json',
            // Add other headers if required, such as Authorization
        },
    };

    const bookingResponse = http.get(bookingUrl, params);

    console.log(`Get Booking by ID Response: ${bookingResponse.body}`);

    check(bookingResponse, {
        'booking status is 200': (r) => r.status === 200,
        'booking retrieved successfully': (r) => {
            try {
                const responseJson = JSON.parse(r.body);
                return responseJson.firstname !== undefined && responseJson.lastname !== undefined;
            } catch (e) {
                console.error('Error parsing response JSON:', e);
                return false;
            }
        },
    });

    sleep(1);
}
