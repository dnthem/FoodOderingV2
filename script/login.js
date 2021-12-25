// js for login functionality
import { app } from "./firebase-config.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  onAuthStateChanged, 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Initialize Authentication
const auth = getAuth(app);
const ggProvider = new GoogleAuthProvider(app);
// from Google
document.querySelector("#login-w-gg").addEventListener("click", () => {
  let uid = sessionStorage.getItem("userID");
  if (uid != null) {
    window.location.href = `home.html`;
  }
  signInWithPopup(auth, ggProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(auth.currentUser.uid);
      console.log(token);
      sessionStorage.setItem("userID", auth.currentUser.uid);
      sessionStorage.setItem("userName", user.displayName);
      window.location.href = "home.html";
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
    });
});

//const fbProvider = new FacebookAuthProvider();
// from facebook
document.querySelector("#login-w-fb").addEventListener("click", () => {
  alert("This function is temporay unavaiable");
  return;
  //login(fbProvider);
});

//document.querySelector("#login-ano").addEventListener("click", () => {
//   signInAnonymously(auth)
//     .then(() => {
//       // Signed in..
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ...
//     });
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//           // User is signed in, see docs for a list of available properties
//           // https://firebase.google.com/docs/reference/js/firebase.User
//           const uid = user.uid;
//           sessionStorage.setItem("userID", uid);
//           sessionStorage.setItem("userName", user.displayName);
//           // ...
//         } else {
//           // User is signed out
//           // ...
//         }
//       });
//});

// transitions for login and sign up
document.querySelector(".email-signup").classList.add("hidden");
document.querySelector("#signup-box-link").onclick = function () {
  document.querySelector(".email-login").classList.add("hidden");
  document.querySelector(".email-signup").classList.remove("hidden");
  document.querySelector("#login-box-link").classList.remove("active");
  document.querySelector("#signup-box-link").classList.add("active");
};
document.querySelector("#login-box-link").onclick = function () {
  document.querySelector(".email-login").classList.remove("hidden");
  document.querySelector(".email-signup").classList.add("hidden");
  document.querySelector("#login-box-link").classList.add("active");
  document.querySelector("#signup-box-link").classList.remove("active");
};

function init() {

}

window.addEventListener("load", init);
