import firebase from 'firebase'

export function createGroup({
    name = 'DEFAULTNAME',
    memberCount = 0,
    memberList = [],
    videoList = []
}) {
    console.log("Group.createGroup")
    const user = firebase.auth().currentUser
    if (user) {
        memberCount += 1
        memberList.push(user.uid)

        let ref = firebase.database().ref('groups/')
        let groupRef = ref.push();
        groupRef.set({
            name: name,
            memberCount: memberCount,
            memberList: memberList,
            videoList: videoList,
            owner: user.uid,
        })
        
        console.log('SUCCESS: groupRef: ' + groupRef)
    } else {
        console.log("FAILED: couldn't get firebase user")
    }
}

export function getGroupById(id) {
    console.log("Group.getGroup")
    if (user) {
        memberCount += 1
        memberList.push(user.uid)

        firebase.database().ref('groups/')
        .push({
        name: name,
        memberCount: memberCount,
        memberList: memberList,
        videoList: videoList,
        owner: user.uid,
        })
    } else {
        console.log("FAILED: couldn't get firebase user")
    }
}

console.log('loaded Group.js')