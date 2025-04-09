import MacroData from "../data/macro.data"
import {Then, When} from "@cucumber/cucumber"
import Logger from "../helpers/logger.helper"
import Object from "../helpers/object.helper"
import SharedScreen from "../screenObjects/shared.screen"
import AddMacroScreen from "../screenObjects/macro/addMacro.screen"
import MacroCategoryScreen from "../screenObjects/macro/macroCategory.screen"


When(/^User adds (Triggers|Actions|Constraints) with values:$/, async function (type, categories) {
    this.categories = Object.isArray(JSON.parse(categories)) ? JSON.parse(categories) : [JSON.parse(categories)];

    for (let i = 0; i < this.categories.length; i++) {
        await AddMacroScreen.tapOnAddIconOfCard(type)
        if (i == 1 && type === MacroData.types.triggers) await SharedScreen.tapOnOkButtonFromPanel()
        await MacroCategoryScreen.tapOnCategory(this.categories[i].name)
        await MacroCategoryScreen.tapOnSubCategory(this.categories[i].subCategory.name)
        switch (this.categories[i].subCategory.name) {
            case MacroData.categories.applications.subCategories.app.name:
                await MacroCategoryScreen.selectOptionFromPanel(this.categories[i].subCategory.option)
                await MacroCategoryScreen.tapOnOkFromPanel()
                if (!this.categories[i].subCategory.applications) {
                    await MacroCategoryScreen.selectOptionFromPanel(MacroData.categories.applications.subCategories.app.options.subOptions.anyApp)
                    await MacroCategoryScreen.tapOnOkFromPanel()
                } else {
                    await MacroCategoryScreen.selectOptionFromPanel(MacroData.categories.applications.subCategories.app.options.subOptions.selectApps)
                    // TODO
                }
                break;
            case MacroData.categories.logging.subCategories.clearLog.name:
            case MacroData.categories.deviceState.subCategories.airplaneMode.name:
            case MacroData.categories.logging.subCategories.openMacroDroidLog.name:
            case MacroData.categories.notification.subCategories.notificationVolume.name:
            case MacroData.categories.connectivity.subCategories.autoSync.name:
                await MacroCategoryScreen.selectOptionFromPanel(this.categories[i].subCategory.option)
                await MacroCategoryScreen.tapOnOkFromPanel()
                break;
            case "TBD": // TODO
            default: // TODO
                break;
        }
    }
})

Then(/^User can see added (Triggers|Actions|Constraints) values$/, async function (type) {
    this.expectedCategories = Object.isArray(this.categories) ? this.categories : [this.categories]
    this.expectedEntries = this.expectedCategories.map((category: any) => {
        switch (category.name) {
            case MacroData.categories.applications.name:
                return {
                    name: category.subCategory.option,
                    detail: category.subCategory.applications ? category.subCategory.applications.name : MacroData.categories.applications.subCategories.app.options.subOptions.anyApp
                }
            case MacroData.categories.logging.name:
            case MacroData.categories.notification.name:
                return {
                    name: category.subCategory.name,
                    detail: category.subCategory.option
                }
            case MacroData.categories.deviceState.name:
            case MacroData.categories.connectivity.name:
                return {
                    name: category.subCategory.option,
                }
            default:
        }

    })
    this.addedCategories = await AddMacroScreen.getAddedCategories(type)

    Logger.verify('Verify added categories compare with expected categories')
    await this.softAssert.expect(async () => {
        await expect(this.expectedEntries).toEqual(this.addedCategories)
    })
})

When('When User adds local variable with values:', async function (value) {
    this.localVariables = JSON.parse(value);

    await AddMacroScreen.tapOnLocalVariableLabel()
    await AddMacroScreen.tapOnAddLocalVariableButton()
    await SharedScreen.inputNewVariableValue(this.localVariables, true)
    await AddMacroScreen.tapOnVariableName(this.localVariables.name)
    await SharedScreen.inputEditVariableValue(this.localVariables, true)
})

Then('User can see added local variables values', async function () {
    this.expectedCategories = Object.isArray(this.localVariables) ? this.localVariables : [this.localVariables]
    this.expectedCategories = this.expectedCategories.map((category: any) => {
        return {
            name: category.name,
            value: category.value
        }
    })
    this.addedVariables = await AddMacroScreen.getVariableFromScreen()

    Logger.verify('Verify added variables compare with expected variables')
    await this.softAssert.expect(async () => {
        await expect(this.expectedCategories).toEqual(this.addedVariables)
    })
})