

document.getElementById('loginBtn').addEventListener('click', async function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
      try {
          console.log('Attempting to call Convex mutation: logLoginAttempt');
          // Here you call your Convex mutation to log the login attempt
          const result = await convex.email("logLoginAttempt", { email, success: true });
          console.log('Login attempt logged successfully:', result);
          alert('Login successful!'); // This shows a success message
      } catch (error) {
          console.error('Error logging login attempt:', error);
          alert(`Error during login: ${error.message || error}`);
      }
  } else {
      alert('Please enter both email and password.'); // This handles empty input
  }
});
