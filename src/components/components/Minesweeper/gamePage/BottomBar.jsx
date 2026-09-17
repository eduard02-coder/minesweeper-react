import Button from '../../Button';

function BottomBar({ gameState, setGameState }) {
  let btn1Class = 'invisible';
  let btn2Text = 'Abandonar';

  if (gameState === 'win' || gameState === 'loss') {
    btn1Class = 'visible';
    btn2Text = 'Nueva Partida';
  }

  return (
    <div className="flex justify-between mt-2">
      <Button
        onClick={() => {
          setGameState('waiting');
        }}
        className={`${btn1Class}`}
      >
        Reiniciar
      </Button>
      <Button
        onClick={() => {
          setGameState('abort');
        }}
      >
        {btn2Text}
      </Button>
    </div>
  );
}

export default BottomBar;
