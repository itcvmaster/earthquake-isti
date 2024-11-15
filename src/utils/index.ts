import { EarthquakeResponse } from '../types/ApiResponse';
import { IEarthquake } from '../types/Earthquake';

export const calcDistance = (lon1: number, lat1: number, lon2: number, lat2: number) => {
    const R = 6371; // Earth's radius in km
    
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert degrees to radians
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    return distance;
}


export const transform = (response: EarthquakeResponse): IEarthquake[] => {
    const data: IEarthquake[] = response.features.map(_feature => {
        return {
            id: _feature.id,
            title: _feature.properties.title,
            place: _feature.properties.place,
            time: _feature.properties.time,
            mag: _feature.properties.mag,
            lon: _feature.geometry.coordinates[0],
            lat: _feature.geometry.coordinates[1],
        } as IEarthquake;
    });

    return data;
}