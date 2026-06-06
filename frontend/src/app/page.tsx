"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Languages, Zap, Terminal, RefreshCw, Send, Globe } from "lucide-react";

const API_BASE_URL = "http://localhost:8000";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [generatedWord, setGeneratedWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await axios.get(API_BASE_URL);
        setStatus("online");
      } catch (error) {
        setStatus("offline");
      }
    };
    checkStatus();
  }, []);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/translate`, {
        text: inputText,
      });
      setTranslatedText(response.data.zenith);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWord = async () => {
    if (!wordInput.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/generate-word`, {
        word: wordInput,
      });
      setGeneratedWord(response.data.zenith);
    } catch (error) {
      console.error("Word generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-cyan-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="text-white fill-current" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            ZENITH <span className="text-xs font-normal text-cyan-400 align-top ml-1">v1.0</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className={`w-2 h-2 rounded-full ${status === "online" ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
            <span className="text-xs text-white/60 uppercase tracking-widest">{status}</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Translation Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-cyan-400">
            <Languages size={20} />
            <h2 className="text-lg font-bold tracking-widest uppercase">Sentence Translation</h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-all hover:border-white/20">
            <div className="p-6 flex flex-col gap-4">
              <label className="text-xs text-white/40 uppercase tracking-widest">Turkish Input</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Örn: Ben interneti göreceğim..."
                className="bg-transparent border-none outline-none resize-none text-xl placeholder:text-white/20 h-32"
              />
              <button
                onClick={handleTranslate}
                disabled={loading}
                className="self-end px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
                Convert
              </button>
            </div>
            
            <div className="border-t border-white/10 p-6 bg-cyan-500/5">
              <label className="text-xs text-cyan-400 uppercase tracking-widest block mb-4">Zenith Output</label>
              <div className="text-2xl font-bold tracking-tight text-white/90 min-h-[1.5rem]">
                {translatedText || <span className="text-white/10">...</span>}
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10">
            <h3 className="text-xs font-bold text-white/40 uppercase mb-2 flex items-center gap-2">
              <Globe size={14} /> Philosophy
            </h3>
            <p className="text-sm text-white/60 leading-relaxed italic">
              "Maximum speed, zero exceptions. SOV typology. Modularity at its core."
            </p>
          </div>
        </section>

        {/* Word Generation Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-purple-400">
            <Terminal size={20} />
            <h2 className="text-lg font-bold tracking-widest uppercase">Word Deformation</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-all hover:border-white/20">
            <div className="p-6 flex flex-col gap-4">
              <label className="text-xs text-white/40 uppercase tracking-widest">Source Word</label>
              <input
                type="text"
                value={wordInput}
                onChange={(e) => setWordInput(e.target.value)}
                placeholder="Örn: Klavye..."
                className="bg-transparent border-none outline-none text-xl placeholder:text-white/20"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateWord()}
              />
              <button
                onClick={handleGenerateWord}
                disabled={loading}
                className="self-end px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-purple-400 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
                Generate
              </button>
            </div>

            <div className="border-t border-white/10 p-6 bg-purple-600/5">
              <label className="text-xs text-purple-400 uppercase tracking-widest block mb-4">Acoustic Core</label>
              <div className="text-3xl font-bold tracking-tight text-white/90">
                {generatedWord || <span className="text-white/10">...</span>}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10">
            <h3 className="text-xs font-bold text-white/40 uppercase mb-2 flex items-center gap-2">
              <Terminal size={14} /> Algorithm
            </h3>
            <code className="text-[10px] text-white/40">
              Zenith_Word = Reverse(Core - [First + Last])
            </code>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-12 py-8 border-t border-white/10 text-center">
        <p className="text-xs text-white/20 tracking-widest uppercase">
          Designed for Cyber-Logic Interaction &copy; 2026 ZENITH PROJECT
        </p>
      </footer>
    </div>
  );
}
