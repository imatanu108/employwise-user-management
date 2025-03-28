import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/usersSlice";
import { api } from "@/api/api";

function useAllUsersInfo(page = 1) {
    const dispatch = useDispatch()
    const [allUsersInfo, setAllUsersInfo] = useState([])
    let requestURL = `/users?page=${page}`

    useEffect(() => {
        const fetchAllUsersInfo = async () => {
            try {
                const response = await api.get(requestURL);
                if (!response.error) {
                    setAllUsersInfo(response.data.data);
                    dispatch(setTotalPages(response.data.total_pages))
                } else {
                    alert(response.error.message)
                }
            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };

        fetchAllUsersInfo();

    }, [page]);

    return allUsersInfo
}

export default useAllUsersInfo