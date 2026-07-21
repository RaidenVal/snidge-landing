// 下载链接：以后可能调整，改这里就行
const DOWNLOAD_URLS = {
  windows: 'https://apps.microsoft.com/detail/9nd801hk4rsl?ocid=webpdpshare',
  mac: 'https://github.com/RaidenVal/snidge/releases/latest/download/snidge-1.2.0.dmg',
};

function setupDownloads() {
  document.querySelectorAll('[data-download]').forEach((link) => {
    link.href = DOWNLOAD_URLS[link.dataset.download];
  });
}

document.addEventListener('DOMContentLoaded', setupDownloads);
