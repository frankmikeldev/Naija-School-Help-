// token.js

// 🔐 Save token
export function saveToken(token) {
  localStorage.setItem("token", token);
}

// 🔓 Get token
export function getToken() {
  return localStorage.getItem("token");
}

// 🗑 Remove token
export function removeToken() {
  localStorage.removeItem("token");
}

// 🚪 Logout and redirect
export function logout() {
  removeToken();
  window.location.href = "login.html";
}
