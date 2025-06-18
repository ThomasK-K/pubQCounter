import { useState, useEffect, useRef } from 'react';

const Countdown = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      alert("Countdown beendet!");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const handleStart = () => {
    const inputSeconds = Number(inputRef.current?.value);
    if (inputSeconds > 0) {
      setSeconds(inputSeconds);
      setIsActive(true);
    } else {
      alert("Bitte eine gültige Sekundenzahl eingeben!");
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Countdown Timer</h1>
      <div>
        <input
          type="number"
          ref={inputRef}
          placeholder="Sekunden eingeben"
          disabled={isActive}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={handleStart} disabled={isActive}>
          Start
        </button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>
          Zurücksetzen
        </button>
      </div>
      <div style={{ fontSize: '48px', margin: '20px' }}>
        {seconds}
      </div>
    </div>
  );
};

export default Countdown;