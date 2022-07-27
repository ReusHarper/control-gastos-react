import React from "react";

const ControlPresupuesto = ({presupuesto}) => {
    
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>Gráfica aquí</p>
            </div>
            <div className="contenido-presupuesto">
                <p>
                    Presupuesto: <span>{formatearCantidad(presupuesto)}</span>
                </p>
                <p>
                    Disponible: <span>0</span>
                </p>
                <p>
                    Gastado: <span>0</span>
                </p>
            </div>
        </div>
    );
};

export default ControlPresupuesto;
