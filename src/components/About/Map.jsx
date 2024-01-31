import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
};
const center = {
  lat: 31.6260575,
  lng: 71.064398,
};

const Map = () => {
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDXu0zXkiCW_C347J6Rrcib_5UsybN2PTg",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{
          ...mapContainerStyle,
          height: isMobile ? "50vh" : "100vh",
        }}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;
