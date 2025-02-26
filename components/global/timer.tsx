import React, { useEffect, useState } from "react";

// Util imports
import { useInterval } from "@mantine/hooks";

interface TimeDisplayProps {
  time: number;
  onTimeEnd?: any;
  startCounting?: boolean;
}

const Timer: React.FC<TimeDisplayProps> = ({
  time,
  onTimeEnd = () => {},
  startCounting,
}) => {
  const [timeLimit, setTimeLimit]: any = useState();
  const interval = useInterval(() => setTimeLimit((s: number) => s - 1), 1000);

  useEffect(() => {
    if (timeLimit <= 0) {
      if (time && onTimeEnd) {
        onTimeEnd(true);
      }
      return interval.stop();
    }
  }, [timeLimit]);

  useEffect(() => {
    if (time > 0) {
      setTimeLimit(time);
    }
    return interval.stop;
  }, [time]);

  useEffect(() => {
    if (startCounting && !interval.active) {
      interval.start();
    } else {
      interval.stop();
    }
  }, [startCounting]);

  return <div>{timeLimit}</div>;
};

export default Timer;
