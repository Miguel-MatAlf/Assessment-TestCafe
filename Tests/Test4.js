import home from '../Pages/homePage';

fixture `Delete last element of the list`
    .page `http://localhost:3001/`;

test('Test 4', async t => {
	//Make an API call that deletes the last element of the list
	
	//Make an API call to retrieve the list of devices.
	const response = await t.request(`http://localhost:3000/devices`);
	await t.expect(response.status).eql(200);
	
	//Retrieve values from API call
	const getSystemName = getValueOf(response, "system_name");
	const getId = getValueOf(response, "id");
	
	//Delete the last element
	const last = response.body.length - 1;
	const deleteResponse = await t.request({
		url: `http://localhost:3000/devices/${getId[last]}`,
		method: "delete"
	});
	await t.expect(deleteResponse.status).eql(200);
	
	//Reload the page and verify the element is no longer visible and it doesn’t exist in the DOM
	await t.eval(() => location.reload(true));
	const actual = await home.devices.find(".device-name").withText(getSystemName[last]);
	await t.expect(await actual.exists).notOk();
	
});

//Read the results of attirbute desired and store it in an array
function getValueOf(result, attribute) {
	const array = [];
	for (let i = 0; i < result.body.length; i++){
		array[i] = result.body[i][attribute];
	}
	return array;
}