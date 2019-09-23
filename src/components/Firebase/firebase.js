import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  onAuthListener = setNewUser =>
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.user(user.uid).onSnapshot(doc => {
          const dbUser = doc.data();

          if (dbUser && !dbUser.roles) {
            dbUser.roles = {};
          }

          setNewUser({
            uid: user.uid,
            email: user.email,
            ...dbUser
          });
        });
      } else {
        setNewUser(null);
      }
    });

  /* USER API */
  user = uid => this.db.collection("users").doc(uid);

  users = () => this.db.collection("users");
}

export default Firebase;
