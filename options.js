// 保存设置
function saveOptions(e) {
    e.preventDefault();
    const conversionMethod = document.querySelector('input[name="conversionMethod"]:checked').value;
    chrome.storage.sync.set({conversionMethod});
}

// 加载保存的设置
function restoreOptions() {
    chrome.storage.sync.get({conversionMethod: 'defaultMethod'}, function(data) {
        const method = data.conversionMethod;
        const selector = `input[name="conversionMethod"][value="${method}"]`;
        const radioInput = document.querySelector(selector);
        if (radioInput) {
            radioInput.checked = true;
        } else {
            // 处理错误或设置默认值
            console.error('No matching conversion method found.');
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('optionsForm').addEventListener('submit', saveOptions);
