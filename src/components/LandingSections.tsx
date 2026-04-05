import React from 'react';
import { Sparkles, Stethoscope, ClipboardList, ShieldCheck } from 'lucide-react';

interface LandingSectionsProps {
  lang: 'fr' | 'ar';
}

const t = {
  fr: {
    title1: "En tant que médecin IA, je fournis un service rapide et gratuit",
    desc1: "Je donne la priorité à votre vie privée et notre conversation est totalement anonyme par défaut. Je peux vous aider à obtenir des informations à jour, trouver des pharmacies de garde, ou prendre rendez-vous avec un médecin.",
    title2: "Vous pouvez me parler comme vous le feriez avec votre médecin habituel",
    desc2: "Je peux vous aider à comprendre les problèmes de santé, vous orienter vers les bons spécialistes, et répondre à vos questions sur la santé et le mode de vie. Je vous donne des conseils médicaux d'experts à portée de main, quand vous en avez besoin.",
    chat1: "Bonjour Adam, pour quel problème ou question puis-je vous aider aujourd'hui ?",
    chat2: "J'ai une éruption cutanée sur le bras",
    title3: "Une fois notre discussion terminée, je peux vous mettre en contact avec un médecin humain",
    badge: "Rendez-vous disponibles instantanément, 24h/24 et 7j/7",
    desc3: "Si vous le souhaitez, vous pouvez réserver un suivi avec l'un de nos médecins pour obtenir vos ordonnances, discuter de nos conclusions d'IA, confirmer un diagnostic ou obtenir l'aide d'un spécialiste, tout cela dans le confort de votre téléphone.",
    feat1Title: "Recherche de pharmacies",
    feat1Desc: "Trouvez les pharmacies de garde près de chez vous",
    feat2Title: "Prise de rendez-vous",
    feat2Desc: "Trouvez et réservez avec les meilleurs spécialistes",
    feat3Title: "Conseils médicaux IA",
    feat3Desc: "Obtenez des réponses rapides à vos questions de santé"
  },
  ar: {
    title1: "بصفتي طبيب ذكاء اصطناعي، أقدم خدمة سريعة ومجانية",
    desc1: "أعطي الأولوية لخصوصيتك ومحادثتنا مجهولة تمامًا بشكل افتراضي. يمكنني مساعدتك في الحصول على معلومات محدثة، والعثور على صيدليات الحراسة، أو حجز موعد مع طبيب.",
    title2: "يمكنك التحدث معي كما تفعل مع طبيبك المعتاد",
    desc2: "يمكنني مساعدتك في فهم المشاكل الصحية، وتوجيهك إلى المتخصصين المناسبين، والإجابة على أسئلة الصحة ونمط الحياة. أقدم لك نصائح طبية متخصصة في متناول يدك، متى احتجت إليها.",
    chat1: "مرحباً آدم، ما هي المشكلة أو السؤال الذي يمكنني مساعدتك فيه اليوم؟",
    chat2: "لدي طفح جلدي على ذراعي",
    title3: "بمجرد انتهاء محادثتنا، يمكنني توصيلك بطبيب بشري",
    badge: "مواعيد متاحة فوراً، على مدار الساعة طوال أيام الأسبوع",
    desc3: "إذا كنت ترغب في ذلك، يمكنك حجز موعد متابعة مع أحد أطبائنا للحصول على وصفاتك الطبية، أو مناقشة نتائج الذكاء الاصطناعي، أو تأكيد التشخيص، أو الحصول على مساعدة متخصصة، كل ذلك من راحة هاتفك.",
    feat1Title: "البحث عن الصيدليات",
    feat1Desc: "ابحث عن صيدليات الحراسة القريبة منك",
    feat2Title: "حجز المواعيد",
    feat2Desc: "ابحث واحجز مع أفضل المتخصصين",
    feat3Title: "نصائح طبية بالذكاء الاصطناعي",
    feat3Desc: "احصل على إجابات سريعة لأسئلتك الصحية"
  }
};

export const LandingSections: React.FC<LandingSectionsProps> = ({ lang }) => {
  const text = t[lang];
  const isRtl = lang === 'ar';

  return (
    <div className={`flex flex-col items-center w-full max-w-3xl mx-auto mt-[40vh] pb-12 gap-20 text-center px-4 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Section 1 */}
      <section className="flex flex-col items-center w-full">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-blue-600">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 leading-tight">
          {text.title1}
        </h2>
        <p className="text-gray-600 text-base max-w-xl leading-relaxed mb-12">
          {text.desc1}
        </p>
        
        {/* Circular portraits mockup */}
        <div className="relative w-full max-w-xs aspect-square mx-auto">
          {/* Center person */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" 
              alt="Patient" 
              className="w-40 h-40 object-cover rounded-full shadow-2xl border-4 border-[#FFF8ED]"
            />
          </div>
          {/* Orbiting doctors */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFF8ED] shadow-lg">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop" alt="Doctor" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute top-1/4 right-0 w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFF8ED] shadow-lg">
            <img src="https://images.unsplash.com/photo-1594824432258-f7a11de23613?q=80&w=100&auto=format&fit=crop" alt="Doctor" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute bottom-1/4 right-0 w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFF8ED] shadow-lg">
            <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=100&auto=format&fit=crop" alt="Doctor" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFF8ED] shadow-lg">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop" alt="Doctor" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute bottom-1/4 left-0 w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFF8ED] shadow-lg">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop" alt="Doctor" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute top-1/4 left-0 w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFF8ED] shadow-lg">
            <img src="https://images.unsplash.com/photo-1594824432258-f7a11de23613?q=80&w=100&auto=format&fit=crop" alt="Doctor" className="w-full h-full object-cover"/>
          </div>
          {/* Faint circle lines */}
          <div className="absolute inset-6 border border-gray-300/50 rounded-full -z-10"></div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col items-center w-full">
        <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 leading-tight">
          {text.title2}
        </h2>
        <p className="text-gray-600 text-base max-w-xl leading-relaxed mb-12">
          {text.desc2}
        </p>

        <div className="bg-[#EAE5D9] rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-inner relative">
          <div className="flex flex-col gap-4">
            <div className={`bg-white rounded-2xl p-4 shadow-sm max-w-[85%] text-left ${isRtl ? 'rounded-br-sm self-start text-right' : 'rounded-bl-sm self-start text-left'}`}>
              <p className="text-gray-800 font-medium text-sm">{text.chat1}</p>
            </div>
            <div className={`bg-[#E2E8F0] rounded-2xl p-4 shadow-sm max-w-[85%] relative ${isRtl ? 'rounded-bl-sm self-end text-right ml-6' : 'rounded-br-sm self-end text-left mr-6'}`}>
              <p className="text-gray-800 font-medium text-sm">{text.chat2}</p>
              <div className={`absolute bottom-0 w-8 h-8 rounded-full overflow-hidden border-2 border-[#EAE5D9] shadow-sm ${isRtl ? '-left-10' : '-right-10'}`}>
                <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="flex flex-col items-center w-full">
        <div className="flex -space-x-3 mb-6">
          {[
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1594824432258-f7a11de23613?q=80&w=100&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=100&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop"
          ].map((src, i) => (
            <img key={i} src={src} alt="Doctor" className="w-12 h-12 rounded-full border-2 border-[#FFF8ED] object-cover shadow-sm" />
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 leading-tight max-w-xl">
          {text.title3}
        </h2>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-white text-emerald-600 text-xs font-medium mb-6 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          {text.badge}
        </div>

        <p className="text-gray-600 text-base max-w-xl leading-relaxed mb-10">
          {text.desc3}
        </p>

        <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-sm border border-gray-100 text-left">
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className={isRtl ? 'text-right w-full' : 'text-left'}>
                <h4 className="font-semibold text-gray-900 text-base">{text.feat1Title}</h4>
                <p className="text-gray-500 text-sm">{text.feat1Desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                <ClipboardList className="w-4 h-4" />
              </div>
              <div className={isRtl ? 'text-right w-full' : 'text-left'}>
                <h4 className="font-semibold text-gray-900 text-base">{text.feat2Title}</h4>
                <p className="text-gray-500 text-sm">{text.feat2Desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className={isRtl ? 'text-right w-full' : 'text-left'}>
                <h4 className="font-semibold text-gray-900 text-base">{text.feat3Title}</h4>
                <p className="text-gray-500 text-sm">{text.feat3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
