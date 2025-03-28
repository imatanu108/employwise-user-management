import React, { useState } from 'react'
import { api } from "@/api/api";
import { setToken } from '@/features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EyeClosed, Eye } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const [isLogging, setIsLogging] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        setSuccess('');
        setError('');

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }

        if (email === "eve.holt@reqres.in" && password === "cityslicka") {
            try {
                setIsLogging(true)
                const response = await api.post(
                    "/login",
                    { email, password },
                );
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    dispatch(setToken(response.data.token))
                    setSuccess("Login Successful!")
                    setTimeout(() => navigate("/"), 500);
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Login failed! Please try again.');
                setSuccess('');
            } finally {
                setIsLogging(false)
            }
        } else {
            setError("Invalid credentials! Use eve.holt@reqres.in / cityslicka");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <Card className="w-full max-w-md bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-100">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-gray-100 focus-visible:ring-gray-500"
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-gray-100 focus-visible:ring-gray-500"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-2 top-5.5 text-gray-400 "
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword
                                    ? <EyeClosed style={{ height: '20px', width: '20px' }} />
                                    : <Eye style={{ height: '20px', width: '20px' }} />}
                            </Button>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isLogging}
                        >
                            {isLogging ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
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
                </CardFooter>
            </Card>
        </div>
    );
}

export default Login;