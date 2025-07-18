// Todos los ramos y requisitos
const ramos = {
  "Introducción a la Economía y Estructura Económica Argentina": ["Microeconomía I", "Macroeconomía I", "Matemática para Administradores"],
  "Contabilidad I": ["Interpretación de los Estados Contables"],
  "Administración I": ["Comportamiento Humano en las Organizaciones", "Pensamiento Social y Científico", "Administración Estratégica", "Costos para la Gestión"],
  "Microeconomía I": ["Finanzas Públicas"],
  "Matemática para Administradores": ["Estadística Aplicada", "Costos para la Gestión", "Calculo Financiero"],
  "Comportamiento Humano en las Organizaciones": ["Gestión Pública", "Gestión de las personas en las Organizaciones I", "Psicosociología Organizacional"],
  "Pensamiento Social y Científico": ["Elementos del Derecho Público y Privado", "Diseño de Sistemas de Información", "Finanzas Públicas"],
  "Interpretación de los Estados Contables": ["Calculo Financiero", "Planeamiento y Control Organizacional"],
  "Administración Estratégica": ["Marketing Estratégico", "Diseño de Sistemas de Información", "Calculo Financiero", "Gestión de las personas en las Organizaciones I", "Planeamiento y Control Organizacional", "Operaciones", "Inteligencia de Negocios y Análisis de Datos"],
  "Estadística Aplicada": ["Marketing Operativo", "Inteligencia de Negocios y Análisis de Datos"],
  "Costos para la Gestión": ["Planeamiento y Control Organizacional", "Operaciones", "Dirección General"],
  "Elementos del Derecho Público y Privado": ["Derecho Empresario"],
  "Marketing Estratégico": ["Marketing Operativo", "Dirección General"],
  "Diseño de Sistemas de Información": ["Estratégica Tecnológica y Gestión de Proyectos  IT"],
  "Calculo Financiero": ["Finanzas de Empresas", "Dirección General"],
  "Gestión de las personas en las Organizaciones I": ["Gestión de las personas en las Organizaciones II"],
  "Planeamiento y Control Organizacional": ["Dirección General"],
  "Finanzas de Empresas": ["Finanzas avanzadas en Entidades Públicas y Privadas"]
};

// Todos los nombres únicos
const todosRamos = Array.from(new Set(Object.keys(ramos).concat(...Object.values(ramos))));

// Estado de cada ramo
const estado = {};
todosRamos.forEach(r => estado[r] = false);

// Inicialmente bloqueados los que tienen requisito
const bloqueados = {};
todosRamos.forEach(r => bloqueados[r] = false);
Object.values(ramos).flat().forEach(r => bloqueados[r] = true);

const contenedor = document.getElementById("malla");

todosRamos.forEach(ramo => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo;
  if (bloqueados[ramo]) div.classList.add("bloqueado");
  div.onclick = () => aprobarRamo(ramo, div);
  contenedor.appendChild(div);
});

function aprobarRamo(nombre, elemento) {
  if (bloqueados[nombre]) return;
  if (estado[nombre]) return;

  estado[nombre] = true;
  elemento.classList.add("aprobado");

  // Desbloquear correlativos
  if (ramos[nombre]) {
    ramos[nombre].forEach(hijo => {
      bloqueados[hijo] = false;
      const hijosElem = Array.from(document.getElementsByClassName("ramo"))
        .find(e => e.textContent === hijo);
      hijosElem.classList.remove("bloqueado");
    });
  }
}

