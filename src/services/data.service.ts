import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:7000/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'ITWS_2026'
    }
})

export class DataService {
    static async getAirlines() {
        return await client.get('/airline')
    }

    static async deleteAirline(id: number) {
        return await client.request({
            url: `/airline/${id}`,
            method: 'delete'
        })
    }
}