import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const BirthdayModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-text-main/70 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: { type: "spring", damping: 15 }
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white w-full max-w-lg rounded-[24px] shadow-2xl overflow-hidden"
          >
            {/* Top decorative bar */}
            <div className="h-4 bg-gradient-to-r from-primary via-accent to-primary" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-page-bg rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-text-sub" />
            </button>

            <div className="p-12 text-center space-y-6">
              <div className="text-7xl animate-bounce">🎂</div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-text-main">生日快乐！</h2>
                <p className="text-primary font-bold text-xl">后陡门最特别的禾伙人</p>
              </div>

              <div className="bg-quote-bg p-6 rounded-card manga-border relative">
                <p className="text-text-main leading-relaxed italic">
                  "在这片充满生机的土地上，愿你的生活如麦田般金黄灿烂，如夏日般热情洋溢。感谢你一直以来的陪伴，祝你在新的一岁里，万物生长，满载而归！"
                </p>
                {/* Decorative wheat icon */}
                <div className="absolute -bottom-4 -right-4 text-4xl opacity-20">🌾</div>
              </div>

              <button 
                onClick={onClose}
                className="btn-primary w-full py-4 text-lg"
              >
                收下祝福
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BirthdayModal;
