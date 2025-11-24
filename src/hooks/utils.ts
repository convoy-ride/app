import { useEffect, useState } from "react";

export function useCurrentLocation() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
      }
    }

    function watchLocation() {
      if (navigator.geolocation) {
        return navigator.geolocation.watchPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
      }
    }

    getCurrentLocation();
    const watchId = watchLocation();
    return () => {
      if (typeof watchId !== "undefined")
        navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return location;
}
