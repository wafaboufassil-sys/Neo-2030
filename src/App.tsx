/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import { ShoppingBag, Menu, X, ArrowUpRight, Zap, Shield, Sparkles, Globe } from 'lucide-react';
import * as THREE from 'three';

// --- 3D Components ---

function AbstractSphere() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          color="#60a5fa"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          emissive="#60a5fa"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

// --- UI Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-12 py-6 nav-glass">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black tracking-tighter italic font-display"
          >
            NEO-2030
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm font-light text-gray-400">
            {['المجموعات', 'التكنولوجيا', 'الاستدامة', 'المتجر'].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 rounded-full border border-white/20 text-[10px] uppercase tracking-widest backdrop-blur-lg cursor-pointer hover:bg-white/5">
            تسجيل الدخول
          </div>
          <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold hover:bg-brand-blue transition-colors">
            +
          </button>
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 glass rounded-3xl p-8 flex flex-col gap-6 md:hidden"
          >
            {['المجموعة', 'المستقبل', 'الفلسفة', 'المتجر'].map((item) => (
              <a key={item} href="#" className="text-xl font-bold border-b border-white/10 pb-2">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ title, price, image, category }: any) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative frosted-glass rounded-3xl overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-black/20">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-blue mb-1 block font-bold">
              {category}
            </span>
            <h3 className="text-xl font-bold font-display leading-tight">{title}</h3>
          </div>
          <span className="text-lg font-light italic opacity-60 font-display">{price}</span>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-4 border border-white/10 rounded-none skew-x-[-12deg] hover:bg-white hover:text-black transition-all group/btn font-bold uppercase text-xs tracking-widest">
          أضف للحقيبة
          <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const heroRotate = useTransform(smoothProgress, [0, 0.3], [0, 5]);

  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-brand-blue selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 px-12 overflow-hidden">
        {/* Background Mesh Gradients */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-700 rounded-full blur-[100px]"></div>
        </div>

        {/* Background 3D */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
              <AbstractSphere />
            </Canvas>
          </Suspense>
        </div>

        <motion.div 
          style={{ y: heroY, rotateZ: heroRotate }}
          className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center"
        >
          <div className="text-right">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] mb-8 w-fit text-brand-blue">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse"></span>
                نسيج المستقبل الذكي
              </div>
              <h1 className="text-7xl md:text-[90px] font-black font-display leading-[0.85] tracking-tighter mb-8">
                رؤية <br />
                <span className="text-gradient italic">2030</span> <br />
                للأناقة
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-12 leading-relaxed">
                تصاميم مستوحاة من العمارة الرقمية، تمزج بين الأقمشة الحيوية والذكاء الاصطناعي لتعريف مفهوم الهوية في العقد القادم.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="skew-button bg-white text-black hover:bg-brand-blue"
                >
                  اكتشف المجموعة
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="skew-button border border-white/20 backdrop-blur-md hover:bg-white/10 px-10"
                >
                  العرض ثلاثي الأبعاد
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-blue/10 blur-[150px] rounded-full"></div>
            <div className="relative z-10 frosted-glass p-4 rounded-[40px] shadow-2xl shadow-black/80">
              <img 
                src="/src/assets/images/hero_2030_1779023405386.png" 
                alt="Brand 2030 Hero" 
                referrerPolicy="no-referrer"
                className="rounded-[32px] w-full"
              />
              
              {/* Overlay labels from Design HTML */}
              <div className="absolute top-10 left-10 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-mono">
                <div className="text-brand-blue mb-1">تعديل تلقائي للمناخ</div>
                <div>TEMP: 22.4°C</div>
              </div>
              <div className="absolute bottom-10 right-10 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-mono text-left" dir="ltr">
                <div className="text-brand-purple mb-1 tracking-widest uppercase">Material</div>
                <div>GEN-X LIQUID SILK</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
          <span className="text-[10px] mt-2 uppercase tracking-[0.3em]">مرر للأسفل</span>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-12 border-t border-white/5 bg-white/[0.02] backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: Globe, label: 'المواد المستدامة', val: '100% حيوي' },
              { icon: Shield, label: 'نظام القياس', val: 'مسح ضوئي AI' },
              { icon: Sparkles, label: 'الإنتاج', val: 'طباعة ثلاثية الأبعاد' },
              { icon: Zap, label: 'الأداء', val: 'ألياف متكيفة' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col border-r border-white/10 pr-8 last:border-0"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">{f.label}</span>
                <span className="text-2xl font-light italic font-display">{f.val}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-40 px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="text-right">
              <h2 className="text-5xl md:text-7xl font-black font-display mb-6">مجموعة <span className="text-brand-blue italic">NEO</span></h2>
              <p className="text-gray-400 max-w-md leading-relaxed">إصدارات محدودة تجسد التقاطع بين العالمين العضوي والرقمي.</p>
            </div>
            <div className="flex gap-4 backdrop-blur-xl bg-white/5 p-2 rounded-2xl border border-white/10">
              {['الكل', 'سترات', 'إكسسوارات'].map((cat, i) => (
                <button key={i} className={`px-8 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${i === 0 ? 'bg-white text-black' : 'hover:bg-white/10'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard 
              image="/src/assets/images/tech_jacket_1779023422015.png"
              title="سترة نيون الذكية"
              price="١,٢٠٠ ر.س"
              category="ملابس علوية"
            />
            <ProductCard 
              image="/src/assets/images/cyber_sneakers_1779023435874.png"
              title="حذاء X-جينيوم"
              price="٨٥٠ ر.س"
              category="أحذية"
            />
            <ProductCard 
              image="/src/assets/images/future_shades_1779023451884.png"
              title="نظارة فيجن برو"
              price="٤٥٠ ر.س"
              category="إكسسوارات"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-20">
          <div className="col-span-2">
            <div className="text-4xl font-black tracking-tighter italic font-display mb-10">NEO-2030</div>
            <p className="text-gray-400 max-w-sm mb-12 leading-relaxed">
              نحن لا نصنع الملابس فحسب، بل نصمم تجارب حسية مستقبلية. انضم إلى ثورة الأنسجة الحيوية.
            </p>
            <div className="flex gap-4">
              {[Globe, Zap, Shield, Sparkles].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 frosted-glass flex items-center justify-center rounded-xl hover:text-brand-blue hover:border-brand-blue transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-[10px] text-gray-500">استكشف</h4>
            <ul className="space-y-6 text-sm font-light">
              <li><a href="#" className="hover:text-brand-blue transition-colors">المجموعات الرقمية</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">نظام المقاس الذكي</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">مختبر الابتكار</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">الاستدامة الحيوية</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-[10px] text-gray-500">النشرة</h4>
            <p className="text-xs text-gray-500 mb-6">احصل على وصول حصري لإصدارات 2030 التجريبية.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="PROMPT@2030.AI" 
                className="w-full frosted-glass py-4 px-6 rounded-none outline-none focus:border-brand-blue/50 transition-all text-xs font-mono"
              />
              <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-brand-blue transition-colors">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.4em] text-gray-600">
          <p>© 2030 NEO-FASHION LABS</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">الخصوصية الرقمية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الخدمة</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

