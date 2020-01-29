import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDf-7eY45rRiinZ0-D-k3XdR2TGGSg6GjI",
    authDomain: "universe-discovery-c7151.firebaseapp.com",
    databaseURL: "https://universe-discovery-c7151.firebaseio.com",
    projectId: "universe-discovery-c7151",
    storageBucket: "universe-discovery-c7151.appspot.com",
    messagingSenderId: "833768686728",
    appId: "1:833768686728:web:48fc37e86a6bf8621a0b3d",
    measurementId: "G-D0JDCV5HGF"
  };
  

const fire = firebase.initializeApp(config);

export default fire;