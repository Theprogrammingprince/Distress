'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Shield } from 'lucide-react';

const roles = [
    { id: '1', name: 'Admin', users: 3, permissions: ['All Access'], color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' },
    { id: '2', name: 'Manager', users: 8, permissions: ['Manage Products', 'View Orders'], color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
    { id: '3', name: 'Seller', users: 24, permissions: ['Create Products', 'View Own Orders'], color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
    { id: '4', name: 'Support', users: 12, permissions: ['View Orders', 'Manage Customers'], color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' },
];

export default function RolesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Roles & Permissions</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage user roles and access permissions</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="text-sm font-medium">Add Role</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search roles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Filter className="w-5 h-5" />
                        <span className="text-sm font-medium">Filter</span>
                    </button>
                </div>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roles.map((role) => (
                    <div
                        key={role.id}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${role.color}`}>
                                {role.users} users
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{role.name}</h3>
                        <div className="space-y-1">
                            {role.permissions.map((permission, index) => (
                                <p key={index} className="text-sm text-gray-600 dark:text-gray-400">• {permission}</p>
                            ))}
                        </div>
                        <button className="w-full mt-4 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                            Edit Role
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
