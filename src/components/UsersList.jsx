import axios from 'axios';
import React from 'react';

const UsersList = ({usersList, setForm, selectUser, getUsers}) => {

    const orderedList = usersList.sort((a,b) => a.first_name.localeCompare(b.first_name));

   const deleteUser = (user) => {
    axios.delete(`https://users-crud.academlo.tech/users/${user.id}/`)
        .then(() => getUsers())
   }

    return (
        <div className='listUsers'>
            <div className='sumary'>
                <h1>Users List</h1>
                <p><strong>Registered users: </strong>{usersList.length}</p>
                <button onClick={() => setForm(true)}>+New user</button>
            </div>

            <div className='card-container'>
            {
                
                orderedList.map((user) => (
                    <div className='card' key={user.id}>
                        <h4>{user.first_name}, {user.last_name}</h4>
                        <div className='info-user'>
                            <p><strong>Email: </strong><br />{user.email}</p>
                            <p><strong>Date of birthday: </strong><br />{user.birthday}</p>
                        </div>
                        <div className='icons'>
                            <div onClick={() => selectUser(user)}>
                                <i className='bx bxs-edit-alt bx-sm'></i>
                            </div>
                            <div onClick={() => deleteUser(user)}>
                                <i className='bx bxs-trash-alt bx-sm'></i>
                            </div> 
                        </div>
                    </div>
                ))   
            }
            </div>
        </div>
    );
};

export default UsersList;