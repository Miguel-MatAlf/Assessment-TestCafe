class CommonFunc {
	//Read the results of attirbute desired and store it in an array
	getValueOf(result, attribute) {
		const array = [];
		for (let i = 0; i < result.body.length; i++){
			array[i] = result.body[i][attribute];
		}
		return array;
	}

	//Function to getText from table in UI
	async getText(elem, attribute) {
		const array = [];
		for(let  i = 0; i < await elem.count; i++) {
			array[i] = await elem.find(attribute).nth(i).innerText;
		}
		return array;
	}

	//Function to only get the number. Example: you have "10 GB", this function will return "10"
	getNumbers(array) {
		const newArray = [];
		for(let i = 0; i < array.length; i++) {
			const myArray = array[i].split(" ");
			newArray[i] = myArray[0];
		}
		return newArray;
	}
} 

export default new CommonFunc();