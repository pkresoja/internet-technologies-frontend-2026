import type { FlightModel } from "./models/flight.model"

export function getImageUrl(flight: any) {
    return `https://img.pequla.com/destination/${flight.destination.split(' ')[0].toLowerCase()}.jpg`
}

export function formatScheduledDate(flight: FlightModel) {
    const iso = flight.estimatedAt ?? flight.scheduledAt
    return new Date(iso).toLocaleString('sr-RS', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export function formatDate(iso: string | null) {
    if (iso == null) return 'N/A'
    return new Date(iso).toLocaleString('sr-RS', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}