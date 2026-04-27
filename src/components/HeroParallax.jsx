import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const HeroParallax = ({ onNavigate }) => {
  const containerRef = useRef(null);

  const pImages = [
    [
      "/images/hero/P1-1.png",
      "/images/hero/P1-2.jpg",
      "/images/hero/P1-3.jpg",
    ],
    [
      "/images/hero/P2-1.jpg",
      "/images/hero/P2-2.jpg",
      "/images/hero/P2-3.jpg",
    ],
    [
      "/images/hero/P3-1.jpg",
      "/images/hero/P3-3.jpg",
      "/images/hero/P3-4.jpg",
      "/images/hero/P3-5.jpg",
    ],
    [
      "/images/hero/P4-1.jpg",
      "/images/hero/P4-2.jpg",
      "/images/hero/P4-3.jpg",
      "/images/hero/P4-4.png",
    ],
  ];

  const [imageIndices, setImageIndices] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndices(prev => prev.map((idx, i) => (idx + 1) % pImages[i].length));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const navCards = [
    { id: 'members', title: '成员档案', desc: '十位少年，十种色彩', icon: '👨‍🌾' },
    { id: 'works', title: '作品库', desc: '汗水浇灌，梦想绽放', icon: '🎬' },
    { id: 'encyclopedia', title: '后陡门百科', desc: '土地的记忆，在这里收藏', icon: '📖' },
  ];

  const screens = [
    {
      id: 0,
      title: "十个少年，一片土地",
      subtitle: "从零开始，在后陡门的 142 亩土地上，书写属于他们的耕耘故事。",
    },
    {
      id: 1,
      title: "为什么种地？",
      subtitle: "不是真人秀，而是真实的生存。是与土地的对话，也是对自我的重塑。",
    },
    {
      id: 2,
      title: "从麦田到春晚",
      subtitle: "汗水浇灌出的不只是粮食，还有少年们的成长与梦想的绽放。",
    },
    {
      id: 3,
      title: "成为禾伙人",
      subtitle: "见证每一次播种与收获，在这里，每一个名字都与这片土地相连。",
      showNav: true
    }
  ];

  // 为每张图片创建透明度映射
  // 0-0.25 (Screen 0), 0.25-0.5 (Screen 1), 0.5-0.75 (Screen 2), 0.75-1.0 (Screen 3)
  const opacity0 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);

  const opacities = [opacity0, opacity1, opacity2, opacity3];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 背景图片层 - 固定不动 */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        {screens.map((screen, index) => (
          <motion.div
            key={index}
            style={{ opacity: opacities[index] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <div className="absolute inset-0">
              <AnimatePresence initial={false}>
                <motion.img
                  key={`${index}-${imageIndices[index]}`}
                  src={pImages[index][imageIndices[index]]}
                  alt={screen.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
        {/* 全局渐变叠加，确保文字始终清晰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-20 pointer-events-none" />
      </div>

      {/* 滚动文字内容层 */}
      <div className="relative z-30">
        {screens.map((screen, index) => (
          <section
            key={index}
            className="h-screen flex flex-col items-center justify-center px-4 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl"
            >
              <h2 className="text-5xl md:text-8xl font-serif-classic text-white mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                {screen.title}
              </h2>
              <p className="text-2xl md:text-4xl text-white/90 font-manga leading-relaxed drop-shadow-lg">
                {screen.subtitle}
              </p>

              {screen.showNav && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-12 px-4">
                  {navCards.map((card) => (
                    <motion.div
                      key={card.id}
                      whileHover={{ y: -10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate(card.id)}
                      className="glass-nav p-8 cursor-pointer group flex flex-col items-center transition-all duration-300 border border-white/20 hover:border-primary/50"
                    >
                      <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </span>
                      <h3 className="text-2xl font-serif-classic text-primary mb-2">
                        {card.title}
                      </h3>
                      <p className="text-text-sub font-manga text-lg">
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HeroParallax;
