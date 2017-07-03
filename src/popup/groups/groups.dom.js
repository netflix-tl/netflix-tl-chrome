export default class groupsDOM {
    constructor(joinGroup) {
        this._joinGroup = joinGroup
        return this
    }


    get list() {
        return document.getElementsByClassName('groups-list')[0]
    }

    createListElementFromGroup(group) {
        const element = document.createElement('div')
        element.classList.add('list-item')
        element.innerHTML = `
            <img class='group-avatar' src='../../resources/public.svg'></img>
            <div class='first-row'>
                <div class='title'>${group.name}</div>
                <div class='subtitle'>
                    <img src='../../resources/group.svg'></img>
                    ${group.memberCount}
                </div>
            </div>
            <div class='second-row'>
            </div>
            <div class='third-row'>
                    <img class='join-btn' src='../../resources/plus.svg'></img>
            </div>
        `
        console.log(element)
        element.getElementsByClassName('join-btn')[0]
        .addEventListener('click', () => {
            this._joinGroup(group)
        })
        this.list.appendChild(element)
    }
}

