import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useContext, useRef, useState } from "react";

const AutocompleteContext = createContext();

const AutocompleteProvider = ({ children }) => {
  const autocompleteRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapLoading, setMapLoading] = useState(false)
  
  
  const handlePlaceSelect = () => {
    if (autocompleteRef.current !== null) {
      setMapLoading(true)
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        setSelectedPlace({
          name: place.name,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
        console.log(place);

      } else {
        console.log("Selected place does not have geometry information.");
      }
      setMapLoading(false)
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };  

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`,
    libraries: ["places"],
  });


  return (
    <AutocompleteContext.Provider
      value={{ autocompleteRef, selectedPlace, handlePlaceSelect, isLoaded, mapLoading }}
    >
      {children}
    </AutocompleteContext.Provider>
  );
};

const useAutocomplete = () => {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error(
      "useAutocomplete must be used within an AutocompleteProvider"
    );
  }
  return context;
};

export { AutocompleteProvider, useAutocomplete };
