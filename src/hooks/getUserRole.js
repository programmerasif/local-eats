const getUserRole = async (user) => {
    if (user?.email) {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_API}verify-user/${user?.email}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data.role);
            return data.role;
        } catch (error) {
            console.error("There was a problem fetching the role:", error);
            throw error; // Re-throwing the error to handle it in the calling code if needed
        }
    }
};

export default getUserRole;