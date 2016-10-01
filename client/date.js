//ouputs Day Month, Year XX:XX AM - (Day Month, Year) XX:XX PM
export const getTimespanText = function(startTime, stopTime) {
	let startText = getDateText(startTime), stopText = getDateText(stopTime);
	let startDate = startText.split(",")[0];
	if (stopText.includes(startDate)) { //startTime and stopTime occur on the same dy
		stopText = stopText.substr(startDate.length + 1);
	}
	return startText + " - " + stopText;
}

function getDateText(timestamp) {
	let date = new Date(timestamp);
	let text = "";
	text += date.getDate();
	text += " ";
	text += ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()]
	text += " ";
	text += date.getUTCFullYear();
	text += ", ";
	text += date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	text += ":";
	text += date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	text += " ";
	text += date.getHours() > 11 ? "PM" : "AM";
	return text;
}