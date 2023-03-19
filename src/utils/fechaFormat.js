export const fechaFormat = (fecha) =>{
    const date = new Date(fecha);

    const options = {
        timeZone: "America/Argentina/Buenos_Aires",
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric"
    };

    const formattedDate = new Intl.DateTimeFormat("es-AR", options).format(date);
    return (
        formattedDate
    )
}