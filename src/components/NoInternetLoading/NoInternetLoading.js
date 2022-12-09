import React, { useState, useEffect } from "react";
import { Alert } from "antd";

const NoInternetLoading = () => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener("online", () => {
    setOnline(true);
  });
  window.addEventListener("offline", () => {
    setOnline(false);
  });
  if (isOnline) {
    return null;
  }
  return (
    <Alert
      message="No Internet Connection. Please cost some internet and try load again later."
      type="warning"
    />
  );
};

export default NoInternetLoading;