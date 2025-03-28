import { api } from "@/api/api";
import useUserInfo from "@/hooks/useUserInfo";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";

function EditUserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || useSelector(state => state.auth.token);

    useEffect(() => {
        if (!token) {
            navigate('/auth/login');
        }
    }, [token, navigate]);

    const userInfo = useUserInfo(id);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: ""
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                email: userInfo.email || "",
                first_name: userInfo.first_name || "",
                last_name: userInfo.last_name || ""
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.put(`/api/users/${id}`, {
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name
            });

            if (response.status >= 200 && response.status < 300) {
                setSuccess("User updated successfully!");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Update failed! Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    if (!userInfo) return (
        <div className="flex justify-center items-center h-64 text-gray-400">
            Loading user data...
        </div>
    );

    return (
        <div className="max-w-md mx-auto p-4">
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-100 text-center">
                        Edit User Profile
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex justify-center">
                        <Avatar className="h-24 w-24 border-2 border-blue-500">
                            <AvatarImage src={userInfo.avatar} alt={`${userInfo.first_name} ${userInfo.last_name}`} />
                            <AvatarFallback className="bg-gray-700 text-gray-200">
                                {userInfo.first_name?.charAt(0)}{userInfo.last_name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name" className="text-gray-300">First Name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="bg-gray-700 border-gray-600 text-gray-100 focus-visible:ring-gray-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name" className="text-gray-300">Last Name</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="bg-gray-700 border-gray-600 text-gray-100 focus-visible:ring-gray-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-700 border-gray-600 text-gray-100 focus-visible:ring-gray-500"
                                required
                            />
                        </div>
                        {error && (
                            <Alert variant="destructive" className="bg-red-900/50 border-red-800">
                                <AlertDescription className="text-red-200">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="bg-green-900/50 border-green-800">
                                <AlertDescription className="text-green-200">
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

                        <CardFooter className="flex justify-end space-x-3 p-0 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600"
                                onClick={() => navigate("/users")}
                                disabled={isUpdating}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Update"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default EditUserForm;