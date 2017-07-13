import html from './groups.html'
import GroupsDOM from './groups.dom.js'
import * as Group from '../../model/Group.js'
import * as User from '../../model/User.js'
import NewGroup from './newGroup/newGroup.js'

export default function Groups() {
    let dom = new GroupsDOM()

    dom.backBtn.addEventListener('click', () => {
        dom.goBack()
    })

    dom.createBtn.addEventListener('click', () => {
        NewGroup()
    })

 

}