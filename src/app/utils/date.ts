export function obtenerFechaActual() {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const año = fechaActual.getFullYear();

    return `${año}-${mes}-${dia}`;
}