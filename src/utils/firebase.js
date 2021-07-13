import * as firebase from 'firebase';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import config from '../../firebase.json';

let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(config);
} else {
    app = firebase.app();
}
// const app = firebase.initializeApp(config);
const Auth = app.auth();
export const login = async ({ email, password }) => {
    const { user } = await Auth.signInWithEmailAndPassword(email, password);
    return user;
};

export const signup = async ({ email, password, name, photoUrl }) => {
    const { user } = await Auth.createUserWithEmailAndPassword(email, password);
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    await user.updateProfile({ displayName: name, photoURL: storageUrl });
    return user;
};


const uploadImage = async uri => {
    // const blob = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //         resolve(xhr.response);
    //     };
    //     xhr.onerror = function (e) {
    //         reject(new TypeError('Network request failed'));
    //     };
    //     xhr.responseType = 'blob';
    //     xhr.open('GET', uri, true);
    //     xhr.send(null);
    // });
    const blob = await fetch(uri).then(r => r.blob());
    const user = Auth.currentUser;
    const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
    const snapshot = await ref.put(blob, { contentType: 'image/png' });

    blob.close();
    return await snapshot.ref.getDownloadURL();
};

export const logout = async () => {
    return await Auth.signOut();
}

