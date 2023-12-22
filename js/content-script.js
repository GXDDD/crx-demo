console.log('content script');
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.cmd == 'get') {
		const item = document.querySelector('#maincontent > h1');
		// 保存数据
		chrome.storage.sync.set({ data: item.innerText }, function () {
			console.log('保存数据成功！', item.innerText);
		});
	} else if (request.cmd == 'set') {
		const item = document.querySelector('#kw');
		// 读取数据，第一个参数是指定要读取的key以及设置默认值
		chrome.storage.sync.get({ data: 'no-data' }, function (items) {
			item.value = items.data;
			console.log('获取数据成功！', items.data);
		});
		
	}
});