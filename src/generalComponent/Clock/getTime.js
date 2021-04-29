import { TimeZoneCheck } from './timeZoneCheck';

const { default: Axios } = require('axios');

export let realeTime = new Date();
export let newTime = new Date();
let tryNum = 0;
var lastTime = new Date().getTime();
export async function getTimeAtServer() {
	try {
		await Axios.put('/gettime').then(res => {
			// console.log('res');
			// console.log(res.data.time);
			// alert(res.data.time);
			newTime = res.data.time;
			TimeZoneCheck();
		});
	} catch {
		if (tryNum < 3) {
			tryNum++;
			getTimeAtServer();
		} else {
			// alert('خطای 701');
			alert('لطفا اینترنت خود را بررسی کنید');
		}
	}

	setInterval(async () => {
		newTime += 1000;
		realeTime.setTime(newTime);
		var currentTime = new Date().getTime();
		if (currentTime > lastTime + 1000 * 2) {
			try {
				await Axios.put('/gettime').then(res => {
					// console.log('res');
					// console.log(res.data.time);
					// alert(res.data.time);
					newTime = res.data.time;
				});
			} catch {
				// alert('لطفا اینترنت خود را بررسی کنید');
			}
		}
		lastTime = currentTime;
		// console.log(realeTime.toLocaleString('fa-IR'));
		// console.log(realeTime.toLocaleDateString('fa-IR'));
		// console.log(realeTime.toLocaleTimeString('fa-IR'));
	}, 1000);
}
