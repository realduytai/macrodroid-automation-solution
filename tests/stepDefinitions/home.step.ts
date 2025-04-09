import { Given } from "@cucumber/cucumber"
import HomeScreen from "../screenObjects/home.screen"
import HomeData from "../data/home.data"


Given('User accesses tile {string}', async function (name) {
    await HomeScreen.tapOnTile(HomeData.tiles[name])
})

