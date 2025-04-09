import AppScreen from "../app.screen"
import Logger from "../../helpers/logger.helper"
import Button from "../../controls/button.control"
import TextBox from "../../controls/textBox.control";

const SELECTORS = {
    ACTION_BLOCK_NAME: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}actionBlockNameText']`,
    ACTION_BLOCK_DESCRIPTION: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}description']`,
    DELETE_BLOCK_ICON: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}menu_delete']`,
    TICK_ICON: `//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}acceptButton']`,
    VARIABLES_CARD: function(type: string) {return {
        CONTAINER: `//*[contains(@resource-id,'TopLevelLinearLayout') and .//*[starts-with(@text,'${type}')]]`,
        EXPAND_ICON: function () {
            return `${this.CONTAINER}//*[@content-desc='Expand']`
        },
        ADD_ICON: function () {
            return `${this.CONTAINER}//*[@content-desc='Add Trigger']`
        },
        ADDED_VARIABLES: function () {
            return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}topLevelContainer']`
        },
        ADDED_VARIABLE_BY_NAME: function (name: string) {
            return `${this.CONTAINER}//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}macro_edit_entry_name' and @text='${name}']`
        },
        VARIABLE_NAME: `.//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}macro_edit_entry_name']`,
        VARIABLE_VALUE: `.//*[@resource-id='${process.env.ELEMENT_ID_PREFIX}macro_edit_entry_detail']`
    }},
}

class ActionBlockDetailScreen extends AppScreen {
    constructor() {
        super()
    }

    async enterActionBlockName(name: string) {
        Logger.info(`Enter Action Block name [${name}]`)
        await TextBox.enterValue(SELECTORS.ACTION_BLOCK_NAME, name)
    }

    async enterActionBlockDescription(description: string) {
        Logger.info(`Enter Action Block name [${description}]`)
        await TextBox.enterValue(SELECTORS.ACTION_BLOCK_DESCRIPTION, description)
    }

    async tapOnDeleteBlockIcon() {
        Logger.info(`Tap on icon [Delete Block]`)
        await Button.waitAndTap(SELECTORS.DELETE_BLOCK_ICON)
    }

    async tapOnTickIcon() {
        Logger.info(`Tap on icon [Tick]`)
        await Button.waitAndTap(SELECTORS.TICK_ICON)
    }

    async tapOnAddIconVariable(type: string) {
        Logger.info(`Tap on icon [+] on ${type} card`)
        await Button.waitAndTap(SELECTORS.VARIABLES_CARD(type).ADD_ICON())
    }

    async tapOnExpandVariableIcon(type: string) {
        Logger.info(`Expand ${type} card`)
        await Button.waitAndTap(SELECTORS.VARIABLES_CARD(type).EXPAND_ICON())
    }

    async tapOnValueName(type: string, name: string) {
        Logger.info(`Tap on variable name [${name}] of ${type} card`)
        await Button.waitAndTap(SELECTORS.VARIABLES_CARD(type).ADDED_VARIABLE_BY_NAME(name))
    }

    async getVariableFromScreen(type: string) {
        Logger.action(`Get added variable of ${type} from screen`)
        let varEles = await super.findElements(SELECTORS.VARIABLES_CARD(type).ADDED_VARIABLES())
        let variables = []
        for await (const varEle of varEles) {
            let variable = {
                name:  await varEle.$(SELECTORS.VARIABLES_CARD(type).VARIABLE_NAME).getText(),
                value: (await varEle.$(SELECTORS.VARIABLES_CARD(type).VARIABLE_VALUE).getText()).replace('Default: ', '')
            }
            variables.push(variable)
        }
        Logger.info(`Added ${type}: ` + JSON.stringify(variables))
        return variables
    }
}

export default new ActionBlockDetailScreen()
