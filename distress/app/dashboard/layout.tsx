'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    FileText,
    Users,
    UserCircle,
    ChevronDown,
    Bell,
    HelpCircle,
    Moon,
    Sun,
    Heart,
    LogOut,
} from 'lucide-react';
import { useProfile, useSignOut } from '@/lib/hooks/useAuth';
import toast from 'react-hot-toast';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

function DashboardSidebar() {
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['product']);
    const { data: profile, isLoading } = useProfile();
    const role = profile?.role || 'buyer'; // Default to buyer if no role

    const toggleMenu = (menu: string) => {
        setExpandedMenus(prev =>
            prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
        );
    };

    const sellerMenuItems = [
        {
            id: 'overview',
            label: 'Overview',
            icon: LayoutDashboard,
            href: '/dashboard',
            submenu: []
        },
        {
            id: 'product',
            label: 'Product',
            icon: Package,
            href: '#',
            submenu: [
                { label: 'List', href: '/dashboard/products' },
                { label: 'Grid', href: '/dashboard/products/grid' },
                { label: 'Create', href: '/dashboard/products/create' }
            ]
        },
        {
            id: 'orders',
            label: 'Orders',
            icon: ShoppingCart,
            href: '/dashboard/orders',
            submenu: []
        },
        {
            id: 'invoice',
            label: 'Invoice',
            icon: FileText,
            href: '/dashboard/invoices',
            submenu: []
        },
        {
            id: 'customers',
            label: 'Customers',
            icon: Users,
            href: '/dashboard/customers',
            submenu: []
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: UserCircle,
            href: '/dashboard/profile',
            submenu: []
        }
    ];

    const buyerMenuItems = [
        {
            id: 'overview',
            label: 'My Overview',
            icon: LayoutDashboard,
            href: '/dashboard',
            submenu: []
        },
        {
            id: 'my-orders',
            label: 'My Orders',
            icon: ShoppingCart,
            href: '/dashboard/my-orders',
            submenu: []
        },
        {
            id: 'wishlist',
            label: 'Wishlist',
            icon: Heart,
            href: '/dashboard/wishlist',
            submenu: []
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: UserCircle,
            href: '/dashboard/profile',
            submenu: []
        }
    ];

    const menuItems = role === 'admin' || role === 'client' ? sellerMenuItems : buyerMenuItems;

    if (isLoading) {
        return (
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </aside>
        );
    }

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 relative">
                        <Image
                            src="/logo.png"
                            alt="Distress Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">Distress</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            {item.submenu.length > 0 ? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className="w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {expandedMenus.includes(item.id) && (
                                        <ul className="ml-8 mt-1 space-y-1">
                                            {item.submenu.map((subItem) => (
                                                <li key={subItem.href}>
                                                    <Link
                                                        href={subItem.href}
                                                        className={`block px-3 py-2 text-sm rounded-lg transition-colors ${pathname === subItem.href
                                                            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-medium'
                                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname === item.href
                                        ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

function DashboardHeader() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const signOut = useSignOut();
    const { data: profile } = useProfile();

    const handleSignOut = async () => {
        const loadingToast = toast.loading('Signing out...');
        try {
            await signOut.mutateAsync();
            toast.dismiss(loadingToast);
            toast.success('Signed out successfully');
            router.push('/signin');
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Failed to sign out');
        }
    };

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex-1 max-w-xl">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 ml-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    >
                        <span className="font-medium text-sm">Explore</span>
                    </Link>
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                        <Bell className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                                {profile?.full_name?.substring(0, 2).toUpperCase() || 'US'}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {profile?.full_name || 'User'}
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                    {profile?.role || 'Buyer'}
                                </p>
                                {/* Verification Badge for Sellers/Clients */}
                                {(profile?.role === 'client' || profile?.role === 'seller') && (
                                    <>
                                        {profile?.verification_status === 'approved' && (
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                                                ✓ Verified
                                            </span>
                                        )}
                                        {profile?.verification_status === 'pending' && (
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
                                                ⏳ Pending
                                            </span>
                                        )}
                                        {profile?.verification_status === 'rejected' && (
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full">
                                                ✗ Rejected
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg ml-2"
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function DashboardContent({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}
