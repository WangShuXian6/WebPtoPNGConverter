// 监听来自background.js的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleConversion") {
        // 执行图片转换操作
        convertImages();
    }

    if (request.action === "convertImagesOnPage") {
        // 调用转换逻辑
        showLoadingAnimation();
        convertImages();
        hideLoadingAnimation();
    }
});

function convertImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src.endsWith('.webp')) {
            const width = img.offsetWidth;
            const height = img.offsetHeight;

            // 这里添加转换图片的逻辑
            img.onload = () => {
                img.width = width;
                img.height = height;
            };
            img.src = img.src.replace('.webp', '.png');
        }
    });
}


function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px';
    notification.style.border = '1px solid #ddd';
    notification.style.backgroundColor = isSuccess ? '#d4edda' : '#f8d7da';
    notification.style.color = '#3c763d';
    notification.style.zIndex = '1000';
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// 示例用途：当图片转换完成时调用
// showNotification("Image conversion successful!", true);

function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.setAttribute('id', 'loader');
    loader.style.position = 'fixed';
    loader.style.top = '50%';
    loader.style.left = '50%';
    loader.style.width = '50px';
    loader.style.height = '50px';
    loader.style.border = '5px solid #f3f3f3';
    loader.style.borderTop = '5px solid #3498db';
    loader.style.borderRadius = '50%';
    loader.style.animation = 'spin 1s linear infinite';
    document.body.appendChild(loader);

    // CSS动画
    const style = document.createElement('style');
    style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
}

function hideLoadingAnimation() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.parentNode.removeChild(loader);
    }
}

// 示例用途：在开始转换时显示，转换结束后隐藏
// showLoadingAnimation();
// hideLoadingAnimation();
