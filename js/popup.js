console.log('popup');

const button1 = document.getElementById('get_data');
const button2 = document.getElementById('set_data');

// 获取数据
button1.addEventListener('click', () => {
	sendMessageToContentScript({ cmd: 'get' }, (response) => { });
});

// 设置数据
button2.addEventListener('click', () => {
	// 读取数据，第一个参数是指定要读取的key以及设置默认值
	sendMessageToContentScript({ cmd: 'set' }, (response) => { });
});


// // 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
	getCurrentTabId((tabId) => {
		chrome.tabs.sendMessage(tabId, message, function (response) {
			if (callback) callback(response);
		});
	});
}

// 获取当前选项卡ID
function getCurrentTabId(callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (callback) callback(tabs.length ? tabs[0].id : null);
	});
}