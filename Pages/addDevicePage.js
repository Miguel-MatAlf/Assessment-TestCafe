import { Selector } from 'testcafe';
import data from '../Resources/data';
import home from '../Pages/homePage';

let addDevPage = data.pageElements.addDevicePage;

class AddDeviceP {
    constructor () {
		//mapping elements from Add Device page
		this.inputSystemName = Selector(addDevPage.inputSystemName);
		this.dropdownType = Selector(addDevPage.dropdownType);
		this.inputCapacity = Selector(addDevPage.inputCapacity);
		this.saveButton = Selector(addDevPage.saveButton);
    }
	
	//function to add a device
	async addDevice (t, name, type, capacity) {
		let AD = new AddDeviceP();
		await t
			.click(home.addDeviceButton)
			.typeText(AD.inputSystemName, name, {replace: true})
			.click(AD.dropdownType)
			.click(AD.dropdownType.find('option').withText(type))
			.typeText(AD.inputCapacity, capacity, {replace: true})
			.click(AD.saveButton);
	}
}

export default new AddDeviceP();