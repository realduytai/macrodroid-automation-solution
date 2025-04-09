import {When, Given, Then} from "@cucumber/cucumber"
import Object from "../helpers/object.helper"
import ActionBlocksListingScreen from "../screenObjects/actionBlocks/actionBlocksListing.screen";
import ActionBlocksDetailScreen from "../screenObjects/actionBlocks/actionBlockDetail.screen";
import HomeData from "../data/home.data";
import SharedScreen from "../screenObjects/shared.screen";


Given('User is at Action Blocks Listing screen', async function () {
    await ActionBlocksListingScreen.waitForHeaderDisplayed(HomeData.tiles.actionBlocks);
})

When('User goes to Adding New Action Blocks screen', async function () {
    await ActionBlocksListingScreen.tapOnAddIcon();
})

When(/^User adds (Input Variables|Output Variables) with values:$/, async function (type, values) {
    this.variables = JSON.parse(values);
    switch (type){
        case 'Input Variables':
            this.inputVariables = this.variables
            break;
        case 'Output Variables':
            this.outputVariables = this.variables
            break;
    }
    this.variables = Object.isArray(this.variables) ? this.variables : [this.variables]
    for (const variable of this.variables) {
        await ActionBlocksDetailScreen.tapOnAddIconVariable(type)
        await SharedScreen.inputNewVariableValue(variable, true)

        await ActionBlocksDetailScreen.tapOnExpandVariableIcon(type)
        await ActionBlocksDetailScreen.tapOnValueName(type, variable.name)
        await SharedScreen.inputEditVariableValue(variable, true)
    }
})

When(/^User inputs basic info for the block:$/, async function (summary) {
    this.blockSummary = JSON.parse(summary);
    await ActionBlocksDetailScreen.enterActionBlockName(this.blockSummary.name)
    await ActionBlocksDetailScreen.enterActionBlockDescription(this.blockSummary.description)
})

When(/^User save the changes of the block$/, async function () {
    await ActionBlocksDetailScreen.tapOnTickIcon()
})

Then(/^User can see the added (Input Variables|Output Variables)$/, async function (type) {
    let actualVariables = await ActionBlocksDetailScreen.getVariableFromScreen(type)
    switch (type){
        case 'Input Variables':
            this.expectedVariables = this.inputVariables
            break;
        case 'Output Variables':
            this.expectedVariables = this.outputVariables
            break;
    }
    this.expectedVariables = Object.isArray(this.expectedVariables) ? this.expectedVariables : [this.expectedVariables]
    this.expectedVariables =  this.expectedVariables.map((variable: any) => {
        return {
            name: variable.name,
            value: variable.value
        }
    })

    await this.softAssert.expect(async () => {
        await expect(actualVariables).toEqual(this.expectedVariables)
    })
})

When('User deletes the block {string}', async function (blockName: string) {
    await ActionBlocksListingScreen.tapOnActionBlock(blockName)
    await ActionBlocksDetailScreen.tapOnDeleteBlockIcon()
    await SharedScreen.tapOnOkButtonFromPanel()
})

Then(/^User can see the Action Blocks:$/, async function (blocks: string) {
    this.blocks = JSON.parse(blocks)
    this.expectedblocks = Object.isArray(this.blocks) ? this.blocks : [this.blocks]

    await ActionBlocksListingScreen.waitForHeaderDisplayed("Action Blocks");
    let actualBlocks = await ActionBlocksListingScreen.getDisplayedActionBlock()

    await this.softAssert.expect(async () => {
        await expect(Object.includes(actualBlocks, this.expectedblocks)).toBe(true)
    })
})

Then(/^User cannot see the Action Blocks:$/, async function (blocks: string) {
    this.blocks = JSON.parse(blocks)
    this.expectedblocks = Object.isArray(this.blocks) ? this.blocks : [this.blocks]

    await ActionBlocksListingScreen.waitForHeaderDisplayed("Action Blocks");
    let actualBlocks = await ActionBlocksListingScreen.getDisplayedActionBlock()

    await this.softAssert.expect(async () => {
        await expect(Object.includes(actualBlocks, this.expectedblocks)).toBe(false)
    })
})
