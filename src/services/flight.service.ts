import type { FlightModel } from "@/models/flight.model";
import axios from "axios";

const client = axios.create({
    baseURL: 'https://flight.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'ITWS_2026'
    }
})

export class FlighService {
    static async getFlights() {
        return client.get<FlightModel[]>('/flight/list?type=departure')
    }

    static async getFlightById(id: number) {
        return client.get<FlightModel>(`/flight/${id}`)
    }
}