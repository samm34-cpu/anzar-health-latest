/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { PanelLeft, X, User, Bot } from "lucide-react";
import { PromptInputBox } from "./components/PromptInputBox";
import { GoogleGenAI } from "@google/genai";
import { PlaceCard } from "./components/PlaceCard";
import { LandingSections } from "./components/LandingSections";

interface Message {
  role: "user" | "model";
  text: string;
  places?: any[];
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string, files?: File[]) => {
    if (!text.trim() && (!files || files.length === 0)) return;

    let useMaps = false;
    let query = text;

    // Parse prefix
    if (text.startsWith("[Pharmacy: ")) {
      useMaps = true;
      query = text.replace("[Pharmacy: ", "").replace(/\]$/, "");
    } else if (text.startsWith("[Location: ")) {
      useMaps = true;
      query = text.replace("[Location: ", "").replace(/\]$/, "");
    }

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const config: any = {
        systemInstruction: lang === 'fr' 
          ? "Tu es Anzar, un assistant de santé pour le Maroc. Réponds toujours en français de manière concise et empathique."
          : "أنت أنزار، مساعد صحي للمغرب. أجب دائمًا باللغة العربية بشكل موجز ومتعاطف.",
      };

      if (useMaps) {
        config.tools = [{ googleMaps: {} }];
        // Try to get location, fallback to Casablanca if it fails or takes too long
        try {
          const pos = await Promise.race([
            new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
          ]) as GeolocationPosition;
          
          config.toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              }
            }
          };
        } catch (e) {
          console.log("Using default location (Casablanca)");
          config.toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: 33.5731,
                longitude: -7.5898,
              }
            }
          };
        }
      }

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: query,
        config,
      });

      setMessages((prev) => [
        ...prev,
        { role: "model", text: "" },
      ]);
      setIsLoading(false);

      let textResponse = "";
      let places: any[] = [];

      for await (const chunk of responseStream) {
        textResponse += chunk.text || "";
        const chunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const newPlaces = chunks?.map((c: any) => c.maps).filter(Boolean) || [];
        if (newPlaces.length > 0) {
          places = [...places, ...newPlaces];
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "model",
            text: textResponse,
            places: places.length > 0 ? places : undefined,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Désolé, une erreur s'est produite lors de la communication avec le serveur." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col font-sans relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#FFF8ED]" />
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-0 pointer-events-none animate-in fade-in slide-in-from-bottom-24 duration-1000 ease-out flex justify-center items-end h-[65vh] opacity-20">
        <svg 
          viewBox="0 0 2292 800" 
          className="w-[300%] md:w-[250%] h-full min-w-[1500px] object-cover object-bottom"
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_5226_125)">
            <path 
              d="M1113.5 40C502.673 39.9999 40 793 40 793H2252C2252 793 1724.33 40 1113.5 40Z" 
              fill="url(#paint0_radial_5226_125)"
            />
          </g>
          <defs>
            <filter id="filter0_f_5226_125" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur"/>
            </filter>
            <radialGradient id="paint0_radial_5226_125" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1146 793) rotate(-90) scale(753 1106)">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFF8ED" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="text-2xl font-bold tracking-tight text-black">anzar</div>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="py-4">
          <a href="#" className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">Open Source</a>
          <a href="#" className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">Doctors</a>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-2 bg-transparent shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-1.5 -ml-1.5 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
          <div className="text-xl font-bold tracking-tight text-black">anzar</div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
            className="w-7 h-7 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center text-xs font-medium text-gray-700 transition-colors shadow-sm"
          >
            {lang === 'fr' ? 'AR' : 'FR'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`relative z-10 flex-1 flex flex-col pt-4 ${messages.length === 0 ? 'pb-12' : 'pb-40'} w-full overflow-y-auto scrollbar-hide`}>
        {messages.length === 0 ? (
          <div className="w-full">
            <div className="max-w-2xl mx-auto px-6 mt-8 mb-8">
              <h1 className="text-2xl font-medium text-gray-900 mb-6">
                {lang === 'fr' ? "Comment puis-je vous aider pour votre santé ?" : "كيف يمكنني مساعدتك في صحتك؟"}
              </h1>

              <div className="flex flex-col gap-2.5 items-start mb-8">
                <button 
                  onClick={() => handleSend(lang === 'fr' ? "Que faire en cas de fièvre ?" : "ماذا أفعل في حالة الحمى؟")}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-800 text-xs bg-white/50 backdrop-blur-sm"
                >
                  {lang === 'fr' ? "Que faire en cas de fièvre ?" : "ماذا أفعل في حالة الحمى؟"}
                </button>
                <button 
                  onClick={() => handleSend(lang === 'fr' ? "[Pharmacy: Pharmacies de garde à Casablanca]" : "[Pharmacy: صيدليات الحراسة في الدار البيضاء]")}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-800 text-xs shadow-sm"
                >
                  {lang === 'fr' ? "Pharmacies de garde à Casablanca" : "صيدليات الحراسة في الدار البيضاء"}
                </button>
                <button 
                  onClick={() => handleSend(lang === 'fr' ? "[Location: Prendre rendez-vous avec un généraliste]" : "[Location: حجز موعد مع طبيب عام]")}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-800 text-xs bg-white/50 backdrop-blur-sm"
                >
                  {lang === 'fr' ? "Prendre rendez-vous avec un généraliste" : "حجز موعد مع طبيب عام"}
                </button>
              </div>

              <div className="w-full mb-12">
                <PromptInputBox 
                  placeholder={lang === 'fr' ? "Décrivez vos symptômes ou posez une question..." : "صف الأعراض أو اطرح سؤالاً..."}
                  onSend={handleSend}
                  isLoading={isLoading}
                  lang={lang}
                />
              </div>
            </div>
            
            <LandingSections lang={lang} />
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full px-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div 
                  className={`max-w-[85%] ${
                    msg.role === "user" 
                      ? "bg-gray-900 text-white rounded-2xl rounded-tr-sm px-4 py-3" 
                      : "text-gray-800 py-2"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap font-serif">{msg.text}</p>
                </div>
                
                {msg.places && msg.places.length > 0 && (
                  <div className="mt-4 flex flex-col gap-3 w-full">
                    {msg.places.map((place, pIdx) => (
                      <PlaceCard key={pIdx} place={place} lang={lang} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-100 shadow-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Fixed Bottom Input (only when chatting) */}
      {messages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 pt-12 z-20 pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <PromptInputBox 
              placeholder={lang === 'fr' ? "Décrivez vos symptômes ou posez une question..." : "صف الأعراض أو اطرح سؤالاً..."}
              onSend={handleSend}
              isLoading={isLoading}
              lang={lang}
            />
          </div>
        </div>
      )}
    </div>
  );
}


