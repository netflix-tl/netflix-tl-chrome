export function createGroup({
    name = 'DEFAULTNAME',
    memberCount = 0,
    members = {},
    videos}) {
    let log = "Group.createGroup"
    console.log(log)

    const user = firebase.auth().currentUser
    if (user) {
        memberCount += 1
        members[user.uid] = true


        let headersRef = firebase.database().ref('groups/headers/').push();
        let groupId = headersRef.key
        
        let data = {};
        data['groups/headers/' + groupId] = {
            name: name,
            memberCount: memberCount,
            owner: user.uid
        }
        data['groups/members/' + groupId] = members
        data['members/' + user.uid + '/groups/' + groupId] = true

        return firebase.database().ref().update(data)
            .then(() => console.log('SUCCESS: ' + log))
            .catch(err => console.log('ERROR: ' + log + err))
    } else {
        console.log("NO USER: couldn't get firebase user")
    }
}

export function getGroupMembersById(groupId) { 
    console.log("Group.getGroup")

    return firebase.database().ref('groups/members' + groupId).once('value')
        .then(members => {
            if (!members.exists()) {
                return []
            }
            return Object.keys(members.val())
        })
        .catch(err => console.log("FAILED: couldn't get firebase user"))
}

export function getGroupHeadersListener(onValue) {
    return firebase.database().ref('groups').child('headers')
        .limitToFirst(5)
        .on('child_added', onValue)
}


console.log('loaded Group.js')