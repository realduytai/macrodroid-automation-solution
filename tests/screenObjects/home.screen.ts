import AppScreen from "./app.screen"
import Button from "./../controls/button.control"
import Logger from "../helpers/logger.helper"

const SELECTORS = {
    TILE_CONTAINER: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}homeScreenGrid']`,
    TILE_BY_NAME: function (name: string) {
        return {
            CONTAINER: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}tileContainer' and .//*[@text='${name}']]`,
            ICON: function () {
                return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}icon']`
            },
            TEXT: function () {
                return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}title']`
            },
        };
    },
}

class HomeScreen extends AppScreen {
    constructor() {
        super()
    }

    async tapOnTile(name: string) {
        Logger.action(`Tap on tile [${name}]`);
        await Button.waitAndTap(SELECTORS.TILE_BY_NAME(name).ICON())
    }

    async getDisplayingTileName() {
        Logger.action(`Get tile names from screen`);
        const eleArr = await super.findElements(SELECTORS.TILE_BY_NAME("").TEXT())
        const names = eleArr.map((ele) => ele.getText())
        Logger.info('Displaying tiles: ' + names)
        return names;
    }

    async waitForScreenDisplayed() {
        Logger.action(`Wait for screen displayed within ${process.env.WAIT_FOR_TIMEOUT} seconds`);
        await super.waitForScreenDisplayed(SELECTORS.TILE_CONTAINER);
    }
}

export default new HomeScreen()
