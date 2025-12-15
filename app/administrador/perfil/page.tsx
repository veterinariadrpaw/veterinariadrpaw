"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/user";
import { ProfileHeader } from "@/components/administrador/perfil/ProfileHeader";
import { ProfileInfo } from "@/components/administrador/perfil/ProfileInfo";
import { ProfileLoading } from "@/components/administrador/perfil/ProfileLoading";
import { ProfileError } from "@/components/administrador/perfil/ProfileError";

export default function AdminProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile>({
        _id: "",
        name: "",
        email: "",
        role: "",
        telefono: "",
        direccion: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/users/me");

            if (res.status === 401) {
                // Not authenticated, redirect to login
                router.push("/login");
                return;
            }

            if (!res.ok) {
                throw new Error("Error al cargar el perfil");
            }

            const data = await res.json();
            setProfile(data);
            setError("");
        } catch (error) {
            console.error("Error fetching profile:", error);
            setError("No se pudo cargar la información del perfil. Intenta refrescar la página.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ProfileLoading />;
    if (error) return <ProfileError error={error} onRetry={fetchProfile} />;

    return (
        <div className="max-w-2xl mx-auto">
            <ProfileHeader />
            <ProfileInfo profile={profile} />
        </div>
    );
}
