
export default class BaseControl {
    constructor() {

    }

    async waitAndTap(selector: string) {
        let ele = browser.$(selector)
        await ele.waitForDisplayed({ timeout: 5000 })
        await ele.click()
    }

    async tap(selector: string) {
        let ele = browser.$(selector)
        await ele.click()
    }

    async enterValue(selector: string, value: string) {
        let ele = browser.$(selector)
        await ele.waitForDisplayed({ timeout: 5000 })
        await ele.setValue(value)
    }
}
