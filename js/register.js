// Constructor
function docente(empleado, nombre, apellido_paterno, apellido_materno, correo){
    this.empleado = empleado;
    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.correo = correo;
}

// Obtener los inputs desde HTML
const inputempleado = document.getElementById("txtEmpleado");
const inputnombre = document.getElementById("txtNombre");
const inputapellido_paterno = document.getElementById("txtApellido_paterno");
const inputapellido_materno = document.getElementById("txtApellido_materno");
const inputcorreo = document.getElementById("txtCorreo");

// Recuperar docentes guardados o inicializar arreglo vacío
let docentes = JSON.parse(localStorage.getItem("docentes")) || [];

function register() {
    // Validar que el usuario haya ingresado datos a cada input
    if(inputempleado.value == ""){
        alert("Ingresa el empleado");
        console.log("Ingresa el empleado");
        return;  // Detener ejecución si no se ingresa el empleado
    }
    if(inputnombre.value == ""){
        alert("Ingresa el nombre");
        return;  // Detener ejecución si no se ingresa el nombre
    }

    // Crear objeto docente
    let nuevodocente = new docente(
        inputempleado.value, 
        inputnombre.value, 
        inputapellido_paterno.value, 
        inputapellido_materno.value, 
        inputcorreo.value
    );

    // Agregar el nuevo docente al arreglo "docentes" para almacenarlo en la memoria local
    docentes.push(nuevodocente);

    // Guardar en localStorage
    localStorage.setItem("docentes", JSON.stringify(docentes));

    // Mostrar en pantalla
    displaydocentes();
}

// Mostrar docentes
function displaydocentes() {
    const tbody = document.querySelector("table tbody"); // Selecciona el <tbody>
    tbody.innerHTML = ""; // Limpia la tabla antes de renderizar

    let rows = ""; // Almacena las filas antes de insertarlas

    docentes.forEach((recorrer, index) => {
        rows += `
            <tr>
                <td>${recorrer.nombre}</td>
                <td>${recorrer.apellido_paterno}</td>
                <td>${recorrer.apellido_materno}</td>
                <td>${recorrer.correo}</td>
                <td class="text-center">
                    <button onclick="deletedocentes(${index})" class="btn btn-danger btn-sm">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.insertAdjacentHTML("beforeend", rows); // Inserta el HTML una sola vez
}

function deletedocentes(index) {
    docentes.splice(index, 1); // Elimina el docente en la posición indicada
    localStorage.setItem("docentes", JSON.stringify(docentes)); // Actualiza el localStorage
    displaydocentes(); // Vuelve a mostrar la lista
}

// Función para borrar todos los docentes
function clearStorage() {
    localStorage.removeItem("docentes");
    docentes = [];
    displaydocentes();
}

// Resaltar el enlace activo en la navegación
document.addEventListener("DOMContentLoaded", () => {
    let currentPath = window.location.pathname.split("/").pop();
    let links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
});

// Mostrar docentes al cargar la página
document.addEventListener("DOMContentLoaded", displaydocentes);


