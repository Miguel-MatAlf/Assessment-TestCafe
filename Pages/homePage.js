import { Selector } from 'testcafe';
import data from '../Resources/data';

let homePag = data.pageElements.homePage;

class Home {
    constructor () {
		//mapping elements from home page
		this.ninjaLogo = Selector(homePag.ninjaLogo);
		this.deviceType = Selector(homePag.deviceType);
		this.sortBy = Selector(homePag.sortBy);
		this.addDeviceButton = Selector(homePag.addDeviceButton);
		this.devices = Selector(homePag.devices);
    }
}

export default new Home();