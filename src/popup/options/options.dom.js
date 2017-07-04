import "./options.css"
import html from "./options.html"

export default class optionsDOM {
    constructor() {
        this.main = document.getElementsByTagName('main')[0]
        this.options = document.getElementsByTagName('options')[0]
        this.options.innerHTML = html

        this.backBtn = document.getElementsByClassName('back-btn')[0]
        this.goToOptions()
    }
    
    goToOptions() {       
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
}