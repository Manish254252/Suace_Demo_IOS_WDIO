// utilities.ts
export async function playGPX(filePath: string) {
    const gpx = require('fs').readFileSync(filePath, 'utf-8');
    await driver.execute('mobile: simulateLocation', [{ gpx }]);
}

/**
 * Follows a realistic road path
 * @param path - Array of { lat: number, lng: number }
 * @param intervalMs - Delay between each street point
 */
export async function simulateNavigation(
    path: { lat: number, lng: number }[], 
    intervalMs: number = 10000
) {
    console.log(`Starting road navigation with ${path.length} waypoints.`);

    for (const point of path) {
        await driver.execute('mobile: setSimulatedLocation', {
            latitude: point.lat,
            longitude: point.lng
        });

        console.log(`At: ${point.lat}, ${point.lng}`);
        await driver.pause(intervalMs);
    }
}

export function generateHighDensityPath(path: {lat: number, lng: number}[], pointsPerBlock: number = 10) {
    const highDensityPath: { latitude: number, longitude: number }[] = [];

    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];

        // Ensure we don't exceed the end point by using j < pointsPerBlock
        for (let j = 0; j < pointsPerBlock; j++) {
            const fraction = j / pointsPerBlock;
            
            // Precise interpolation
            const lat = start.lat + (end.lat - start.lat) * fraction;
            const lng = start.lng + (end.lng - start.lng) * fraction;

            highDensityPath.push({
                latitude: Number(lat.toFixed(6)), // Fixed precision prevents drift
                longitude: Number(lng.toFixed(6))
            });
        }
    }

    // Explicitly set the FINAL coordinate to be EXACTLY the Dragon Gate
    const destination = path[path.length - 1];
    highDensityPath.push({
        latitude: destination.lat,
        longitude: destination.lng
    });

    return highDensityPath;
}

export async function getOSRMRoute(start: {lng: number, lat: number}, end: {lng: number, lat: number}) {
    const url = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
        throw new Error('No route found between these points');
    }

    return data.routes[0].geometry.coordinates.map((coord: any) => ({
        lat: coord[1],
        lng: coord[0]
    }));
}

export function smoothenRoute(path: {lat: number, lng: number}[], pointsBetweenTurns: number = 10) {
    const densePath = [];
    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        for (let j = 0; j < pointsBetweenTurns; j++) {
            const fraction = j / pointsBetweenTurns;
            densePath.push({
                latitude: start.lat + (end.lat - start.lat) * fraction,
                longitude: start.lng + (end.lng - start.lng) * fraction
            });
        }
    }
    // Add exact final destination
    densePath.push({ latitude: path[path.length - 1].lat, longitude: path[path.length - 1].lng });
    return densePath;
}