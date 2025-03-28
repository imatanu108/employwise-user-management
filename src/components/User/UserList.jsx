import React, { useState, useEffect } from "react";
import useAllUsersInfo from '@/hooks/useAllUsersInfo';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from '@/features/usersSlice';
import UserCard from "./UserCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

function UserList() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || useSelector(state => state.auth.token);
    useEffect(() => {
        if (!token) {
            navigate('/auth/login');
        }
    }, [token, navigate]);

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.users.currentPage);
    const deletedUsers = useSelector((state) => state.users.deletedUsers);
    const allUsersInfo = useAllUsersInfo(currentPage);
    const totalPages = useSelector((state) => state.users.totalPages);
    const [searchQuery, setSearchQuery] = useState("");

    const availableUsersInfo = allUsersInfo.filter(userInfo =>
        !deletedUsers.includes(userInfo.id) && (
            userInfo.first_name.toLowerCase().includes(searchQuery.trim().toLowerCase())
            || userInfo.last_name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setCurrentPage(newPage));
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="space-y-6 p-4 bg-gray-900 min-h-screen text-gray-100">
            <Card className="border-0">
                <CardHeader>
                    <CardTitle className="text-gray-200 text-xl font-semibold text-center">User Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search Input */}
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search users by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-gray-100 focus-visible:ring-gray-500"
                        />
                    </div>

                    {/* User List */}
                    {availableUsersInfo.length ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {availableUsersInfo.map((userInfo) => (
                                <UserCard {...userInfo} key={userInfo.id} />
                            ))}
                        </div>
                    ) : (
                        <Alert className="bg-gray-700 border-gray-600">
                            <AlertDescription className="text-gray-300">
                                No users found.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination className="mt-6">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage - 1);
                                        }}
                                        className={currentPage === 1 ? "opacity-50 cursor-default" : "cursor-pointer hover:bg-gray-700"}
                                    />
                                </PaginationItem>

                                {pageNumbers.map((number) => (
                                    <PaginationItem key={number}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(number);
                                            }}
                                            isActive={number === currentPage}
                                            className="cursor-pointer hover:bg-gray-700"
                                        >
                                            {number}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage + 1);
                                        }}
                                        className={currentPage === totalPages ? "opacity-50 cursor-default" : "cursor-pointer hover:bg-gray-700"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default UserList;