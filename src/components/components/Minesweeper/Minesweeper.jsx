import Settings from './settingsPage/Settings';
import Game from './Game';
import { useState } from 'react';

function Minesweeper() {
  const [selectedSettings, setSelectedSettings] = useState({ ready: false });

  if (!selectedSettings.ready) {
    return <Settings s selectFunc={setSelectedSettings} />;
  }
  return <Game chosenSettings={selectedSettings} />;
}

export default Minesweeper;
