// For posting all the user to database.

import Swal from "sweetalert2";

export const addUserToDatabase = async (
  currentUser,
  locationData,
  userData,
) => {
  const person = {
    name: currentUser.userName || currentUser.displayName || userData,
    // name: currentUser.displayName || userData,
    email: currentUser.email,
    displayPhoto: currentUser.photoURL,
    uid: currentUser.uid,
    phNumber: currentUser.phoneNumber,
    role: "user",
    location: locationData,
  };

  return fetch(`${import.meta.env.VITE_REACT_API}added-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to add user");
      } else {
        console.log("User posted successfully");
      }
    })
    .catch((error) => console.error("Error adding user", error));
};
// get all user 
export const getAllUser = async (id) => {

  const url = `${import.meta.env.VITE_REACT_API}get-users/${id}`; 
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({role:'owner'}) 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedData = await response.json(); 
    console.log('Data updated:', updatedData);
    
  } catch (error) {
    console.error('Error updating data:', error);
   
  }

}



// change user role
export const changeUserRole = async (id,name) => {

  const url = `${import.meta.env.VITE_REACT_API}get-users/${id}`; 
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({role:'owner'}) 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedData = await response.json(); 
    console.log('Data updated:', updatedData);
    if (updatedData.modifiedCount == 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} is now owner`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  } catch (error) {
    console.error('Error updating data:', error);
   
  }

}


// For fetching All the Restaurants
export const fetchRestaurants = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_API}all-restaurants`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching restaurants:", error);
  }
};

// For putting restaurants dishes to database.

export const updateItem = async (formData, id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_API}single-restaurant-item-update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update item");
    }

    const responseData = await response.json();
    return responseData; // Optional: Return any response from the server
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};
