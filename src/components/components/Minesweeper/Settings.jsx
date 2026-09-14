import settingsFile from './settings.json';
import List from '../List';
import Button from '../Button';
import { useState } from 'react';

const getSettings = (settings) => {
  const length = settings.length;
  const newList = [];

  for (let i = 0; i < length; i++) {
    newList.push({ ...settings[i], id: i, selected: false });
    settings[i].mineOptions = settings[i].mineOptions.map((elem) => {
      return { mines: elem, selected: false };
    });
  }
  newList[0].selected = true;
  newList[0].mineOptions[0] = true;
  return newList;
};

function Settings({ select, selectFunc }) {
  const settingsList = getSettings(settingsFile);
  const [mineOptions, setMineOptions] = useState([]);
  const [settingsState, setSettingsState] = useState(settingsList);

  const getBoardSizeItems = (settingsList) => {
    const boardSelectHandler = (id) => {
      const selectedItem = settingsList.find((elem) => elem.id === id);

      // --- retrieve info
      selectFunc({
        ...select,
        cols: selectedItem.boardSize.cols,
        rows: selectedItem.boardSize.rows,
      });

      // --- mine options array setup ---
      const mOptions = selectedItem.mineOptions.map((elem) => {
        return { mines: elem, selected: false };
      });
      setMineOptions(mOptions);

      // --- selected button styling ---
      settingsList.forEach((elem) => {
        elem.selected = false;
      });
      selectedItem.selected = true;
    };

    return settingsList.map((elem) => {
      let selectedStyle = '';
      if (elem.selected) {
        selectedStyle = 'text-white bg-[rgb(128,72,23)]';
      }

      return (
        <Button
          className={`w-30 py-2.5 text-[20px] bg-white text-[rgb(128,72,23)] border-2 rounded-[10px] ${selectedStyle}`}
          onClick={() => boardSelectHandler(elem.id)}
        >
          {`${elem.boardSize.rows}X${elem.boardSize.cols}`}
        </Button>
      );
    });
  };

  const boardSizeItems = getBoardSizeItems(settingsState);

  const mineOptionsItems = mineOptions.map((elem) => {
    const mineSelectHandler = () => {
      // --- retrieve info
      selectFunc({
        ...select,
        mines: elem.mines,
      });
    };
    return (
      <Button
        className={`w-30 py-2.5 text-[20px] bg-white text-[rgb(128,72,23)] border-2 rounded-[10px]`}
        onClick={mineSelectHandler}
      >
        {elem.mines}
      </Button>
    );
  });

  const startBtnHandler = () => {
    selectFunc({
      ...select,
      ready: true,
    });
  };

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
      <h2 className="text-[24px] text-[rgb(128,72,23)]">Tamaños de Tableros</h2>

      <List
        className="list-none flex gap-2 justify-center items-center"
        items={boardSizeItems}
      />

      <h2 className="text-[24px] text-[rgb(128,72,23)] mt-7.5">
        Cantidad de Minas
      </h2>

      <List
        className="list-none flex gap-2 justify-center items-center"
        items={mineOptionsItems}
      />
      <Button
        className="w-fit mx-auto text-[25px] rounded-[10px] bg-[rgb(128,72,23)] uppercase font-black mt-10"
        onClick={startBtnHandler}
      >
        Empezar
      </Button>
    </div>
  );
}

export default Settings;
