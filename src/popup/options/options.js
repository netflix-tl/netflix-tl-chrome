import OptionsDOM from "./options.dom.js"

export default function Options() {
    let DOM = new OptionsDOM()
    let options = {
        notifications: true //TODO: pull this from a settings file
    }

    initSettings()


    function initSettings() {
        DOM.toggleNotifications(options.notifications)
        DOM.notificationToggle.addEventListener('click', toggleNotifications)
    }
    function toggleNotifications() {
        if (!options.notifications) {
            options.notifications = true
            DOM.toggleNotifications(true)
        } else {
            options.notifications = false
            DOM.toggleNotifications(false)
        }
    }
}