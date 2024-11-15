import { useEffect, useState } from "react";
import * as EarthquakeApi from "./api/earthquakeApi";

import { EarthquakeResponse } from "./types/ApiResponse";
import { IEarthquake } from "./types/Earthquake";
import { calcDistance, transform } from "./utils";
import useQuery from "./hooks/useQuery";

/*
  Write pseudocode in react or vue to fetch an api result as a reactive object, 
  and apply a filter (earthquake magnitude or location) 
  based on frontend gui controls

  - Write an API template to be reused for all API Calls.
  - Call the API enpoints in useEffect() hooks to fetch data only once when mounting.
  - Store the fetched data into local states using useState hooks.
  - Do filtering using useEffect() with api result and filter options as dependencies.
  - Show the filtered value.
  - Define Models for better quality.
  - Implement Error handling code.
*/

export default function App() {
    const [earthquakes, setEarthquakes] = useState<IEarthquake[]>([]);
    const [filteredData, setFilteredData] = useState<IEarthquake[]>([]);
    const { data, isPending } = useQuery<EarthquakeResponse>(EarthquakeApi.fetchEarthquakes);

    const [magFilter, setMagFilter] = useState<number>(1.2);
    const [rangeFilter, setRangeFilter] = useState<number>(500.0);
    const [loc, setLocation] = useState([-153.1637, 60.5156]);

    // Apply magnitude filter and location filter
    useEffect(() => {
        if (!data) return;

        const _earthquakes = transform(data);
        setEarthquakes(_earthquakes);

        const filtered = earthquakes.filter((earthquake) => {
            const isMagnitudeValid = earthquake.mag >= magFilter;

            const distance = calcDistance(
                loc[0], loc[1],
                earthquake.lon, earthquake.lat
            );
            const isDistanceValid = distance <= rangeFilter;

            return isMagnitudeValid && isDistanceValid;
        });

        setFilteredData(filtered);
    }, [data, rangeFilter, magFilter, loc]);

    return (
        <div className="earthquake-container">
            <h1>Earthquakes Report</h1>

            <div className="filter-container">
                <div className="filter-item">
                    <label>Minimum Magnitude:</label>
                    <input
                        type="number"
                        value={magFilter}
                        onChange={(e) => setMagFilter(Number(e.target.value))}
                    />
                </div>

                <div className="filter-item">
                    <label>Maximum Distance (km):</label>
                    <input
                        type="number"
                        value={rangeFilter}
                        onChange={(e) => setRangeFilter(Number(e.target.value))}
                    />
                </div>

                <div className="filter-item">
                    <label>Your Location (Lon, Lat):</label>
                    <input
                        type="text"
                        value={loc.join(', ')}
                        onChange={(e) => setLocation(e.target.value.split(', ').map(Number))}
                    />
                </div>
            </div>

            {isPending ? (
                <h2 style={{ textAlign: "center" }}>Loading data...</h2>
            ) : filteredData.length === 0 ? (
                <h2 style={{ textAlign: "center" }}>No data to be displayed</h2>
            ) : (
                <ul className="earthquake-list">
                    {filteredData.map((earthquake) => (
                        <li key={earthquake.id} className="earthquake-item">
                            <h2>{earthquake.place}</h2>
                            <p>Magnitude: {earthquake.mag}</p>
                            <p>Time: {new Date(earthquake.time).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}
