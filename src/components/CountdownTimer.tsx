import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }: { targetDate: Date; }) => {
  const [timeRemaining, setTimeRemaining] = useState(targetDate.getTime() - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1000);

      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTime = (time: number) => {
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    const hours = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);

    return (
      <div className="text-accent text-center text-3xl mt-2">
        <span className="font-nova">{days}d</span> /
        <span className="font-nova">{hours.toString().padStart(2, "0")}h</span> /
        <span className="font-nova">{minutes.toString().padStart(2, "0")}m</span> /
        <span className="font-nova">{seconds.toString().padStart(2, "0")}s</span>
      </div>
    );
  };

  return (
    formatTime(timeRemaining)
  );
};

export default CountdownTimer;