import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdTvBHXWf-ZlGs8dkzwpow6NReThCGSOg",
  authDomain: "kainatv-4ad4f.firebaseapp.com",
  projectId: "kainatv-4ad4f",
  storageBucket: "kainatv-4ad4f.appspot.com",
  messagingSenderId: "511913799044",
  appId: "1:511913799044:web:08b6b77d0d7c7af226c1d1"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
