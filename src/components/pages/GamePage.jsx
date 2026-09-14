import Link from '../components/Link';
import Minesweeper from '../components/Minesweeper/Minesweeper';

function GamePage() {
  return (
    <>
      <header className="prose">
        <h1>Minesweeper - React</h1>
        <Link to={'/'}>Atrás</Link>
        <hr />
      </header>
      <main>
        <Minesweeper />
      </main>
    </>
  );
}

export default GamePage;
