// "use client"

// import { useEffect, useState } from "react";
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const Page = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users");
//       const structuredData = await data.json();
//       setUsers(structuredData);
//       if (structuredData.length > 0) {
//         setSelectedUser(structuredData[0]);
//       }

//     };

//     fetchData();

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 5000); // 5 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
//         {loading ? (
//           <div>
//             {[...Array(10)].map((_, index) => (
//               <div key={index} className="mb-2 flex items-center">
//                 <Skeleton circle={true} height={48} width={48} className="mr-4" />
//                 <div>
//                   <Skeleton height={20} width={100} />
//                   <Skeleton height={15} width={150} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           users.map((user) => (
//             <div
//               key={user.id}
//               onClick={() => handleUserClick(user)}
//               className={`cursor-pointer p-2 hover:bg-gray-200 hover:text-black rounded mb-2 flex items-center ${selectedUser ? user.profile.username === selectedUser.profile.username ? 'bg-cyan-400 text-white' : '' : ''}`}
//             >
//               <img
//                 src={user.avatar}
//                 alt="avatar"
//                 className="w-12 h-12 rounded-full mr-4"
//               />
//               <div>
//                 <h3 className="text-lg font-semibold">{user.profile.firstName} {user.profile.lastName}</h3>
//                 <p>{user.profile.username}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//       <div className="w-2/3 p-4 overflow-y-auto flex justify-center items-center">
//         {selectedUser ? (
//           <div className="flex items-center flex-col justify-center h-2/3 bg-slate-300 w-2/3 p-10 rounded-xl shadow-xl">
//             <img
//               src={selectedUser.avatar}
//               alt="avatar"
//               className="w-1/4 rounded-full"
//             />
//             <p className="mt-4 text-xl font-bold">
//               {selectedUser.profile.firstName} {selectedUser.profile.lastName}
//             </p>
//             <p className="mt-2 text-gray-900 text-center">{selectedUser.profile.username}</p>
//             <p className="mt-2 text-gray-900 text-center">{selectedUser.profile.email}</p>
//             <p className="mt-2 text-gray-900 text-center">{selectedUser.Bio}</p>
//             <p className="mt-2 text-gray-700 text-center bg-cyan-300 p-2 rounded-xl font-mono">
//               {selectedUser.jobTitle}
//             </p>
//           </div>
//         ) : loading ? (
//           <div className="flex items-center flex-col justify-center h-full">
//             <Skeleton circle={true} height={120} width={120} className="mb-4" />
//             <Skeleton height={20} width={200} className="mb-2" />
//             <Skeleton height={15} width={150} className="mb-2" />
//             <Skeleton height={15} width={250} className="mb-2" />
//             <Skeleton height={15} width={300} className="mb-2" />
//           </div>
//         ) : (
//           <p className="text-gray-500">Select a user to see their details</p>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Page;



"use client";

import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Page = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users");
      const structuredData = await data.json();
      setUsers(structuredData);
      if (structuredData.length > 0) {
        setSelectedUserIndex(0);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleUserClick = (index) => {
    setSelectedUserIndex(index);
  };

  const handleNext = () => {
    if (selectedUserIndex < users.length - 1) {
      setSelectedUserIndex(selectedUserIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedUserIndex > 0) {
      setSelectedUserIndex(selectedUserIndex - 1);
    }
  };

  const selectedUser = users[selectedUserIndex];

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
        {loading ? (
          <div>
            {[...Array(10)].map((_, index) => (
              <div key={index} className="mb-2 flex items-center">
                <Skeleton circle={true} height={48} width={48} className="mr-4" />
                <div>
                  <Skeleton height={20} width={100} />
                  <Skeleton height={15} width={150} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          users.map((user, index) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(index)}
              className={`cursor-pointer p-2 hover:bg-gray-200 hover:text-black rounded mb-2 flex items-center ${selectedUserIndex === index ? 'bg-cyan-400 text-white' : ''}`}
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.profile.firstName} {user.profile.lastName}</h3>
                <p>{user.profile.username}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-2/3 p-4 overflow-y-auto flex flex-col items-center justify-center">
        {selectedUser ? (
          <div className="flex items-center flex-col justify-center h-2/3 bg-slate-300 w-2/3 p-10 rounded-xl shadow-xl">
            <img
              src={selectedUser.avatar}
              alt="avatar"
              className="w-1/4 rounded-full"
            />
            <p className="mt-4 text-xl font-bold">
              {selectedUser.profile.firstName} {selectedUser.profile.lastName}
            </p>
            <p className="mt-2 text-gray-900 text-center">{selectedUser.profile.username}</p>
            <p className="mt-2 text-gray-900 text-center">{selectedUser.profile.email}</p>
            <p className="mt-2 text-gray-900 text-center">{selectedUser.Bio}</p>
            <p className="mt-2 text-gray-700 text-center bg-cyan-300 p-2 rounded-xl font-mono">
              {selectedUser.jobTitle}
            </p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handlePrevious}
                disabled={selectedUserIndex === 0}
                className="hover:border-red-800 disabled:hover:border-black disabled:hover:text-black hover:text-red-800 bg-gray-300 p-2 rounded disabled:opacity-50 flex gap-2 items-center border-[2px] border-black w-32 justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m8 15H11.85l5.58 5.573L16 24l-8-8l8-8l1.43 1.393L11.85 15H24Z" />
                  <path fill="none" d="m16 8l1.43 1.393L11.85 15H24v2H11.85l5.58 5.573L16 24l-8-8z" />
                </svg> Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedUserIndex === users.length - 1}
                className=" hover:border-blue-800 hover:text-blue-800 bg-gray-300 p-2 rounded disabled:opacity-50 flex gap-2 items-center border-[2px] border-black w-32 justify-center"
              >
                Next <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M2 16A14 14 0 1 0 16 2A14 14 0 0 0 2 16m6-1h12.15l-5.58-5.607L16 8l8 8l-8 8l-1.43-1.427L20.15 17H8Z" />
                  <path fill="none" d="m16 8l-1.43 1.393L20.15 15H8v2h12.15l-5.58 5.573L16 24l8-8z" />
                </svg>
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="flex items-center flex-col justify-center h-full">
            <Skeleton circle={true} height={120} width={120} className="mb-4" />
            <Skeleton height={20} width={200} className="mb-2" />
            <Skeleton height={15} width={150} className="mb-2" />
            <Skeleton height={15} width={250} className="mb-2" />
            <Skeleton height={15} width={300} className="mb-2" />
          </div>
        ) : (
          <p className="text-gray-500">Select a user to see their details</p>
        )}
      </div>
    </div>
  );
};

export default Page;
