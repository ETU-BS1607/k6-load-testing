
import http from 'k6/http';
import { check, sleep } from 'k6';



const baseUrl = 'https://restful-booker.herokuapp.com/booking';

export default function () {
    
    const allBookingsResponse = http.get(baseUrl);
   
   
    console.log(`All Bookings Response: ${allBookingsResponse.body}`);
   
    check(allBookingsResponse, {
        'fetched all booking IDs successfully': (r) => r.status === 200,
    });
 
    
    const firstname = 'John'; 
    const lastname = 'Doe'; 
    const nameFilterUrl = `${baseUrl}?firstname=${firstname}&lastname=${lastname}`;
    const nameFilterResponse = http.get(nameFilterUrl);
   
    
    console.log(`Filtered by Name Response: ${nameFilterResponse.body}`);
   
    check(nameFilterResponse, {
        'fetched bookings by name successfully': (r) => r.status === 200,
    });
 
    
    const checkin = '2024-08-16'; // Replace with desired checkin date
    const checkout = '2024-08-17'; // Replace with desired checkout date
    const dateFilterUrl = `${baseUrl}?checkin=${checkin}&checkout=${checkout}`;
   
    const dateFilterResponse = http.get(dateFilterUrl);
   
    // Log the response for filtered bookings by date
    console.log(`Filtered by Date Response: ${dateFilterResponse.body}`);
   
    check(dateFilterResponse, {
        'fetched bookings by date successfully': (r) => r.status === 200,
    });
 
    // Pause between iterations
    sleep(1);
}
 