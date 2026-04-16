import type { AirlineModel } from "./airline.model"
import type { FlightModel } from "./flight.model"

export interface TicketModel {
    id: number
    airline: AirlineModel
    flight: FlightModel
    seatingType: string
    count: number
    createdAt: string
    paidAt: string
}