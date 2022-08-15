import { useEffect, useState } from "react";
import Arrow from "./images/icon-arrow.svg";
import Leaflet from "./Leaflet";
import abbrState from "./lib/abbreviateState";

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const API_URL = "https://geo.ipify.org/api/v2/country,city";
  const API_KEY = process.env.REACT_APP_API_KEY;
  const regexExpIP =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  const regexDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
  const fetchLocationData = async () => {
    const apiResults = await fetch(
      `${API_URL}?apiKey=${API_KEY}&${
        regexExpIP.test(search)
          ? `ipAddress=${search}`
          : regexDomain.test(search)
          ? `domain=${search}`
          : ""
      }`
    ).catch((err) => console.error(err));

    const result = await apiResults.json();
    console.log("NEW >>", result);

    setSearchResults(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLocationData();
    setSearch("");
  };

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
    <div className="relative z-0 flex flex-col overflow-hidden bg-gray-300 h-screen w-screen">
      <div className="absolute bg-[url(./images/pattern-bg.png)] bg-no-repeat bg-cover bg-center top-0 left-0 w-full h-[22rem] overflow-hidden"></div>

      <div className="relative h-[22rem]">
        <h3 className="text-center text-white text-[1.75rem] lg:text-4xl font-medium p-8 lg:mt-4">
          IP Address Tracker
        </h3>
        <form
          className="flex items-center justify-center mx-6 lg:mt-4 focus:outline-0"
          onSubmit={handleSubmit}
        >
          <input
            className="truncate flex-1 max-w-[40rem] h-14 py-1 px-6 rounded-tl-2xl rounded-bl-2xl text-[#2b2b2b] focus:outline-0"
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
        <div className="flex-1">
          <Leaflet searchResults={searchResults} />
        </div>
      )}
    </div>
  );
}

export default App;
