import AppScreen from "../app.screen"
import Logger from "../../helpers/logger.helper"

const SELECTORS = {
    // TBD
}

class UpgradeScreen extends AppScreen {
    constructor() {
        super()
    }

    async tapOnBackArrowButton() {
        Logger.action(`Tap on [Back Arrow] button`);
        await super.tapOnBackArrowButton();
    }
}

export default new UpgradeScreen()
