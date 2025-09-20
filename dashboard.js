// =========================
// 📚 Dashboard
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const subjectSelect = document.getElementById("subjectSelect");
  const container = document.getElementById("questionsContainer");
  const usernameSpan = document.getElementById("username");
  const logoutBtn = document.getElementById("logoutBtn");

  // 🔒 Redirect if not logged in
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // =========================
  // 🚪 Logout handler
  // =========================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  }

  // =========================
  // 🙍 Load user profile
  // =========================
  async function loadUserProfile() {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const user = await res.json();
      usernameSpan.textContent = user.name || "User";
    } catch (err) {
      console.error("❌ Failed to load profile:", err);
      usernameSpan.textContent = "User";
    }
  }

  loadUserProfile();

  // =========================
  // 📖 Handle subject change
  // =========================
  subjectSelect.addEventListener("change", () => {
    const subject = subjectSelect.value;

    if (subject) {
      showSpinner();
      loadQuestions(subject);
    }
  });

  // Show centered spinner
  function showSpinner() {
    container.innerHTML = `
      <div class="d-flex justify-content-center my-4">
        <div class="spinner-border text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
  }

  // Load questions by subject
  async function loadQuestions(subject) {
    try {
      const res = await fetch(`http://localhost:5000/api/questions/${subject}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const questions = await res.json();
      container.innerHTML = "";

      if (!questions.length) {
        container.innerHTML = `<p class="text-danger">❌ No questions found for ${subject}.</p>`;
        return;
      }

      questions.forEach((q, index) => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 mb-4";

        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${subject.toUpperCase()} - Q${index + 1}</h5>
              <p class="card-text"><strong>Question:</strong> ${q.question}</p>
              <p class="card-text"><strong>Answer:</strong> ${q.answer || "Not available"}</p>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    } catch (err) {
      console.error("❌ Error fetching questions:", err);
      container.innerHTML = `
        <p class="text-danger">⚠️ Failed to load questions.</p>
        <button class="btn btn-sm btn-warning" onclick="retryLoad('${subject}')">🔄 Retry</button>
      `;
    }
  }

  // Retry button handler
  window.retryLoad = (subject) => {
    showSpinner();
    loadQuestions(subject);
  };
});
