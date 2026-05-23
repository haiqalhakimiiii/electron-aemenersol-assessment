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

// ===== LOGIN PAGE LOGIC =====
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      // Call main process to handle login
      const result = await window.electronAPI.login(
        username,
        password,
      );

      if (result.success) {
        // Navigate to dashboard
        console.log('Login successful, navigating to dashboard...');
        window.location.href = 'src/dashboard.html';
      } else {
        console.error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error(error.message);
    }
  });
}
