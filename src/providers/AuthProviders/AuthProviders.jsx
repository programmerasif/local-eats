import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { fromLatLng, setKey } from "react-geocode";
import {addUserToDatabase, fetchRestaurants } from "../../hooks/api";
import { filterRestaurantsByDistance } from "../../hooks/useFilterResturants";

export const AuthContext = createContext(null);
const auth = getAuth(app);
setKey(`${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`);

const AuthProviders = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(); // the user
  const [currentLocation, setCurrentLocation] = useState(null); // getting the lat and lang
  const [address, setAddress] = useState(); // getting the address
  const [role, setRole] = useState("");
  const [number, setNumber] = useState();
  const [userData, setUserData] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [restaurants, setRestaurants] = useState();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        const restaurants = await fetchRestaurants();
        setRestaurants(restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurantsData();
  }, []);

  // For Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setCurrentLocation({
              latitude,
              longitude,
            });

            // console.log(latitude, longitude);
            // Reverse geocode
            const response = await fromLatLng(latitude, longitude);
            const address = response.results[0].formatted_address;
            setAddress(address);
            // console.log(address);
            const restaurants = await fetchRestaurants();

             const filtered = await filterRestaurantsByDistance(
              restaurants,
              latitude,
              longitude,
              10
            );

            setFilteredRestaurants(filtered);
            localStorage.setItem(
              "locationData",
              JSON.stringify({
                latitude,
                longitude,
                address,
              })
            );
          } catch (error) {
            console.error("Error:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported");
    }
  }, []);

  // User created with email
  const createUserWithEmail = async (email, password, displayName, number) => {
    setUserData(displayName);
    setNumber(number);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // await updateProfile(user, { displayName });
      await update(displayName);

      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);
      setUser(user);
      // console.log(user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false);
      if (errorCode === "auth/email-already-in-use") {
        console.log("This email already in use");
      } else {
        console.error(errorCode, errorMessage);
      }
    }
  };

  const update = async (userName) => {
    setLoading(true);
    setUserData(userName);
    return await updateProfile(auth.currentUser, {
      displayName: userName,
    });
  };
  const updateImage = async (image) => {
    setLoading(true);
    return await updateProfile(auth.currentUser, {
      photoURL: image,
    });
  };

  // Email Login
  const loginWithEmail = async (email, password) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setLoading(false);
      setUser(user);
      // console.log(user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false);
      console.error(errorCode, errorMessage);
    }
  };

  // google pop up login

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result; // Return the result
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      throw error;
    }
  };

  const logOut = async () => {
    setLoading(true);
    return await signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sign out error:", error.message);
        setLoading(false);
      });
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.displayName) {
        setUser(currentUser);
        await addUserToDatabase(currentUser)
        const locationData = JSON.parse(localStorage.getItem("locationData"));
        console.log(locationData);
        await addUserToDatabase(currentUser);
      } else {
        console.log("User is logged out");
        localStorage.removeItem("uploadedImageUrl", imageUrl);
        localStorage.removeItem("locationData");
        localStorage.removeItem("hasDataPosted");
        localStorage.removeItem("user");
        localStorage.removeItem("formData");
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, [user, imageUrl]);

  useEffect(() => {
    // console.log(user);
    if (user?.email) {
      fetch(`${import.meta.env.VITE_REACT_API}verify-user/${user?.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setRole(data.role);
          console.log(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was a problem fetching the role:", error);
        });
    }
  }, [user, role]);

  const uploadImage = async (file) => {
    setImgLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGEBB_UPLOAD_API_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.data.url);

      setImgLoading(false);

      return data.data.url;
    } catch (error) {
      setImgLoading(false);

      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const authInfo = {
    loading,
    user,
    createUserWithEmail,
    loginWithEmail,
    logOut,
    role,
    googleLogin,
    currentLocation,
    address,
    userData,
    update,
    number,
    uploadImage,
    imageUrl,
    filteredRestaurants,
    restaurants,
    imgLoading,
    updateImage,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
