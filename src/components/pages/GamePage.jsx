import Link from '../components/Link';
import Minesweeper from '../components/Minesweeper/Minesweeper';

function GamePage() {
  return (
    <>
      <header className="prose">
        <h1>Minesweeper - React</h1>
        <Link to={'/'}>Atrás</Link>
        <p>
          Las opciones de tamaños de tableros y cantidad de minas se pueden
          modificar en el archivo "settings.json", en la etapa de desarollo
        </p>
        <hr />
      </header>
      <main>
        <Minesweeper />
      </main>
    </>
  );
}

export default GamePage;
