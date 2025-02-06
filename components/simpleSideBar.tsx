import DashboardHeader from '@/app/dashboard/components/DashboardHeader';
import React from 'react';

interface SimpleSideBarProps {
    children: React.ReactNode;
    onContentChange: (content: string) => void;
    content: string;
    menuItems: {
        id: string;
        label: string;
        icon: React.ElementType;
        selectedIcon: React.ElementType;
    }[];
}

const SimpleSideBar: React.FC<SimpleSideBarProps> = ({
    children,
    onContentChange,
    content,
    menuItems
}) => {
    return (
        <div className="bg-black drawer lg:drawer-open overflow-hidden">
            <input id="sidebar" type="checkbox" className="drawer-toggle" />

            {/* Drawer content */}
            <div className="drawer-content flex flex-col">
                <label htmlFor="sidebar" className="btn btn-square btn-ghost drawer-button lg:hidden text-white/60 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>

                <div className="p-4">
                    {children}
                </div>
            </div>

            {/* Sidebar Content */}
            <div className="drawer-side">
                <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-8 w-48 min-h-full bg-black/80 backdrop-blur-sm border-r border-white/10 text-base-content flex flex-col items-center gap-6 items-center justify-center">
                    {menuItems.map((item) => {
                        const Icon = content === item.id ? item.selectedIcon : item.icon;
                        return (
                            <li key={item.id} className="flex justify-center relative group">
                                <div
                                    onClick={() => onContentChange?.(item.id)}
                                    className={`relative rounded-lg ${
                                        content === item.id
                                            ? "bg-gradient-to-r from-[#0CC0DF] to-[#14F195] p-[1px]"
                                            : "hover:bg-white/5"
                                        }`}
                                    title={item.label}
                                >
                                    <div className={`p-3 rounded-lg ${
                                        content === item.id ? 'bg-black' : ''
                                    }`}>
                                        <Icon className={`h-6 w-6 ${
                                            content === item.id ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                                        } transition-colors duration-300`} />
                                    </div>
                                    {/* Glowing effect for active item */}
                                    {content === item.id && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#0CC0DF]/20 to-[#14F195]/20 blur-xl rounded-lg -z-10"></div>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SimpleSideBar;
