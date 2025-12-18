'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, Heart, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { icon: User, label: 'Overview', href: '/account' },
        { icon: ShoppingBag, label: 'Orders', href: '/account/orders' },
        { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
        { icon: Settings, label: 'Settings', href: '/account/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-32">
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl font-bold text-teal-700">JD</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">John Doe</h3>
                                    <p className="text-sm text-gray-500">Member</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link key={item.href} href={item.href}>
                                            <span
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                                        ? 'bg-teal-50 text-teal-700 font-medium'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                {item.label}
                                            </span>
                                        </Link>
                                    );
                                })}

                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 mt-4 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
