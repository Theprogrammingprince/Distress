'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DebugPage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkData();
    }, []);

    async function checkData() {
        try {
            // Get auth user
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

            if (authError) {
                setError('Auth error: ' + authError.message);
                return;
            }

            if (!authUser) {
                setError('Not logged in');
                return;
            }

            setUser(authUser);

            // Get profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (profileError) {
                setError('Profile error: ' + profileError.message);
                return;
            }

            setProfile(profileData);
        } catch (err: any) {
            setError('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Debug - Profile Data</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Auth User */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Auth User</h2>
                {user ? (
                    <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                ) : (
                    <p className="text-red-600">No auth user found</p>
                )}
            </div>

            {/* Profile Data */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Profile Data</h2>
                {profile ? (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <strong>Email:</strong> {profile.email || 'N/A'}
                            </div>
                            <div>
                                <strong>Full Name:</strong> {profile.full_name || 'N/A'}
                            </div>
                            <div>
                                <strong>Phone:</strong> {profile.phone || 'N/A'}
                            </div>
                            <div>
                                <strong>Role:</strong> {profile.role || 'N/A'}
                            </div>
                            <div>
                                <strong>Verification Status:</strong> {profile.verification_status || 'N/A'}
                            </div>
                            <div>
                                <strong>NIN:</strong> {profile.nin || 'N/A'}
                            </div>
                            <div>
                                <strong>Business Name:</strong> {profile.business_name || 'N/A'}
                            </div>
                            <div>
                                <strong>Business Reg:</strong> {profile.business_reg_number || 'N/A'}
                            </div>
                            <div>
                                <strong>Street:</strong> {profile.street_address || 'N/A'}
                            </div>
                            <div>
                                <strong>City:</strong> {profile.city || 'N/A'}
                            </div>
                            <div>
                                <strong>State:</strong> {profile.state || 'N/A'}
                            </div>
                        </div>
                        <h3 className="font-bold mb-2">Raw JSON:</h3>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                            {JSON.stringify(profile, null, 2)}
                        </pre>
                    </>
                ) : (
                    <p className="text-red-600">No profile found in database!</p>
                )}
            </div>

            {/* User Metadata */}
            {user?.user_metadata && (
                <div className="mb-8 bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">User Metadata (from Signup)</h2>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                        {JSON.stringify(user.user_metadata, null, 2)}
                    </pre>
                </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Debug Actions</h2>
                <button
                    onClick={checkData}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
                >
                    Refresh Data
                </button>
                <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">What to Check:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>If "No profile found" - Run the manual INSERT query in Supabase SQL Editor</li>
                    <li>If seller fields are NULL - Trigger didn't extract metadata properly</li>
                    <li>If user_metadata is empty - Signup didn't send the data</li>
                    <li>Check the console (F12) for any errors</li>
                </ul>
            </div>
        </div>
    );
}
