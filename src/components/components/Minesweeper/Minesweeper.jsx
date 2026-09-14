import Settings from './Settings';
import Game from './Game';
import { useState } from 'react';

function Minesweeper() {
  const [settingsSelect, setSettingsSelect] = useState({ ready: false });

  console.log(settingsSelect);
  if (!settingsSelect.ready) {
    return <Settings select={settingsSelect} selectFunc={setSettingsSelect} />;
  }
  return <Game chosenSettings={settingsSelect} />;
}

export default Minesweeper;
