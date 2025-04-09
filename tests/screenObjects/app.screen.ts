import BaseControl from "../controls/baseControl.control"

const SELECTORS = {
    HEADER: function () {
        return {
            CONTAINER: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}toolbar']`,
            BACK_ARROW_BUTTON: function () {
                return `${this.CONTAINER}//*[@content-desc='Navigate up' or @resource-id='${process.env.ELEMENT_ID_PREFIX}actionBack']`
            },
            TITLE: function (title: string) {
                return `${this.CONTAINER}//*[@content-desc='Navigate up' or @resource-id='${process.env.ELEMENT_ID_PREFIX}actionBack']/following-sibling::*[@text='${title}']`
            }
        };
    },
}

export default class AppScreen {
    constructor() {

    }

    async tapOnBackArrowButton() {
        await new BaseControl().waitAndTap(SELECTORS.HEADER().BACK_ARROW_BUTTON())
    }

    async waitForScreenDisplayed(selector: string) {
        await browser.$(selector).waitForDisplayed()
    }

    async waitForHeaderDisplayed(title: string) {
        await browser.$(SELECTORS.HEADER().TITLE(title)).waitForDisplayed()
    }

    async findElement(selector: string) {
        return browser.$(selector)
    }

    async findElements(selector: string) {
        return browser.$$(selector)
    }

    async isDisplayed(selector: string) {
        return browser.$(selector).isDisplayed()
    }
}
