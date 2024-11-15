
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