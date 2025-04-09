import AppScreen from "../app.screen"
import Button from "../../controls/button.control"
import Logger from "../../helpers/logger.helper"
import Panel from "../../controls/panel.control";
import RadioArea from "../../controls/radioArea.control";

const SELECTORS = {
    CATEGORY_BY_NAME: function (name: string) {
        return {
            CONTAINER: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}category_container' and .//*[@text='${name}']]`,
            NAME: function () {
                return `${this.CONTAINER}//*[starts-with(@resource-id,'${process.env.ELEMENT_ID_PREFIX}category_name')]`
            },
            SUB_CATEGORY_CONTAINER: function (subCategory: string) {
                return `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}select_item_container' and .//*[@text='${subCategory}']]`
            }
        };
    },
    COMMON_PANEL: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}parentPanel']`,
}

class MacroCategoryScreen extends AppScreen {
    constructor() {
        super()
    }

    async tapOnCategory(name: string) {
        Logger.action(`Tap on category [${name}]`);
        await Button.waitAndTap(SELECTORS.CATEGORY_BY_NAME(name).CONTAINER)
    }

    async tapOnSubCategory(subCategoryName: string) {
        Logger.action(`Tap on sub-category [${subCategoryName}]`);
        await Button.waitAndTap(SELECTORS.CATEGORY_BY_NAME('').SUB_CATEGORY_CONTAINER(subCategoryName))
    }

    async selectOptionFromPanel(option: string) {
        Logger.action(`Select option from panel [${option}]`);
        await RadioArea.selectRadioOption(SELECTORS.COMMON_PANEL, option)
    }

    async tapOnCancelFromPanel() {
        Logger.action(`Tap on button [CANCEL] from panel`);
        await Panel.tapOnCancelButton(SELECTORS.COMMON_PANEL)
    }

    async tapOnOkFromPanel() {
        Logger.action(`Tap on button [OK] from panel`);
        await Panel.tapOnOkButton(SELECTORS.COMMON_PANEL)
    }
}

export default new MacroCategoryScreen()
