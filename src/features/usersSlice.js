import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    currentPage: 1,
    totalPages: 1,
    deletedUsers: JSON.parse(localStorage.getItem('deletedUsers')) || []
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setDeletedUsers: (state, action) => {
            const userId = action.payload;

            if (userId && !state.deletedUsers.includes(userId)) {
                state.deletedUsers = [...state.deletedUsers, userId];
                localStorage.setItem('deletedUsers', JSON.stringify(state.deletedUsers));
            }
        },

    }
})

export const { setCurrentPage, setTotalPages, setUsers, setDeletedUsers } = usersSlice.actions

export default usersSlice.reducer