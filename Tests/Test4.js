import home from '../Pages/homePage';
import CF from '../Pages/commonFunctions';

fixture `Delete last element of the list`
    .page `http://localhost:3001/`;

test('Test 4', async t => {
	//Make an API call that deletes the last element of the list
	
	//Make an API call to retrieve the list of devices.
	const response = await CF.listDevicesAPI(t);
	await t.expect(response.status).eql(200);
	
	//Retrieve values from API call
	const getSystemName = CF.getValueOf(response, "system_name");
	const getId = CF.getValueOf(response, "id");
	
	//Delete the last element
	const last = response.body.length - 1;
	const deleteResponse = await CF.deleteDevice(t, getId[last]);
	await t.expect(deleteResponse.status).eql(200);
	
	//Reload the page and verify the element is no longer visible and it doesn’t exist in the DOM
	await t.eval(() => location.reload(true));
	const actual = await home.devices.find(".device-name").withText(getSystemName[last]);
	await t.expect(await actual.exists).notOk();
	
});