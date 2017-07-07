import './groups.scss'
import html from './groups.html'
export default class groupsDOM {

    get list() {
        return document.getElementsByClassName('groups-list')[0]
    }

    createListElementFromGroup(group) {
        const element = document.createElement('li')
        element.classList.add('list-item')
        element.classList.add('collection-item')

        element.innerHTML = `
            <div>${group.name}<a href="#!" class="secondary-content join-btn scale-transition"><i class="material-icons">add_circle</i></a></div>
        `
        this.list.appendChild(element)
        return element
    }
}