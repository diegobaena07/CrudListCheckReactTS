import ListTareas from './page/ListaTareas';
import Header from './page/Header';
import { ActividadContextProvider } from './ActividadContext';

function Inicio() {
  return (
    <ActividadContextProvider>
      <div className="container">
        <header><Header /></header>
        <div>
          <ListTareas />
        </div>
      </div>
    </ActividadContextProvider>
  );
}

export default Inicio;