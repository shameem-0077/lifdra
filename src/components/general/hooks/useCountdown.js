import { useEffect, useState } from "react";

const useCountdown = (targetDate,currentTimeProp) => {
  const targetDateMs = Date.parse(targetDate);
  // console.log(targetDate, "targetDatetargetDate");
  // const targetDateMs = 1674834120000;
  const [countDown, setCountDown] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTime() {
      setIsLoading(true);
      const response = await fetch(
        `https://developers-notifications.talrop.com/api/v1/main/send/current-time/`
      );
      const data = await response.json();
      setCurrentTime(Date.parse(`${data.data.current_time}+05:30`));
      setIsLoading(false);
    }
    if(!currentTimeProp){
    fetchTime();

    }else{
      setCurrentTime(Date.parse(currentTimeProp));
    }
    
  }, []);

  useEffect(() => {
    // console.log(targetDateMs - currentTime, "targetDateMs - currentTime");
    if (targetDateMs && currentTime) setCountDown(targetDateMs - currentTime);
  }, [currentTime, targetDateMs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((countDown) => countDown - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return getReturnValues(countDown, isLoading);
};

const getReturnValues = (countDown, isLoading) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  let isDanger = false;
  if (seconds < 11 && hours < 1 && minutes < 1) {
    isDanger = true;
  }

  return [days, hours, minutes, seconds, isLoading, isDanger];
};

export { useCountdown };
