import re
from typing import List, Dict, Optional

class ZenithNLPEngine:
    def __init__(self):
        # Temel zamirler
        self.pronouns = {
            "ben": "zon", 
            "sen": "ron", 
            "o": "von",
            "biz": "zonis",
            "siz": "ronis",
            "onlar": "vonis"
        }
        
        # Temel kök eylemler (Sabitler)
        self.root_verbs = {
            "görmek": "vaz", "gör": "vaz",
            "yapmak": "kov", "yap": "kov", 
            "çalıştırmak": "kov",
            "gitmek": "naz", "git": "naz",
            "gelmek": "laz", "gel": "laz",
            "sevmek": "daz", "sev": "daz",
            "istemek": "paz", "iste": "paz"
        }
        
        # Olumsuzluk ve Soru ekleri (Zenith v1.1 önerisi)
        # Olumsuzluk: Fiilin sonuna "-no"
        # Soru: Cümlenin sonuna "ka"
        self.negation_suffix = "no"
        self.question_particle = "ka"

    def _get_acoustic_core(self, word: str) -> str:
        """Kelimenin akustik kökünü temizler."""
        word = word.lower().strip()
        # Türkçe ekleri temizleme (basit model)
        word = re.sub(r'(i|ı|u|ü|e|a)$', '', word)
        return word

    def generate_root_word(self, word: str) -> str:
        """Zenith deformasyon algoritması."""
        clean_word = self._get_acoustic_core(word)
        
        if clean_word in self.pronouns:
            return self.pronouns[clean_word]
        
        if clean_word in self.root_verbs:
            return self.root_verbs[clean_word]
            
        if len(clean_word) <= 2:
            return clean_word + "on"
            
        # Algoritma: İlk ve son harfi at, ortayı ters çevir
        return clean_word[1:-1][::-1]

    def process_verb(self, verb_phrase: str) -> str:
        """Fiil zamanlarını ve olumsuzluğu işler."""
        verb_phrase = verb_phrase.lower()
        
        is_negative = False
        if any(neg in verb_phrase for neg in ["me", "ma", "mı", "mi", "mu", "mü"]):
            # Basit olumsuzluk kontrolü (yapmadı, gitmeyecek vb.)
            # Ancak "m-" geçmiş zaman ekiyle karışmaması için dikkatli olunmalı
            if not (verb_phrase.startswith("m") and len(verb_phrase) > 2): 
                is_negative = True

        # Zaman ekleri
        prefix = ""
        if re.search(r'(di|dı|du|dü|ti|tı|tu|tü)', verb_phrase):
            prefix = "m"  # Geçmiş
        elif "ecek" in verb_phrase or "acak" in verb_phrase:
            prefix = "v"  # Gelecek
            
        root = self.generate_root_word(verb_phrase)
        
        result = f"{prefix}{root}"
        if is_negative:
            result += self.negation_suffix
            
        return result

    def translate_to_zenith(self, turkish_sentence: str) -> str:
        """Türkçe cümleyi Zenith diline çevirir (SOV)."""
        # Soru kontrolü
        is_question = "?" in turkish_sentence
        clean_sentence = turkish_sentence.replace("?", "").lower()
        
        words = re.findall(r'\b\w+\b', clean_sentence)
        if len(words) < 2:
            # Tek kelimelik veya boş giriş
            return self.generate_root_word(words[0]) if words else ""

        # SOV Yapısı: Özne (0) + Nesneler (1:-1) + Yüklem (-1)
        subject_raw = words[0]
        verb_raw = words[-1]
        objects_raw = words[1:-1]
        
        # Özne
        zenith_subject = self.generate_root_word(subject_raw)
        
        # Nesneler (Çoğul kontrolü ile)
        zenith_objects = []
        for obj in objects_raw:
            is_plural = False
            if obj.endswith("ler") or obj.endswith("lar"):
                is_plural = True
                obj = obj[:-3]
            
            zenith_obj = self.generate_root_word(obj)
            if is_plural:
                zenith_obj += "is"
            zenith_objects.append(zenith_obj)
            
        # Yüklem
        zenith_verb = self.process_verb(verb_raw)
        
        # Birleştirme
        sentence = f"{zenith_subject} {' '.join(zenith_objects)} {zenith_verb}".strip()
        
        if is_question:
            sentence += f" {self.question_particle}"
            
        return sentence

if __name__ == "__main__":
    # Testler
    engine = ZenithNLPEngine()
    print(f"Ben telefon görüyorum -> {engine.translate_to_zenith('Ben telefon görüyorum')}")
    print(f"Sen interneti gördün mü? -> {engine.translate_to_zenith('Sen interneti gördün mü?')}")
    print(f"O bilgisayarları alacak -> {engine.translate_to_zenith('O bilgisayarları alacak')}")
    print(f"Biz elma yemedik -> {engine.translate_to_zenith('Biz elma yemedik')}")
