//import files that contains elements located
import home from '../Pages/homePage';
import CF from '../Resources/commonFunctions';
import API from '../Resources/apiFunctions';

fixture `Make an API call and check it on UI`
	.page `${API.getURL()}`;

test('Test 1', async t => {
	//Make an API call to retrieve the list of devices.
	const response = await API.getMethod(t);
	await t.expect(response.status).eql(200);
	
	//Retrieve values from API call
	const getSystemName = CF.getValueOf(response, "system_name");
	const getType = CF.getValueOf(response, "type");
	const getCapacity = CF.getValueOf(response, "hdd_capacity");
	
	//Retrieve text from UI
	const devicesName = await CF.getText(home.devices, ".device-name");
	const devicesType = await CF.getText(home.devices, ".device-type");
	const devicesCapacity = CF.getNumbers(await CF.getText(home.devices, ".device-capacity"));
	
	//Checking the name, type and capacity of each element of the list
    await t
        .expect(getSystemName.sort()).eql(devicesName.sort())
		.expect(getType.sort()).eql(devicesType.sort())
		.expect(getCapacity.sort()).eql(devicesCapacity.sort());
		
	//Verify that all devices contain the edit and delete buttons
	for (let i = 0; i < await home.devices.count; i++) {
		await t
			.expect(home.devices.find(".device-edit").nth(i).visible).ok()
			.expect(home.devices.find(".device-remove").nth(i).visible).ok();
	}
});