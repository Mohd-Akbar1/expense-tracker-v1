import React, { useEffect, useState } from "react";

const TimeDisplay = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

     
      const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

   
      const date = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

     
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const countryCode = timeZone.split("/")[0]; 

      setDateTime(`${time} | ${date} | IN`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">{dateTime}</span>
    </div>
  );
};

export default TimeDisplay;
