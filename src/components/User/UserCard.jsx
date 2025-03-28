import React, { useState, useEffect } from "react";
import { Trash, Edit, Save } from "lucide-react";
import { setDeletedUsers } from "@/features/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/api";


function UserCard({ id, first_name, last_name, avatar }) {
    const navigate = useNavigate()

    // Redirecting user to login page if no authentication token is found
    const token = localStorage.getItem("token") || useSelector(state => state.auth.token);
    useEffect(() => {
        if (!token) {
            navigate('/auth/login');
        }
    }, [token, navigate]);

    const dispatch = useDispatch()
    const handleEdit = () => {
        navigate(`/users/edit/${id}`)
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/api/users/${id}`)
            if (response.status >= 200 && response.status < 300) dispatch(setDeletedUsers(id));
        } catch (error) {
            console.log(err.response?.data?.message || err.message || 'Failed to delete the user.')
        }
    }

    return (
        <div className="relative group transition-all duration-300 hover:scale-105 m-5">
            <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md group-hover:blur-lg opacity-20 group-hover:opacity-30 transition-all duration-300"></div>

            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/20 border-2 border-gray-400 overflow-hidden transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src={avatar}
                            alt={`${first_name}'s avatar`}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                        />
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-cyan-100">
                            {first_name} {last_name}
                        </h3>
                    </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                    <button className="flex items-center justify-center p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200 group/button"
                        onClick={() => handleEdit()}
                    >
                        <Edit className="w-5 h-5" />
                        <span className="ml-2 text-sm font-medium sr-only md:not-sr-only">Edit</span>
                    </button>

                    <button className="flex items-center justify-center p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 group/button"
                        onClick={() => handleDelete()}
                    >
                        <Trash className="w-5 h-5" />
                        <span className="ml-2 text-sm font-medium sr-only md:not-sr-only">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;