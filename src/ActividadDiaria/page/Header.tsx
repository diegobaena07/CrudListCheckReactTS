import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ActividadContext } from "../ActividadContext";
import AgregarTarea from "./AgregarTarea";

function Header() {

    const { agregar, setAgregar, setNuevaTarea } = useContext(ActividadContext)

    const onAgregar = () => {
        setAgregar(true)
        setNuevaTarea({
            actividad: "",
            fecha: "",
            estado: false,
            descripcion: "",
        })
    }

    return (
        <div className="row d-flex">
            <h1 className="text-center col-11">ACTIVIDADES</h1>
            <div className="col-1 text-center mt-2">
                <Button variant="success" onClick={onAgregar} style={{ padding: "2px" }}>
                    <span className="material-symbols-sharp d-flex align-self-center" style={{ fontSize: "25px", padding: "1px" }}>add</span>
                </Button>
            </div>
            {agregar && <AgregarTarea />}
        </div>
    )
}

export default Header;