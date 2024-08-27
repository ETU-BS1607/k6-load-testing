//Booking - DeleteBooking
import http from 'k6/http';
import { check } from 'k6';
export default function () {
        
            const getAllBookingsRes = http.get('https://restful-booker.herokuapp.com/booking');

        
            const isRetrieved = check(getAllBookingsRes, {
                'Retrieved all booking IDs successfully': (r) => r.status === 200,
            });

            
            if (isRetrieved) {
                console.log('Booking IDs:', getAllBookingsRes.body);
            } 
            
            
            else {
                console.error('Failed to retrieve booking IDs.');
                return;  
            }
        

       const bookingIdToDelete1 = 4;  // Booking ID for deletion
       const deleteResCookie = http.del(`https://restful-booker.herokuapp.com/booking/${bookingIdToDelete1}`, null, 
        {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'token=d7c3f6f0cf2e26f' // Replace with your actual token
        }
    });

    
    const isDeletedWithCookie = check(deleteResCookie, {
        'Booking deleted successfully using Cookie': (r) => r.status === 201 || r.status === 200 || r.status === 204,
    });


        if (isDeletedWithCookie) 
        {
            console.log(`Booking ID ${bookingIdToDelete1} deleted successfully using Cookie.`);
        } 
        
        
        else 
        {
            console.error(`Failed to delete Booking ID ${bookingIdToDelete1} using Cookie. Status: ${deleteResCookie.status}`);
        }
    }

