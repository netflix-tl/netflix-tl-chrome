
// Initialize Firebase
export const start = () => {
const config = {
    apiKey: "AIzaSyDmdXL5QSnAv4h1xIx4YUkuoAoGsN83rzo",
    authDomain: "timely-vc.firebaseapp.com",
    databaseURL: "https://timely-vc.firebaseio.com",
    projectId: "timely-vc",
    storageBucket: "timely-vc.appspot.com",
    messagingSenderId: "418211874508"
  };
firebase.initializeApp(config);
let sessionUser;
firebase.auth().onAuthStateChanged(function(user) {
  console.log('popup.js detected state change')
  if (user) {
    //document.getElementById('user-content').innerText = JSON.stringify(user, null, "  ")
    //loginBtn.textContent = 'Sign Out';
    sessionUser = user
  } else {
    //loginBtn.textContent = 'Sign In'
    //document.getElementById('user-content').innerText = null;
  }
  loginBtn.disabled = false
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
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

export function submit() {
    console.log("Auth.submit")
    if (firebase.auth().currentUser) {
      groupsId = "54321"
      videoId = '12345'
      firebase.database().ref('groups/' + groupsId + '/comments/' + videoId)
        .push({
        uid: sessionUser.uid,
        content: inputField.value,
        time: 1001
      })
    }
  }
export function login() {
    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser)
      firebase.auth().signOut()
    } else {
      startAuth(true);
    }
  }