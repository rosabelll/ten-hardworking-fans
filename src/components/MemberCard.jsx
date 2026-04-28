import React from 'react';
import { motion } from 'framer-motion';
import { img } from '../utils/paths';

const MemberCard = ({ member, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-card manga-border overflow-hidden shadow-warm transition-shadow group-hover:shadow-2xl">
        <div className="aspect-[4/5] overflow-hidden">
          <img 
            src={img(member.images[0])} 
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold text-text-main mb-2">{member.name}</h3>
          <span className="inline-block px-3 py-1 bg-accent text-white text-sm rounded-btn">
            {member.role}
          </span>
        </div>
      </div>

      {/* Speech Bubble on Hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        whileHover={{ opacity: 1, scale: 1, x: 0 }}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
      >
        <div className="bg-quote-bg manga-border px-4 py-2 rounded-xl relative">
          <p className="text-sm text-secondary font-medium whitespace-nowrap">
            "{member.quotes[0]}"
          </p>
          <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-0 h-0 border-y-[8px] border-y-transparent border-r-[12px] border-r-secondary" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemberCard;
