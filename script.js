const ctx = document.querySelector('.activity-chart');
const ctx2 = document.querySelector('.prog-chart');

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

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Class GPA',
            data: [6, 10, 8, 12, 9, 7, 10],
            borderColor: '#0891b2',
            tension: 0.4
        },
        ]
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
                    display: false
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

// Selección del icono y menú
const dropdownIcon = document.getElementById('dropdown-icon');
const userDropdown = document.getElementById('user-dropdown');

// Añadir evento de clic al icono
dropdownIcon.addEventListener('click', () => {
    // Alterna la clase 'show' para activar la animación de altura
    userDropdown.classList.toggle('show');
    
    // Rotar la flecha
    if (userDropdown.classList.contains('show')) {
        dropdownIcon.classList.remove('bx-chevron-down');
        dropdownIcon.classList.add('bx-chevron-right');
    } else {
        dropdownIcon.classList.remove('bx-chevron-right');
        dropdownIcon.classList.add('bx-chevron-down');
    }
});


// Selecciona todos los elementos de eventos
const eventItems = document.querySelectorAll('.events .item');

// Añade un listener de clic a cada evento
eventItems.forEach(item => {
    item.addEventListener('click', () => {
        // Alterna la clase 'selected' en el elemento clickeado
        item.classList.toggle('selected');
    });
});


// Selecciona todos los botones de eliminar (íconos de "X")
// Selecciona todos los botones de eliminar (íconos de "X")
const deleteButtons = document.querySelectorAll('.delete-btn');

// Añade un evento de clic a cada botón de eliminar
deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Evita que el clic se propague al elemento padre
        event.stopPropagation();

        // Selecciona el elemento .item
        const item = button.closest('.item');

        // Añade la clase de desvanecimiento para activar la animación
        item.classList.add('fade-out');

        // Usa setTimeout para esperar 2 segundos antes de eliminar el elemento
        setTimeout(() => {
            item.remove();
        }, 100); // Espera 2 segundos antes de eliminar el elemento
    });
});