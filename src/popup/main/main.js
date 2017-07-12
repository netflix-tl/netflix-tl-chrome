import Options from '../options/options.js'
import MainDOM from './main.dom.js'
import * as User from '../../model/User.js'
import * as Comment from '../../model/Comment.js'
import * as Group from '../../model/Group.js'

function initApp() {
  let DOM = new MainDOM()
  let videoId
  let groupId

  chrome.runtime.sendMessage({ popupLoaded: true }, response => {
    videoId = response
    DOM.commentLabel.textContent = videoId
  })

  /**
   * OnUserLoggedIn and onUserLoggedOut are passed to User.js,
   *   and are called when the login/logout status of the 
   *   user changes.
   */
  User.initializeFirebase(onUserLoggedIn, OnUserLoggedOut)

  DOM.submitBtn.addEventListener('click', submit)
  DOM.optionsBtn.addEventListener('click', openOptions)
  DOM.logout.addEventListener('click', logout)
  DOM.inputField.addEventListener('keydown', inputKeydown)

  function submit() {
    console.log("postComment", groupId, videoId, DOM.inputField.value)
    //TODO: add timestamp to postComment
    Comment.postComment(groupId, videoId, DOM.inputField.value)
    DOM.clearInputField()
  }

  function openOptions() {
    Options()
  }

  function logout() {
    User.logout()
  }

  function inputKeydown(e) {
    if (e.keyCode === 13) {
      DOM.submitBtn.click()
    }
    DOM.updateCharLabel()
  }

  /**
   * Displays login overlay
   */
  function OnUserLoggedOut() {
    let el = document.createElement('div')
    el.innerHTML = DOM.getLoginOverlay();
    document.body.appendChild(el)
    setTimeout(() => document.getElementsByClassName('login-overlay')[0].classList.remove('loading'), 200)
    document.getElementById('welcome-login-btn').addEventListener('click', () => User.login())
  }

  /**
   * Sets groupId to users current group
   * Closes login overlay if its visible
   */
  function onUserLoggedIn() {
    User.getCurrentGroup().then(id => groupId = id)
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