import Board from './Board';
import Tiles from './Tiles';
import { useState, useEffect } from 'react';

function Game({ settings }) {
  const [tiles, setTiles] = useState(() =>
    Tiles.create(settings.rows, settings.cols, settings.mines),
  );

  return (
    <Board
      tiles={tiles}
      rows={settings.rows}
      cols={settings.cols}
      tileSetter={setTiles}
    />
  );
}

export default Game;
