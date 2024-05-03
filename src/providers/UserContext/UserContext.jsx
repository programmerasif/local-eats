
};

export default UserContextProvider;





// export const UserContexterProvider = () => {
//     const [currentUser, setCurrentUser] = useState({});

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setCurrentUser(user);
//             console.log(user);
//         });

//         return () => unsubscribe();
//     }, []);

    // return (
    //     <UserContext.Provider value={{ currentUser }}>
    //         {children}
    //     </UserContext.Provider>
    // );
// };