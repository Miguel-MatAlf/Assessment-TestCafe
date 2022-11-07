import { Selector } from 'testcafe';

class AddDevice {
    constructor () {
		//mapping elements from Add Device page
		this.inputSystemName = Selector('#system_name');
		this.dropdownType = Selector('#type');
		this.inputCapacity = Selector('#hdd_capacity');
		this.saveButton = Selector('.submitButton');
    }
}

export default new AddDevice();