export default class popupDOM {
  constructor() {
      this.inputField = document.getElementById('input-field')
      this.charLabel = document.getElementById('char-label')
      this.timeLabel = document.getElementById('time-label')
      this.messageText = document.getElementById('message-text')
      this.submitBtn = document.getElementById('submit-btn')
      this.optionsBtn = document.getElementById('options-btn')
      this.loginBtn = document.getElementById('login-btn')
      this.testBtn = document.getElementById('test-btn')
  }

    loadOptionsPage() {
      console.log("TODO: add options transition")
    }

}
