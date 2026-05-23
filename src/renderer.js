/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

const loginForm = document.getElementById('login-form');
const errorMessageElement = document.querySelector('.error-message');
const loadingSpinner = document.querySelector('.loading-spinner');

// ===== LOGIN PAGE LOGIC =====
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Show loading state
    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in...';

    try {
      console.log('Attempting login with username:', username);
      
      // Call main process to handle login
      const result = await window.electronAPI.login({
        username,
        password,
      });

      console.log('Login result:', result);

      if (result.success) {
        console.log('Login successful, navigating to dashboard...');
        window.location.href = 'src/dashboard.html';
      } else {
        console.error('Login failed:', result.error);
        showError(errorMessageElement, result.error || 'Login failed');
        submitButton.disabled = false;
        submitButton.textContent = 'SIGN IN';
      }
    } catch (error) {
      console.error('Login error:', error);
      showError(errorMessageElement, error.message);
      submitButton.disabled = false;
      submitButton.textContent = 'SIGN IN';
    }
  });
}

function showError(element, message) {
  if (element) {
    element.textContent = message;
    element.style.display = 'block';
  }
}
