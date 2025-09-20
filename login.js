// =========================
// 👤 Handle Login
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const loginBtn = form?.querySelector("button[type='submit']");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Prevent multiple clicks
      if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.innerText = "Logging in...";
      }

      try {
        // Use favicon-aware fetch if available
        const res = await (window.fetchWithFavicon || fetch)(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "❌ Invalid email or password");
          return;
        }

        // ✅ Save token
        localStorage.setItem("token", data.token);

        // ✅ Redirect to dashboard
        window.location.href = "dashboard.html";
      } catch (err) {
        console.error("❌ Login error:", err);
        alert("⚠️ Unable to login. Please check your internet or try again.");
      } finally {
        // Reset button
        if (loginBtn) {
          loginBtn.disabled = false;
          loginBtn.innerText = "Login";
        }
      }
    });
  }
});
