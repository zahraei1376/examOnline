export function TimeZoneCheck(date) {
	if (new Date().getTimezoneOffset() !== -210) {
		alert('*** لطفا سیستم را به موقعیت ایران تنظیم نمایید ***');
		return false;
	} else {
		return true;
	}
}
