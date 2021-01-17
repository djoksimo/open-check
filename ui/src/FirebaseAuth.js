import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTAlHt2Y3Mwb5yrKtvRrAAyHOhrG1ttzk",
  authDomain: "open-check-85d00.firebaseapp.com",
  projectId: "open-check-85d00",
  storageBucket: "open-check-85d00.appspot.com",
  messagingSenderId: "694917098041",
  appId: "1:694917098041:web:9b34265860fcab9c28bbe8",
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/account",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export const FirebaseAuth = ({ signedIn }) => {
  if (!signedIn) {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }
  return <div></div>;
};
