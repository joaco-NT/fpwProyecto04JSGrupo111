import { useState, useEffect, useRef, useMemo } from 'react';
import { apiDelJuego } from '../services';

const TIEMPO_GIRO = 1500;
const TIEMPO_REBOTE = 500;

export function usarJuegoDado() {
    // Memoria principal de la pantalla (lo que cambia y se ve)
    const [jugador, establecerJugador] = useState({ nombre: '', apellido: '', edad: '' });
    const [errorValidacion, establecerErrorValidacion] = useState('');
    const [dado, establecerDado] = useState(1);
    const [girando, establecerGirando] = useState(false);
    const [rebotando, establecerRebotando] = useState(false);
    const [rotacion, establecerRotacion] = useState({ x: 0, y: 0, z: 0 });

    // Variables internas para controlar el movimiento y los tiempos sin recargar la pantalla
    const vueltasAcumuladasRef = useRef({ x: 0, y: 0, z: 0 });
    const estaGirandoRef = useRef(false);
    const temporizadorGiroRef = useRef(null);
    const temporizadorReboteRef = useRef(null);

    // Calcula el mensaje del juego automáticamente cuando cambia el número del dado
    const resultado = useMemo(() => {
        return apiDelJuego.obtenerReglaResultado(dado, girando);
    }, [girando, dado]);

    // Guarda lo que escribes en el formulario letra por letra y lo revisa
    const manejarCambioEntrada = (e) => {
        const { name, value } = e.target;
        establecerErrorValidacion('');

        if (name === 'nombre' || name === 'apellido') {
            const limpio = apiDelJuego.calcularTextoLimpio(value);
            establecerJugador((previo) => ({ ...previo, [name]: limpio }));
        } else if (name === 'edad' && apiDelJuego.validarRangoEdad(value)) {
            establecerJugador((previo) => ({ ...previo, [name]: value }));
        }
    };

    // Controla todo lo que pasa cuando le das clic al botón de lanzar el dado
    const lanzarDado = () => {
        if (estaGirandoRef.current || girando) return;

        const error = apiDelJuego.validarFormularioJugador(jugador);
        if (error) {
            establecerErrorValidacion(error);
            return;
        }

        establecerErrorValidacion('');
        estaGirandoRef.current = true;
        establecerGirando(true);
        establecerRebotando(false);

        if (temporizadorGiroRef.current) clearTimeout(temporizadorGiroRef.current);
        if (temporizadorReboteRef.current) clearTimeout(temporizadorReboteRef.current);

        const numeroFinal = apiDelJuego.calcularNumeroAleatorioDado();
        establecerDado(numeroFinal);

        const { nuevasVueltas, nuevaRotacion } = apiDelJuego.calcularCoordenadasRotacion(numeroFinal, vueltasAcumuladasRef.current);
        vueltasAcumuladasRef.current = nuevasVueltas;
        establecerRotacion(nuevaRotacion);

        // Espera a que termine de girar para hacer el efecto de rebote en la mesa
        temporizadorGiroRef.current = setTimeout(() => {
            establecerGirando(false);
            establecerRebotando(true);
            estaGirandoRef.current = false;

            temporizadorReboteRef.current = setTimeout(() => {
                establecerRebotando(false);
            }, TIEMPO_REBOTE);
        }, TIEMPO_GIRO);
    };

    // Limpia los temporizadores si cerramos la página para que no gasten memoria
    useEffect(() => {
        return () => {
            if (temporizadorGiroRef.current) clearTimeout(temporizadorGiroRef.current);
            if (temporizadorReboteRef.current) clearTimeout(temporizadorReboteRef.current);
        };
    }, []);

    // Exporta todas las funciones y datos para que la página los pueda usar
    return {
        jugador,
        errorValidacion,
        dado,
        girando,
        rebotando,
        rotacion,
        textosInterfaz: apiDelJuego.datos.interfaz,
        manejarCambioEntrada,
        lanzarDado,
        resultado,
    };
}