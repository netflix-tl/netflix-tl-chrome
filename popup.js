// Initialize Firebase
var config = {
    apiKey: "AIzaSyDmdXL5QSnAv4h1xIx4YUkuoAoGsN83rzo",
    authDomain: "timely-vc.firebaseapp.com",
    databaseURL: "https://timely-vc.firebaseio.com",
    projectId: "timely-vc",
    storageBucket: "timely-vc.appspot.com",
    messagingSenderId: "418211874508"
  };
  firebase.initializeApp(config);

  var sessionUser;

function openOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    console.log("Error opening options");
  }
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

function initApp() {
  console.log('init app')
  var inputField = document.getElementById('input-field'),
      charLabel = document.getElementById('char-label'),
      timeLabel = document.getElementById('time-label'),
      messageText = document.getElementById('message-text'),
      submitBtn = document.getElementById('submit-btn'),
      optionsBtn = document.getElementById('options-btn'),
      loginBtn = document.getElementById('login-btn');

  submitBtn.addEventListener('click', submit);
  optionsBtn.addEventListener('click', openOptions);
  loginBtn.addEventListener('click', login);

  inputField.addEventListener('keydown', function(e){
    if (e.keyCode === 13) {
      console.log('key 13')
      submitBtn.click()
      inputField.textContent = '';
    }
    setTimeout(function(){
      var remChars = 140 - inputField.value.length;
      charLabel.textContent = remChars + "/140"
      if (remChars === 0) {
        charLabel.classList.add('full-char-label')
      } else {
        charLabel.classList.remove('full-char-label')
      }
    }, 0)
  })

  function submit() {
    console.log("pressed submit")
    if (firebase.auth().currentUser) {
      console.log('submitting')
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
  function login() {
    loginBtn.disabled = true
    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser)
      firebase.auth().signOut()
    } else {
      startAuth(true);
    }
  }

  firebase.auth().onAuthStateChanged(function(user) {
    console.log('popup.js detected state change')
    if (user) {
      //document.getElementById('user-content').innerText = JSON.stringify(user, null, "  ")
      loginBtn.textContent = 'Sign Out';
      sessionUser = user
    } else {
      loginBtn.textContent = 'Sign In'
      //document.getElementById('user-content').innerText = null;
    }
    loginBtn.disabled = false
  })
}

window.onload = function() {
  initApp()
}