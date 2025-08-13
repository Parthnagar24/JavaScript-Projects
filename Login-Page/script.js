document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission

    const username = form.querySelector('input[type="text"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // Simulate successful login
    alert(`Welcome, ${username}! 🎉`);

    // Reset the form
    form.reset();
  });
});
