import PanelControl from "../controls/panel.control";
import Logger from "../helpers/logger.helper";
import TextBox from "../controls/textBox.control";
import SelectList from "../controls/selectList.control";
import Panel from "../controls/panel.control";
import AppScreen from "./app.screen";
import RadioArea from "../controls/radioArea.control";
import Button from "../controls/button.control";

const SELECTORS = {
    COMMON_PANEL: function () {
        return {
            CONTAINER: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}parentPanel' or @resource-id='${process.env.ELEMENT_ID_PREFIX}action_bar_root']`,
            // TODO: Add more child selectors
        };
    },
    NEW_VARIABLE_PANEL: function () {
        return {
            CONTAINER: `//*[./*[@resource-id='${process.env.ELEMENT_ID_PREFIX}title']]`,
            NAME_TEXT_BOX: function () {
                return `${this.CONTAINER}//*[starts-with(@resource-id,'${process.env.ELEMENT_ID_PREFIX}variable_new_variable_dialog_name')]`
            },
            TYPE_SELECT_LIST: function () {
                return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}variable_new_variable_type_spinner']`
            },
        };
    },
    EDIT_VARIABLE_PANEL: function () {
        return {
            CONTAINER: `//*[./*[@resource-id='${process.env.ELEMENT_ID_PREFIX}action_bar_root']]`,
            NAME_TEXT_BOX: function () {
                return `${this.CONTAINER}//*[starts-with(@resource-id,'${process.env.ELEMENT_ID_PREFIX}variable_name')]`
            },
            VALUE_TEXT_BOX: function () {
                return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}enter_variable_dialog_value']`
            },
            BOOLEAN_RADIO_AREA: function () {
                return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}booleanValueContainer']`
            },
        };
    },
    ADVERSTIMENT: function () {
        return {
            CLOSE_BUTTON: `//*[@content-desc="Interstitial close button"]`,
            // TODO: Add more child selectorsx
        };
    },
}

class SharedScreen extends AppScreen {
    constructor() {
        super()
    }
/*** Variables Panel  ***/
async enterNewVariableName(name: string) {
        Logger.action(`Enter new variable name [${name}] from New Variable Panel`);
        await TextBox.enterValue(SELECTORS.NEW_VARIABLE_PANEL().NAME_TEXT_BOX(), name)
    }

    async selectVariableType(type: string) {
        Logger.action(`Select variable type [${type}] from New Variable Panel`);
        await SelectList.selectOption(SELECTORS.NEW_VARIABLE_PANEL().TYPE_SELECT_LIST(), type)
    }

    async tapOnOkFromNewVariablePanel() {
        Logger.action(`Tap on button [OK] from New Variable Panel`);
        await Panel.tapOnOkButton(SELECTORS.NEW_VARIABLE_PANEL().CONTAINER)
    }

    async tapOnOkFromEditVariablePanel() {
        Logger.action(`Tap on button [OK] from Edit Variable Panel`);
        await Panel.tapOnOkButton(SELECTORS.EDIT_VARIABLE_PANEL().CONTAINER)
    }

    async enterEditVariableName(name: string) {
        Logger.action(`Enter new variable name [${name}] from Edit Variable Panel`);
        await TextBox.enterValue(SELECTORS.EDIT_VARIABLE_PANEL().NAME_TEXT_BOX(), name)
    }

    async enterVariableValue(value: string) {
        Logger.action(`Enter variable value [${value}] from Edit Variable Panel`);
        await TextBox.enterValue(SELECTORS.EDIT_VARIABLE_PANEL().VALUE_TEXT_BOX(), value)
    }

    async selectBooleanVariableValue(value: string) {
        Logger.action(`Select variable value [${value}] from Edit Variable Panel`);
        await RadioArea.selectRadioOption(SELECTORS.EDIT_VARIABLE_PANEL().BOOLEAN_RADIO_AREA(), value)
    }

    async selectVariableValue() {
        // TODO
    }

    async tapOnDiscardButtonFromPanel() {
        await PanelControl.tapOnDiscardButton(SELECTORS.COMMON_PANEL().CONTAINER)
    }

    async tapOnCancelButtonFromPanel() {
        await PanelControl.tapOnCancelButton(SELECTORS.COMMON_PANEL().CONTAINER)
    }

    async tapOnOkButtonFromPanel() {
        await PanelControl.tapOnOkButton(SELECTORS.COMMON_PANEL().CONTAINER)
    }

    async inputNewVariableValue(value: any, tapOnOk: boolean) {
        await this.enterNewVariableName(value.name)
        await this.selectVariableType(value.type)
        tapOnOk ? await this.tapOnOkFromNewVariablePanel() : await this.tapOnCancelButtonFromPanel()
    }

    async inputEditVariableValue(value: any, tapOnOk: boolean) {
        switch (value.type) {
            case "String":
            case "Integer":
            case "Decimal":
                await this.enterVariableValue(value.value)
                break;
            case "Boolean":
                await this.selectBooleanVariableValue(value.value)
                break;
        }
        tapOnOk ? await this.tapOnOkFromEditVariablePanel() : await this.tapOnCancelButtonFromPanel()
    }

    async isAdsDisplayed() {
        return await super.isDisplayed(SELECTORS.ADVERSTIMENT().CLOSE_BUTTON)
    }

    async tapOnCloseAdsButton() {
        await Button.waitAndTap(SELECTORS.ADVERSTIMENT().CLOSE_BUTTON)
    }
}
export default new SharedScreen()