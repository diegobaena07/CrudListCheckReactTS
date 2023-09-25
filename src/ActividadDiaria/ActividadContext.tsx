import { createContext, useEffect, useState } from "react";
import { Tarea } from "./interface/TareaInterface";
import PocketBase from 'pocketbase';
import { pb } from "./service/ActividadService";

type ActividadContextType = {
    agregar: boolean,
    setAgregar: React.Dispatch<React.SetStateAction<boolean>>,
    editar: boolean,
    setEditar: React.Dispatch<React.SetStateAction<boolean>>,
    tareas: Array<Tarea>,
    setTareas: React.Dispatch<React.SetStateAction<Tarea[]>>,
    nuevaTarea: Tarea,
    setNuevaTarea: React.Dispatch<React.SetStateAction<Tarea>>,
    editarTarea: Tarea,
    setEditarTarea: React.Dispatch<React.SetStateAction<Tarea>>,
    formatFecha: string | undefined,
    pb: PocketBase
}

export const ActividadContext = createContext<ActividadContextType>(
    {} as ActividadContextType
);

export const ActividadContextProvider = ({ children }: any) => {

    const [agregar, setAgregar] = useState<boolean>(false);
    const [editar, setEditar] = useState<boolean>(false);
    const [tareas, setTareas] = useState<Array<Tarea>>([])
    const [formatFecha, setFormatFecha] = useState<string>()
    const [nuevaTarea, setNuevaTarea] = useState<Tarea>({
        actividad: "",
        fecha: "",
        estado: false,
        descripcion: "",
    });
    const [editarTarea, setEditarTarea] = useState<Tarea>({
        actividad: "",
        fecha: "",
        estado: false,
        descripcion: "",
    });

    //Creando un formato para la fecha
    const formatearFecha = (fecha: Date) => {
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        setFormatFecha(`${año}-${mes}-${dia}`);
        return formatFecha;
    }

    //Llenando la lista de todas las tareas
    const ConsultarTareas = async () => {
        const records = await pb.collection('Tareas').getFullList<Tarea>(undefined, { sort: '-created' });
        setTareas(records)
    }

    //Creando tareas
    const Create = (record: Tarea) => {
        var NuevaTarea = { ...record };
        var lista = tareas
        lista.push(NuevaTarea);
        setTareas(lista)
    }

    //Editando tareas
    const Update = (record: Tarea) => {
        var TareaEdit = { ...record }
        var IndexTarea = tareas.findIndex((tarea) => (tarea.id === TareaEdit.id))
        var Tareas = [...tareas]
        Tareas[IndexTarea] = TareaEdit
        setTareas(Tareas)
    }

    //Elminando tareas
    const Delete = (record: Tarea) => {
        var TareaDele = { ...record }
        var IndexTarea = tareas.findIndex((tarea) => (tarea.id === TareaDele.id))
        var Tareas = [...tareas]
        Tareas.splice(IndexTarea, 1);
        setTareas(Tareas)
    }

    //Ejecutando las funcionas apenas se inicie el proyecto comentado el realtime
    useEffect(() => {
        formatearFecha(new Date);
        ConsultarTareas();
        // pb.collection('Tareas').subscribe<Tarea>('*', function (e) {
        //     if (e.action === "delete") {
        //         Delete(e.record)
        //     } else if (e.action === "update") {
        //         Update(e.record)
        //     } else if (e.action === "create") {
        //         Create(e.record)
        //     }
        // });
    }, [/*console.log(tareas)*/]);

    return (
        <ActividadContext.Provider value={{
            agregar,
            setAgregar,
            editar,
            setEditar,
            tareas,
            setTareas,
            nuevaTarea,
            setNuevaTarea,
            editarTarea,
            setEditarTarea,
            formatFecha,
            pb
        }}>
            {children}
        </ActividadContext.Provider>
    );
}