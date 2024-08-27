import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'https://restful-booker.herokuapp.com/ping';

export default function () {
    const  healthcheck = http.get(BASE_URL);

    check(healthcheck, {
        ' bookings healthcheck  successfully': (r) => r.status === 201,
    });

}

