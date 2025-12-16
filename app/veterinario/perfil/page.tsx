"use client";

import { useProfile } from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/veterinario/perfil/ProfileHeader";
import { ProfileInfo } from "@/components/veterinario/perfil/ProfileInfo";
import { ProfileLoading } from "@/components/veterinario/perfil/ProfileLoading";
import { ProfileError } from "@/components/veterinario/perfil/ProfileError";

export default function VetProfilePage() {
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
