import React from "react";
import AdminDashboard from "./AdminDashboard";
import { UserDashboard } from "./UserDashboard";
import { fetchProfile } from "../services/profileApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AdminOrUserDashboard = () => {

    const { data: profile, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return profile.is_admin ? <AdminDashboard /> : <UserDashboard />;
};

export default AdminOrUserDashboard;
