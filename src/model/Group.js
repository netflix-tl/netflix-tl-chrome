import firebase from 'firebase'

/**
 * Creates a group with given name property
 * @param {string} name 
 */
export function createGroup(name) {
    const uid = firebase.auth().currentUser.uid
    let groupId = firebase.database()
        .ref('groups/headers/').push().key;
    let data = {};
    data['groups/headers/' + groupId] = {
        name: name,
        memberCount: 1,
        owner: uid
    }
    data[`groups/members/${groupId}/${uid}`] = true
    data[`users/${uid}/groups/${groupId}`] = true

    return firebase.database().ref().update(data)
        .catch(err => console.log(err))
}

/**
 * Promise of object of group members keyed by uid.
 * @param {number} groupId 
 */
export function getGroupMembers(groupId) {
    return firebase.database().ref(`groups/members/${groupId}`).once('value')
        .then(members => {
            return Object.keys(members.val())
        })
        .catch(err => console.log(err))
}

/**
 * Promise of object of all groups' headers.
 */
export function getGroupHeaders() {
    return firebase.database().ref('groups/headers')
        .once('value')
        .then(headers => headers.val())
}

/**
 * Called on all and any new group headers.
 * @param {function} onValue 
 */
export function onGroupHeaders(onValue) {
    return firebase.database().ref('groups/headers')
        .on('child_added', onValue)
}