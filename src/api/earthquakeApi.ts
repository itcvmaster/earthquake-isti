
import { apiGet } from "./baseApi";

/**
 * Get all earthquake data from url.
 * TODO: Implement filtering based on params.
 * 
 * @param params Filter options like mag or location.
 * @return All earthquake in EarthquakeResponse.
 */
export const fetchEarthquakes = async (params?: Record<string, string>) => {
    try {
        const earthquakes = await apiGet(
            '/v1.0/summary/all_week.geojson',
            params
        );

        return earthquakes;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] fetchEarthquakes failed.', error);
        throw error;
    }
}