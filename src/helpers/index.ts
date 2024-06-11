export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function formatDate(dateStr: string) : string {
    const dateObject = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-Es', options).format(dateObject)
}