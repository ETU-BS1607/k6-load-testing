import http from 'k6/http';
import { check, sleep } from 'k6';

//`export const options = {
    //vus: 1,
    //duration: '10s',
//};`

export default function () {
    // Define credentials for authentication
    let credentials = {
        username: "admin",
        password: "password123"
    };
    
    // Perform the authentication request
    let authRes = http.post('https://restful-booker.herokuapp.com/auth', JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' },
    });

    // Check the response
    check(authRes, {
        'auth status is 200': (r) => r.status === 200,
        'received token': (r) => {
            let responseJson = JSON.parse(r.body);
            let token = responseJson.token;
            // Print the token to the console
            console.log(`Received Token: ${token}`);
            return token !== '';
        },
    });

    // Pause between iterations
    sleep(1);
}
