import style from './popup.css'
import * as Auth from '../Model/Auth.js'
import PopupDOM from './popup.dom.js'
import * as Comment from '../Model/Comment.js'
import * as Group from '../Model/Group.js'

const DOM = new PopupDOM()
function openOptions() {
  DOM.loadOptionsPage()
}

function initApp() {
  Auth.start()
  console.log('init app')
  DOM.submitBtn.addEventListener('click', submit);
  DOM.optionsBtn.addEventListener('click', openOptions);
  DOM.loginBtn.addEventListener('click', Auth.login);
  DOM.testBtn.addEventListener('click', testFunction)
  DOM.inputField.addEventListener('keydown', inputKeydown);

  function submit() {
    Comment.postComment(DOM.inputField.value)
    clearInputField()
  }

  function inputKeydown(e) {
    if (e.keyCode === 13) {
      DOM.submitBtn.click()
    }
    updateCharLabel()
  }

  function updateCharLabel() {
    setTimeout(()=>{
      var curChars = DOM.inputField.value.length;
      DOM.charLabel.textContent = curChars + "/140"
      if (curChars === 140) {
        DOM.charLabel.classList.add('full-char-label')
      } else {
        DOM.charLabel.classList.remove('full-char-label')
      }
    }, 0)
  }

  function testFunction() {
    Group.createGroup({name: DOM.inputField.value})
    clearInputField()
  }

  function clearInputField() {
    DOM.inputField.value = ''
    updateCharLabel()
  }
}

window.onload = function() {
  initApp()
}