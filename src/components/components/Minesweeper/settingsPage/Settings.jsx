import settingsJSON from './settings.json';
import OptionsList from './OptionsList';
import Button from '../../Button';
import { useState } from 'react';

function Settings({ selectFunc }) {
  const boardSizes = settingsJSON.map((elem, index) => {
    return `${elem.boardSize.rows}X${elem.boardSize.cols}`;
  });

  const [selectedBoardID, setSelectedBoardID] = useState(0);
  const [selectedMinesID, setSelectedMinesID] = useState(0);

  const mineOptions = settingsJSON[selectedBoardID].mineOptions;

  return (
    <div
      className="
      flex
      flex-col
      font-bold
      uppercase
      text-center
      p-5 border-8
      border-[rgb(128,72,23)]
      rounded-[22px]
      "
    >
      <h2
        className="
        text-[24px]
        text-[rgb(128,72,23)]
      "
      >
        Tamaños de Tableros
      </h2>
      <OptionsList
        items={boardSizes}
        selectedID={selectedBoardID}
        IdSetter={setSelectedBoardID}
      />

      <h2
        className="
        text-[24px]
        text-[rgb(128,72,23)]
        mt-7.5
      "
      >
        Cantidad de Minas
      </h2>

      <OptionsList
        items={mineOptions}
        selectedID={selectedMinesID}
        IdSetter={setSelectedMinesID}
      />

      <Button
        className="
          w-fit
          mx-auto
          text-[25px]
          rounded-[10px]
          bg-[rgb(128,72,23)]
          uppercase
          font-black
          mt-10
        "
        onClick={() => {
          selectFunc({
            rows: settingsJSON[selectedBoardID].boardSize.rows,
            cols: settingsJSON[selectedBoardID].boardSize.cols,
            mines: settingsJSON[selectedBoardID].mineOptions[selectedMinesID],
            ready: true,
          });
        }}
      >
        Empezar
      </Button>
    </div>
  );
}

export default Settings;
