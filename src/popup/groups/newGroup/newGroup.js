import * as Group from '../../../model/Group.js'
import NewGroupDOM from './newGroup.dom.js'
import * as User from '../../../model/User.js'

export default function newGroup() {
    let DOM = new NewGroupDOM()
    console.log('new group')

    DOM.addBtn.addEventListener('click', () => {
        if (!DOM.addInput.classList.contains('show')) {
            DOM.addInput.classList.add('show')
            DOM.addBtn.classList.add('open')
            DOM.addInput.focus()
        } else {
            if (DOM.addInput.value) {
                Group.createGroup(DOM.addInput.value)
                    .then(groupId => {
                        User.joinGroup(groupId)
                    })
            }
            DOM.addInput.value = ''
            DOM.addInput.classList.remove('show')
            DOM.addBtn.classList.remove('open')

        }

    })

    User.getMemberGroups().then((memberGroups) => {
        Group.getGroupHeadersListener((header) => {
            if (!memberGroups.includes(header.ref.key)) {
                let groupItem = DOM.createListElementFromGroup(header.val())
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