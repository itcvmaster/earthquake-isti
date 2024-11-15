
export interface EarthquakeFeature {
    type: 'Feature';
    properties: { 
        title: string,
        place: string,
        time: number,
        mag: number,
    };
    geometry: { type: 'Point', coordinates: number[] };
    id: string;
};

export interface EarthquakeResponse {
    type: 'FeatureCollection';
    metadata: string;
    features: EarthquakeFeature[],
    bbox: Array<number>
};

const a =
{
    "type": "Feature",
    "properties": {
        "mag": 0.7,
        "place": "8 km NW of The Geysers, CA",
        "time": 1731690008010,
        "updated": 1731690104009,
        "tz": null,
        "url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc75086771",
        "detail": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc75086771.geojson",
        "felt": null,
        "cdi": null,
        "mmi": null,
        "alert": null,
        "status": "automatic",
        "tsunami": 0,
        "sig": 8,
        "net": "nc",
        "code": "75086771",
        "ids": ",nc75086771,",
        "sources": ",nc,",
        "types": ",nearby-cities,origin,phase-data,",
        "nst": 8,
        "dmin": 0.009736,
        "rms": 0.01,
        "gap": 152,
        "magType": "md",
        "type": "earthquake",
        "title": "M 0.7 - 8 km NW of The Geysers, CA"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [
            -122.824501037598, // lon
            38.8283348083496, // lat
            1.45000004768372
        ]
    },
    "id": "nc75086771"
};