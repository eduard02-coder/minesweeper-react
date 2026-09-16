import Settings from './settingsPage/Settings';
import Game from './gamePage/Game';
import { useState } from 'react';

function Minesweeper() {
  const [selectedSettings, setSelectedSettings] = useState({ ready: false });

  if (!selectedSettings.ready) {
    return <Settings selectFunc={setSelectedSettings} />;
  }
  return <Game settings={selectedSettings} />;
}

export default Minesweeper;
