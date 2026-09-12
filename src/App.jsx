import { Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Game from './components/pages/Game';

function App() {
  return (
    <div className="prose ">
      <title>Minesweeper - React</title>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
