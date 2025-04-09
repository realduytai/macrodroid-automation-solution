import BasePage from "./baseControl.control"
import BaseControl from "./baseControl.control";

const SELECTORS = {
    OPTION_BY_TEXT: (text: string) =>`//*[@text='${text}']`,
}

class SelectList extends BasePage {
    constructor() {
        super()
    }

    async selectOption(selector: string, option: string) {
        await new BaseControl().waitAndTap(selector)
        await new BaseControl().waitAndTap(SELECTORS.OPTION_BY_TEXT(option))
    }
}
export default new SelectList()
