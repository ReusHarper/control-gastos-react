import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );

    const [gastoEditar, setGastoEditar] = useState({});
    
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);

    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);
    
    // Verificación de cambio de gasto
    useEffect( () => {
        if(Object.keys(gastoEditar).length > 0){
            setModal(true);
            
            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar]);

    // Almacenando el presupuesto en local storage cuando haya cambios
    useEffect( () => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);
    }, [presupuesto]);

    // Almacenando los gastos en local storage (recordar que en LS no se pueden almacenar objetos por lo que hay que transformarlos en un arreglo)
    useEffect( () => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);

    // Filtrar gastos por categoría
    useEffect( () => {
        if(filtro){
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro])

    // Si existe un presupuesto (> 0) entonces se debe mostrar la ventana de gastos
    useEffect( () => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

        if(presupuestoLS > 0){
            setIsValidPresupuesto(true);
        }
    }, []);

    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});
        
        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    const guardarGasto = gasto => {
        if(gasto.id){
            // Actualización de gasto sin modificar los demás registros
            const gastosActualizados = gastos.map(
                gastoState => gastoState.id === gasto.id ? gasto : gastoState
            );
            setGastos(gastosActualizados);
            setGastoEditar({});
        } else {
            // Nuevo gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([ ... gastos, gasto ]);
        }
        
        // Animación de cierre de modal
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const eliminarGasto = id => {
        const gastosActualizados = gastos.filter( gasto => gasto.id !== id );
        setGastos(gastosActualizados);
    };
    
    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos={gastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            {/* Si el presupuesto es válido entonces agregamos el botón 
            Con && sustimos el operador ternario para solo tomar la parte que si cumple con la condición*/}
            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Icono nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {/* Si se da click en el botón + entonces mostramos una ventana modal para agregar un nuevo gasto */}
            {modal && ( <Modal
                        setModal={setModal}
                        animarModal={animarModal}
                        setAnimarModal={setAnimarModal}
                        guardarGasto={guardarGasto}
                        gastoEditar={gastoEditar}
                        setGastoEditar={setGastoEditar}
                    />
            )}
        </div>
    );
};

export default App;
