import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// firebase database
import { getDatabase, ref, set as firebaseSet, push as firebasePush, update as firebaseUpdate } from 'firebase/database';

// firebase UserAuth
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

//an object of configuration values
const firebaseUIConfig = {
  signInOptions: [ //array of sign in options supported
    //array can include just "Provider IDs", or objects with the IDs and options
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: 'popup', //don't redirect to authenticate
  credentialHelper: 'none', //don't show the email account chooser
  callbacks: { //"lifecycle" callbacks
    signInSuccessWithAuthResult: (authResult) => {
      const user = authResult.user;
      const db = getDatabase();
      const usersRef = ref(db, "allUsers/"+user.uid);
      firebaseUpdate(usersRef, {displayName: user.displayName, FriendsList:[""]});
      return false;
    }
  }
}

//the React compnent to render
export function SignInPage(props) {
  let content = <p>Please sign-in:</p>;
  if (props.currentUser) {
    content = <p>Success, you have signed in! You can now browse the application.</p>;
  }

  return (
    <div>
      {/* <h1 className="my-header text-center pt-4">Game Hub</h1> */}
      <div className="sign-in-card">
          <h1 className="my-header text-center">Game Hub</h1>
          {content}
          {/* <p>Please sign-in:</p> */}
          <StyledFirebaseAuth
              uiConfig={firebaseUIConfig}
              firebaseAuth={getAuth()} />
      </div>
    </div>
  );
}