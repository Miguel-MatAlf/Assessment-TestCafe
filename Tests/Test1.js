//import files that contains elements located
import home from '../Pages/homePage';

fixture `Make an API call and check it on UI`
	.page `http://localhost:3001/`;

test('Test 1', async t => {
	//Make an API call to retrieve the list of devices.
	const results = await t.request(`http://localhost:3000/devices`);
	
	//Retrieve values from API call
	const getSystemName = getValueOf(results, "system_name");
	const getType = getValueOf(results, "type");
	const getCapacity = getValueOf(results, "hdd_capacity");
	
	//Retrieve text from UI
	const devicesName = await getText(home.devices, ".device-name");
	const devicesType = await getText(home.devices, ".device-type");
	const devicesCapacity = getNumbers(await getText(home.devices, ".device-capacity"));
	
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

//Read the results of attirbute desired and store it in an array
function getValueOf(result, attribute) {
	const array = [];
	for (let i = 0; i < result.body.length; i++){
		array[i] = result.body[i][attribute];
	}
	return array;
}

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