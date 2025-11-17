import { initializeApp } from "firebase/app";
import "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyCXcQI6COzYR_PRbFGa3Pelw5gdylwryWU",
	authDomain: "sharmawebs-53c29.firebaseapp.com",
	databaseURL: "https://sharmawebs-53c29.firebaseio.com",
	projectId: "sharmawebs-53c29",
	storageBucket: "sharmawebs-53c29.appspot.com",
	messagingSenderId: "268646221511",
	appId: "1:268646221511:web:ea6c72e6aafa55a643e0e2",
};

const fire = initializeApp(firebaseConfig);
export default fire;
