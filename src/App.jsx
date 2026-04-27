import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroParallax from './components/HeroParallax'
import MemberCard from './components/MemberCard'
import MemberModal from './components/MemberModal'
import Works from './components/Works'
import Encyclopedia from './components/Encyclopedia'
import BirthdayModal from './components/BirthdayModal'
import { members } from './data/members'
import confetti from 'canvas-confetti'

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'members', 'works', 'encyclopedia'
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBirthdayOpen, setIsBirthdayOpen] = useState(false);

  // 导航跳转逻辑
  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const triggerBirthdayEffect = () => {
    setIsBirthdayOpen(true);
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2, angle: 60, spread: 55, origin: { x: 0 },
        colors: ['#D4A843', '#8C6B3F', '#7BA7D9'], shapes: ['square', 'circle'], scalar: 2, emoji: '🎂'
      });
      confetti({
        particleCount: 2, angle: 120, spread: 55, origin: { x: 1 },
        colors: ['#D4A843', '#8C6B3F', '#7BA7D9'], shapes: ['square', 'circle'], scalar: 2, emoji: '🎂'
      });
      if (Date.now() < animationEnd) requestAnimationFrame(frame);
    };
    frame();
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <HeroParallax onNavigate={navigateTo} />
          </motion.div>
        );
      case 'members':
        return (
          <motion.div 
            key="members"
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100vw', opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="py-24 px-4 max-w-7xl mx-auto min-h-screen"
          >
            <button 
              onClick={() => navigateTo('home')}
              className="mb-12 flex items-center gap-2 text-primary hover:underline font-serif-classic text-xl"
            >
              ← 返回首页
            </button>
            <h2 className="text-4xl md:text-5xl font-serif-classic text-center text-primary mb-16">
              十位董事
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {members.map((member) => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                  onClick={() => handleMemberClick(member)}
                />
              ))}
            </div>
          </motion.div>
        );
      case 'works':
        return (
          <motion.div 
            key="works"
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100vw', opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="py-24 min-h-screen"
          >
            <div className="max-w-7xl mx-auto px-4">
              <button 
                onClick={() => navigateTo('home')}
                className="mb-12 flex items-center gap-2 text-primary hover:underline font-serif-classic text-xl"
              >
                ← 返回首页
              </button>
            </div>
            <Works />
          </motion.div>
        );
      case 'encyclopedia':
        return (
          <motion.div 
            key="encyclopedia"
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100vw', opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="py-24 min-h-screen"
          >
            <div className="max-w-7xl mx-auto px-4">
              <button 
                onClick={() => navigateTo('home')}
                className="mb-12 flex items-center gap-2 text-primary hover:underline font-serif-classic text-xl"
              >
                ← 返回首页
              </button>
            </div>
            <Encyclopedia onTriggerEasterEgg={triggerBirthdayEffect} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFAF3] via-[#FAF6ED] to-[#F4EDD8] font-manga text-text-main overflow-x-hidden">
      <Navbar onNavigate={navigateTo} currentView={currentView} />
      
      {/* 背景图层 - 在 AnimatePresence 外部，不受页面滑动动画影响 */}
      {currentView !== 'home' && (
        <motion.img
          key={currentView}
          src={
            currentView === 'members' ? '/images/members-bg.png' :
            currentView === 'works' ? '/images/works/bg-works.jpg' :
            '/images/encyclopedia-bg.png'
          }
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-0 w-full h-full object-cover blur-[1px] pointer-events-none"
        />
      )}
      
      <main>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <MemberModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <BirthdayModal 
        isOpen={isBirthdayOpen} 
        onClose={() => setIsBirthdayOpen(false)} 
      />
      
      <footer className="py-12 text-center text-text-sub border-t border-secondary/10">
        <p>© 2026 十个勤天·百科全书 | 生日快乐</p>
      </footer>
    </div>
  )
}

export default App
