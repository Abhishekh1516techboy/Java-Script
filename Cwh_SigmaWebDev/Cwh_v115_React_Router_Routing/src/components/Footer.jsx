import { useState, useEffect } from "react";

const Footer = () => {
  const [myDate, setMyDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setMyDate(new Date().toLocaleString());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 h-12 text-center fixed bottom-0 left-0 w-full">
      <div className="mt-3 text-md text-white">
        &copy; {myDate} My Website. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
