import "./options.scss"
import html from "./options.html"

export default class optionsDOM {
    constructor() {
        this.main = document.getElementsByTagName('main')[0]
        this.options = document.getElementsByTagName('options')[0]
        this.options.innerHTML = html

        this.notificationToggle = document.getElementById('notifications-toggle')
        this.notificationsIcon = document.getElementById('notifications-icon')
        this.notificationsIconOff = document.getElementById('notifications-icon-off')
        this.backBtn = document.getElementsByClassName('back-btn')[0]
        this.goToOptionsPage()
    }
    
    goToOptionsPage() {       
        this.main.classList.add('left')
        this.options.classList.add('left');
        this.backBtn.addEventListener('click', () => {
            this.goBack()
        })
    }

    goBack() {
        this.main.classList.remove('left')
        this.options.classList.remove('left')
    }

    toggleNotifications(value) {
        this.notificationToggle.checked = value
        if (value) {
            this.notificationsIcon.classList.remove('icon-hide')
            this.notificationsIconOff.classList.add('icon-hide')
        } else {
            this.notificationsIcon.classList.add('icon-hide')
            this.notificationsIconOff.classList.remove('icon-hide')
        }
    
    }

    
}