import AppScreen from "../app.screen"
import Logger from "../../helpers/logger.helper"
import Button from "../../controls/button.control"

const SELECTORS = {
    ADD_ICON: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}fab']`,
    BLOCK_BY_NAME: function (name: string) {
        return {
            CONTAINER: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}actionBlockContainer' and ./*[@text='${name}']]`,
            NAME: `.//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}name']`,
            DESCRIPTION: `.//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}description']`
        };
    }
}

class ActionBlocksListingScreen extends AppScreen {
    constructor() {
        super()
    }

    async tapOnAddIcon() {
        Logger.info(`Tap on icon [+] on Action Blocks Listing Screen`);
        await Button.waitAndTap(SELECTORS.ADD_ICON)
    }

    async tapOnActionBlock(name: string) {
        Logger.info(`Tap on Action Block [${name}]`);
        await Button.waitAndTap(SELECTORS.BLOCK_BY_NAME(name).CONTAINER)
    }

    async getDisplayedActionBlock() {
        Logger.info(`Get Action Block from screen`);
        const eleArr = await super.findElements(SELECTORS.BLOCK_BY_NAME('').CONTAINER)
        const blocks = await eleArr.map(async (ele) => {
            return {
                name: await ele.$(SELECTORS.BLOCK_BY_NAME('').NAME).getText(),
                description: await ele.$(SELECTORS.BLOCK_BY_NAME('').DESCRIPTION).getText()
            }
        })
        Logger.info('Displaying Action Blocks: ' + JSON.stringify(blocks))
        return blocks;
    }
}

export default new ActionBlocksListingScreen()
