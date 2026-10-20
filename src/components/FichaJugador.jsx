import React from 'react';

export function FichaEstructura({ children }) {
  return (
    <div className="tarjeta-jugador">
      <h4 className="tarjeta-jugador__titulo">Ficha del Jugador</h4>
      {children}
    </div>
  );
}

export function FichaDatosDinamicos({ nombre, apellido, edad }) {
  return (
    <>
      <p className="tarjeta-jugador__texto"><strong>Nombre:</strong> {nombre || '-'}</p>
      <p className="tarjeta-jugador__texto"><strong>Apellido:</strong> {apellido || '-'}</p>
      <p className="tarjeta-jugador__texto"><strong>Edad:</strong> {edad ? `${edad} años` : '-'}</p>
    </>
  );
}