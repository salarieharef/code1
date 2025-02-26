import { useEffect, useState } from "react";

const DEFAULT_TIMER_DURATION = 120; // in seconds

export const useOTPTimer = (otpExpireTime?: string | null) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otpTimer, setOtpTimer] = useState<number>(DEFAULT_TIMER_DURATION);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const getSecondsUntilExpiration = (expirationTime: string): number => {
    const currentTime = new Date().getTime();
    const expirationTimestamp = new Date(expirationTime).getTime();
    const secondsUntilExpiration = Math.floor(
      (expirationTimestamp - currentTime) / 1000
    );
    return secondsUntilExpiration >= 0 ? secondsUntilExpiration : 0;
  };

  const initTimer = () => {
    const otpExpireTimeInSecond = otpExpireTime
      ? getSecondsUntilExpiration(otpExpireTime)
      : DEFAULT_TIMER_DURATION;
    setOtpTimer(Math.max(otpExpireTimeInSecond, 0));
    setIsTimerActive(true);
  };

  useEffect(() => {
    if (otpExpireTime) {
      initTimer();
    }
  }, [otpExpireTime]);

  useEffect(() => {
    if (otpTimer > 0 && isTimerActive) {
      const timerId = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (otpTimer <= 0 && isTimerActive) {
      setIsTimerActive(false);
    }
  }, [otpTimer, isTimerActive]);

  return { isTimerActive, otpTimer, formatTime, initTimer };
};
