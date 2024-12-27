import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);
import auth from '../firebase.init'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registrationUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignUp = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const userProfileUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            // JWT Configurations
            if (currentUser?.email) {
                const user = { email: currentUser?.email }
                axios.post('https://solo-sphere-iota.vercel.app/login', user, { withCredentials: true })
                    .then(() => {
                        setLoading(false)
                    })
            }
            else {
                axios.post('https://solo-sphere-iota.vercel.app/logout', {}, { withCredentials: true })
                    .then(() => {
                        setLoading(false)
                    })
            }
        })
        return () => unSubscribe()
    }, [])

    const authInfo = {
        registrationUser,
        loginUser,
        googleSignUp,
        signOutUser,
        userProfileUpdate,
        setUser,
        loading,
        user
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;