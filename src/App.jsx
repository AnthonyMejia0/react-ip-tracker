import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Arrow from "./images/icon-arrow.svg";
import abbrState from "./lib/abbreviateState";

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [latLong, setLatLong] = useState([0, 0]);
  const API_URL = "https://geo.ipify.org/api/v2/country,city";
  const API_KEY = "at_eTw82tUisAUgUrwuHFJB3iqK1wlSw";
  const regexExpIP =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  const fetchLocationData = async () => {
    const apiResults = await fetch(
      `${API_URL}?apiKey=${API_KEY}&${
        regexExpIP.test(search) ? "ipAddress" : "domain"
      }=${search}`
    ).catch((err) => console.error(err));

    const result = await apiResults.json();
    console.log("NEW >>", result);

    setSearchResults(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SEARCH >>", search);
    fetchLocationData();
    setSearch("");
  };

  useEffect(() => {
    if (searchResults) {
      setLatLong([searchResults.location.lat, searchResults.location.lng]);
    }
  }, [searchResults]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const apiResults = await fetch(`${API_URL}?apiKey=${API_KEY}`).catch(
        (err) => console.error(err)
      );

      const result = await apiResults.json();

      setSearchResults(result);
    };
    fetchInitialData();
  }, []);

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

      <div className="relative z-0 flex flex-col overflow-hidden lg:bg-[url(./images/pattern-bg.png)] bg-gray-300 h-screen w-screen bg-no-repeat md:bg-contain">
        <div className="absolute bg-[url(./images/pattern-bg.png)] bg-no-repeat bg-cover bg-center top-0 left-0 w-full h-[22rem] bg-red-300 overflow-hidden lg:hidden"></div>

        <div className="relative h-[22rem]">
          <h3 className="text-center text-white text-[1.75rem] lg:text-4xl font-medium p-8 lg:mt-4">
            IP Address Tracker
          </h3>
          <form
            className="flex items-center justify-center mx-6 lg:mt-4"
            onSubmit={handleSubmit}
          >
            <input
              className="truncate flex-1 max-w-[40rem] h-14 py-1 px-6 rounded-tl-2xl rounded-bl-2xl text-[#2b2b2b]"
              type="text"
              name="searche.preventDefault();"
              placeholder="Search for any IP address or domain"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="flex items-center justify-center bg-black hover:bg-[#2b2b2b] w-14 h-14 rounded-tr-2xl rounded-br-2xl">
              <img src={Arrow} alt="Search Arrow" />
            </button>
          </form>

          <div className="flex items-center justify-center p-6 lg:mt-10">
            <div className="flex flex-col z-10 w-full lg:max-w-[85%] 2xl:max-w-[75%] items-center lg:items-start justify-center space-y-4 lg:space-y-0 lg:flex-row lg:justify-start pt-6 pb-10 lg:pb-12 px-8 text-center lg:text-left bg-white rounded-xl">
              <div className="lg:mr-8 lg:h-16">
                <p className="text-[#969696] text-sm">IP ADDRESS</p>
                <h2 className="lg:pt-2 text-[#2b2b2b] text-xl font-medium lg:text-2xl 2xl:text-3xl lg:h-16 lg:pr-16 lg:border-r">
                  {searchResults?.ip}
                </h2>
              </div>

              <div className="lg:mr-8">
                <p className="text-[#969696] text-sm">LOCATION</p>
                <div className="lg:h-16 lg:pr-16 lg:pb-20 lg:border-r">
                  <h2 className="lg:pt-2 text-[#2b2b2b] text-xl font-medium lg:text-2xl 2xl:text-3xl">
                    {searchResults?.location.city},{" "}
                    {abbrState(searchResults?.location.region)}{" "}
                    {searchResults?.location.postalCode}
                  </h2>
                </div>
              </div>

              <div className="lg:mr-8">
                <p className="text-[#969696] text-sm">TIMEZONE</p>
                <h2 className="lg:pt-2 text-[#2b2b2b] text-xl font-medium lg:text-2xl 2xl:text-3xl lg:h-16 lg:pr-16 lg:border-r">
                  {searchResults?.location.timezone}
                </h2>
              </div>

              <div className="lg:pr-16">
                <p className="text-[#969696] text-sm">ISP</p>
                <h2 className="lg:pt-2 text-[#2b2b2b] text-xl font-medium lg:text-2xl 2xl:text-3xl">
                  {searchResults?.isp}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {searchResults && (
          <MapContainer
            center={[searchResults.location.lat, searchResults.location.lng]}
            zoom={18}
            style={{ flex: "1 1 0%", width: "100vw", zIndex: "0" }}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                searchResults.location.lat,
                searchResults.location.lng,
              ]}
            >
              <Popup>
                {searchResults.location.city},{" "}
                {abbrState(searchResults.location.region)}{" "}
                {searchResults.location.postalCode}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </>
  );
}

export default App;
