//import files that contains elements located
import home from '../Pages/homePage';
import CF from '../Pages/commonFunctions';

fixture `Make an API call and check it on UI`
	.page `http://localhost:3001/`;

test('Test 1', async t => {
	//Make an API call to retrieve the list of devices.
	const results = await CF.listDevicesAPI(t);
	await t.expect(results.status).eql(200);
	
	//Retrieve values from API call
	const getSystemName = CF.getValueOf(results, "system_name");
	const getType = CF.getValueOf(results, "type");
	const getCapacity = CF.getValueOf(results, "hdd_capacity");
	
	//Retrieve text from UI
	const devicesName = await CF.getText(home.devices, ".device-name");
	const devicesType = await CF.getText(home.devices, ".device-type");
	const devicesCapacity = CF.getNumbers(await CF.getText(home.devices, ".device-capacity"));
	
	//Checking the name, type and capacity of each element of the list
    await t
        .expect(results.status).eql(200)
        .expect(results.statusText).eql('OK')
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