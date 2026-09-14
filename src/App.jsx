import { Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing';
import GamePage from './components/pages/GamePage';

function App() {
  return (
    <div
      className="
        max-w-none
        py-20
        flex
        flex-col
        justify-center
        items-center
      "
    >
      <title>Minesweeper - React</title>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
