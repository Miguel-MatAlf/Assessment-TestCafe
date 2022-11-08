import home from '../Pages/homePage';
import CF from '../Pages/commonFunctions';

fixture `Renaming first device`
    .page `http://localhost:3001/`;

test('Test 3', async t => {
	//Make an API call that renames the first device of the list to “Rename Device”
	const update = "Rename Device";
	
	//Make an API call to retrieve the list of devices
	const response = await CF.listDevicesAPI(t);
	await t.expect(response.status).eql(200);
	
	//Retrieve values from API call
	const getId = CF.getValueOf(response, "id");
	const getType = CF.getValueOf(response, "type");
	const getCapc = CF.getValueOf(response, "hdd_capacity");
	
	//Rename the first element
	const putResponse = await CF.putDevice(t, getId[0], update, getType[0], getCapc[0]);
	await t.expect(putResponse.status).eql(200);
	
	//Reload the page and verify the modified device has the new name
	await t.eval(() => location.reload(true));
	const actual = home.devices.find(".device-name").nth(0).innerText;
	await t.expect(actual).eql(update);
	
});