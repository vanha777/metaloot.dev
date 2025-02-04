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
                <label htmlFor="sidebar" className="btn btn-square btn-ghost drawer-button lg:hidden">
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
                <ul className="menu p-4 w-48 min-h-full bg-black text-base-content flex flex-col items-center gap-4">
                    <li className="mb-4">
                        <div className="rounded-full bg-transparent p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                            <img
                                src="/transLogo.png"
                                alt="MetaLoot Logo"
                                width={92}
                                height={92}
                                className="rotate-12 hover:rotate-0 transition-transform duration-300"
                            />
                        </div>
                    </li>
                    {menuItems.map((item) => {
                        const Icon = content === item.id ? item.selectedIcon : item.icon;
                        return (
                            <li key={item.id} className="flex justify-center">
                                <div
                                    onClick={() => onContentChange?.(item.id)}
                                    className={`rounded-full ${
                                        content === item.id 
                                            ? "bg-base-100 p-[2px] bg-gradient-to-r from-[#0CC0DF] to-[#14F195]" 
                                            : "bg-base-100"
                                    } shadow-lg hover:ring-2 hover:ring-gradient-to-r hover:ring-[#0CC0DF]/50 transition-all duration-300 flex items-center justify-center cursor-pointer`}
                                    title={item.label}
                                >
                                    <div className={`${content === item.id ? 'bg-base-100 rounded-full' : ''} p-3`}>
                                        <Icon className={`h-10 w-10 ${content === item.id ? 'text-white' : 'text-gray-400'}`} />
                                    </div>
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
