import { useState, useEffect } from 'react';
import { changeUserRole } from '../../hooks/api';
import Swal from 'sweetalert2';
import updatedRoleFirebase from '../../hooks/updatedRoleFirebase';


const Permission = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_API}get-users`)
      .then(response => response.json())
      .then(user => setData(user))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handelRoleChange =async (id,role,name,uid) => {

    if (role == 'owner') {
        Swal.fire({
            icon: "info",
            title: "Hey Admin",
            text: "This user alrady a Owner!",
           
          });
          return
    } else{

       // update User Role to firebase Database
       updatedRoleFirebase(uid,'owner')
       // update User Role to firebase Database
        const isUpdate = await changeUserRole(id,name)
        console.log(isUpdate);
     
    }
   console.log(uid);

  }
  return (
    <div className="container mx-auto px-5">
      <h1 className="text-2xl font-bold mb-4 flex justify-center items-center py-5"> All User Data</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {/* Map over each user in the data array */}
        {data.map(user => (
          <div key={user._id} className="bg-white p-4 rounded-md shadow-md flex justify-between">
            {/* Perform rendering or operations for each user */}
            <div>
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            </div>
            {/* Add more fields as needed */}
           <div className='flex justify-center items-center flex-col gap-5 text-white'>
           <p className='bg-yellow-400  px-2 py-1 flex justify-center items-center rounded-full cursor-pointer' onClick={() => handelRoleChange(user._id,user.role,user.name,user.uid)}>{user.role ==  'owner'? 'Alrady Owner' : 'Make owner'}</p>
           <p disabled={user.role === 'owner'} className='font-semibold h-6 px-3 py-2 flex justify-center items-center rounded-full text-black'>{user.role}</p>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Permission;