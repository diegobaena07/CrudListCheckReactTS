import { useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Row } from "react-bootstrap";
import { ActividadContext } from "../ActividadContext";
import '../page/AgregarTarea.css'
import { Tarea } from "../interface/TareaInterface";

function EditarTarea() {

    const { editar, setEditar, setTareas, setEditarTarea, editarTarea, formatFecha, pb } = useContext(ActividadContext)


    const onClose = () => {
        setEditar(false)
    }

    //Guardando la tarea que se edito
    const Edit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        const record = await pb.collection('Tareas').update<Tarea>(id, editarTarea);
        setEditarTarea(record)
        const records = await pb.collection('Tareas').getFullList<Tarea>(undefined, { sort: '-created' });
        setTareas(records);
        setEditar(false);
        //window.localStorage.setItem('editarTarea', JSON.stringify(tareas));
    }

    //Enviando el formulario para que se guarde en el estado
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditarTarea({
            ...editarTarea,
            [name]: value,
        });
    };

    return (
        <Modal show={editar} onHide={onClose} backdrop="static" keyboard={false} centered>
            <Form onSubmit={(e) => Edit(e, editarTarea.id!)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group className="">
                            <Form.Label>Actividad</Form.Label>
                            <Form.Control type="text" name="actividad" defaultValue={editarTarea.actividad} onChange={handleInputChange} required={true} />
                        </Form.Group>
                        <Form.Group className="">
                            <Form.Label className="">Fecha</Form.Label>
                            <input type="date" name="fecha" defaultValue={editarTarea.fecha} onChange={handleInputChange} required={true} min={formatFecha} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type="textarea" name="descripcion" defaultValue={editarTarea.descripcion} onChange={handleInputChange} required={true} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} >Cerar</Button>
                    <Button variant="primary" type="submit">Actualizar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditarTarea;