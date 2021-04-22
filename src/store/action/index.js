import Firebase from '../../config/firebase'
import firebase from 'firebase'

const facebook_login=(history)=>{
    
    return (dispatch)=>{
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    var user = result.user;
    let create_user={
      name:user.displayName,
      email:user.email,
      profile:user.photoURL,
      uid:user.uid,
    }
    firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
    .then(()=>{
      dispatch({type:"SETUSER",payload:create_user})
       alert("login successful")
       history.push('/chat')
    })
    console.log("USer==>",create_user)
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error",errorMessage)
   
  });
    }
}

const get_users=()=>{
    
  return (dispatch)=>{
    let users=[]
    firebase.database().ref('/').child('users').on("child_added",(data)=>{
      users.push(data.val())
    })
      dispatch({
        type: "SETFIREBASEUSER",
        payload:users
      })
   

  }
}


export {
   get_users,
    facebook_login
}