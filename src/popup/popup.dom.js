export default class popupDOM {
  constructor() {
    this.inputField = document.getElementById('input-field')
    this.charLabel = document.getElementById('char-label')
    this.timeLabel = document.getElementById('time-label')
    this.messageText = document.getElementById('message-text')
    this.submitBtn = document.getElementsByClassName('submit-btn')[0]
    this.optionsBtn = document.getElementsByClassName('options-btn')[0]
    this.logout = document.getElementsByClassName('logout-btn')[0]
    this.testBtn = document.getElementById('test-btn')
    this.popupInner = document.getElementsByClassName('popup-inner')[0]
  }

  getLoginOverlay() {
    return `
      <div class="popup-section login-overlay loading">
        <div><br>Let's get started!</div><br>
        <button id="welcome-login-btn" class="google-btn"> 
        <img src="/resources/google_icon.svg"></img>
        <div>Sign in with Google</div>
        </button
      </div>
              `
  }

  updateCharLabel() {
    setTimeout(() => {
      let curChars = this.inputField.value.length;
      this.charLabel.textContent = curChars + "/140"
      if (curChars === 140) {
        this.charLabel.classList.add('full-char-label')
      } else {
        this.charLabel.classList.remove('full-char-label')
      }
    }, 0)
  }

  clearInputField() {
    this.inputField.value = ''
    this.updateCharLabel()
  }

}
