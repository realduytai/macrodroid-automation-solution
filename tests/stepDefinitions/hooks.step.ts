import { SoftAssert } from '../helpers/assertion.helper';
import { Before, AfterStep } from '@cucumber/cucumber';
import IntroductionScreen from "../screenObjects/others/introduction.screen";
import UpgradeScreen from "../screenObjects/others/upgrade.screen";
import {BeforeAll} from "@wdio/cucumber-framework";


BeforeAll(async function () {
    try {
        await IntroductionScreen.tapOnSkipButton();
        await UpgradeScreen.tapOnBackArrowButton();
    } catch (error) {
        throw error; // Ensure the failure is reported
    }
});

Before(async function () {
    this.softAssert = new SoftAssert();
});

AfterStep(async function () {
    await this.softAssert.assertAll();
    this.softAssert.clear();
});