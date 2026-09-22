import Button from '../../Button';
import { TimerEngine } from './timerEngine';
import { useState, useEffect, useRef } from 'react';
import mineSvg from '../../../../assets/img/mine.svg';

function InfoBar({ flags, gameState, setGameState }) {
  let emoji = '😃';
  let titleText = '¡Ganaste!';
  let titleProp = 'invisible';
  const [time, setTime] = useState('00:00');

  const timeFormatter = (time) => {
    const minStr = String(time.min).padStart(2, '0');
    const secStr = String(time.sec).padStart(2, '0');
    return `${minStr}:${secStr}`;
  };

  // --- only one instance of timer
  const timerRef = useRef(null);
  if (!timerRef.current) {
    timerRef.current = new TimerEngine(setTime, timeFormatter);
  }
  const timer = timerRef.current;

  useEffect(() => {
    if (gameState === 'playing') {
      timer.start();
    } else {
      const timeInstant = timer.time;
      timer.reset();
      setTime(timeFormatter(timeInstant));
    }

    return () => {
      timer?.stop();
    };
  }, [gameState]);

  if (gameState === 'loss') {
    emoji = '😵';
    titleProp = 'visible';
    titleText = '¡Perdiste!';
  } else if (gameState === 'win') {
    titleProp = 'visible';
  }

  return (
    <>
      <h2 className={`text-[25px] text-center ${titleProp}`}>{titleText}</h2>
      <div className="flex flex-row justify-between items-center w-full pl-2">
        <div>{time}</div>
        <div className="text-[30px]">{emoji}</div>
        <div>
          <p className="flex items-center gap-1">
            <img className="w-6" src={mineSvg} alt="mine" />
            {flags}
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoBar;
