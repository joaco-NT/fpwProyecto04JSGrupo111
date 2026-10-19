import reglasData from './reglasJuego.json';

// =====================================================================
// CONFIGURACIÓN GEOMÉTRICA Y VISUAL
// =====================================================================
export const ROTACIONES_CARAS = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: 180 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 90, y: 0 },
};

export const CONFIGURACION_CARAS = [
  { numero: 1, puntos: ['dado-punto--centro'] },
  { numero: 2, puntos: ['dado-punto--arriba-izq', 'dado-punto--abajo-der'] },
  { numero: 3, puntos: ['dado-punto--arriba-izq', 'dado-punto--centro', 'dado-punto--abajo-der'] },
  { numero: 4, puntos: ['dado-punto--arriba-izq', 'dado-punto--arriba-der', 'dado-punto--abajo-izq', 'dado-punto--abajo-der'] },
  { numero: 5, puntos: ['dado-punto--arriba-izq', 'dado-punto--arriba-der', 'dado-punto--centro', 'dado-punto--abajo-izq', 'dado-punto--abajo-der'] },
  { numero: 6, puntos: ['dado-punto--arriba-izq', 'dado-punto--arriba-der', 'dado-punto--medio-izq', 'dado-punto--medio-der', 'dado-punto--abajo-izq', 'dado-punto--abajo-der'] },
];

// =====================================================================
// CÁLCULO Y VALIDACION
// =====================================================================

// Limpia el texto de nombres/apellidos usando expresiones regulares
export function calcularTextoLimpio(valor) {
  return valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
}

// Valida si la edad ingresada está dentro del rango permitido
export function validarRangoEdad(valor) {
  return valor === '' || (Number(valor) >= 1 && Number(valor) <= 120);
}

// Valida si el formulario está completo antes de lanzar el dado
export function validarFormularioJugador(jugador) {
  const { nombre, apellido, edad } = jugador;
  const edadNum = Number(edad);

  if (!nombre.trim() || !apellido.trim() || !edad) {
    return '⚠️ Por favor completa todos los campos correctamente.';
  }

  if (edadNum < 1 || edadNum > 120) {
    return '⚠️ Ingresa una edad válida (entre 1 y 120 años).';
  }

  return null; // Retorna null si todo está perfecto
}

// Calcula un número aleatorio de 1 a 6
export function calcularNumeroAleatorioDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Calcula las coordenadas exactas de rotación 3D para el dado
export function calcularCoordenadasRotacion(numeroFinal, vueltasActuales) {
  const girosX = (Math.floor(Math.random() * 3) + 5) * 360;
  const girosY = (Math.floor(Math.random() * 3) + 5) * 360;
  const objetivo = ROTACIONES_CARAS[numeroFinal];

  const nuevasVueltas = {
    x: vueltasActuales.x + girosX,
    y: vueltasActuales.y + girosY,
  };

  const nuevaRotacion = {
    x: nuevasVueltas.x + objetivo.x,
    y: nuevasVueltas.y + objetivo.y,
    z: 0,
  };

  return { nuevasVueltas, nuevaRotacion };
}

// Obtiene la regla del resultado basada en el JSON
export function obtenerReglaResultado(dado, girando) {
  if (girando) {
    return {
      texto: reglasData.mensajesCarga.texto,
      clase: reglasData.mensajesCarga.clase
    };
  }

  const reglaAplicada = reglasData.reglas.find(
    (regla) => dado >= regla.min && dado <= regla.max
  );

  return {
    texto: reglaAplicada ? reglaAplicada.mensaje : 'Resultado desconocido',
    clase: `mensaje-juego--${reglaAplicada ? reglaAplicada.tipo : 'bueno'}`
  };
}