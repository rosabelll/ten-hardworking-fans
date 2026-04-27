import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '成员档案', id: 'members' },
    { name: '作品库', id: 'works' },
    { name: '后陡门百科', id: 'encyclopedia' },
  ];

  // 动态颜色逻辑
  const getLogoClass = () => {
    if (currentView === 'home') {
      if (!isScrolled) return 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]';
      return 'text-primary';
    }
    // 子页逻辑
    if (isScrolled) return 'text-primary';
    return 'text-text-main'; // 子页未滚动时黑色无阴影
  };

  const getItemClass = () => {
    if (currentView === 'home') {
      if (!isScrolled) return 'text-white';
      return 'text-text-main';
    }
    // 子页逻辑
    return 'text-text-main'; // 子页始终黑色无阴影（直到 hover 或变成黄色）
  };

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center py-4 px-4">
      <motion.nav
        className={`
          flex items-center px-8 py-3 transition-all duration-700 ease-in-out
          ${isScrolled 
            ? 'glass-nav w-full max-w-5xl justify-between shadow-lg' 
            : 'bg-transparent w-full max-w-7xl justify-between'}
        `}
      >
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <span className={`font-serif-classic text-2xl whitespace-nowrap transition-all duration-700 ease-in-out ${getLogoClass()}`}>
            十个勤天·百科全书
          </span>
        </div>

        <ul className="flex items-center gap-8 md:gap-12">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`transition-all duration-700 ease-in-out font-serif-classic font-bold whitespace-nowrap hover:scale-105 hover:text-primary ${getItemClass()}`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
};

export default Navbar;
