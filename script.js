// =========================
// 🌍 Global Helpers
// =========================

// Favicon handling
const favicon = document.getElementById("favicon");
const defaultFavicon = "img/lll.png";
const loadingFavicon = "img/loading.gif"; // 👈 create/add this loading gif inside your img folder

// Track active requests
let activeRequests = 0;

function setFavicon(isLoading) {
  if (favicon) {
    favicon.href = isLoading ? loadingFavicon : defaultFavicon;
  }
}

// Fetch wrapper with favicon loading indicator
async function fetchWithLoading(url, options = {}) {
  try {
    activeRequests++;
    setFavicon(true); // show loading favicon
    const res = await fetch(url, options);
    return res;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    throw err;
  } finally {
    activeRequests--;
    if (activeRequests === 0) {
      setFavicon(false); // back to default favicon
    }
  }
}

// Handle logout globally
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "/login.html";
    });
  }
});
