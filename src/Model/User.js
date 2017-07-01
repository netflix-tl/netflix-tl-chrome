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
 * Returns a promise that resolves to an array of the user's group IDs.
 */
export function getMemberGroups() {
  let db = firebase.database().ref()
  let promise = new Promise((resolve) => {
    db.child('users').child(getCurrentUser().uid)
    .child('groups').once('value')
    .then((groups) => {
      if(groups.exists()) {
        resolve(Object.keys(groups.val()))
      } else {
        resolve([])
      }
    })
  })
  return promise
}

export function getCurrentUser() {
  return firebase.auth().currentUser
}

window.getGroups = getMemberGroups

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
  firebase.auth().onAuthStateChanged(function(user) {
    //console.log('popup.js detected state change')
    if (user) {
      console.log('state logged in')
      onLogin(user)
      //document.getElementById('user-content').innerText = JSON.stringify(user, null, "  ")
      //loginBtn.textContent = 'Sign Out';
      //sessionUser = user
    } else {
      console.log('state logged out')
      onLogoff()
      //loginBtn.textContent = 'Sign In'
      //document.getElementById('user-content').innerText = null;
    }
    //loginBtn.disabled = false
  })
  setTimeout(() => console.log(firebase.auth().currentUser),1000)
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({
    interactive: !!interactive
  }, function(token) {
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
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({
            token: token
          }, function() {
            startAuth(interactive);
          });
        }
      })
    } else {
      console.error('The OAuth Token was null');
    }
  });
}
