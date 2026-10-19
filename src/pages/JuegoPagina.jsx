import React from 'react';
import { DadoEstructura, DadoListasCaras, FichaEstructura, FichaDatosDinamicos } from '../components';
import { usarJuegoDado } from '../js';
import '../css/estilos.css';

export function JuegoPagina() {
    const { 
        jugador, 
        errorValidacion, 
        dado, 
        girando, 
        rebotando, 
        rotacion, 
        textosInterfaz, 
        manejarCambioEntrada, 
        lanzarDado, 
        resultado 
    } = usarJuegoDado();

    const { nombre, apellido, edad } = jugador;
    const tieneDatosJugador = Boolean(nombre || apellido || edad);

    return (
        <div className="contenedor-app">
            <h1 className="titulo-app">{textosInterfaz.tituloApp}</h1>
            
            <div className="rejilla-app">
                {/* PANEL IZQUIERDO */}
                <div className="panel panel--izquierda">
                    <div className="caja-formulario">
                        <h3 className="caja-formulario__titulo">{textosInterfaz.tituloFormulario}</h3>
                        
                        <div className="caja-formulario__entradas">
                            <div className="grupo-entrada">
                                <label className="grupo-entrada__etiqueta">{textosInterfaz.etiquetaNombre}</label>
                                <input className="grupo-entrada__campo" type="text" name="nombre" placeholder={textosInterfaz.placeholderNombre} value={nombre} onChange={manejarCambioEntrada} maxLength={25} />
                            </div>

                            <div className="grupo-entrada">
                                <label className="grupo-entrada__etiqueta">{textosInterfaz.etiquetaApellido}</label>
                                <input className="grupo-entrada__campo" type="text" name="apellido" placeholder={textosInterfaz.placeholderApellido} value={apellido} onChange={manejarCambioEntrada} maxLength={25} />
                            </div>

                            <div className="grupo-entrada">
                                <label className="grupo-entrada__etiqueta">{textosInterfaz.etiquetaEdad}</label>
                                <input className="grupo-entrada__campo" type="number" name="edad" placeholder={textosInterfaz.placeholderEdad} value={edad} onChange={manejarCambioEntrada} min="1" max="120" />
                            </div>
                        </div>

                        {errorValidacion && <div className="caja-formulario__error">{errorValidacion}</div>}
                    </div>

                    {tieneDatosJugador && !errorValidacion && (
                        <FichaEstructura>
                            <FichaDatosDinamicos nombre={nombre} apellido={apellido} edad={edad} />
                        </FichaEstructura>
                    )}
                </div>

                {/* PANEL DERECHO */}
                <div className="panel panel--derecha">
                    <div className="escenario-dado">
                        <DadoEstructura rotacion={rotacion} girando={girando} rebotando={rebotando} alHacerClic={lanzarDado}>
                            <DadoListasCaras />
                        </DadoEstructura>
                        <div className={`sombra-dado ${girando ? 'sombra-dado--animada' : ''}`} />
                    </div>

                    <div className="panel-acciones">
                        <div className="panel-acciones__resultado">
                            {girando ? 'Resultado: ?' : `Número obtenido: ${dado}`}
                        </div>
                        <button className="boton-accion" onClick={lanzarDado} disabled={girando}>
                            {girando ? 'Lanzando...' : 'Lanzar Dado 🐾'}
                        </button>
                        <div className={`mensaje-juego ${resultado.clase}`}>
                            {resultado.texto}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}