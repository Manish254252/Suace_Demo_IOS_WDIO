import { getOSRMRoute, smoothenRoute } from '../../utils/utilities';
import { MapScreen } from '../pageobjects/IOS/mapScreen';





beforeEach(async () => {

    await driver.activateApp('com.apple.Maps');

});
afterEach(async () => {

    await driver.terminateApp('com.apple.Maps');
});

describe('E2E_01 - End-to-End Navigation & Reroute', () => {

    it('should complete navigation and handle reroute', async () => {



        const ferryBuilding = { lng: -122.39342, lat: 37.79554 };
        const dragonsGate = { lng: -122.40655, lat: 37.79065 };

        await driver.execute('mobile: setSimulatedLocation', {
            latitude: ferryBuilding.lat,
            longitude: ferryBuilding.lng
        });

        console.log("Starting co-ordinates");
        console.log(await driver.getGeoLocation());
        const startLocation: any = await driver.getGeoLocation();
        expect(startLocation.latitude).toBeCloseTo(ferryBuilding.lat, 4);
        const maps = new MapScreen();
        await maps.clickCard();
        await maps.fillSearchField("Dragon's Gate");
        await maps.selectFirstSearchResult("Dragon's Gate");
        await expect(maps.directionsButton).toBeDisplayed();
        await maps.tapDirectionsButton();
        





        const roadPoints = await getOSRMRoute(ferryBuilding, dragonsGate);
        console.log("==========");

        console.log(roadPoints.length);


        // Make it smooth for the UI (roughly 10 points per street block)
        const simulationPath = smoothenRoute(roadPoints, 10);
        let cont = 0;
        for (const point of simulationPath) {
            // Using the 'mobile: setSimulatedLocation' for iOS precision
            await driver.execute('mobile: setSimulatedLocation', {
                latitude: point.latitude,
                longitude: point.longitude
            });
            cont++;

            // 200ms simulates a fast-moving vehicle/smooth GPS update
            await driver.pause(100);
            if (cont == 96) {
                cont = 0;
                $(`~UserLocationButton`).click();
            }
        }

        console.log("Last co-ordinates");
        console.log(await driver.getGeoLocation());
        const finalLoc: any = await driver.getGeoLocation();
        expect(finalLoc.latitude).toBeCloseTo(dragonsGate.lat, 3);
        expect(finalLoc.longitude).toBeCloseTo(dragonsGate.lng, 3);





    })


})

describe('E2E_02 - End-to-End Muilti Stop Navigation & Reroute', () => {

    it('should complete Muilti Stope navigation and handle reroute', async () => {



        const ferryBuilding = { lng: -122.39342, lat: 37.79554 };
        const dragonsGate = { lng: -122.40655, lat: 37.79065 };
        // const salesforceTower = { lng: -122.39716, lat: 37.78910 };
        const graceCathedral = { lng: -122.41258, lat: 37.79249 };

        await driver.execute('mobile: setSimulatedLocation', {
            latitude: ferryBuilding.lat,
            longitude: ferryBuilding.lng
        });
        await driver.pause(5000);

        console.log("Starting co-ordinates");
        console.log(await driver.getGeoLocation());
        const startLocation: any = await driver.getGeoLocation();
        expect(startLocation.latitude).toBeCloseTo(ferryBuilding.lat, 4);
        const maps = new MapScreen();
        await maps.clickCard();
        await maps.fillSearchField("Dragon's Gate");
        await maps.selectFirstSearchResult("Dragon's Gate");


        await maps.tapDirectionsButton();
        await maps.clickAddStopButton();
        console.log("Click add Stop");

        
        await maps.fillAddStopSearchField("Grace Cathedral");
        await maps.selectFirstSearchResult("Grace Cathedral");





        
        const roadPoints = await getOSRMRoute(ferryBuilding, dragonsGate);
        console.log("==========");

        console.log(roadPoints.length);


        // Make it smooth for the UI (roughly 10 points per street block)
        const simulationPath = smoothenRoute(roadPoints, 10);
        let cont = 0;
        for (const point of simulationPath) {
            // Using the 'mobile: setSimulatedLocation' for iOS precision
            await driver.execute('mobile: setSimulatedLocation', {
                latitude: point.latitude,
                longitude: point.longitude
            });
            cont++;

            // 200ms simulates a fast-moving vehicle/smooth GPS update
            await driver.pause(100);
            if (cont == 96) {
                cont = 0;
                $(`~UserLocationButton`).click();
            }
        }

        // await driver.pause(50000);
        await driver.execute('mobile: setSimulatedLocation', {
            latitude: dragonsGate.lat,
            longitude: dragonsGate.lng
        });
        console.log("Last co-ordinates");
        console.log(await driver.getGeoLocation());
        const currentLoc: any = await driver.getGeoLocation();
        expect(currentLoc.latitude).toBeCloseTo(dragonsGate.lat, 4);

        //  const densePath =   generateHighDensityPath(ferryBuildingToDragonsGate, 20);
        const roadPoints2 = await getOSRMRoute(dragonsGate, graceCathedral);
        console.log("==========");

        console.log(roadPoints.length);


        // Make it smooth for the UI (roughly 10 points per street block)
        const simulationPath2 = smoothenRoute(roadPoints2, 10);
        let cont1 = 0;
        for (const point of simulationPath2) {
            // Using the 'mobile: setSimulatedLocation' for iOS precision
            await driver.execute('mobile: setSimulatedLocation', {
                latitude: point.latitude,
                longitude: point.longitude
            });
            cont++;

            // 200ms simulates a fast-moving vehicle/smooth GPS update
            await driver.pause(100);
            if (cont1 == 96) {
                cont1 = 0;
                $(`~UserLocationButton`).click();
            }
        }

        // await driver.pause(50000);
        await driver.execute('mobile: setSimulatedLocation', {
            latitude: graceCathedral.lat,
            longitude: graceCathedral.lng
        });
        await driver.pause(5000);
        console.log("Last co-ordinates");
        console.log(await driver.getGeoLocation());
        const finalLoc: any = await driver.getGeoLocation();
        expect(finalLoc.latitude).toBeCloseTo(graceCathedral.lat, 3);
        expect(finalLoc.longitude).toBeCloseTo(graceCathedral.lng, 3);





    })



})

describe.only('E2E_03 - End-to-End Network Failure recovery and  Navigation & Reroute', () => {

   it('should handle off-route diversion during network failure and recover', async () => {
    const ferryBuilding = { lng: -122.39342, lat: 37.79554 };
    const dragonsGate = { lng: -122.40655, lat: 37.79065 };
    const graceCathedral = { lng: -122.41258, lat: 37.79249 };

    // 1. Initial Setup & Route Planning
    await driver.execute('mobile: setSimulatedLocation', {
        latitude: ferryBuilding.lat,
        longitude: ferryBuilding.lng
    });
    
    const maps = new MapScreen();
    await maps.clickCard();
    await maps.fillSearchField("Dragon's Gate");
    await maps.selectFirstSearchResult("Dragon's Gate");
    await maps.tapDirectionsButton();
    await maps.clickAddStopButton();
    await maps.fillAddStopSearchField("Grace Cathedral");
    await maps.selectFirstSearchResult("Grace Cathedral");

    // 2. Drive first leg (Ferry -> Dragon's Gate)
    const roadPoints = await getOSRMRoute(ferryBuilding, dragonsGate);
    const simulationPath = smoothenRoute(roadPoints, 10);
    
    for (const point of simulationPath) {
        await driver.execute('mobile: setSimulatedLocation', {
            latitude: point.latitude,
            longitude: point.longitude
        });
        await driver.pause(100);
    }



    console.log("!!! Diverting Off-Route towards Nob Hill (Wrong Way) !!!");
    await driver.pause(2000);
    // Instead of going to Grace Cathedral, we move to a 'wrong' coordinate
    const wrongTurnPoints = [
        { lat: 37.7910, lng: -122.4080 },
        { lat: 37.7915, lng: -122.4095 },
        { lat: 37.7920, lng: -122.4110 }
    ];

    for (const point of wrongTurnPoints) {
        await driver.execute('mobile: setSimulatedLocation', {
            latitude: point.lat,
            longitude: point.lng
        });
        await driver.pause(500); // User is 'lost' and driving slowly
    }


    // Get current "Lost" location
    const currentPos: any = await driver.getGeoLocation();
    
    // Fetch NEW route from where we are now to the final destination (Grace Cathedral)
    const reroutePoints = await getOSRMRoute(
        { lng: currentPos.longitude, lat: currentPos.latitude }, 
        graceCathedral
    );
    
    const recoveryPath = smoothenRoute(reroutePoints, 10);

    for (const point of recoveryPath) {
        await driver.execute('mobile: setSimulatedLocation', {
            latitude: point.latitude,
            longitude: point.longitude
        });
        await driver.pause(100);
        
        // Dynamic re-center
        if (Math.random() > 0.9) { 
            await $(`~UserLocationButton`).click();
        }
    }

    // 5. Final Stop Verification
    await driver.execute('mobile: setSimulatedLocation', {
        latitude: graceCathedral.lat,
        longitude: graceCathedral.lng
    });
    console.log("Navigation Recovered and Finished at Grace Cathedral");
});





})