import html from './groups.html'
import css from './groups.css'
import GroupsDOM from './groups.dom.js'
import * as Group from '../../model/Group.js'
import * as User from '../../model/User.js'

export default function Groups() {
    let dom = new GroupsDOM(joinGroup)
    document.getElementsByClassName('groups-section')[0].innerHTML = html
    document.getElementsByClassName('main-section')[0].classList.add('up')
    document.getElementsByClassName('groups-section')[0].classList.add('up');
    document.getElementsByClassName('up-btn')[0].addEventListener('click', () => {
        document.getElementsByClassName('main-section')[0].classList.remove('up')
        document.getElementsByClassName('groups-section')[0].classList.remove('up')
    })
    // document.getElementsByClassName('groups-list')[0]
    // .getElementsByClassName('join-btn')[0].addEventListener('click', () => {

    // })

    Group.getGroupHeadersListener(function(header) {
        console.log(header.val())
        dom.createListElementFromGroup(header.val())
    })

    function joinGroup(group) {
        User.joinGroup(group.name)
    }




}