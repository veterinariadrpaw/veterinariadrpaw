import React from 'react';

export const ProfileLoading = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
                <div className="bg-white shadow rounded-lg p-6 space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
};
