document.addEventListener("DOMContentLoaded", () => {
  const favicon = document.getElementById("favicon");
  if (!favicon) return;

  const normalIcon = "/img/lll.png";       // ✅ absolute path
  const loadingIcon = "/img/loading.gif";  // ✅ absolute path

  // Reset favicon once page finishes loading
  favicon.href = normalIcon;

  // Flash favicon while navigating away
  window.addEventListener("beforeunload", () => {
    favicon.href = loadingIcon;
  });

  // Wrap fetch to show favicon during requests
  window.fetchWithFavicon = async (url, options = {}) => {
    favicon.href = loadingIcon;
    try {
      const res = await fetch(url, options);
      return res;
    } finally {
      favicon.href = normalIcon;
    }
  };
});
