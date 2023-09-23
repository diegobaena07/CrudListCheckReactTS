import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ActividadContext } from "../ActividadContext";
import EditarTarea from "./EditarTarea";
import { Tarea } from "../interface/TareaInterface";

function ListTareas() {
    const { tareas, setTareas, setEditar, setEditarTarea, editar, pb } = useContext(ActividadContext)

    //Consultando la API para eliminar en la base de datos
    const eliminar = async (id: string) => {
        await pb.collection('Tareas').delete(id);
        const records = await pb.collection('Tareas').getFullList<Tarea>(undefined, { sort: '-created' });
        setTareas(records);
        //window.localStorage.setItem('tareas', JSON.stringify(nuevaLista));
    }

    //Abrir el Modal para editar la tarea
    const Edit = (tarea: Tarea) => {
        setEditar(true);
        setEditarTarea(tarea);
    };

    //Cambiando el estado para cuando la tarea se complete
    const validar = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>, act: Tarea) => {
        const estado = e.currentTarget.checked;
        const _tareas = [...tareas];
        const _tarea = _tareas.find(tarea => tarea === act);
        if (typeof estado !== "undefined" && typeof _tarea !== "undefined") {
            _tarea.estado = estado;
            const record = await pb.collection('Tareas').update<Tarea>(act.id!, _tarea);
            record.estado = estado
            setTareas(_tareas);
        }
    }

    /*useEffect(() => {
        // Cargar tareas desde el almacenamiento local al inicio
        const storedTareas = window.localStorage.getItem('tareas');
        if (storedTareas) {
            setTareas(JSON.parse(storedTareas));
        }
    }, []);*/

    return (
        <div>
            {
                tareas.length > 0 ?
                    <table className="table table-striped">
                        <thead>
                            <tr className='text-center fw-bolder fs-7 '>
                                <th>
                                    <span>Actividad</span>
                                </th>
                                <th>
                                    <span>Fecha</span>
                                </th>
                                <th>
                                    <span>Descripcion</span>
                                </th>
                                <th>
                                    <span>Estado</span>
                                </th>
                                <th>
                                    <span>¿COMPLETADO?</span>
                                </th>
                            </tr>
                        </thead>
                        {tareas.length > 0
                            ?
                            tareas.map((A) => {
                                return (
                                    <tbody key={A.id}>
                                        <tr className='text-center text-muted fs-7 ' >
                                            <th className='text-center text-muted fs-7 '>
                                                <span>{A.actividad}</span>
                                            </th>
                                            <th className='text-center text-muted fs-7 '>
                                                <span>{A.fecha}</span>
                                            </th>
                                            <th className='text-center text-muted fs-7 '>
                                                <span>{A.descripcion}</span>
                                            </th>
                                            <th className='text-center text-muted'>
                                                {A.estado === true ?
                                                    <span className="p-1" style={{ background: "green", color: "white", borderRadius: "5px", fontSize: "12px" }}>Completado</span>
                                                    :
                                                    <span className="p-1" style={{ background: "RED", color: "white", borderRadius: "5px", fontSize: "12px" }}>Pendiente</span>
                                                }
                                            </th>
                                            <th className='text-center text-muted fs-7 '>
                                                <input id="check" type="checkbox" name="estado" defaultChecked={A.estado} onClick={(e) => validar(e, A)} />
                                            </th>
                                            <th className="text-center text-muted fs-7 ">
                                                <Button variant="primary" className="me-2" style={{ padding: "2px" }} onClick={() => Edit(A)}>
                                                    <span className="material-symbols-sharp d-flex align-self-center" style={{ fontSize: "17px", padding: "1px" }}>edit</span>
                                                </Button>
                                                <Button className="btn btn-danger" style={{ padding: "2px" }} onClick={() => eliminar(A.id!)}>
                                                    <span className="material-symbols-sharp d-flex align-self-center" style={{ fontSize: "17px", padding: "1px" }}>delete</span>
                                                </Button>
                                            </th>
                                        </tr>
                                    </tbody>
                                )
                            })
                            :
                            null
                        }
                    </table>
                    :
                    <div className="text-center">
                        <br />
                        <span className="col-12 fs-3 fw-bolder text-muted text-center">No hay registros disponibles</span>
                    </div>
            }
            {editar && <EditarTarea />}
        </div>
    )
}

export default ListTareas;