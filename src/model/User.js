import firebase from 'firebase'

export function login() {
  if (!firebase.auth().currentUser) {
    startAuth(true);
  } else {
    console.log("already signed in: ", firebase.auth().currentUser)
  }
}

export function logout() {
  if (firebase.auth().currentUser) {
    console.log('signed out')
    firebase.auth().signOut()
  } else {
    console.log("not signed in")
  }
}

export function isUserLoggedIn() {
  return !!firebase.auth().currentUser
}

/**
 * Returns current group of the user.
 * Assumes can only join one group at a time.
 */
export function getCurrentGroup() {
  let uid = firebase.auth().currentUser.uid
  let ref = firebase.database().ref(`users/${uid}/group`)
  return ref.once('value')
    .then(snapshot => snapshot.val())
}

/**
 * Makes the user join a group with given groupId.
 * @param {number} groupId 
 */
export function joinGroup(groupId) {
  let uid = firebase.auth().currentUser.uid
  let data = {}
  data[`users/${uid}/group`] = groupId
  data[`groups/members/${groupId}/${uid}`] = true


  return firebase.database().ref().update(data)
    .then(() => {
      console.log("SUCCESS: joinGroup")
      firebase.database()
        .ref(`groups/headers/${groupId}/memberCount`)
        .transaction(count => (count || 0) + 1)
    })
    .catch(err => "ERROR: " + err)
}

/**
 * Leaves the current group
 */
export function leaveCurrentGroup() {
  let uid = firebase.auth().currentUser.uid
  return getCurrentGroup()
    .then(groupId => {
      let data = {}
      data[`users/${uid}/group`] = false
      data[`groups/members/${groupId}/${uid}`] = false
      firebase.database().ref().update(data)
      return groupId
    })
    .then((groupId) => {
      firebase.database()
        .ref(`groups/headers/${groupId}/memberCount`)
        .transaction(count => (count || 1) - 1)
    })
    .catch(err => console.log(err))
}

/**
 * Calls fn when # of online users changes
 * @param {function} onValue callback
 */
export function onOnlineUserCount(callback) {
  // Number of online users is the number of objects in the presence list.
  firebase.database().ref(`onlineUsers`)
    .on("value", function (snap) {
      console.log("# of online users = " + snap.numChildren());
      callback && callback(snap.numChildren())
    });
}

// Initialize Firebase
export function initializeFirebase(onLogin, onLogoff) {
  const config = {
    apiKey: "AIzaSyDmdXL5QSnAv4h1xIx4YUkuoAoGsN83rzo",
    authDomain: "timely-vc.firebaseapp.com",
    databaseURL: "https://timely-vc.firebaseio.com",
    projectId: "timely-vc",
    storageBucket: "timely-vc.appspot.com",
    messagingSenderId: "418211874508"
  }
  firebase.initializeApp(config)
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Add user to onlineUsers list when online.
      let userRef = firebase.database().ref(`onlineUsers`).push()
      firebase.database().ref(`.info/connected`)
        .on("value", function (snap) {
          if (snap.val()) {
            // Remove ourselves when we disconnect.
            userRef.onDisconnect().remove();
            userRef.set(true);
          }
        });
      onLogin(user)
    } else {
      onLogoff()
    }
  })
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({
    interactive: !!interactive
  }, function (token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if (chrome.runtime.lastError) {
      console.log("one error")
      console.error(chrome.runtime.lastError);
    } else if (token) {
      console.log(token)
      console.log("token")
      // Authrorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).catch(function (error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({
            token: token
          }, function () {
            startAuth(interactive);
          });
        }
      })
    } else {
      console.error('The OAuth Token was null');
    }
  });
}
