import html from './groups.html'
import GroupsDOM from './groups.dom.js'
import * as Group from '../../model/Group.js'
import * as User from '../../model/User.js'

export default function Groups() {
    let dom = new GroupsDOM()
    document.getElementsByTagName('groups')[0].innerHTML = html
    document.getElementsByClassName('main-section')[0].classList.add('up')
    document.getElementsByClassName('groups-section')[0].classList.add('up')
    document.getElementsByClassName('up-btn')[0].addEventListener('click', () => {
        document.getElementsByClassName('main-section')[0].classList.remove('up')
        document.getElementsByClassName('groups-section')[0].classList.remove('up')
    })

    User.getUserGroups().then((memberGroups) => {
        Group.getGroupHeadersListener((header) => {
            if(!memberGroups.includes(header.ref.key)) {
                let groupItem = dom.createListElementFromGroup(header.val())
                groupItem.getElementsByClassName('join-btn')[0].addEventListener('click', () => {
                    User.joinGroup(header.ref.key).then(() => {
                        groupItem.classList.add('complete')
                        groupItem.classList.add('scale-transition')
                        groupItem.classList.add('scale-out')
                        setTimeout(() => {
                            groupItem.parentNode.removeChild(groupItem)
                        }, 250)
                    })
                })
            }
        })
    })
}