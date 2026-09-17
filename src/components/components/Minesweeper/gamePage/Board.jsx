import redFlagSvg from '../../../../assets/img/red-flag.svg';
import mineSvg from '../../../../assets/img/mine.svg';
import { useState, useEffect } from 'react';

function Board({
  tiles,
  rows,
  cols,
  tileSetter,
  gameState,
  setGameState,
  flags,
  setFlags,
}) {
  if (gameState === 'abort') return;

  const tileBaseStyle =
    'border-[#1b71c8] border rounded-xs shadow-[inset_0_-2px_4px_#1b71c89c] cursor-pointer flex justify-center items-center';

  const [remainingMines, setRemainingMines] = useState(flags);

  useEffect(() => {
    if (remainingMines === 0) {
      setGameState('win');
    }
  }, [remainingMines]);

  const displayArray = tiles.map((elem, index) => {
    let tileVariableStyle = '';
    let minesAround = '';
    let redFlagImgProps = 'hidden';
    let mineImgProps = 'hidden';
    let minesAroundProps = '';

    if (!elem.open) {
      tileVariableStyle = 'bg-[#e3ecf6]';
    } else {
      tileVariableStyle = 'bg-[#e3ecf630]';
      if (elem.minesAround) {
        minesAround = elem.minesAround;

        switch (elem.minesAround) {
          case 1:
            minesAroundProps = 'text-[#fffefe]';

            break;

          case 2:
            minesAroundProps = 'text-[#6ce307]';

            break;

          case 3:
            minesAroundProps = 'text-[#fe087d]';

            break;

          case 4:
            minesAroundProps = 'text-[#d0a510]';

            break;

          case 5:
            minesAroundProps = 'text-[#ff7788]';

            break;

          case 6:
            minesAroundProps = 'text-[#66cccc]';

            break;

          case 7:
            minesAroundProps = 'text-[#4f0404]';

            break;

          case 8:
            minesAroundProps = 'text-[#132603]';

            break;
        }
      }

      if (elem.mined) {
        mineImgProps = 'block';
      }
    }

    if (elem.flagged) {
      redFlagImgProps = 'block';
    }

    // if (elem.mined) {
    //   tileVariableStyle = 'bg-black';
    // }

    const leftClickHandle = (tile, newTiles) => {
      if (tile.open || tile.flagged) {
        return;
      }

      tile.open = true;

      if (tile.mined) {
        setGameState('loss');
        newTiles.forEach((t) => {
          if (t.mined && !t.flagged) t.open = true;
        });
      }

      if (!tile.minesAround && !tile.mined) {
        tile.tilesAround.forEach((t) => {
          if (!t.mined && !t.open && !t.flagged) {
            leftClickHandle(t);
          }
        });
      }
    };

    const rightClickHandle = (tile) => {
      if (tile.open) return;

      const plantFlag = () => {
        tile.flagged = true;
        setFlags(flags - 1);

        if (tile.mined) {
          setRemainingMines(remainingMines - 1);
        }
      };

      const removeFlag = () => {
        tile.flagged = false;
        setFlags(flags + 1);

        if (tile.mined) {
          setRemainingMines(remainingMines + 1);
        }
      };

      if (!tile.flagged) {
        if (flags) {
          plantFlag();
        }
      } else {
        removeFlag();
      }
    };

    return (
      <div
        className={`${tileBaseStyle} ${tileVariableStyle}`}
        onClick={() => {
          let effectiveGameState = gameState;

          if (gameState === 'waiting') {
            setGameState('playing');
            effectiveGameState = 'playing';
          }

          if (effectiveGameState === 'playing') {
            const newTiles = structuredClone(tiles);
            leftClickHandle(newTiles[index], newTiles);
            tileSetter(newTiles);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();

          let effectiveGameState = gameState;

          if (gameState === 'waiting') {
            setGameState('playing');
            effectiveGameState = 'playing';
          }

          if (effectiveGameState === 'playing') {
            const newTiles = structuredClone(tiles);
            rightClickHandle(newTiles[index]);
            tileSetter(newTiles);
          }
        }}
        key={index}
      >
        <p className={`font-bold ${minesAroundProps}`}>{minesAround}</p>
        <img
          className={`w-4.25 ${redFlagImgProps}`}
          src={redFlagSvg}
          alt="red-flag"
        />
        <img className={`w-6 ${mineImgProps}`} src={mineSvg} alt="mine" />
      </div>
    );
  });

  return (
    <>
      <div
        className="bg-[#1b71c8] p-1.25 rounded-[5px] grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 30px)`,
          gridTemplateRows: `repeat(${rows}, 30px)`,
        }}
      >
        {displayArray}
      </div>
    </>
  );
}

export default Board;
