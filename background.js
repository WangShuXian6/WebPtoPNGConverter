chrome.action.onClicked.addListener((tab) => {
    // 当用户点击扩展图标时，发送一个消息到content_script.js，触发图片转换
    chrome.tabs.sendMessage(tab.id, { action: "toggleConversion" });
});

// 监听来自内容脚本或选项页面的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "conversionCompleted") {
        // 处理图片转换完成的消息
        console.log("Image conversion completed.");
        // 可以在这里更新扩展图标或显示通知，以反馈转换结果
    }
    // 可能还会有其他类型的消息需要处理
});

// 这里可以添加更多的事件监听器和函数，以支持扩展的其他功能
