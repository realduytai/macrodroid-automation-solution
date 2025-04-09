import { Given } from "@cucumber/cucumber";
import SharedScreen from "../screenObjects/shared.screen";
import HomeScreen from "../screenObjects/home.screen";
import AppScreen from "../screenObjects/app.screen";


Given('User is at Home screen', async function () {
    await HomeScreen.waitForScreenDisplayed()
})

Given('User go back and discard changes', async function () {
    await new AppScreen().tapOnBackArrowButton()
    await SharedScreen.tapOnDiscardButtonFromPanel()
})

Given('User go back and skip ads if any', async function () {
    await new AppScreen().tapOnBackArrowButton()
    await SharedScreen.isAdsDisplayed() && await SharedScreen.tapOnCloseAdsButton()
})

