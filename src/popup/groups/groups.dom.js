import './groups.scss'
import html from './groups.html'
export default class groupsDOM {
    constructor() {
        this.main = document.getElementsByClassName('main-section')[0]
        this.groups = document.getElementsByClassName('groups-section')[0]
        this.groups.innerHTML = html

        this.backBtn = document.getElementsByClassName('up-btn')[0]
        this.createBtn = document.getElementsByClassName('create-btn')[0]
        this.joinBtn = document.getElementsByClassName('join-btn')[0]

        this.goToGroupsPage()
    }


    goToGroupsPage() {
        this.main.classList.add('up')
        this.groups.classList.add('up')
        this.main.style.height = '300px'
    }

    goBack() {
        this.main.classList.remove('up')
        this.groups.classList.remove('up')
        this.main.style.height = ''

    }

}