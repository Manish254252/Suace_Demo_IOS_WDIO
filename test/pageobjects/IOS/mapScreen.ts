export class MapScreen {
    get card() {
        return $('~Card grabber');
    }

    get searchField() {
        return $('~MapsSearchTextField');
    }
    get addStopSearchField() {
        return $('~WaypointSearchField');
    }

    get stepsButton() {
        return $('(//XCUIElementTypeButton[@name="StepsLabel-StepsLabel"])[3]');
    }

    get addStopButton() {
        return $('~RoutePlanningAddStopCell');
    }

    // get firstSearchResult() {
    //     return $('(//XCUIElementTypeCell[@name="Maps.PlaceTableViewCell"])[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther');
    // }

    get directionsButton() {
        return $('~ActionRowItemTypeDirections');
    }

    async tapDirectionsButton() {
        await this.directionsButton.click();
    }
    
    async clickCard() {
        return await this.card.click();
    }
    async fillSearchField(text: string) {
        await this.searchField.setValue(text);
    }

    async clickAddStopButton() {
        await this.addStopButton.click();
    }

    async fillAddStopSearchField(text: string) {
        await this.addStopSearchField.setValue(text);
    }

    async clickStepsButton() {
        await this.stepsButton.click();
    }
 
    async selectFirstSearchResult(text: string) {
        const firstSearchResult = $(`-ios predicate string:name == "TitleLabel" AND label == "${text}"`);
        await firstSearchResult.click();
    }
}