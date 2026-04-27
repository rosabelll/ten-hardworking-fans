import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote, Camera, MapPin, Calendar, GraduationCap } from 'lucide-react';

const MemberModal = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-text-main/80 backdrop-blur-md"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative bg-[#FAF6ED] w-full max-w-[90vw] xl:max-w-7xl h-fit max-h-[95vh] overflow-hidden rounded-[32px] shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm hover:bg-primary hover:text-white rounded-full transition-all duration-300 z-20 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Character Portrait */}
            <div className="w-full md:w-[35%] h-[30vh] md:h-auto relative group overflow-hidden flex-shrink-0">
              <img 
                src={member.images[1] || member.images[0]} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6ED] via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-6 left-6 hidden md:block">
                <h2 className="text-5xl font-serif-classic text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{member.name}</h2>
                <p className="text-lg text-white/90 font-serif-classic mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{member.role}</p>
              </div>
            </div>

            {/* Right: Detailed Content */}
            <div className="w-full md:w-[65%] p-6 md:p-8 flex flex-col justify-center">
              <div className="md:hidden mb-4">
                <h2 className="text-4xl font-serif-classic text-primary">{member.name}</h2>
                <p className="text-xl text-text-sub font-manga">{member.role}</p>
              </div>

              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl border border-primary/5">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-text-sub uppercase tracking-wider mb-0.5">生日</p>
                    <p className="font-serif-classic text-xl text-text-main leading-tight">{member.birthday}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl border border-primary/5">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-text-sub uppercase tracking-wider mb-0.5">家乡</p>
                    <p className="font-serif-classic text-xl text-text-main leading-tight">{member.home}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl border border-primary/5">
                  <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-text-sub uppercase tracking-wider mb-0.5">院校</p>
                    <div className="font-serif-classic text-xl text-text-main leading-snug truncate-none">
                      {member.name === '李昊' ? (
                        <>
                          <div className="whitespace-nowrap">北京现代音乐</div>
                          <div className="text-xl">研修学院</div>
                        </>
                      ) : member.name === '赵一博' ? (
                        <>
                          <div className="whitespace-nowrap">中国传媒大学</div>
                          <div className="text-xl">南广学院</div>
                        </>
                      ) : member.school.includes('大学') && member.school.length > 8 ? (
                        <>
                          <div className="whitespace-nowrap">{member.school.split(/(大学)/)[0]}大学</div>
                          <div className="text-sm opacity-80 mt-0.5">{member.school.split(/(大学)/)[2]}</div>
                        </>
                      ) : (
                        member.school
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quotes Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-serif-classic text-secondary">金句语录</h3>
                  </div>
                  <div className="space-y-3">
                    {member.quotes.map((quote, idx) => (
                      <motion.div 
                        key={idx}
                        className="bg-white/60 p-4 rounded-2xl border-l-4 border-primary shadow-sm"
                      >
                        <p className="text-lg font-manga text-text-main italic leading-relaxed">
                          “{quote}”
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Famous Scenes Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Camera className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-serif-classic text-secondary">名场面</h3>
                  </div>
                  <div className="space-y-4">
                    {member.scenes.map((scene, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 group min-h-[3.5rem]"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif-classic text-xs mt-1">
                          {idx + 1}
                        </span>
                        <p className="text-lg font-manga text-text-main leading-relaxed pt-0.5">
                          {scene}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MemberModal;
