import reglasData from './reglasJuego.json';
import * as servicioJuego from './servicioJuego.js';

export const apiDelJuego = {
    datos: reglasData,
    ...servicioJuego
};