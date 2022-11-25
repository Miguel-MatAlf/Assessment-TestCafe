//import files that contains elements located
import home from '../Pages/homePage';
import addPage from '../Pages/addDevicePage';
import CF from '../Resources/commonFunctions';
import API from '../Resources/apiFunctions';

fixture `Adding device using UI`
	.page `${API.getURL()}`;

test('Test 2', async t => {
	//Verify that devices can be created properly using the UI
	const name = 'Test Add New Device';
	const type = 'WINDOWS WORKSTATION';
	const capac = '512';
	
	//Adding device through UI
	await addPage.addDevice(t, name, type, capac);
		
	//Verify device was added successfully
	//Retrieve text from UI
	const devicesName = await CF.getText(home.devices, ".device-name");
	const devicesType = await CF.getText(home.devices, ".device-type");
	const devicesCapacity = CF.getNumbers(await CF.getText(home.devices, ".device-capacity"));
	
	//Verify the device added is displayed in UI
	await t
		.expect(devicesName).contains(name)
		.expect(devicesType).contains(type)
		.expect(devicesCapacity).contains(capac);
});