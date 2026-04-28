import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Music, ExternalLink, PlayCircle, 
  ChevronLeft, ChevronRight, Play, Headphones 
} from 'lucide-react';
import { img } from '../utils/paths';

// --- Sub-components for Music Section ---

const PlayableTrackCard = ({ track }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ translateY: -6 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl border-2 border-[#8C6B3F] p-5 shadow-warm relative group overflow-hidden"
  >
    <div className="flex gap-4 mb-4">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-primary/10 flex-shrink-0">
        <img src={img(track.cover)} alt={track.title} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/100x100?text=Cover'} />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-bold text-[#2C2416] mb-1">{track.title}</h4>
        <p className="text-base text-[#8A7E6B] line-clamp-1">{track.album} · {track.year}</p>
        <span className="inline-block mt-2 px-2 py-0.5 bg-[#7BA7D9] text-white text-xs rounded-full font-medium uppercase tracking-wider">
          {track.tag || '精选试听'}
        </span>
      </div>
    </div>

    {/* iframe Player Container */}
    <div className="w-full h-[86px] bg-[#FAF6ED] rounded-lg overflow-hidden border border-[#8C6B3F]/10 flex items-center justify-center relative">
      {track.embedId ? (
        <iframe 
          frameBorder="no" 
          border="0" 
          marginWidth="0" 
          marginHeight="0" 
          width="100%" 
          height="86" 
          src={track.platform === 'qq' 
                    ? `https://i.y.qq.com/n2/m/outchain/player/index.html?songid=${track.embedId}&songtype=0`
                    : `//music.163.com/outchain/player?type=2&id=${track.embedId}&auto=0&height=66`
                  }
          title={track.title}
        ></iframe>
      ) : (
        <div className="text-[10px] font-mono text-[#8C6B3F] text-center leading-tight p-2">
          {/* TODO: 替换为网易云/QQ音乐官方嵌入代码 */}
          &lt;!-- TODO: 此处粘贴官方嵌入代码 (h: 86px) --&gt;
          <p className="mt-1 opacity-50">播放器加载区域</p>
        </div>
      )}
    </div>
    
    <p className="mt-3 text-xs text-[#8A7E6B] text-right italic">
      音源来自 {track.platform === 'qq' ? 'QQ音乐' : '网易云音乐'} · 试听以平台为准
    </p>
  </motion.div>
);

const AlbumCard = ({ album }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ translateY: -6 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl shadow-warm overflow-hidden border-b-4 border-[#D4A843] flex flex-col group h-full"
  >
    <div className="p-6 pb-0 flex justify-center">
      <div className="w-3/4 aspect-square relative overflow-hidden rounded-lg shadow-md transition-transform duration-700 group-hover:scale-105">
        <img src={img(album.cover)} alt={album.title} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/400x400?text=Album'} />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
      </div>
    </div>
    
    <div className="p-5 flex flex-col flex-1">
      <div className="mb-4 text-center">
        <h4 className="text-xl font-bold text-[#2C2416] mb-1">{album.title}</h4>
        <div className="flex items-center justify-center gap-3 text-[#8A7E6B] text-base font-medium">
          <span>{album.year}</span>
          <span className="w-1 h-1 rounded-full bg-[#8A7E6B]/30" />
          <span>共 {album.trackCount} 首曲目</span>
        </div>
        <p className="text-sm text-[#D4A843] mt-1 font-bold">{album.price || '付费专辑'}</p>
      </div>

      <div className="space-y-1.5 mb-6 flex-1 bg-[#FAF6ED]/50 p-3 rounded-lg border border-[#8C6B3F]/5">
        {album.tracks.slice(0, 12).map((track, idx) => (
          <div key={idx} className="flex items-center justify-between group/track">
            <span className="text-sm text-[#8A7E6B] truncate pr-2">
              {idx + 1}. {track.name}
            </span>
            {track.isFree ? (
              <Play size={10} className="text-[#7BA7D9] flex-shrink-0" fill="currentColor" />
            ) : (
              <ExternalLink size={10} className="text-[#8A7E6B] flex-shrink-0" />
            )}
          </div>
        ))}
        {album.tracks.length > 12 && (
          <p className="text-sm text-[#8A7E6B] pt-1 italic opacity-70 text-center">...及其他曲目</p>
        )}
      </div>

      <div className="flex gap-2">
        <a 
          href={album.neteaseLink || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 text-sm font-bold border border-[#8C6B3F] text-[#8C6B3F] rounded-lg transition-all hover:bg-[#D4A843] hover:text-white hover:border-[#D4A843]"
          >
            网易云音乐
          </a>
          <a 
            href={album.qqLink || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 text-sm font-bold border border-[#8C6B3F] text-[#8C6B3F] rounded-lg transition-all hover:bg-[#D4A843] hover:text-white hover:border-[#D4A843]"
        >
          QQ 音乐
        </a>
      </div>
    </div>
  </motion.div>
);

// --- Main Works Component ---

const Works = () => {
  const [activeTab, setActiveTab] = useState('variety');
  const scrollRef = useRef(null);

  const tabs = [
    { id: 'variety', label: '综艺', icon: Calendar },
    { id: 'music', label: '音乐', icon: Music },
  ];

  const varietyTimeline = [
    { date: '2023.02.04', title: '《种地吧 第一季》', platform: '爱奇艺', tag: '入坑必看', img: '/images/works/season1.jpg', link: 'https://www.iqiyi.com/v_1cn6v93s3gs.html' },
    { date: '2023.06.06', title: '感恩音乐会', platform: '直播/活动', tag: '里程碑', img: '/images/works/concert1.jpg', link: 'https://www.bilibili.com/video/BV1js4y1v76i/' },
    { date: '2023.09', title: '《你好种地少年》', platform: '爱奇艺', tag: '团综', img: '/images/works/travel1.jpg', link: 'https://www.iqiyi.com/v_1zxiqj2cvd0.html' },
    { date: '2024.02.09', title: '2024 龙年春晚', platform: 'CCTV', tag: '荣耀时刻', img: '/images/works/spring2024.jpg', link: 'https://www.bilibili.com/video/BV11C411z7nZ/' },
    { date: '2024.02.23', title: '《种地吧 第二季》', platform: '爱奇艺', tag: '火热延续', img: '/images/works/season2.jpg', link: 'https://www.iqiyi.com/v_1lmiiziplx4.html' },
    { date: '2024.05.04', title: '2024 五四晚会', platform: 'CCTV', tag: '青年力量', img: '/images/works/youth2024.jpg', link: 'https://www.bilibili.com/video/BV1Yw4m1X79G/' },
    { date: '2024.10.18', title: '《你好种地少年 第二季》', platform: '爱奇艺', tag: '团综', img: '/images/works/travel2.jpg', link: 'https://www.iqiyi.com/v_1ggw7a5zpns.html' },
    { date: '2025.01.28', title: '2025 蛇年春晚', platform: 'CCTV', tag: '再登春晚', img: '/images/works/spring2025.jpg', link: 'https://www.bilibili.com/video/BV11TF8eSEGD/' },
    { date: '2025.02.28', title: '《种地吧 第三季》', platform: '爱奇艺', tag: '期待续写', img: '/images/works/season3.jpg', link: 'https://www.iqiyi.com/v_1xho1ywi8xw.html' },
  ];

  // Actual Music Data from User Input
  const playablePicks = [
    { title: "醒来吧少年", album: "《种地吧》第一季主题曲", year: "2023", cover: "/images/works/music/醒来吧少年.jpg", tag: "免费试听", platform: 'qq', embedId: '396668415' },
    { title: "后陡门的夏", album: "节目插曲", year: "2023", cover: "/images/works/music/后陡门的夏.jpg", tag: "免费试听", platform: 'netease', embedId: '2067062791' },
    { title: "麦芒", album: "合唱单曲", year: "2023", cover: "/images/works/music/麦芒.jpg", tag: "免费试听", platform: 'netease', embedId: '2053110957' },
    { title: "We Higher", album: "《你好种地少年》主题曲", year: "2023", cover: "/images/works/music/We Higher.jpg", tag: "免费试听", platform: 'netease', embedId: '2642253413' },
    { title: "芽", album: "合唱单曲", year: "2023", cover: "/images/works/music/芽.jpg", tag: "免费试听", platform: 'netease', embedId: '2054265929' },
    { title: "果敢", album: "合唱单曲", year: "2023", cover: "/images/works/music/果敢.jpg", tag: "免费试听", platform: 'qq', embedId: '511833880' },
    { title: "光", album: "合唱单曲", year: "2024", cover: "/images/works/music/光.jpg", tag: "免费试听", platform: 'qq', embedId: '504439402' },
    { title: "起舞吧", album: "合唱单曲", year: "2025", cover: "/images/works/music/起舞吧.jpg", tag: "免费试听", platform: 'qq', embedId: '620585811' },
  ];

  const fullDiscography = [
    { 
      title: "展开一天", 
      year: "2024-09-16", 
      trackCount: 12, 
      price: "29.8元 / 数字专辑",
      cover: "/images/works/music/展开一天.jpg",
      tracks: [
        { name: "我成为我的同时", isFree: false },
        { name: "天赋各秉 - 蒋敦豪", isFree: false },
        { name: "Snipper - 鹭卓", isFree: false },
        { name: "鱼缸漂浮于海平面 - 李耕耘", isFree: false },
        { name: "损耗式分手 - 李昊", isFree: false },
        { name: "浪漫不一定非要在海边 - 赵一博", isFree: false },
        { name: "The Summer Rain - 卓沅", isFree: false },
        { name: "突然地 - 赵小童", isFree: false },
        { name: "Dust - 何浩楠", isFree: false },
        { name: "风再大 - 陈少熙", isFree: false },
        { name: "春春和夏夏 - 王一珩", isFree: false },
        { name: "Unfold", isFree: false },
      ],
      neteaseLink: "https://music.163.com/#/album?id=250202387",
      qqLink: "https://y.qq.com/n/ryqq_v2/albumDetail/0021ksWK05hhfR"
    },
    { 
      title: "万里长歌", 
      year: "2025-10-20", 
      trackCount: 11, 
      price: "付费专辑",
      cover: "/images/works/music/万里长歌.jpg",
      tracks: [
        { name: "化茧 - 蒋敦豪", isFree: false },
        { name: "茶道江湖 - 鹭卓", isFree: false },
        { name: "向天空之上 - 李耕耘", isFree: false },
        { name: "龙井 - 李昊", isFree: false },
        { name: "花火心中照 - 赵一博", isFree: false },
        { name: "窑火星辰 - 卓沅", isFree: false },
        { name: "生来不让", isFree: false },
        { name: "跃马长安 - 赵小童", isFree: false },
        { name: "尘梦与烟火 - 何浩楠", isFree: false },
        { name: "浮生戏叹 - 陈少熙", isFree: false },
        { name: "归信如帆 - 王一珩", isFree: false },
      ],
      neteaseLink: "https://music.163.com/#/album?id=289020631",
      qqLink: "https://y.qq.com/n/ryqq_v2/albumDetail/000Lsco21n2xog"
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[90vw] mx-auto pb-20 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif-classic text-center text-primary mb-12">作品库</h2>
      
      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-white/50 p-1.5 rounded-3xl border border-primary/10 backdrop-blur-sm shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-8 py-2.5 rounded-2xl transition-all duration-500 font-serif-classic text-lg
                  ${activeTab === tab.id 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : 'text-text-sub hover:text-text-main'}
                `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[500px] relative">
        <AnimatePresence mode="wait">
          {activeTab === 'variety' && (
            <motion.div
              key="variety"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative py-10"
            >
              {/* Variety Timeline Code */}
              <div className="absolute top-[180px] -translate-y-1/2 left-[-40px] z-50 hidden xl:block">
                <button 
                  onClick={() => scroll('left')}
                  className="p-4 bg-white border-2 border-primary/20 rounded-full text-primary shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
                >
                  <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <div className="absolute top-[180px] -translate-y-1/2 right-[-40px] z-50 hidden xl:block">
                <button 
                  onClick={() => scroll('right')}
                  className="p-4 bg-white border-2 border-primary/20 rounded-full text-primary shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
                >
                  <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div 
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide flex items-start gap-12 pb-12 px-4 relative"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                <div className="absolute left-0 right-0 top-[260px] h-0.5 bg-primary/20 z-0" />

                {varietyTimeline.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 w-[260px] flex flex-col items-center group relative z-10"
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <motion.div 
                      whileHover={{ y: -12 }}
                      className="bg-white rounded-[24px] shadow-lg overflow-hidden border border-primary/5 mb-10 w-full group-hover:shadow-2xl transition-all duration-500 relative"
                    >
                      <div className="aspect-[3/4.2] overflow-hidden relative">
                        <img 
                          src={img(item.img)} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                          onError={(e) => { e.target.src = `https://placehold.co/400x560?text=${item.title}` }}
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-primary/95 text-white text-sm px-3 py-1 rounded-full font-serif-classic backdrop-blur-md shadow-lg border border-white/20">
                            {item.tag}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                          <a 
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-primary px-6 py-2.5 rounded-full font-serif-classic flex items-center gap-2 hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            去观看
                          </a>
                        </div>
                      </div>
                      <div className="p-5 bg-white">
                        <h3 className="text-xl font-serif-classic text-text-main mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between">
                      <p className="text-base text-text-sub font-medium">{item.platform}</p>
                          <ExternalLink className="w-4 h-4 text-primary/30 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                    <div className="w-5 h-5 rounded-full bg-white border-4 border-primary shadow-lg mb-6 z-10 relative group-hover:scale-125 transition-transform duration-300">
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-primary/20" />
                    </div>
                    <div className="text-center">
                      <span className="text-base font-serif-classic text-primary bg-primary/5 px-5 py-1.5 rounded-full border border-primary/15 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6 xl:hidden">
                <p className="text-sm text-text-sub animate-pulse font-serif-classic">← 左右滑动探索时间线 →</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'music' && (
            <motion.div
              key="music"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20 pb-10"
            >
              {/* Section A: Playable Picks */}
              <section>
                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-bold text-[#2C2416] mb-2 flex items-center justify-center gap-2">
                    🎵 先听这些
                  </h3>
                  <p className="text-[#8A7E6B] text-lg font-medium">以下歌曲可直接试听，音源来自官方平台</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {playablePicks.map((track, idx) => (
                    <PlayableTrackCard key={idx} track={track} />
                  ))}
                </div>
              </section>

              {/* Section B: Full Discography */}
              <section>
                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-bold text-[#2C2416] mb-2 flex items-center justify-center gap-2">
                    💿 更多音乐
                  </h3>
                  <p className="text-[#8A7E6B] text-lg font-medium">以下专辑包含收费曲目，推荐前往官方平台支持正版</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {fullDiscography.map((album, idx) => (
                    <AlbumCard key={idx} album={album} />
                  ))}
                </div>
              </section>

              {/* Footer Copyright */}
              <footer className="text-center border-t border-[#8C6B3F]/10 pt-10">
                <p className="text-[#8A7E6B] text-xs leading-relaxed">
                  音源及版权归属 © 网易云音乐 / QQ音乐 / 相关唱片公司，本站仅做推荐展示。
                  <br />所有试听内容通过官方嵌入代码实现，尊重并保护创作者版权。
                </p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Works;
