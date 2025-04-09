import AppScreen from "../app.screen"
import Button from "../../controls/button.control"
import Logger from "../../helpers/logger.helper"

const SELECTORS = {
    CARD_BY_NAME: function (name: string) {
        return {
            CONTAINER: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}${name.toLowerCase()}Container']`,
            ADD_ICON: function () {
                return `${this.CONTAINER}//*[starts-with(@content-desc,'Add')]`
            },
            NO_VALUE_TEXT: function () {
                return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}no${name}Text']`
            },
            ENTRY_CONTAINERS: function () {
                return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}topLevelContainer']`
            },
            ENTRY_NAME: `.//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}macro_edit_entry_name']`,
            ENTRY_DETAIL: `.//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}macro_edit_entry_detail']`,
        };
    },
    LOCAL_VARIABLE_LABEL: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}localVarsLabel']`,
    VARIABLE_CONTAINER: function () {
        return {
            CONTAINER: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}bottomBar']`,
            ADD_BUTTON: function () {
                return `${this.CONTAINER}//*[starts-with(@resource-id,'${process.env.ELEMENT_ID_PREFIX}addVariableButton')]`
            },
            ADDED_VARIABLES: function () {
                return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}topLevelContainer']`
            },
            ADDED_VARIABLE_BY_NAME: function (name: string) {
            return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}macro_edit_entry_name' and @text='${name}']`
            },
            VARIABLE_NAME: `.//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}macro_edit_entry_name']`,
            VARIABLE_VALUE: `.//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}macro_edit_entry_detail']`
        };
    },
}

class AddMacroScreen extends AppScreen {
    constructor() {
        super()
    }

    async tapOnAddIconOfCard(name: string) {
        Logger.action(`Tap on icon [+] of [${name}]`);
        await Button.waitAndTap(SELECTORS.CARD_BY_NAME(name).ADD_ICON())
    }

    async tapOnLocalVariableLabel() {
        Logger.action(`Tap on label [Local Variables]`);
        await Button.waitAndTap(SELECTORS.LOCAL_VARIABLE_LABEL)
    }

    async tapOnAddLocalVariableButton() {
        Logger.action(`Tap on button [+] of [Local Variables]`);
        await Button.waitAndTap(SELECTORS.VARIABLE_CONTAINER().ADD_BUTTON())
    }

    async getAddedCategories(type: string) {
        Logger.action(`Get added categories from screen`);
        let cateEles = await super.findElements(SELECTORS.CARD_BY_NAME(type).ENTRY_CONTAINERS())
        let entries = []
        for await (const cateEle of cateEles) {
            let isDisplayed = await cateEle.$(SELECTORS.CARD_BY_NAME(type).ENTRY_DETAIL).isDisplayed()
            let entry = {
                name:  await cateEle.$(SELECTORS.CARD_BY_NAME(type).ENTRY_NAME).getText(),
                detail: !isDisplayed ? undefined : await cateEle.$(SELECTORS.CARD_BY_NAME(type).ENTRY_DETAIL).getText()
            }
            entries.push(entry)
        }
        Logger.info(`Added categories of ${type}: ` + JSON.stringify(entries))
        return entries
    }

    async tapOnVariableName(name: string) {
        Logger.action(`Tap on variable name [${name}]`);
        await Button.waitAndTap(SELECTORS.VARIABLE_CONTAINER().ADDED_VARIABLE_BY_NAME(name))
    }

    async getVariableFromScreen() {
        Logger.action(`Get added variable from screen`)
        let varEles = await super.findElements(SELECTORS.VARIABLE_CONTAINER().ADDED_VARIABLES())
        let variables = []
        for await (const varEle of varEles) {
            let variable = {
                name:  await varEle.$(SELECTORS.VARIABLE_CONTAINER().VARIABLE_NAME).getText(),
                value: await varEle.$(SELECTORS.VARIABLE_CONTAINER().VARIABLE_VALUE).getText()
            }
            variables.push(variable)
        }
        Logger.info(`Added local variables: ` + JSON.stringify(variables))
        return variables
    }
}

export default new AddMacroScreen()
