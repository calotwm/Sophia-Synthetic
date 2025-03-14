document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const conceptoInput = document.getElementById('concepto-input');
    const generarBtn = document.getElementById('generar-btn');
    const mapaContainer = document.getElementById('mapa-container');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Paleta de colores
    const colores = {
        oscuro: '#090C02',
        rojo: '#A72608',
        verdeClaro: '#BBC5AA',
        crema: '#DDE2C6',
        blancoHueso: '#E6EED6',
        verdeOscuro: '#0c3023'
    };
    
    // Función para cambiar el tema
    function toggleTheme() {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }
    
    // Evento para el botón de cambio de tema
    themeToggle.addEventListener('click', toggleTheme);
    
    // Datos para diferentes corrientes filosóficas
    const filosofias = {
        'existencialismo': {
            concepto: 'Existencialismo',
            descripcion: 'Corriente filosófica que enfatiza la existencia individual, la libertad y la elección',
            nodos: [
                { id: 1, texto: 'Existencia precede a la esencia', x: 100, y: 120, ancho: 200, alto: 60 },
                { id: 2, texto: 'Libertad y responsabilidad', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Angustia existencial', x: 100, y: 220, ancho: 180, alto: 60 },
                { id: 4, texto: 'Autenticidad', x: 400, y: 220, ancho: 160, alto: 60 },
                { id: 5, texto: 'Absurdo y significado', x: 250, y: 320, ancho: 180, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 0, hasta: 3 },
                { desde: 0, hasta: 4 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 3 },
                { desde: 3, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Jean-Paul Sartre', 'Albert Camus', 'Simone de Beauvoir', 'Martin Heidegger', 'Søren Kierkegaard']
        },
        'empirismo': {
            concepto: 'Empirismo',
            descripcion: 'Corriente filosófica que enfatiza el papel de la experiencia y la evidencia',
            nodos: [
                { id: 1, texto: 'Conocimiento a través de la experiencia', x: 100, y: 120, ancho: 230, alto: 60 },
                { id: 2, texto: 'Rechazo a ideas innatas', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Tabula rasa', x: 100, y: 220, ancho: 160, alto: 60 },
                { id: 4, texto: 'Método científico', x: 400, y: 220, ancho: 160, alto: 60 },
                { id: 5, texto: 'Escepticismo metódico', x: 250, y: 320, ancho: 180, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 4 },
                { desde: 1, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['John Locke', 'David Hume', 'George Berkeley', 'Francis Bacon']
        },
        'estoicismo': {
            concepto: 'Estoicismo',
            descripcion: 'Escuela filosófica fundada en Atenas que enseña el autocontrol y la fortaleza frente a la adversidad',
            nodos: [
                { id: 1, texto: 'Virtud como único bien', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Aceptación del destino', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Ataraxia (tranquilidad)', x: 100, y: 220, ancho: 180, alto: 60 },
                { id: 4, texto: 'Control de las pasiones', x: 400, y: 220, ancho: 180, alto: 60 },
                { id: 5, texto: 'Vivir conforme a la naturaleza', x: 250, y: 320, ancho: 200, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 0, hasta: 4 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 5 },
                { desde: 3, hasta: 4 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Zenón de Citio', 'Epicteto', 'Séneca', 'Marco Aurelio']
        },
        'racionalismo': {
            concepto: 'Racionalismo',
            descripcion: 'Corriente filosófica que enfatiza el papel de la razón en la adquisición del conocimiento',
            nodos: [
                { id: 1, texto: 'Conocimiento a priori', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Ideas innatas', x: 400, y: 120, ancho: 160, alto: 60 },
                { id: 3, texto: 'Método deductivo', x: 100, y: 220, ancho: 160, alto: 60 },
                { id: 4, texto: 'Verdades necesarias', x: 400, y: 220, ancho: 160, alto: 60 },
                { id: 5, texto: 'Dualismo mente-cuerpo', x: 250, y: 320, ancho: 180, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 4 },
                { desde: 1, hasta: 5 },
                { desde: 3, hasta: 5 }
            ],
            pensadores: ['René Descartes', 'Baruch Spinoza', 'Gottfried Leibniz']
        },
        'nihilismo': {
            concepto: 'Nihilismo',
            descripcion: 'Corriente filosófica que niega todo principio, autoridad, creencia o valor objetivo',
            nodos: [
                { id: 1, texto: 'Rechazo de valores y significados', x: 100, y: 120, ancho: 220, alto: 60 },
                { id: 2, texto: 'Ausencia de verdad objetiva', x: 400, y: 120, ancho: 200, alto: 60 },
                { id: 3, texto: 'Perspectivismo', x: 100, y: 220, ancho: 160, alto: 60 },
                { id: 4, texto: 'Muerte de Dios', x: 400, y: 220, ancho: 160, alto: 60 },
                { id: 5, texto: 'Voluntad de poder', x: 250, y: 320, ancho: 160, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 0, hasta: 4 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Friedrich Nietzsche', 'Emil Cioran', 'Albert Camus']
        },
        // Fixed: Added comma here ↓
        'fenomenologia': {
            concepto: 'Fenomenología',
            descripcion: 'Corriente filosófica que estudia los fenómenos tal como se presentan en la conciencia',
            nodos: [
                { id: 1, texto: 'Intencionalidad de la conciencia', x: 100, y: 120, ancho: 220, alto: 60 },
                { id: 2, texto: 'Reducción fenomenológica', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Mundo de la vida', x: 100, y: 220, ancho: 160, alto: 60 },
                { id: 4, texto: 'Intersubjetividad', x: 400, y: 220, ancho: 160, alto: 60 },
                { id: 5, texto: 'Experiencia vivida', x: 250, y: 320, ancho: 180, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 4 },
                { desde: 3, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Edmund Husserl', 'Martin Heidegger', 'Maurice Merleau-Ponty', 'Jean-Paul Sartre']
        },
        // Also fixed the concept name to match the search term
        'pragmatismo': {
            concepto: 'Pragmatismo',
            descripcion: 'Corriente filosófica que evalúa las teorías según sus consecuencias prácticas',
            nodos: [
                { id: 1, texto: 'Verdad como utilidad', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Experiencia y acción', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Anti-fundacionalismo', x: 100, y: 220, ancho: 180, alto: 60 },
                { id: 4, texto: 'Falibilismo', x: 400, y: 220, ancho: 160, alto: 60 },
                { id: 5, texto: 'Método científico', x: 250, y: 320, ancho: 160, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 4 },
                { desde: 1, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Charles Sanders Peirce', 'William James', 'John Dewey', 'Richard Rorty']
        },
        'estructuralismo': {
            concepto: 'Estructuralismo',
            descripcion: 'Corriente que analiza los fenómenos culturales como sistemas de signos y relaciones',
            nodos: [
                { id: 1, texto: 'Sistemas de signos', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Relaciones binarias', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Sincronía vs. diacronía', x: 100, y: 220, ancho: 180, alto: 60 },
                { id: 4, texto: 'Inconsciente estructural', x: 400, y: 220, ancho: 180, alto: 60 },
                { id: 5, texto: 'Análisis cultural', x: 250, y: 320, ancho: 160, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 0, hasta: 4 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Ferdinand de Saussure', 'Claude Lévi-Strauss', 'Roland Barthes', 'Jacques Lacan']
        },
        'idealismo': {
            concepto: 'Idealismo',
            descripcion: 'Corriente filosófica que sostiene que la realidad es fundamentalmente mental o espiritual',
            nodos: [
                { id: 1, texto: 'Primacía de la mente', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Espíritu absoluto', x: 400, y: 120, ancho: 160, alto: 60 },
                { id: 3, texto: 'Dialéctica', x: 100, y: 220, ancho: 160, alto: 60 },
                { id: 4, texto: 'Fenómeno y noúmeno', x: 400, y: 220, ancho: 180, alto: 60 },
                { id: 5, texto: 'Síntesis trascendental', x: 250, y: 320, ancho: 180, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 4 },
                { desde: 3, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Immanuel Kant', 'Georg Wilhelm Friedrich Hegel', 'Johann Gottlieb Fichte', 'Friedrich Schelling']
        },
        'materialismo': {
            concepto: 'Materialismo',
            descripcion: 'Corriente filosófica que sostiene que la materia es la sustancia fundamental del universo',
            nodos: [
                { id: 1, texto: 'Primacía de la materia', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Materialismo dialéctico', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Determinismo económico', x: 100, y: 220, ancho: 180, alto: 60 },
                { id: 4, texto: 'Lucha de clases', x: 400, y: 220, ancho: 160, alto: 60 },
                { id: 5, texto: 'Conciencia como reflejo', x: 250, y: 320, ancho: 180, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 4 },
                { desde: 3, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Karl Marx', 'Friedrich Engels', 'Vladimir Lenin', 'Antonio Gramsci']
        },
        
        'utilitarismo': {
            concepto: 'Utilitarismo',
            descripcion: 'Doctrina ética que sostiene que la acción correcta es la que produce la mayor felicidad para el mayor número de personas',
            nodos: [
                { id: 1, texto: 'Principio de utilidad', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Consecuencialismo', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Cálculo de felicidad', x: 100, y: 220, ancho: 180, alto: 60 },
                { id: 4, texto: 'Bienestar colectivo', x: 400, y: 220, ancho: 180, alto: 60 },
                { id: 5, texto: 'Utilitarismo de reglas', x: 250, y: 320, ancho: 180, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 3 },
                { desde: 2, hasta: 4 },
                { desde: 3, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Jeremy Bentham', 'John Stuart Mill', 'Henry Sidgwick', 'Peter Singer']
        },
        
        'posmodernismo': {
            concepto: 'Posmodernismo',
            descripcion: 'Movimiento filosófico y cultural que cuestiona las narrativas universales y las verdades absolutas',
            nodos: [
                { id: 1, texto: 'Crítica a los metarrelatos', x: 100, y: 120, ancho: 200, alto: 60 },
                { id: 2, texto: 'Deconstrucción', x: 400, y: 120, ancho: 160, alto: 60 },
                { id: 3, texto: 'Relativismo cultural', x: 100, y: 220, ancho: 180, alto: 60 },
                { id: 4, texto: 'Fragmentación del sujeto', x: 400, y: 220, ancho: 200, alto: 60 },
                { id: 5, texto: 'Simulacro y hiperrealidad', x: 250, y: 320, ancho: 200, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 4 },
                { desde: 2, hasta: 3 },
                { desde: 3, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Jean-François Lyotard', 'Jacques Derrida', 'Jean Baudrillard', 'Michel Foucault', 'Gilles Deleuze']
        },
        
        'epicureismo': {
            concepto: 'Epicureismo',
            descripcion: 'Escuela filosófica helenística que busca la felicidad a través del placer moderado y la ausencia de dolor',
            nodos: [
                { id: 1, texto: 'Hedonismo racional', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Ausencia de dolor (ataraxia)', x: 400, y: 120, ancho: 220, alto: 60 },
                { id: 3, texto: 'Materialismo atomista', x: 100, y: 220, ancho: 180, alto: 60 },
                { id: 4, texto: 'Amistad y comunidad', x: 400, y: 220, ancho: 180, alto: 60 },
                { id: 5, texto: 'Liberación del miedo', x: 250, y: 320, ancho: 180, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 2 },
                { desde: 1, hasta: 5 },
                { desde: 2, hasta: 3 },
                { desde: 3, hasta: 4 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Epicuro', 'Lucrecio', 'Filodemo', 'Diógenes de Enoanda']
        },
        
        'hermeneutica': {
            concepto: 'Hermenéutica',
            descripcion: 'Teoría filosófica de la interpretación y comprensión de textos, símbolos y experiencias',
            nodos: [
                { id: 1, texto: 'Círculo hermenéutico', x: 100, y: 120, ancho: 180, alto: 60 },
                { id: 2, texto: 'Fusión de horizontes', x: 400, y: 120, ancho: 180, alto: 60 },
                { id: 3, texto: 'Precomprensión', x: 100, y: 220, ancho: 160, alto: 60 },
                { id: 4, texto: 'Historicidad del entendimiento', x: 400, y: 220, ancho: 220, alto: 60 },
                { id: 5, texto: 'Lenguaje como medio universal', x: 250, y: 320, ancho: 220, alto: 60 }
            ],
            conexiones: [
                { desde: 0, hasta: 1 },
                { desde: 0, hasta: 3 },
                { desde: 1, hasta: 2 },
                { desde: 2, hasta: 4 },
                { desde: 3, hasta: 5 },
                { desde: 4, hasta: 5 }
            ],
            pensadores: ['Hans-Georg Gadamer', 'Martin Heidegger', 'Paul Ricoeur', 'Friedrich Schleiermacher', 'Wilhelm Dilthey']
        }
    };
    
    // Evento para el botón de generar mapa
    generarBtn.addEventListener('click', function() {
        const concepto = conceptoInput.value.toLowerCase();
        if (filosofias[concepto]) {
            generarMapa(filosofias[concepto]);
        } else {
            alert('Por favor, prueba con: existencialismo, empirismo, estoicismo, racionalismo, nihilismo, fenomenologia, pragmatismo, estructuralismo, idealismo, materialismo, utilitarismo, posmodernismo, epicureismo o hermeneutica');
        }
    });
    
    // Función para generar el mapa conceptual
    function generarMapa(filosofia) {
        // Limpiar el contenedor
        mapaContainer.innerHTML = '';
        mapaContainer.classList.remove('hidden');
        
        // Crear el título y descripción
        const titulo = document.createElement('h2');
        titulo.textContent = filosofia.concepto;
        titulo.className = 'mapa-titulo';
        mapaContainer.appendChild(titulo);
        
        const descripcion = document.createElement('p');
        descripcion.textContent = filosofia.descripcion;
        descripcion.className = 'mapa-descripcion';
        mapaContainer.appendChild(descripcion);
        
        // Crear el canvas para el mapa
        const mapaCanvas = document.createElement('div');
        mapaCanvas.className = 'mapa-canvas';
        mapaContainer.appendChild(mapaCanvas);
        
        // Crear el nodo central
        const nodoCentral = document.createElement('div');
        nodoCentral.className = 'nodo nodo-central';
        nodoCentral.textContent = filosofia.concepto;
        nodoCentral.style.left = '250px';
        nodoCentral.style.top = '30px';
        nodoCentral.style.width = '180px';
        nodoCentral.style.height = '60px';
        mapaCanvas.appendChild(nodoCentral);
        
        // Crear SVG para las conexiones
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        mapaCanvas.appendChild(svg);
        
        // Crear los nodos secundarios
        filosofia.nodos.forEach(nodo => {
            const nodoElement = document.createElement('div');
            nodoElement.className = 'nodo nodo-secundario';
            nodoElement.textContent = nodo.texto;
            nodoElement.style.left = `${nodo.x}px`;
            nodoElement.style.top = `${nodo.y}px`;
            nodoElement.style.width = `${nodo.ancho}px`;
            nodoElement.style.height = `${nodo.alto}px`;
            mapaCanvas.appendChild(nodoElement);
        });
        
        // Crear las conexiones
        filosofia.conexiones.forEach(conexion => {
            let sourceX, sourceY, targetX, targetY;
            
            if (conexion.desde === 0) {
                sourceX = 250 + 90;
                sourceY = 30 + 30;
            } else {
                const nodoDesde = filosofia.nodos.find(n => n.id === conexion.desde);
                if (nodoDesde) {
                    sourceX = nodoDesde.x + (nodoDesde.ancho / 2);
                    sourceY = nodoDesde.y + (nodoDesde.alto / 2);
                } else {
                    return; // Skip this connection if source node not found
                }
            }
            
            const nodoHasta = filosofia.nodos.find(n => n.id === conexion.hasta);
            if (!nodoHasta) return; // Skip this connection if target node not found
            
            targetX = nodoHasta.x + (nodoHasta.ancho / 2);
            targetY = nodoHasta.y + (nodoHasta.alto / 2);
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', sourceX);
            line.setAttribute('y1', sourceY);
            line.setAttribute('x2', targetX);
            line.setAttribute('y2', targetY);
            line.setAttribute('stroke', htmlElement.getAttribute('data-theme') === 'dark' ? '#aaa' : colores.oscuro);
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);
        });
        
        // Crear sección de pensadores
        const pensadoresSection = document.createElement('div');
        pensadoresSection.className = 'pensadores';
        
        const pensadoresTitle = document.createElement('h3');
        pensadoresTitle.textContent = 'Pensadores principales:';
        pensadoresTitle.style.color = colores.rojo;
        pensadoresTitle.style.fontWeight = 'bold';
        pensadoresSection.appendChild(pensadoresTitle);
        
        const pensadoresList = document.createElement('p');
        pensadoresList.textContent = filosofia.pensadores.join(', ');
        pensadoresSection.appendChild(pensadoresList);
        
        mapaContainer.appendChild(pensadoresSection);
    }
    
    // Permitir generar mapa al presionar Enter en el input
    conceptoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generarBtn.click();
        }
    });
});