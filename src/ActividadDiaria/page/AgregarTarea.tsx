import { useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Row } from "react-bootstrap";
import { ActividadContext } from "../ActividadContext";
import '../page/AgregarTarea.css'
import { Tarea } from "../interface/TareaInterface";

function AgregarTarea() {

    const { agregar, setAgregar, tareas, setTareas, nuevaTarea, setNuevaTarea, formatFecha, pb } = useContext(ActividadContext)

    const onClose = () => {
        setAgregar(false)
    }

    //Creando la tarea para el estado en la base de datos
    const CrearTarea = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const record = await pb.collection('Tareas').create<Tarea>(nuevaTarea);
        var valorNuevo = { ...record };
        var lista = tareas;
        lista.push(valorNuevo);
        setAgregar(false)
        setTareas(lista)
        //window.localStorage.setItem('nuevaTarea', JSON.stringify(nuevaLista));
    }

    //Enviando el formulario para que se guarde en el estado
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNuevaTarea({
            ...nuevaTarea,
            [name]: value,
        });
    };

    return (
        <Modal show={agregar} onHide={onClose} backdrop="static" keyboard={false} centered>
            <Form onSubmit={(e) => CrearTarea(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group className="">
                            <Form.Label>Actividad</Form.Label>
                            <Form.Control type="text" name="actividad" value={nuevaTarea.actividad} onChange={handleInputChange} required={true} />
                        </Form.Group>
                        <Form.Group className="">
                            <Form.Label className="">Fecha</Form.Label>
                            <input type="date" name="fecha" value={nuevaTarea.fecha} onChange={handleInputChange} required={true} min={formatFecha} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type="textarea" name="descripcion" value={nuevaTarea.descripcion} onChange={handleInputChange} required={true} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} >Cerar</Button>
                    <Button variant="primary" type="submit">Agregar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AgregarTarea;
