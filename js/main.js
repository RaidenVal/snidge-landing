// 下载链接：文件名以后可能调整，改这里就行
const DOWNLOAD_URLS = {
  windows: 'https://github.com/RaidenVal/snidge/releases/latest/download/snidge-setup.exe',
  mac: 'https://github.com/RaidenVal/snidge/releases/latest/download/snidge.dmg',
};

function setupDownloads() {
  document.querySelectorAll('[data-download]').forEach((link) => {
    link.href = DOWNLOAD_URLS[link.dataset.download];
  });
}

document.addEventListener('DOMContentLoaded', setupDownloads);
