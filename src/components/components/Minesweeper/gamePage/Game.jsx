import Board from './Board';
import Tiles from './Tiles';
import InfoBar from './InfoBar';
import BottomBar from './BottomBar';
import { useState, useEffect } from 'react';

function Game({ settings, setSettings }) {
  const [gameState, setGameState] = useState('waiting');
  const [tiles, setTiles] = useState(
    useState(() => Tiles.create(settings.rows, settings.cols, settings.mines)),
  );
  const [flags, setFlags] = useState(settings.mines);

  useEffect(() => {
    if (gameState === 'abort') {
      setSettings({ ready: false });
    }

    if (gameState === 'waiting') {
      setTiles(Tiles.create(settings.rows, settings.cols, settings.mines));
      setFlags(settings.mines);
    }
  }, [gameState]);

  return (
    <>
      <InfoBar
        flags={flags}
        gameState={gameState}
        setGameState={setGameState}
      />
      <Board
        tiles={tiles}
        rows={settings.rows}
        cols={settings.cols}
        tileSetter={setTiles}
        gameState={gameState}
        setGameState={setGameState}
        flags={flags}
        setFlags={setFlags}
      />
      <BottomBar gameState={gameState} setGameState={setGameState} />
    </>
  );
}

export default Game;
