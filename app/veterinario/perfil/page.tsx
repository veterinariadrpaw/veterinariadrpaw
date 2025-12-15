"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileHeader } from "@/components/veterinario/perfil/ProfileHeader";
import { ProfileInfo } from "@/components/veterinario/perfil/ProfileInfo";
import { ProfileLoading } from "@/components/veterinario/perfil/ProfileLoading";
import { ProfileError } from "@/components/veterinario/perfil/ProfileError";

export default function VetProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState({
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
