// Configuración de Ubidots
const UBIDOTS_TOKEN = "BBUS-m6UJpoQb3BRVYHScXzYu1y1NFOKJWS"; // Asegúrate de que sea tu Default Token
const UBIDOTS_VARIABLE_ID = "67352e455005790708727aa"; // Asegúrate de que sea el Variable ID correcto
const UBIDOTS_URL = `https://industrial.api.ubidots.com/api/v1.6/variables/${UBIDOTS_VARIABLE_ID}/values`;

// Configuración inicial de las gráficas
const ctx = document.querySelector('.activity-chart');
const ctx2 = document.querySelector('.prog-chart');

// Valores iniciales de temperatura (base para el generador aleatorio)
let lastTemperatures = [36.8, 36.9, 37.0, 37.1, 36.9, 37.0, 36.8]; // Inicializamos con valores realistas

// Función para obtener datos de Ubidots
async function fetchUbidotsData() {
    try {
        const response = await fetch(UBIDOTS_URL, {
            headers: {
                "X-Auth-Token": UBIDOTS_TOKEN, // Incluye el Default Token en las cabeceras
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.results.map(item => item.value).slice(0, 7); // Retorna los primeros 7 valores
        } else {
            console.error("Error al obtener datos de Ubidots:", response.status, response.statusText);
            return generateRealisticRandomData(); // Genera datos aleatorios si hay un error
        }
    } catch (error) {
        console.error("Error en la solicitud a Ubidots:", error);
        return generateRealisticRandomData(); // Genera datos aleatorios si hay un error
    }
}

// Función para generar datos aleatorios realistas (con ligera variación)
function generateRealisticRandomData() {
    lastTemperatures = lastTemperatures.map(temp => {
        // Variación aleatoria entre -0.1 y 0.1
        const variation = (Math.random() * 0.2 - 0.1).toFixed(2);
        const newTemp = parseFloat(temp) + parseFloat(variation);
        // Limita los valores entre 36.5 y 37.5
        return Math.min(Math.max(newTemp, 36.5), 37.5).toFixed(2);
    });
    return lastTemperatures;
}

// Gráfica de barras
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
            label: 'Time',
            data: [8, 6, 7, 6, 10, 8, 4],
            backgroundColor: '#1e293b',
            borderWidth: 3,
            borderRadius: 6,
            hoverBackgroundColor: '#60a5fa'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                border: {
                    display: true
                },
                grid: {
                    display: true,
                    color: '#1e293b'
                }
            },
            y: {
                ticks: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        }
    }
});

// Gráfica de línea
const lineChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'], // Etiquetas para los últimos 7 puntos
        datasets: [{
            label: 'Temperatura (°C)',
            data: [], // Se llenará dinámicamente con datos de Ubidots o valores aleatorios
            borderColor: '#0891b2',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                ticks: {
                    display: true,
                    callback: function(value) {
                        return value + "°C"; // Añade la unidad °C en el eje Y
                    }
                },
                border: {
                    display: false,
                    dash: [5, 5]
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        }
    }
});

// Actualización dinámica de la gráfica
async function updateChartData() {
    const data = await fetchUbidotsData(); // Obtiene datos de Ubidots o aleatorios
    if (data.length) {
        lineChart.data.datasets[0].data = data; // Actualiza los datos
        lineChart.update(); // Redibuja la gráfica
    }
}

// Configuración para la actualización en tiempo real
const UPDATE_INTERVAL = 10000; // Intervalo en milisegundos (10 segundos)
setInterval(updateChartData, UPDATE_INTERVAL);

// Llama a la función para cargar los datos al cargar la página
document.addEventListener("DOMContentLoaded", updateChartData);

// Funciones adicionales (interacción del menú, eventos, notificaciones, etc.)

// Alternar menú desplegable
const dropdownIcon = document.getElementById('dropdown-icon');
const userDropdown = document.getElementById('user-dropdown');

dropdownIcon.addEventListener('click', () => {
    userDropdown.classList.toggle('show');
    if (userDropdown.classList.contains('show')) {
        dropdownIcon.classList.remove('bx-chevron-down');
        dropdownIcon.classList.add('bx-chevron-right');
    } else {
        dropdownIcon.classList.remove('bx-chevron-right');
        dropdownIcon.classList.add('bx-chevron-down');
    }
});

// Seleccionar elementos de eventos
const eventItems = document.querySelectorAll('.events .item');
eventItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('selected');
    });
});

// Botones de eliminar
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const item = button.closest('.item');
        item.classList.add('fade-out');
        setTimeout(() => {
            item.remove();
        }, 10); // Ajuste del tiempo para eliminar el elemento
    });
});

// Alternar búsqueda
const searchIcon = document.getElementById('search-icon');
const rightSection = document.querySelector('.right-section');
searchIcon.addEventListener('click', () => {
    rightSection.classList.toggle('active');
});

// Loader de la página
document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("loader");
    var loaderImg = document.getElementById("loader-img");
    var content = document.getElementById("content");

    loaderImg.style.display = "flex";
    setTimeout(function() {
        loader.classList.add("fade-out");
        setTimeout(function() {
            loader.style.display = "none";
            content.style.display = "block";
        }, 500);
    }, 2000);
});
