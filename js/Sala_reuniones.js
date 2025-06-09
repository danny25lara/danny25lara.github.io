const form = document.getElementById("reservaForm");
const tabla = document.querySelector("#tablaReservas tbody");
const mensaje = document.getElementById("mensaje");
const reservas = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const sala = document.getElementById("sala").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

if (!esHorarioLaboral(hora)) {
    mostrarMensaje("Reserva fuera del horario laboral (08:00 - 18:00)", "red");
    return;
}

const duplicada = reservas.some(
    (r) => r.sala === sala && r.fecha === fecha && r.hora === hora
);
if (duplicada) {
    mostrarMensaje("La sala ya está reservada en ese horario.", "red");
    return;
}

    const reserva = { usuario, sala, fecha, hora };
    reservas.push(reserva);
    mostrarReservas();
    form.reset();
    alert("SU RESERVA SERA REGISTRADA.")
    mostrarMensaje("¡Reserva realizada con éxito!", "green");
});

function esHorarioLaboral(hora) {
    const [h] = hora.split(":").map(Number);
    return h >= 8 && h < 18;
}

function mostrarReservas() {
    tabla.innerHTML = "";
    reservas.forEach((r, i) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${r.usuario}</td>
            <td>${r.sala}</td>
            <td>${r.fecha}</td>
            <td>${r.hora}</td>
            <td>
                <button class="btn" style="background:#6c757d;" onclick="modificarReserva(${i})">Editar</button>
                <button class="btn" style="background:#dc3545;" onclick="eliminarReserva(${i})">Eliminar</button>
            </td>
            `;
            tabla.appendChild(fila);
    });
}

function modificarReserva(index) {
    const r = reservas[index];
        document.getElementById("usuario").value = r.usuario;
        document.getElementById("sala").value = r.sala;
        document.getElementById("fecha").value = r.fecha;
        document.getElementById("hora").value = r.hora;
        reservas.splice(index, 1);
        mostrarReservas();
}

function eliminarReserva(index) {
    reservas.splice(index, 1);
    mostrarReservas();
    alert("Seguro que desea eliminar su reserva")
    mostrarMensaje("Reserva eliminada.", "orange");
}

function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
    mensaje.style.opacity = 1;
    setTimeout(() => {
        mensaje.style.opacity = 0;
}, 3000);
}
