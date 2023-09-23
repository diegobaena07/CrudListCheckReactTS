import PocketBase from 'pocketbase';
import { Tarea } from '../interface/TareaInterface';

export const pb = new PocketBase('http://127.0.0.1:8090');

// you can also fetch all records at once via getFullList
export const consultar = async () => {
    const records = await pb.collection('Tareas').getFullList<Tarea>(undefined, { sort: '-created' });
}

// example create data
export const crear = async () => {
    const record = await pb.collection('Tareas').create("data");
}

// example update data
export const editar = async () => {
    const record = await pb.collection('Tareas').update('RECORD_ID', 'data');
}

// example delete data
export const eliminar = async () => {
    await pb.collection('Tareas').delete('RECORD_ID');
}





