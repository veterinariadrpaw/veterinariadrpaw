"use client";

import { useProfile } from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/cliente/perfil/ProfileHeader";
import { ProfileInfo } from "@/components/cliente/perfil/ProfileInfo";
import { ProfileLoading } from "@/components/cliente/perfil/ProfileLoading";
import { ProfileError } from "@/components/cliente/perfil/ProfileError";

export default function MyProfilePage() {
    const { profile, loading, error, refreshProfile } = useProfile();

    if (loading) return <ProfileLoading />;
    if (error) return <ProfileError error={error} onRetry={refreshProfile} />;

    return (
        <div className="max-w-2xl mx-auto">
            <ProfileHeader />
            <ProfileInfo profile={profile} />
        </div>
    );
}
