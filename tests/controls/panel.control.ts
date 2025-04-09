import BasePage from "./baseControl.control"
import Button from "./button.control";

const SELECTORS = {
    OK_BUTTON: `//*[@text='OK']`,
    CANCEL_BUTTON: `//*[@text='CANCEL']`,
    DISCARD_BUTTON: `//*[@text='DISCARD']`,
}

class Panel extends BasePage {
    constructor() {
        super()
    }

    async tapOnCancelButton(selector: string) {
        await Button.waitAndTap(selector + SELECTORS.CANCEL_BUTTON)
    }

    async tapOnOkButton(selector: string) {
        await Button.waitAndTap(selector + SELECTORS.OK_BUTTON)
    }

    async tapOnDiscardButton(selector: string) {
        await Button.waitAndTap(selector + SELECTORS.DISCARD_BUTTON)
    }
}
export default new Panel()
