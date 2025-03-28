import { useState, useEffect } from "react";
import { api } from "@/api/api";

function useUserInfo(id) {
    const [userInfo, setUserInfo] = useState({})
    let requestURL = `/users/${id}`

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get(requestURL);

                if (!response.error) {
                    setUserInfo(response.data.data);
                } else {
                    alert(response.error.message)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserInfo();

    }, []);

    return userInfo
}

export default useUserInfo