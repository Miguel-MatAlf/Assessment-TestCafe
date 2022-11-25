import data from '../Resources/data';

const url = data.app.URL;
const endPoint = data.app.endPoint;

class APIRequest {
	getURL() {
		return url;
	}
	
	//GET method
	async getMethod (t) {
		return await t.request(endPoint);
	}
	
	//PUT Device method
	async putMethod(t,id, name, type, capacity) {
		return await t.request({
			url: `${endPoint}/${id}`,
			method: "put",
			body: {system_name: `${name}`, type: `${type}`, hdd_capacity: `${capacity}`}
		});
	}
	
	//DELETE Device method
	async deleteMethod(t, id) {
		return await t.request({
			url: `${endPoint}/${id}`,
			method: "delete"
		});
	}
} 

export default new APIRequest();