//import files that contains elements located
import home from '../Pages/homePage';
import addPage from '../Pages/addDevicePage';
import CF from '../Resources/commonFunctions';
import API from '../Resources/apiFunctions';
import data from '../Resources/data';

let response = {};
const HP = data.pageElements.homePage;
const Att = data.attributes;

fixture `Assessment Automation`
	.page `${API.getURL()}`
	.beforeEach(async t => {
		await t
			.maximizeWindow()
			//Verify logo was loaded
			.expect(home.ninjaLogo.visible).ok();
		//API call to retrieve list of devices
		response = await API.getMethod(t);
		await t.expect(response.status).eql(200);
	});

test('Test 1: Verify that all devices contain the edit and delete buttons', async t => {
	//Retrieve values from API call
	const getSystemName = CF.getValueOf(response, Att.systemName);
	const getType = CF.getValueOf(response, Att.type);
	const getCapacity = CF.getValueOf(response, Att.capacity);
	
	//Retrieve text from UI
	const devicesName = await CF.getText(home.devices, HP.devicesName);
	const devicesType = await CF.getText(home.devices, HP.devicesType);
	const devicesCapacity = CF.getNumbers(await CF.getText(home.devices, HP.devicesCapacity));
	
	//Checking the name, type and capacity of each element of the list
	await t
		.expect(getSystemName.sort()).eql(devicesName.sort())
		.expect(getType.sort()).eql(devicesType.sort())
		.expect(getCapacity.sort()).eql(devicesCapacity.sort());
		
	//Verify that all devices contain the edit and delete buttons
	for (let i = 0; i < await home.devices.count; i++) {
		await t
			.expect(home.devices.find(HP.editButtons).nth(i).visible).ok()
			.expect(home.devices.find(HP.removeButtons).nth(i).visible).ok();
	}
});

test('Test 2: Verify that devices can be created properly using the UI', async t => {
	const name = 'Test Add New Device';
	const type = 'WINDOWS WORKSTATION';
	const capac = '512';
	
	//Adding device through UI
	await addPage.addDevice(t, name, type, capac);
		
	//Verify device was added successfully
	//Retrieve text from UI
	const devicesName = await CF.getText(home.devices, HP.devicesName);
	const devicesType = await CF.getText(home.devices, HP.devicesType);
	const devicesCapacity = CF.getNumbers(await CF.getText(home.devices, HP.devicesCapacity));
	
	//Verify the device added is displayed in UI
	await t
		.expect(devicesName).contains(name)
		.expect(devicesType).contains(type)
		.expect(devicesCapacity).contains(capac);
});

test('Test 3: Make an API call that renames the first device of the list to \“Rename Device\”', async t => {
	const update = "Rename Device";
	
	//Retrieve values from API call
	const getId = CF.getValueOf(response, Att.id);
	const getType = CF.getValueOf(response, Att.type);
	const getCapc = CF.getValueOf(response, Att.capacity);
	
	//Rename the first element
	const putResponse = await API.putMethod(t, getId[0], update, getType[0], getCapc[0]);
	await t.expect(putResponse.status).eql(200);
	
	//Reload the page and verify the modified device has the new name
	await t.eval(() => location.reload(true));
	const actual = home.devices.find(HP.devicesName).nth(0).innerText;
	await t.expect(actual).eql(update);
	
});

test('Test 4: Make an API call that deletes the last element of the list', async t => {
	//Retrieve values from API call
	const getSystemName = CF.getValueOf(response, Att.systemName);
	const getId = CF.getValueOf(response, Att.id);
	
	//Delete the last element
	const last = response.body.length - 1;
	const deleteResponse = await API.deleteMethod(t, getId[last]);
	await t.expect(deleteResponse.status).eql(200);
	
	//Reload the page and verify the element is no longer visible and it doesn’t exist in the DOM
	await t.eval(() => location.reload(true));
	const actual = await home.devices.find(HP.devicesName).withText(getSystemName[last]);
	await t.expect(await actual.exists).notOk();
	
});