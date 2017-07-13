import html from './newGroup.html'

export default class NewGroupDOM {
    constructor() {
        let page = $('create-group')[0]
        console.log(page)
        page.innerHTML = html

        page.classList.add('left')

        this.addBtn = document.getElementsByClassName('add-btn')[0]
        this.addInput = document.getElementsByClassName('add-input')[0]

    }


    get list() {
        return document.getElementsByClassName('groups-list')[0]
    }

    createListElementFromGroup(group) {
        const element = document.createElement('div')
        element.classList.add('list-item')
        element.classList.add('collection-item')

        element.innerHTML = `
            <div>${group.name}<i class="material-icons">people</i>${group.memberCount}<a href="#!" class="secondary-content join-btn scale-transition"><i class="material-icons">add_circle</i></a></div>
        `
        this.list.appendChild(element)
        return element
    }
}