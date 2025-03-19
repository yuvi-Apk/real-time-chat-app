import React from 'react'

const UserViewOnHome = ({users,selectedUser,onClick}) => {
  // console.log(users)
  // console.log(selectedUser)

  return (
    <div className={`w-full h-20 text-2xl relative overflow-hidden ${ selectedUser && selectedUser._id === users._id ? 'bg-gray-200' : ''}`} onClick={onClick}>

    {/* 1st div for the profile images  */}
      <div className='border-0 rounded-full w-full sm:w-1/4 absolute left-0 m-0.5! h-full p-0.5! grid place-items-center'>

      <div className='relative'>

      <img className='border rounded-full p-0.5! bg-amber-50' src={users.profilepic || "/Avatar.png"} alt="profile picture of the friends" />

      <span className='size-3 rounded-full absolute bg-green-500 top-1 right-1 shadow-2xl'></span>

      </div>

      </div>
        {/* 2nd div for the other content to dispaly  */}
      <div className=' w-3/4 absolute right-0 h-full hidden sm:block space-y-1.5!'>

      <div className='text-sm text-center mt-1.5! h-1/2 overflow-hidden sm:text-2xl text-nowrap px-2!'>
        {users.fullName}
      </div>
      {/* created at div  */}
      <div className='flex justify-between text-sm text-base-content px-2! align-baseline overflow-hidden text-nowrap h-1/2'>
        <div>Created At:</div>

        <div>{new Date(users.createdAt).toLocaleString()}</div>
      </div>

      </div>

    </div>

  )
}

export default UserViewOnHome
