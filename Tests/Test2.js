//import files that contains elements located
import home from '../Pages/homePage';
import addDevice from '../Pages/addDevicePage';

fixture `Adding devices using UI`
	.page `http://localhost:3001/`;

test('Test 2', async t => {
	//Verify that devices can be created properly using the UI
	const name = 'Test Add New Device';
	const type = 'WINDOWS WORKSTATION';
	const capac = '512';
	
	//Adding device through UI
	await t
		.click(home.addDeviceButton)
		.typeText(addDevice.inputSystemName, name, {replace: true})
		.click(addDevice.dropdownType)
		.click(addDevice.dropdownType.find('option').withText(type))
		.typeText(addDevice.inputCapacity, capac, {replace: true})
		.click(addDevice.saveButton);
		
	//Verify device was added successfully
	//Retrieve text from UI
	const devicesName = await getText(home.devices, ".device-name");
	const devicesType = await getText(home.devices, ".device-type");
	const devicesCapacity = getNumbers(await getText(home.devices, ".device-capacity"));
	
	//Verify the device added is displayed in UI
	await t
		.expect(devicesName).contains(name)
		.expect(devicesType).contains(type)
		.expect(devicesCapacity).contains(capac);
});

//Function to getText from table in UI
async function getText(elem, attribute) {
	const array = [];
	for(let  i = 0; i < await elem.count; i++) {
		array[i] = await elem.find(attribute).nth(i).innerText;
	}
	return array;
}

//Function to only get the number. Example: you have "10 GB", this function will return "10"
function getNumbers(array) {
	const newArray = [];
	for(let i = 0; i < array.length; i++) {
		const myArray = array[i].split(" ");
		newArray[i] = myArray[0];
	}
	return newArray;
}