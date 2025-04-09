import AppScreen from "../app.screen"
import Button from "../../controls/button.control"
import Logger from "../../helpers/logger.helper"

const SELECTORS = {
   SKIP_BUTTON: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}button_skip']`,
}

class IntroductionScreen extends AppScreen {
    constructor() {
        super()
    }

    async tapOnSkipButton() {
        Logger.action(`Tap on button [Skip]`)
        await Button.waitAndTap(SELECTORS.SKIP_BUTTON)
    }
}

export default new IntroductionScreen()
