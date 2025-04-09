import BasePage from "./baseControl.control"

const SELECTORS = {
    RADIO_OPTION: (text: string) => `//*[matches(@text, '${text}', 'i')]`,
}

class RadioArea extends BasePage {
    constructor() {
        super()
    }

    async selectRadioOption(areaSelector: string, text: string) {
        let radioEle = browser.$(areaSelector + SELECTORS.RADIO_OPTION(text))
        await radioEle.waitForDisplayed({ timeout: 5000 })
        await radioEle.click()
    }
}
export default new RadioArea()
