import type { AirlineModel } from "@/models/airline.model";
import type { FlightModel } from "@/models/flight.model";
import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:7000/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'ITWS_2026'
    },
    validateStatus: (status: number) => {
        return status === 200 || status === 204
    }
})

export class DataService {
    static async getFlights() {
        return client.get<FlightModel[]>('/flight')
    }

    static async getFlightById(id: number) {
        return client.get<FlightModel>(`/flight/${id}`)
    }

    static async getAirlines() {
        return await client.get('/airline')
    }

    static async getAirlineById(id: number) {
        return await client.get('/airline/' + id)
    }

    static async updateAirline(id: number, airline: AirlineModel) {
        return await client.request({
            url: `/airline/${id}`,
            method: 'PUT',
            data: airline
        })
    }

    static async createAirline(airline: any) {
        return await client.request({
            url: `/airline`,
            method: 'POST',
            data: airline
        })
    }

    static async deleteAirline(id: number) {
        return await client.request({
            url: `/airline/${id}`,
            method: 'delete'
        })
    }

    static async createTicket(ticket: any) {
        return await client.request({
            url: `/ticket`,
            method: 'POST',
            data: ticket
        })
    }

    static async getTickets() {
        return await client.get('/ticket')
    }
}