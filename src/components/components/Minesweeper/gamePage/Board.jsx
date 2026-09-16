import redFlagSvg from '../../../../assets/img/red-flag.svg';
import mineSvg from '../../../../assets/img/mine.svg';

function Board({ tiles, rows, cols, tileSetter }) {
  const tileBaseStyle =
    'border-[#1b71c8] border rounded-xs shadow-[inset_0_-2px_4px_#1b71c89c] cursor-pointer flex justify-center items-center';

  const loosing = () => {};

  const displayArray = tiles.map((elem, index) => {
    let tileVariableStyle = '';
    let minesAround = '';
    let redFlagImgProps = 'hidden';
    let mineImgProps = 'hidden';

    if (!elem.open) {
      tileVariableStyle = 'bg-[#e3ecf6]';
    } else {
      tileVariableStyle = 'bg-[#e3ecf630]';
      if (elem.minesAround) {
        minesAround = elem.minesAround;
      }

      if (elem.mined) {
        mineImgProps = 'block';
      }
    }

    if (elem.flagged) {
      redFlagImgProps = 'block';
    }

    if (elem.mined) {
      tileVariableStyle = 'bg-red-500';
    }

    const leftClickHandle = (tile) => {
      if (tile.mined) {
        loosing();
      }

      if (!tile.open) {
        if (!tile.flagged) {
          tile.open = true;
        }
      }

      if (!tile.minesAround && !tile.mined) {
        tile.tilesAround.forEach((elemAr) => {
          if (!elemAr.mined) {
            if (!elemAr.open) {
              if (!elemAr.flagged) {
                leftClickHandle(elemAr);
              }
            }
          }
        });
      }
    };

    const rightClickHandle = (tile) => {
      if (!tile.open) {
        tile.flagged = !tile.flagged;
      }
    };

    return (
      <div
        className={`${tileBaseStyle} ${tileVariableStyle}`}
        onClick={() => {
          const newTiles = structuredClone(tiles);
          leftClickHandle(newTiles[index]);
          tileSetter(newTiles);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          const newTiles = structuredClone(tiles);
          rightClickHandle(newTiles[index]);
          tileSetter(newTiles);
        }}
        key={index}
      >
        <p>{minesAround}</p>
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
    <div
      className="bg-[#1b71c8] p-1.25 rounded-[5px] grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 30px)`,
        gridTemplateRows: `repeat(${rows}, 30px)`,
      }}
    >
      {displayArray}
    </div>
  );
}

export default Board;
