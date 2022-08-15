import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import abbrState from "./lib/abbreviateState";

function LeafletMarker({ searchResults }) {
  const position = [searchResults.location.lat, searchResults.location.lng];
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 18, {
      animate: false,
    });
  }, [map, position]);

  return (
    <div>
      <Marker position={position}>
        <Popup>
          {searchResults.location.city},{" "}
          {abbrState(searchResults.location.region)}{" "}
          {searchResults.location.postalCode}
        </Popup>
      </Marker>
    </div>
  );
}

export default LeafletMarker;
