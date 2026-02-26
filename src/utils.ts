export function getImageUrl(flight: any) {
    return `https://img.pequla.com/destination/${flight.destination.split(' ')[0].toLowerCase()}.jpg`
}

export function formatDate(flight: any) {
    return new Date(flight.scheduledAt).toLocaleString('sr-RS', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}