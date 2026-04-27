import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Hash, Quote, MessageCircle, Info, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Encyclopedia = ({ onTriggerEasterEgg }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [randomMemes, setRandomMemes] = useState([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // 全量梗数据 - 来源于梗百科.md
  const allMemes = useMemo(() => [
    // 团队全员梗
    { id: 't1', title: "后陡门", member: "全员", origin: "综艺《种地吧》第一季全体成员常驻劳作的实景基地地名，位于杭州萧山，是十人共同种地、搭建大棚、养殖劳作的核心场地。", note: "十个勤天的专属精神地标与初心代名词，既是他们并肩吃苦的地方，也是粉丝心中的情怀符号。" },
    { id: 't2', title: "白干文学", member: "全员", origin: "出自陈少熙金句“人生不就是白干加白干”，后续全员频繁玩梗复刻，成为团内高频口头禅。", note: "用来调侃付出大量时间辛苦劳作，最后却因为意外付诸东流，努力全部白费，自嘲又搞笑。" },
    { id: 't3', title: "后陡门干饭天团", member: "全员", origin: "《种地吧》三餐日常片段，十位成员干饭积极性极高，抢饭速度快、食量惊人。", note: "形容十人全员干饭行动力拉满，不矫情、不挑食，主打一个朴实能干、干饭第一。" },
    { id: 't4', title: "十个勤天农业发展有限公司", member: "全员", origin: "官方节目设定，十位少年合伙注册成立农业公司，分工负责种植、养殖、基建、财务等板块。", note: "调侃十位少年是绑定在一起的创业合伙人，兼具励志感与搞笑氛围感。" },
    { id: 't5', title: "过命的兄弟", member: "全员", origin: "集体疏通巨型排水沟片段，卓沅感慨“我们一起通过沟，就是过命的兄弟了”。", note: "特指一起熬过苦日子、共同完成高强度体力活、并肩扛过困难的深厚情谊。" },
    { id: 't6', title: "全员私密马赛道歉", member: "全员", origin: "众人误会何浩楠并产生小矛盾，事后整队列队鞠躬，集体用日式道歉语“私密马赛”认错。", note: "形容一群人明明不清楚错在哪，却先集体低头道歉的搞笑行为，主打一个仪式感拉满。" },
    { id: 't7', title: "十个勤天分裂式群聊", member: "全员", origin: "十人没有统一大群，反而拆分出几十个细分小群，按干活、财务、闲聊等分类建群。", note: "用来调侃十人相处模式有趣又离谱，熟人之间疯狂建小群，画风抽象又真实。" },
    { id: 't8', title: "饭撒不白来", member: "全员", origin: "线下演唱会、见面会等活动，成员都会认真回应粉丝的应援与互动，从不敷衍。", note: "形容粉丝付出的喜欢与奔赴都能得到正向回应，双向奔赴的暖心写照。" },
    { id: 't9', title: "后陡门债务体系", member: "全员", origin: "李昊常年担任会计，经常因采购向各位成员临时借钱，团内互相转账、催还钱成为日常。", note: "调侃团内自带一套搞笑的民间借贷氛围，日常算账、借钱、周转已成常态。" },
    { id: 't10', title: "种地易，合群难", member: "全员", origin: "结合十人性格差异大、日常互怼打闹但最终依旧抱团干活的节目日常衍生。", note: "表面打打闹闹、互相吐槽，实则默契十足、彼此包容，是反差满满的团体写照。" },
    { id: 't11', title: "农活全能男团", member: "全员", origin: "十位成员从零开始学习插秧、收割、基建、养殖、农机操作等各类农活，成长为全能选手。", note: "打破传统偶像刻板印象，不怕脏不怕累，动手能力极强，是全网公认的实干型少年团体。" },
    { id: 't12', title: "晴天宇宙", member: "全员", origin: "组合名“十个勤天”谐音“十个晴天”，代指团体相关舞台、综艺、音乐等全部相关内容。", note: "十个勤天专属圈层统称，涵盖成员、作品、线下活动、粉丝圈子等所有内容。" },

    // 蒋敦豪
    { id: 'm1-1', title: "大哥爱吃贡菜", member: "蒋敦豪", origin: "蒋敦豪多次提及自己偏爱贡菜，尤其偏爱晚上吃，后续成为经典互动暗号。", note: "蒋敦豪极具代表性的个人标签，简单的饮食喜好被反复玩梗，辨识度极高。" },
    { id: 'm1-2', title: "敦爸", member: "蒋敦豪", origin: "作为大哥统筹事务、协调矛盾、照顾弟弟们，操心农活、生活琐事，稳重又细心。", note: "形容他成熟靠谱、温柔顾家，是团队的主心骨与大家长，默默兜底照顾所有人。" },
    { id: 'm1-3', title: "陪你干尽荒唐事", member: "蒋敦豪", origin: "搭建羊棚时期熬夜赶工，蒋敦豪有感而发，温柔又有力量。", note: "代表着陪伴与并肩同行，愿意和兄弟一起吃苦、一起折腾、一起做热血的事。" },
    { id: 'm1-4', title: "给个麦你呗", member: "蒋敦豪", origin: "各类舞台、直播日常里习惯性温柔询问的口头禅，语气随和松弛。", note: "温柔随性的说话方式，自带温和松弛感，凸显他不争不抢、待人谦和的性格。" },
    { id: 'm1-5', title: "用弹吉他的手干农活", member: "蒋敦豪", origin: "选秀歌手出身，擅长吉他弹唱，却在节目里天天撒化肥、搬物资。", note: "文艺歌手褪去光环，脚踏实地务农，打破偶像滤镜，反差感拉满。" },
    { id: 'm1-6', title: "鸡蛋黄", member: "蒋敦豪", origin: "根据名字谐音及温柔软糯的气质衍生出的趣味昵称。", note: "偏向可爱向的趣味外号，用来温柔调侃蒋敦豪温和软萌的一面。" },

    // 鹭卓
    { id: 'm2-1', title: "面油心秀", member: "鹭卓", origin: "鹭卓外表随性粗放，但内心细腻敏感，共情力强，成员经常调侃总结出该标签。", note: "外表粗糙随性，内心却温柔细腻，内外反差鲜明，是极具记忆点的性格标签。" },
    { id: 'm2-2', title: "玫瑰园长", member: "鹭卓", origin: "鹭卓独立承包四千盆玫瑰种植项目，全程独自打理育苗、浇水、修剪、防虫。", note: "特指鹭卓为玫瑰种植倾尽心力，为爱发电式搞种植，又辛苦又执着。" },
    { id: 'm2-3', title: "平地摔体质", member: "鹭卓", origin: "录制、出行、干活间隙多次无预兆平地摔倒，自带倒霉小属性。", note: "形容本人肢体协调性偏弱，日常容易莫名摔倒，迷糊又笨拙，自带搞笑反差萌。" },
    { id: 'm2-4', title: "鱼丸粗面名场面", member: "鹭卓", origin: "李耕耘连续连环追问鹭卓晚饭食材，鹭卓全程无奈崩溃循环回答“没有”。", note: "经典队内互怼名场面，对话搞笑又魔性，成为两人互动名梗。" },
    { id: 'm2-5', title: "鹭卓大人", member: "鹭卓", origin: "成员日常玩笑式称呼，结合他随性松弛、偶尔摆摆又乐观的性格。", note: "带有调侃意味的戏称，形容他心态佛系、随性自在，自带松弛感。" },

    // 李耕耘
    { id: 'm3-1', title: "不用管，都不用管", member: "李耕耘", origin: "务农、基建、处理突发问题时的高频口头禅，遇到难题总会淡定动手解决。", note: "遇事沉稳冷静，习惯独立扛事，自带硬核靠谱气场，是团队里的实干派基建担当。" },
    { id: 'm3-2', title: "孤狼三子", member: "李耕耘", origin: "性格偏内敛寡言，砌墙、搭棚等工作全部独自攻坚，话少活多。", note: "外表冷硬、沉默寡言，动手能力拉满，默默做事从不张扬，高冷硬汉人设深入人心。" },
    { id: 'm3-3', title: "我完了，我告诉我", member: "李耕耘", origin: "遇到工程翻车、农活失误等突发状况时，会小声慌张碎碎念这句台词。", note: "平时看着沉稳可靠，遇到意外也会慌乱破防，硬汉外表下藏着柔软的一面。" },
    { id: 'm3-4', title: "基建战神", member: "李耕耘", origin: "大棚搭建、修路、维修农具等重基建工作基本由其主导，技术全面。", note: "全能基建能手，团队里的硬核技术担当，有难题找他总能解决。" },
    { id: 'm3-5', title: "干饭暴风吸入", member: "李耕耘", origin: "日常用餐镜头里吃饭速度极快，不挑食不矫情，毫无偶像包袱。", note: "务实接地气的体现，辛苦劳作过后专心干饭，朴实又真实。" },

    // 李昊
    { id: 'm4-1', title: "后陡门首席会计", member: "李昊", origin: "掌管采购记账、收支统计、物资采买，是团队专属财务负责人。", note: "细心严谨、精打细算，包揽全队账务管理，是团队不可或缺的后勤担当。" },
    { id: 'm4-2', title: "借钱刺客", member: "李昊", origin: "经常向队内成员临时借钱，开口自然又频繁，互动搞笑又真实。", note: "队内公认的借钱达人，随时随地开启借钱模式，成为专属趣味标签。" },
    { id: 'm4-3', title: "和三轮车打架", member: "李昊", origin: "操作农用车辆频繁出现操作失误、车辆失控、人机较劲的搞笑画面。", note: "本人动手能力两极分化，操作农机交通工具却频频翻车，笨拙又搞笑。" },
    { id: 'm4-4', title: "后陡门宣传部长", member: "李昊", origin: "负责标语撰写、文案策划，文笔优秀，擅长氛围感文字输出。", note: "温柔细腻、文笔出众，包揽团队文案工作，是团队的文字与氛围感担当。" },
    { id: 'm4-5', title: "这缺的不是会计是脑子", member: "李昊", origin: "核对账目、处理混乱开销时无奈吐槽的经典台词，自嘲又搞笑。", note: "面对杂乱琐碎事务的无奈吐槽，真实接地气，自带幽默自嘲属性。" },

    // 赵一博
    { id: 'm5-1', title: "120不拉你拉谁", member: "赵一博", origin: "日常队内互怼、玩笑打闹时的经典怼人台词，语气轻松搞笑。", note: "温柔外表下藏着毒舌趣味一面，擅长温和互怼，是队内轻松互动的名梗。" },
    { id: 'm5-2', title: "啾咪公主", member: "赵一博", origin: "说话语气软糯温柔，性格细腻体贴，日常小动作软萌，被戏称公主。", note: "形容性格温柔软糯、待人温柔体贴，自带温柔治愈的气质。" },
    { id: 'm5-3', title: "扇羊公主", member: "赵一博", origin: "负责团队羊群放牧，经常用扇子赶羊，画面治愈又搞笑。", note: "放羊专属名场面，温柔少年和羊群的日常，成为个人标志性名场面。" },
    { id: 'm5-4', title: "赵妈", member: "赵一博", origin: "心思细腻，关注细节，关心弟弟们的生活与状态，温柔贴心。", note: "细心暖心、情绪稳定，擅长照顾身边人，是团队里温柔细腻的暖心担当。" },
    { id: 'm5-5', title: "事情再多也会一件件做完", member: "赵一博", origin: "面对繁重农活时的发言，冷静踏实，心态稳定，极具正能量。", note: "做事踏实稳重，抗压能力强，有条不紊处理事务，温柔又有力量。" },

    // 卓沅
    { id: 'm6-1', title: "三角形具有尖锐性", member: "卓沅", origin: "修剪果树环节一本正经现场科普，强行用三角形原理讲解修剪逻辑。", note: "形容人一本正经地胡说八道，理性较真又自带喜剧效果，反差感极强。" },
    { id: 'm6-2', title: "十个勤天董事长", member: "卓沅", origin: "负责整体规划、项目统筹、决策商议，做事条理清晰、冷静理智。", note: "队内理智担当，头脑清醒、规划能力出众，是团队实际决策核心人物。" },
    { id: 'm6-3', title: "一起通过沟，就是过命的兄弟", member: "卓沅", origin: "全员深夜合力疏通大型排水沟后有感而发，诠释深厚情谊。", note: "诠释十人共苦同甘的情谊，一起熬过累活、扛过难题，是最牢靠的羁绊。" },
    { id: 'm6-4', title: "终于做了一件有结果的事", member: "卓沅", origin: "历经多次项目失败，水培生菜稳定收获后发自内心的感慨发言。", note: "用来形容长久坚持、反复努力后终于收获成果，朴实治愈，引发共情。" },
    { id: 'm6-5', title: "沅式强迫症", member: "卓沅", origin: "日常干活、整理物资时习惯摆放整齐、流程规范，讲究秩序与整洁。", note: "做事严谨细致、追求规整，细节控特质明显，是团队里的细节实干派。" },

    // 赵小童
    { id: 'm7-1', title: "脑干缺失", member: "赵小童", origin: "行为跳脱、脑洞清奇，时常做出抽象搞笑、脱离常规的迷惑行为。", note: "形容人行为跳脱、风格抽象，不按常理出牌，是队内公认的搞笑气氛担当。" },
    { id: 'm7-2', title: "挣钱嘛，不寒碜", member: "赵小童", origin: "面对下地干活、辛苦打工等接地气日常随口说出的自嘲台词。", note: "坦然面对辛苦劳作，放下身段踏实赚钱，是十分写实的打工人心态。" },
    { id: 'm7-3', title: "没到埋你那一步", member: "赵小童", origin: "成员互相打闹、开玩笑互怼时的经典台词，语气平淡却杀伤力拉满。", note: "自带高级怼人话术，说话温和但句句精准，幽默又有分寸。" },
    { id: 'm7-4', title: "中戏文艺人下地", member: "赵小童", origin: "中戏科班出身，自带文艺气质，却在节目里天天下地干粗活。", note: "文艺青年褪去光环，沉浸式体验农耕生活，气质与农活形成强烈反差。" },
    { id: 'm7-5', title: "奇怪的东西", member: "赵小童", origin: "日常看到奇葩物件、离谱操作时的高频口头禅，个人标志性口癖。", note: "简单直白的吐槽方式，用来形容无法理解的人或事，简洁又魔性。" },

    // 何浩楠
    { id: 'm8-1', title: "后陡门车神", member: "何浩楠", origin: "持有多项农机驾驶证，各类农用机械上手极快，操作稳定零事故。", note: "农机操作全能选手，动手能力极强，驾驶技术娴熟，是团队专属农机全能担当。" },
    { id: 'm8-2', title: "全员道歉何浩楠", member: "何浩楠", origin: "节目录制期间众人误会何浩楠，事后全员集体列队鞠躬道歉，场面搞笑经典。", note: "队内经典名场面，无论对错先集体认错，充满无厘头趣味。" },
    { id: 'm8-3', title: "请问一下", member: "何浩楠", origin: "日常交流、询问问题时的固定开场口头禅，语气礼貌温柔。", note: "自带礼貌温柔的说话习惯，待人谦和有礼，是极具个人特色的标志性细节。" },
    { id: 'm8-4', title: "火龙果刺客", member: "何浩楠", origin: "演出间隙饮用火龙果汁导致嘴唇全部染色，画面搞笑出圈。", note: "线下舞台意外小趣事，画面滑稽可爱，成为极具记忆点的趣味出圈名场面。" },
    { id: 'm8-5', title: "松弛感小狗", member: "何浩楠", origin: "性格温和佛系，心态平稳，气质干净少年感十足，待人软和。", note: "性格温柔随和、情绪稳定，佛系又治愈，队内氛围调节剂。" },

    // 陈少熙
    { id: 'm9-1', title: "人生不就是白干加白干", member: "陈少熙", origin: "种植项目遭遇失败、付出付诸东流时无奈感慨的金句，全网广泛传播。", note: "当代年轻人经典自嘲语录，用来调侃努力白费、事事不顺，适配各类生活场景。" },
    { id: 'm9-2', title: "少塘主", member: "陈少熙", origin: "负责鱼塘管理，养鱼、维护水塘环境，古风氛围感外号由此而来。", note: "鱼塘专属负责人，气质清冷文艺，古风与农耕结合，标签辨识度很高。" },
    { id: 'm9-3', title: "碱中毒名场面", member: "陈少熙", origin: "搬运大量玫瑰物资，高强度超负荷劳作引发碱中毒，令人心疼。", note: "代表少年们拼命干活、不辞辛苦的真实写照，是十个勤天奋斗的经典名场面。" },
    { id: 'm9-4', title: "秒转账借钱人设", member: "陈少熙", origin: "李昊借钱时总是第一时间转账，大方仗义，同时理智询问还款日期。", note: "为人仗义大方，同时做事有原则、思路清晰，温柔且理智，分寸感十足。" },
    { id: 'm9-5', title: "昆曲少年", member: "陈少熙", origin: "专业为昆曲表演，身段、仪态、气质出众，自带古典韵味。", note: "传统文化特长生，气质独特，古典功底扎实，风格格外鲜明。" },

    // 王一珩
    { id: 'm10-1', title: "我好像看见我太奶了", member: "王一珩", origin: "经历超长时长农活、累到神志恍惚时脱口而出的抽象台词，爆笑出圈。", note: "形容人极度疲惫到意识模糊的状态，是年轻人常用的发疯式自嘲梗。" },
    { id: 'm10-2', title: "花点命为公司怎么了", member: "王一珩", origin: "面对高强度农活时激情发言，主打一个为爱打工、全力付出。", note: "硬核打工人精神写照，为了集体事业全力以赴，热血又搞笑。" },
    { id: 'm10-3', title: "后陡门虾王", member: "王一珩", origin: "独立负责虾池养殖、日常维护，是队内水产专属担当，年纪最小干劲足。", note: "擅长水产养殖，活泼好动，是团队里活力满满的养殖小能手。" },
    { id: 'm10-4', title: "捧盆干饭", member: "王一珩", origin: "干饭时期不拘小节，直接端起盆子吃饭，食量惊人、吃法豪爽。", note: "干饭天花板代表，随性豪放不矫情，朴实接地气，真实感拉满。" },
    { id: 'm10-5', title: "西海岸少年", member: "王一珩", origin: "穿搭风格自带潮流氛围感，擅长说唱创作，风格前卫古灵精怪。", note: "潮流感十足的创作型少年，队内年纪最小，团宠团欺双属性兼备。" },
  ], []);

  // 刷新随机梗的逻辑
  const handleRefresh = useCallback(() => {
    const shuffled = [...allMemes].sort(() => 0.5 - Math.random());
    setRandomMemes(shuffled.slice(0, 5));
  }, [allMemes]);

  // 初始化随机梗
  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  // 搜索占位符滚动
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % allMemes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [allMemes.length]);

  const filteredMemes = useMemo(() => {
    if (!searchTerm.trim()) return randomMemes;
    
    return allMemes.filter(meme => 
      meme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      meme.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, randomMemes, allMemes]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // 宽容彩蛋触发逻辑：SZH, szh, ZH, zh 均可
    const upperValue = value.toUpperCase();
    if (upperValue === 'SZH' || upperValue === 'ZH') {
      onTriggerEasterEgg();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">

      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[#2C2416] mb-6"
        >
          后陡门梗百科
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#8A7E6B] text-xl max-w-2xl mx-auto"
        >
          收录后陡门少年们的经典语录、名场面及专属黑话，带你速通十个勤天的晴天宇宙。
        </motion.p>
      </div>

      {/* Search & Refresh */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative mb-8 group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={`试试搜索“${allMemes[placeholderIndex]?.title}”……`}
            className="w-full px-8 py-5 rounded-2xl border-2 border-[#8C6B3F]/20 focus:border-[#D4A843] outline-none transition-all shadow-lg text-lg pl-16 bg-white/80 backdrop-blur-sm"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8C6B3F] w-6 h-6 group-focus-within:text-[#D4A843] transition-colors" />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-[#8A7E6B] font-medium bg-[#FAF6ED] px-2 py-1 rounded border border-[#8C6B3F]/10">
            搜索「SZH」有彩蛋
          </div>
        </div>

        {/* Refresh Button */}
        {!searchTerm && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#D4A843]/30 text-[#8C6B3F] rounded-full hover:bg-[#FAF6ED] hover:border-[#D4A843] transition-all shadow-sm font-bold group text-base"
            >
              <RefreshCw size={18} className="group-active:rotate-180 transition-transform duration-500" />
              换一批随机梗
            </button>
          </div>
        )}
      </div>

      {/* Meme Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredMemes.map((meme) => (
            <motion.div
              layout
              key={meme.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ translateY: -5 }}
              className="bg-white rounded-2xl border-b-4 border-[#D4A843] shadow-warm overflow-hidden flex flex-col h-full group transition-all"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-[#FAF6ED] text-[#8C6B3F] text-xs font-bold rounded-full uppercase tracking-wider border border-[#8C6B3F]/10 flex items-center gap-1">
                    <Hash size={10} /> {meme.member === '全员' ? 'TEAM' : 'MEMBER'}
                  </span>
                  <span className="text-[#D4A843] font-bold text-base">@{meme.member}</span>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-[#2C2416] mb-4 group-hover:text-[#D4A843] transition-colors flex items-center gap-2">
                  <Quote size={18} className="text-[#D4A843]/30" />
                  {meme.title}
                </h4>

                {/* Content Sections */}
                <div className="space-y-4 flex-1">
                  <div className="bg-[#FAF6ED]/50 p-4 rounded-xl border border-[#8C6B3F]/5">
                    <div className="flex items-center gap-2 text-[#8C6B3F] text-sm font-bold mb-2">
                      <MessageCircle size={14} /> 出处 / 原文
                    </div>
                    <p className="text-[#8A7E6B] text-base leading-relaxed">
                      {meme.origin}
                    </p>
                  </div>

                  <div className="bg-[#F4F9FF] p-4 rounded-xl border border-[#7BA7D9]/20">
                    <div className="flex items-center gap-2 text-[#7BA7D9] text-sm font-bold mb-2">
                      <Info size={14} /> 路人释义
                    </div>
                    <p className="text-[#2C2416]/80 text-base leading-relaxed italic">
                      “{meme.note}”
                    </p>
                  </div>
                </div>

                {/* Bottom Decor */}
                <div className="mt-6 pt-4 border-t border-dashed border-[#8C6B3F]/10 flex justify-end">
                  <div className="w-12 h-1 bg-[#D4A843]/20 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredMemes.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🌱</div>
          <h5 className="text-xl font-bold text-[#2C2416] mb-2">未找到相关梗</h5>
          <p className="text-[#8A7E6B] text-base">后陡门还有很多秘密等待你去发现，换个词试试？</p>
        </motion.div>
      )}

      {/* Copyright Footer */}
      <div className="mt-20 pt-10 border-t border-[#8C6B3F]/10 text-center">
        <p className="text-[#8A7E6B] text-sm">
          内容来源于《种地吧》及社交媒体公开资料 · 仅供禾伙人交流参考
        </p>
      </div>
    </div>
  );
};

export default Encyclopedia;
