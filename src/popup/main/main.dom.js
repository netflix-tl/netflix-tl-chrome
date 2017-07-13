import './main.scss'
import html from './main.html'

export default class MainDOM {
    constructor() {
        let page = document.getElementsByTagName('main')[0]
        page.innerHTML = html

        this.inputField = document.getElementById('comment-input')
        this.charLabel = document.getElementsByClassName('char-label')[0]
        this.timeLabel = document.getElementsByClassName('time-label')[0]
        this.commentLabel = document.getElementsByClassName('comment-label')[0]
        this.messageText = document.getElementsByClassName('message-text')[0]
        this.submitBtn = document.getElementsByClassName('submit-btn')[0]
        this.optionsBtn = document.getElementsByClassName('options-btn')[0]
        this.groupsBtn = document.getElementsByClassName('groups-btn')[0]
        this.logout = document.getElementsByClassName('logout-btn')[0]
        this.testBtn = document.getElementsByClassName('test-btn')[0]
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
