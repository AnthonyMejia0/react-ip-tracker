import { MapContainer, TileLayer } from "react-leaflet";
import LeafletMarker from "./LeafletMarker";

function Leaflet({ searchResults }) {
  const position = [searchResults.location.lat, searchResults.location.lng];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        crossOrigin=""
      />

      <script
        src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
        integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
        crossOrigin=""
      ></script>

      <MapContainer
        center={position}
        zoom={18}
        style={{ flex: "1 1 0%", width: "100vw", height: "100%", zIndex: "0" }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LeafletMarker searchResults={searchResults} />
      </MapContainer>
    </>
  );
}

export default Leaflet;
