//Booking - UpdateBooking
import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// Variables for booking ID and authorization token
const bookingId = '9'; // Replace with the actual booking ID you want to use
let token = 'a9b8318845e7204 '; // Replace with the actual authorization token

// Define the base URL
const baseUrl = `https://restful-booker.herokuapp.com/booking/${bookingId}`;

// Define the request body for the PUT operation
const payload = JSON.stringify({
  "firstname": "Jim",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2018-01-01",
    "checkout": "2019-01-01"
  },
  "additionalneeds": "Breakfast"
});

// Define the request headers
const params = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': `token=${token}`,
  },
};

// Define the K6 test scenario
export default function () {
 
  const getResponse = http.get(baseUrl, params);

  
  const isGetSuccessful = check(getResponse, {
    'GET request was successful': (r) => r.status === 200,
  });

  if (isGetSuccessful) {
    console.log(`GET response body: ${getResponse.body}`);

   
    const putResponse = http.put(baseUrl, payload, params);

    
    const isPutSuccessful = check(putResponse, {
      'PUT request was successful': (r) => r.status === 200,
    });

    if (isPutSuccessful) {
      console.log(`PUT response body: ${putResponse.body}`);
    } else {
      console.error(`PUT request failed. Status: ${putResponse.status}`);
    }
  } else {
    console.error(`GET request failed. Status: ${getResponse.status}`);
  }
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}
 
