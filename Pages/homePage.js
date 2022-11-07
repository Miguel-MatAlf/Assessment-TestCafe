import { Selector } from 'testcafe';

class Home {
    constructor () {
		//mapping elements from home page
		this.deviceType = Selector('#device_type');
		this.sortBy = Selector('#sort_by');
		this.addDeviceButton = Selector('.submitButton');
		this.devices = Selector('.device-main-box');
    }
}

export default new Home();