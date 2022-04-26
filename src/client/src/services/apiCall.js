import http from "../api/httpService";

const get = (apiEndPoint) => {
	return http.get(apiEndPoint);
}
const post=(apiEndPoint,data) =>{
	return http.post(apiEndPoint, data);
}

export default {
    get:get,
    post:post
}
