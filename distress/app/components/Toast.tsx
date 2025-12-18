'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    type?: ToastType;
    duration?: number;
}

export default function Toast({
    isOpen,
    onClose,
    message,
    type = 'success',
    duration = 3000
}: ToastProps) {
    useEffect(() => {
        if (isOpen && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    const config = {
        success: {
            icon: CheckCircle,
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            iconColor: 'text-green-600',
            textColor: 'text-green-900'
        },
        error: {
            icon: XCircle,
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            iconColor: 'text-red-600',
            textColor: 'text-red-900'
        },
        info: {
            icon: Info,
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            iconColor: 'text-blue-600',
            textColor: 'text-blue-900'
        }
    };

    const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[type];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed top-4 right-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20, x: 20 }}
                        className={`${bgColor} ${borderColor} border rounded-xl shadow-lg p-4 pr-12 max-w-md relative`}
                    >
                        <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
                            <p className={`${textColor} font-medium text-sm`}>{message}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className={`absolute top-3 right-3 p-1 ${textColor} hover:bg-white/50 rounded-lg transition-colors`}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
