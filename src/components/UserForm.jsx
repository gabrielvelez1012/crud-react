import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({setForm, getUsers, userSelected, setUserSelected}) => {

    const {handleSubmit, register, reset} = useForm();
    const inputNull = {first_name: "", last_name: "", email: "", password: "", birthday: ""}

    useEffect(() => {
        if (userSelected) {
            reset(userSelected)
        }else{
            reset(inputNull)
        }
    }, [userSelected])

    const submit = (data) => {
        if (userSelected) {
            axios.put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data)
                .then(() => {
                    getUsers()
                    closeForm()
                })
        }else{
            axios.post(`https://users-crud.academlo.tech/users/`, data)
            .then(() => {
                getUsers()
                closeForm()
            })
        }
        
    }


    const closeForm = () => {
        setForm(false)
        setUserSelected(null)
    }

    return (
        
            <div className='form'>
                <button className='btn-close' onClick={() => closeForm()}><stron>X</stron></button>
                <h3>Form</h3>
                <form onSubmit={handleSubmit(submit)}>
                    <input type="text" id='first_name' {...register("first_name")} placeholder="Escriba su nombre"/>
                    <input type="text" id='last_name' {...register("last_name")} placeholder="Escriba su apellido"/>
                    <input type="email" id='email' {...register("email")} placeholder="Escriba su correo"/>
                    <input type="password" id='password' {...register("password")} placeholder="Escriba contraseña"/>
                    <input type="date" id='birthday' {...register("birthday")}/>
                    <button className='btn-update' type='submit'>{userSelected ? "Update " : "Create"}</button>
                </form>
            </div>
        
    );
};

export default UserForm;