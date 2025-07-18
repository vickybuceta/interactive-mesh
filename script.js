// Relaciones
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

// Todos los ramos
const todos = Array.from(new Set(Object.keys(ramos).concat(...Object.values(ramos))));

// Estado inicial
const estado = {};
const bloqueado = {};
todos.forEach(r => estado[r] = false);
todos.forEach(r => bloqueado[r] = false);

// Marcar como bloqueados los que dependen de otros
Object.entries(ramos).forEach(([padre, hijos]) => {
  hijos.forEach(hijo => bloqueado[hijo] = true);
});

// Los iniciales no deberían estar bloqueados
Object.keys(ramos).forEach(r => bloqueado[r] = false);

// Render
const contenedor = document.getElementById("malla");
todos.forEach(r => {
  const btn = document.createElement("div");
  btn.textContent = r;
  btn.className = "ramo";
  if (bloqueado[r]) btn.classList.add("bloqueado");
  btn.onclick = () => aprobar(r, btn);
  contenedor.appendChild(btn);
});

function aprobar(nombre, elemento) {
  if (bloqueado[nombre] || estado[nombre]) return;
  estado[nombre] = true;
  elemento.classList.add("aprobado");

  if (ramos[nombre]) {
    ramos[nombre].forEach(hijo => {
      // Revisar si TODOS sus padres están aprobados
      const padres = Object.entries(ramos).filter(([p, hijos]) => hijos.includes(hijo)).map(([p]) => p);
      const todosPadresAprobados = padres.every(p => estado[p]);
      if (todosPadresAprobados) {
        bloqueado[hijo] = false;
        const hijoElem = Array.from(document.getElementsByClassName("ramo"))
          .find(e => e.textContent === hijo);
        hijoElem.classList.remove("bloqueado");
      }
    });
  }
}
