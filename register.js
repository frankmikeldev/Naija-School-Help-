// =========================
// 👤 Handle Register
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const registerBtn = form?.querySelector("button[type='submit']");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullName = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!fullName || !email || !password) {
        alert("⚠️ Please fill in all fields");
        return;
      }

      // Disable button while processing
      if (registerBtn) {
        registerBtn.disabled = true;
        registerBtn.innerText = "Registering...";
      }

      try {
        const res = await (window.fetchWithFavicon || fetch)(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: fullName, email, password }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "❌ Registration failed");
          return;
        }

        // ✅ Save token immediately (backend must return it)
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user?.username || fullName);
          // ✅ Go straight to dashboard
          window.location.href = "dashboard.html";
        } else {
          alert("✅ Registered successfully! Please login.");
          window.location.href = "login.html";
        }
      } catch (err) {
        console.error("❌ Register error:", err);
        alert("⚠️ Something went wrong. Try again.");
      } finally {
        if (registerBtn) {
          registerBtn.disabled = false;
          registerBtn.innerText = "Register";
        }
      }
    });
  }
});
