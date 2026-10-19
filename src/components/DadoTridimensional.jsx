import React from 'react';
import { apiDelJuego } from '../services';

const { CONFIGURACION_CARAS } = apiDelJuego;

export function DadoEstructura({ rotacion, girando, rebotando, alHacerClic, children }) {
  return (
    <div
      className={`dado-escena ${rebotando ? 'dado-escena--rebote' : ''}`}
      onClick={alHacerClic}
      title="¡Haz clic para lanzar el dado!"
      style={{ pointerEvents: girando ? 'none' : 'auto' }}
    >
      <div
        className="dado-cubo"
        style={{
          transform: `rotateX(${rotacion.x}deg) rotateY(${rotacion.y}deg) rotateZ(${rotacion.z}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function DadoListasCaras() {
  return (
    <>
      {CONFIGURACION_CARAS.map(({ numero, puntos }) => (
        <div key={numero} className={`dado-cara dado-cara--${numero}`}>
          {puntos.map((posicion, indice) => (
            <span key={indice} className={`dado-punto ${posicion}`} />
          ))}
        </div>
      ))}
    </>
  );
}