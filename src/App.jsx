import { useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
    const [presupuesto, setPresupuesto] = useState(0);
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    
    const [gastos, setGastos] = useState([]);

    const handleNuevoGasto = () => {
        setModal(true);
        
        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    const guardarGasto = gasto => {
        gasto.id = generarId();
        setGastos([ ... gastos, gasto ]);

        setAnimarModal(false);
        
        setTimeout(() => {
            setAnimarModal(false);
        }, 500);
    }
    
    return (
        <div>
            <Header
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            {/* Si el presupuesto es válido entonces agregamos el botón 
            Con && sustimos el operador ternario para solo tomar la parte que si cumple con la condición*/}
            {isValidPresupuesto && (
                <div className="nuevo-gasto">
                    <img
                        src={IconoNuevoGasto}
                        alt="Icono nuevo gasto"
                        onClick={handleNuevoGasto}
                    />
                </div>
            )}

            {/* Si se da click en el botón + entonces mostramos una ventana modal para agregar un nuevo gasto */}
            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                />
            )}
        </div>
    );
};

export default App;
