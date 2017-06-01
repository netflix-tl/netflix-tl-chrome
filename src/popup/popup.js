import style from './popup.css'
import * as Auth from '../Model/Auth.js'
import PopupDOM from './popup.dom.js'
const DOM = new PopupDOM()
console.log(DOM)
function openOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    console.log("Error opening options");
  }
}

function initApp() {
  Auth.start()
  console.log('init ap')
  DOM.submitBtn.addEventListener('click', submit);
  DOM.optionsBtn.addEventListener('click', openOptions);
  DOM.loginBtn.addEventListener('click', Auth.login);
  DOM.testBtn.addEventListener('click', () => console.log('test button clicked'))
  DOM.inputField.addEventListener('keydown', inputKeydown);

  function submit() {
    Auth.submit(DOM.inputField.value)
    DOM.inputField.value = ''
  }

  function inputKeydown(e) {
    if (e.keyCode === 13) {
      console.log('key 13')
      DOM.submitBtn.click()
      DOM.inputField.textContent = '';
    }
    setTimeout(function(){
      var remChars = 140 - DOM.inputField.value.length;
      DOM.charLabel.textContent = remChars + "/140"
      if (remChars === 0) {
        DOM.charLabel.classList.add('full-char-label')
      } else {
        DOM.charLabel.classList.remove('full-char-label')
      }
    }, 0)
  }
}

window.onload = function() {
  initApp()
}