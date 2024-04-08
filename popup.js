document.getElementById('convertButton').addEventListener('click', () => {
    // 发送消息到content_script.js以启动图片转换流程
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "convertImagesOnPage"});
    });
});

document.getElementById('openOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
});

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const message = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
        if (message) {
            el.textContent = message;
        }
    });
});
