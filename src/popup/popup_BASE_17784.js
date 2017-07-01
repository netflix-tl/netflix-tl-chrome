import style from './popup.css'
import * as Auth from '../Model/Auth.js'
import PopupDOM from './popup.dom.js'
import * as Comment from '../Model/Comment.js'
import * as Group from '../Model/Group.js'
import Options from '../options/options.js'

function initApp() {

  let DOM = new PopupDOM()

  /**
   * closeLoginPrompt and loginPrompt are passed to Auth.js,
   *   and are called when the login/logout status of the 
   *   user changes.
   */
  Auth.start(closeLoginPrompt, loginPrompt)

  DOM.submitBtn.addEventListener('click', submit)
  DOM.optionsBtn.addEventListener('click', openOptions)
  DOM.logout.addEventListener('click', logout)
  DOM.inputField.addEventListener('keydown', inputKeydown)


  function submit() {
    Comment.postComment(DOM.inputField.value)
    DOM.clearInputField()
  }

  function openOptions() {
    Options()
  }

  function logout() {
    Auth.logout()
  }

  function inputKeydown(e) {
    if (e.keyCode === 13) {
      DOM.submitBtn.click()
    }
    DOM.updateCharLabel()
  }

  function loginPrompt() {
    if (!Auth.isUserLoggedIn()) {
      let el = document.createElement('div')
      el.innerHTML = DOM.getLoginOverlay();
      document.body.appendChild(el)
      setTimeout(() => document.getElementsByClassName('login-overlay')[0].classList.remove('loading'), 200)
      document.getElementById('welcome-login-btn').addEventListener('click', () => Auth.login())
    }
  }

  function closeLoginPrompt() {
    let overlay = document.getElementsByClassName('login-overlay')[0];
    if (!overlay) { return console.log('prompt not open') }
    overlay.classList.add('loading')
    setTimeout(() => overlay.parentElement.remove(), 500)
  }

  /**
 * This function should be extracted out to wherever
 *  the group functionality is made. ../groupview/groupview.js ?
 */
  function createGroup() {
    Group.createGroup({ name: DOM.inputField.value })
    DOM.clearInputField()
  }
}

window.onload = function () {
  initApp()
}