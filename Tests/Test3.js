import home from '../Pages/homePage';

fixture `Renaming first device`
    .page `http://localhost:3001/`;

test('Test 3', async t => {
	//Make an API call that renames the first device of the list to “Rename Device”
	const update = "Rename Device";
	
	//Make an API call to retrieve the list of devices.
	const response = await t.request(`http://localhost:3000/devices`);
	await t.expect(response.status).eql(200);
	
	//Retrieve values from API call
	const getId = getValueOf(response, "id");
	const getType = getValueOf(response, "type");
	const getCapc = getValueOf(response, "hdd_capacity");
	
	//Rename the first element
	const putResponse = await t.request({
		url: `http://localhost:3000/devices/${getId[0]}`,
		method: "put",
		body: {system_name: `${update}`, type: `${getType[0]}`, hdd_capacity: `${getCapc[0]}`}
	});
	await t.expect(putResponse.status).eql(200);
	
	//Reload the page and verify the modified device has the new name
	await t.eval(() => location.reload(true));
	const actual = home.devices.find(".device-name").nth(0).innerText;
	await t.expect(actual).eql(update);
	
});

//Read the results of attirbute desired and store it in an array
function getValueOf(result, attribute) {
	const array = [];
	for (let i = 0; i < result.body.length; i++){
		array[i] = result.body[i][attribute];
	}
	return array;
}