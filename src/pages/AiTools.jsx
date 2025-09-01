import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaRobot, FaFileAlt, FaMagic, FaIdCard, FaHandsHelping, FaImage, FaFilePdf,
  FaComments, FaCamera, FaMicrophone, FaLanguage, FaShieldAlt, FaSearch,
  FaPlus, FaHistory, FaDownload, FaTrash, FaStop, FaPlay, FaSync
} from "react-icons/fa";

// Optional libs (loaded defensively)
let PDFDocument, saveAs, Fuse, jsPDF;
try { ({ PDFDocument } = require("pdf-lib")); } catch {}
try { ({ saveAs } = require("file-saver")); } catch {}
try { Fuse = require("fuse.js"); } catch {}
try { jsPDF = require("jspdf"); } catch {}

// ---------- Utils ----------
const useLocal = (key, init) => {
  const [v, setV] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : init; } catch { return init; }
  });
  useEffect(()=>{ try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
};

const downloadBlob = (blob, filename) => {
  if (saveAs) saveAs(blob, filename);
  else {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }
};

const Card = ({children,className=""}) => (
  <div className={`bg-white dark:bg-neutral-900 rounded-2xl shadow border border-black/5 dark:border-white/5 ${className}`}>{children}</div>
);

const SectionTitle = ({icon, children}) => (
  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">{icon}{children}</h3>
);

// ---------- Tools list (sidebar) ----------
const toolsList = [
  { name: "AI Resume Builder", icon: <FaFileAlt />, desc: "Generate polished resumes instantly." },
  { name: "AI Document Editor", icon: <FaMagic />, desc: "Fix grammar & formatting automatically." },
  { name: "Passport Photo Maker", icon: <FaIdCard />, desc: "Create passport-size photos easily." },
  { name: "Form Auto-Filler", icon: <FaHandsHelping />, desc: "Assist with KRA, HELB, NTSA forms." },
  { name: "Image Background Remover", icon: <FaImage />, desc: "Remove image backgrounds in 1 click." },
  { name: "PDF Merger & Splitter", icon: <FaFilePdf />, desc: "Combine or split PDFs seamlessly." },
  { name: "AI Chat Assistant", icon: <FaComments />, desc: "Get instant AI support & help." },
  { name: "Photo ID Enhancer", icon: <FaCamera />, desc: "Enhance ID/Passport photos professionally." },
  { name: "Audio to Text", icon: <FaMicrophone />, desc: "Convert speech to text instantly." },
  { name: "Document Translator", icon: <FaLanguage />, desc: "Translate documents to multiple languages." },
  { name: "Data Privacy Scanner", icon: <FaShieldAlt />, desc: "Scan documents for sensitive data." },
  { name: "Smart Search", icon: <FaSearch />, desc: "Find documents or files quickly." },
];

// ---------- Mini Apps (each tool) ----------

// 1) AI Resume Builder (client PDF via jsPDF; backend hook available)
function ToolResumeBuilder() {
  const [form, setForm] = useState({
    name:"", title:"", phone:"", email:"", summary:"",
    experience:"", education:"", skills:""
  });
  const genPDF = () => {
    if (!jsPDF) { alert("Install 'jspdf' to export PDF (npm i jspdf). For now, use browser print (Ctrl/Cmd+P)."); return; }
    const doc = new jsPDF();
    doc.setFontSize(18); doc.text(form.name || "Your Name", 14, 20);
    doc.setFontSize(12);
    doc.text(`${form.title || ""}`, 14, 28);
    doc.text(`${form.phone || ""} • ${form.email || ""}`, 14, 36);
    const addBlock = (head, body, y) => {
      doc.setFont(undefined, "bold"); doc.text(head, 14, y);
      doc.setFont(undefined, "normal"); doc.text(doc.splitTextToSize(body || "-", 180), 14, y+6);
      return y + 24;
    };
    let y = 50;
    y = addBlock("Summary", form.summary, y);
    y = addBlock("Experience", form.experience, y);
    y = addBlock("Education", form.education, y);
    y = addBlock("Skills", form.skills, y);
    doc.save("resume.pdf");
  };
  const quickAI = async () => {
    // Backend suggestion endpoint (plug in your model)
    // const r = await fetch("/api/ai/resume/suggest", {method:"POST",body:JSON.stringify(form)});
    // const data = await r.json(); setForm({...form, summary: data.summary })
    setForm(s=>({...s, summary:(s.summary||"")+" Led cross-functional teams to deliver print & digital projects on time. Improved document turnaround by 35% with AI workflows."}));
  };
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-4">
        <SectionTitle icon={<FaFileAlt className="text-blue-600" />}>Details</SectionTitle>
        {["name","title","phone","email"].map(k=>(
          <input key={k} placeholder={k.toUpperCase()} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="w-full border rounded-xl px-3 py-2 mb-2 dark:bg-neutral-800"/>
        ))}
        {["summary","experience","education","skills"].map(k=>(
          <textarea key={k} rows={k==="summary"?3:5} placeholder={k.toUpperCase()} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="w-full border rounded-xl px-3 py-2 mb-2 dark:bg-neutral-800"/>
        ))}
        <div className="flex gap-3">
          <button onClick={quickAI} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground flex items-center gap-2"><FaMagic/> AI Improve</button>
          <button onClick={genPDF} className="px-4 py-2 rounded-xl border flex items-center gap-2"><FaDownload/> Export PDF</button>
        </div>
      </Card>
      <Card className="p-4">
        <SectionTitle icon={<FaSearch className="text-blue-600" />}>Preview</SectionTitle>
        <div className="prose dark:prose-invert max-w-none text-sm">
          <h2 className="text-xl font-bold">{form.name || "Your Name"}</h2>
          <div className="opacity-70">{form.title}</div>
          <div className="opacity-70">{form.phone} • {form.email}</div>
          <hr className="my-3 opacity-20"/>
          <h4 className="font-semibold">Summary</h4>
          <p>{form.summary || "Professional summary…"}</p>
          <h4 className="font-semibold mt-3">Experience</h4>
          <p className="whitespace-pre-wrap">{form.experience}</p>
          <h4 className="font-semibold mt-3">Education</h4>
          <p className="whitespace-pre-wrap">{form.education}</p>
          <h4 className="font-semibold mt-3">Skills</h4>
          <p className="whitespace-pre-wrap">{form.skills}</p>
        </div>
      </Card>
    </div>
  );
}

// 2) AI Document Editor (client grammar-ish polish + backend hook)
function ToolDocumentEditor() {
  const [text, setText] = useState("");
  const clean = () =>
    setText(t => t
      .replace(/[ \t]+/g, " ")
      .replace(/\s+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim());
  const capitalize = () =>
    setText(t => t.replace(/(^\s*\w|[.!?]\s+\w)/g, m => m.toUpperCase()));
  const aiFix = async () => {
    // const r = await fetch("/api/ai/edit", {method:"POST", headers:{'Content-Type':'application/json'}, body:JSON.stringify({text})});
    // const {fixed} = await r.json(); setText(fixed);
    setText(t => `${t}\n\n[AI Suggestion] Consider shorter sentences and consistent tense.`);
  };
  const downloadTxt = () => downloadBlob(new Blob([text], {type:"text/plain"}), "document.txt");
  return (
    <Card className="p-4 space-y-3">
      <SectionTitle icon={<FaMagic className="text-purple-600" />}>AI Editor</SectionTitle>
      <textarea className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800" rows={10} placeholder="Paste or type content…" value={text} onChange={e=>setText(e.target.value)}/>
      <div className="flex flex-wrap gap-2">
        <button onClick={aiFix} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground"><FaMagic/> AI Fix</button>
        <button onClick={clean} className="px-4 py-2 rounded-xl border">Tidy Spacing</button>
        <button onClick={capitalize} className="px-4 py-2 rounded-xl border">Capitalize</button>
        <button onClick={downloadTxt} className="px-4 py-2 rounded-xl border"><FaDownload/> Export .txt</button>
      </div>
    </Card>
  );
}

// 3) Passport Photo Maker (simple crop/zoom & export 600x600 JPG)
function ToolPassportPhoto() {
  const [img, setImg] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({x:0, y:0});
  const canvasRef = useRef(null);

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const url = URL.createObjectURL(f); setImg(url);
  };
  const exportPhoto = () => {
    const canvas = canvasRef.current; const ctx = canvas.getContext("2d");
    const size = 600; canvas.width = size; canvas.height = size;
    const image = new Image(); image.crossOrigin="anonymous"; image.src = img;
    image.onload = () => {
      const iw = image.width, ih = image.height;
      const cx = iw/2 + offset.x, cy = ih/2 + offset.y;
      const drawW = iw/scale, drawH = ih/scale;
      ctx.fillStyle="#fff"; ctx.fillRect(0,0,size,size);
      ctx.drawImage(
        image,
        cx - drawW/2, cy - drawH/2, drawW, drawH,
        0, 0, size, size
      );
      canvas.toBlob(b=> downloadBlob(b, "passport-600x600.jpg"), "image/jpeg", 0.92);
    };
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-4">
        <SectionTitle icon={<FaIdCard className="text-blue-600" />}>Upload & Adjust</SectionTitle>
        <input type="file" accept="image/*" onChange={onFile} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800"/>
        {img && (
          <>
            <div className="mt-4 aspect-square w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              {/* Live preview using background image, scale & offset */}
              <div
                className="w-full h-full bg-center bg-no-repeat"
                style={{
                  backgroundImage:`url(${img})`,
                  backgroundSize:`${scale*100}% auto`,
                  backgroundPosition:`calc(50% + ${offset.x}px) calc(50% + ${offset.y}px)`
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <label className="text-sm">Zoom
                <input type="range" min="0.5" max="3" step="0.01" value={scale} onChange={e=>setScale(Number(e.target.value))} className="w-full"/>
              </label>
              <label className="text-sm">X
                <input type="range" min="-200" max="200" value={offset.x} onChange={e=>setOffset(o=>({...o, x:Number(e.target.value)}))} className="w-full"/>
              </label>
              <label className="text-sm">Y
                <input type="range" min="-200" max="200" value={offset.y} onChange={e=>setOffset(o=>({...o, y:Number(e.target.value)}))} className="w-full"/>
              </label>
            </div>
            <button onClick={exportPhoto} className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground"><FaDownload/> Export 600×600</button>
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </Card>
      <Card className="p-4">
        <SectionTitle icon={<FaCamera className="text-blue-600" />}>Guidelines</SectionTitle>
        <ul className="text-sm list-disc pl-5 space-y-1 opacity-80">
          <li>Neutral background, good lighting.</li>
          <li>Head centered, eyes open, no filters.</li>
          <li>Export 600×600 JPG (meets many e-visa specs).</li>
        </ul>
      </Card>
    </div>
  );
}

// 4) Form Auto-Filler (client suggestions + backend hook)
function ToolFormAutofill() {
  const [scheme, setScheme] = useState("KRA");
  const [fields, setFields] = useState({fullName:"", idNumber:"", email:"", phone:"", address:""});
  const suggest = async () => {
    // const r = await fetch(`/api/ai/forms/${scheme.toLowerCase()}`, {method:"POST",headers:{'Content-Type':'application/json'}, body:JSON.stringify(fields)});
    // const data = await r.json(); setFields(data);
    setFields(f=>({...f, address: f.address || "P.O BOX 12345-00100 Nairobi"}));
  };
  return (
    <Card className="p-4 space-y-3">
      <SectionTitle icon={<FaHandsHelping className="text-blue-600" />}>Auto-Fill</SectionTitle>
      <select value={scheme} onChange={e=>setScheme(e.target.value)} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800">
        {["KRA","HELB","NTSA"].map(s=><option key={s}>{s}</option>)}
      </select>
      {Object.keys(fields).map(k=>(
        <input key={k} placeholder={k} value={fields[k]} onChange={e=>setFields({...fields,[k]:e.target.value})}
               className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800"/>
      ))}
      <div className="flex gap-2">
        <button onClick={suggest} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground"><FaMagic/> AI Suggest</button>
        <button onClick={()=>downloadBlob(new Blob([JSON.stringify({scheme,fields},null,2)],{type:"application/json"}),"form-data.json")} className="px-4 py-2 rounded-xl border"><FaDownload/> Export JSON</button>
      </div>
    </Card>
  );
}

// 5) Image Background Remover (canvas threshold)
function ToolBgRemover() {
  const [src, setSrc] = useState(null);
  const [threshold, setThreshold] = useState(240);
  const canvasRef = useRef(null);

  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    setSrc(URL.createObjectURL(f));
  };

  const process = () => {
    if (!src) return;
    const img = new Image(); img.crossOrigin="anonymous"; img.src = src;
    img.onload = () => {
      const c = canvasRef.current, ctx = c.getContext("2d");
      c.width = img.width; c.height = img.height;
      ctx.drawImage(img,0,0);
      const d = ctx.getImageData(0,0,c.width,c.height);
      const t = Number(threshold);
      for (let i=0;i<d.data.length;i+=4){
        const r=d.data[i], g=d.data[i+1], b=d.data[i+2];
        if (r>t && g>t && b>t) d.data[i+3]=0; // make near-white transparent
      }
      ctx.putImageData(d,0,0);
    };
  };
  const download = () => canvasRef.current.toBlob(b => downloadBlob(b, "no-bg.png"));

  return (
    <Card className="p-4 space-y-3">
      <SectionTitle icon={<FaImage className="text-blue-600" />}>Background Remover</SectionTitle>
      <input type="file" accept="image/*" onChange={onFile} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800"/>
      <label className="text-sm">Threshold {threshold}
        <input type="range" min="150" max="255" value={threshold} onChange={e=>setThreshold(e.target.value)} className="w-full"/>
      </label>
      <div className="flex gap-2">
        <button onClick={process} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground">Remove BG</button>
        <button onClick={download} className="px-4 py-2 rounded-xl border"><FaDownload/> Download PNG</button>
      </div>
      <canvas ref={canvasRef} className="mt-3 w-full max-h-[50vh] rounded-xl bg-neutral-200 dark:bg-neutral-800"/>
    </Card>
  );
}

// 6) PDF Merger & Splitter (pdf-lib)
function ToolPDF() {
  const [files, setFiles] = useState([]);
  const [splitPages, setSplitPages] = useState("1-1");
  const onFiles = (e) => setFiles(Array.from(e.target.files||[]));

  const merge = async () => {
    if (!PDFDocument) return alert("Install 'pdf-lib' to merge PDFs.");
    if (!files.length) return;
    const out = await PDFDocument.create();
    for (const f of files){
      const bytes = new Uint8Array(await f.arrayBuffer());
      const src = await PDFDocument.load(bytes);
      const copied = await out.copyPages(src, src.getPageIndices());
      copied.forEach(p=>out.addPage(p));
    }
    const b = await out.save();
    downloadBlob(new Blob([b], {type:"application/pdf"}), "merged.pdf");
  };
  const split = async () => {
    if (!PDFDocument) return alert("Install 'pdf-lib' to split PDFs.");
    if (!files[0]) return;
    const [start,end] = splitPages.split("-").map(n=>parseInt(n.trim(),10)-1);
    const bytes = new Uint8Array(await files[0].arrayBuffer());
    const src = await PDFDocument.load(bytes);
    const out = await PDFDocument.create();
    const indices = Array.from({length: (end-start+1)}, (_,i)=>start+i).filter(i=>i>=0 && i<src.getPageCount());
    const copied = await out.copyPages(src, indices);
    copied.forEach(p=>out.addPage(p));
    const b = await out.save();
    downloadBlob(new Blob([b], {type:"application/pdf"}), `split-${splitPages}.pdf`);
  };

  return (
    <Card className="p-4 space-y-3">
      <SectionTitle icon={<FaFilePdf className="text-red-600" />}>PDF Tools</SectionTitle>
      <input type="file" multiple accept="application/pdf" onChange={onFiles} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800"/>
      <div className="flex flex-wrap gap-2">
        <button onClick={merge} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground">Merge PDFs</button>
        <div className="flex items-center gap-2">
          <input value={splitPages} onChange={e=>setSplitPages(e.target.value)} className="border rounded-xl px-3 py-2 w-28 dark:bg-neutral-800" placeholder="1-3"/>
          <button onClick={split} className="px-4 py-2 rounded-xl border">Split Range</button>
        </div>
      </div>
    </Card>
  );
}

// 7) AI Chat Assistant (backend hook with graceful fallback)
function ToolChat() {
  const [msgs, setMsgs] = useState([{role:"assistant", content:"Hi! How can I help with your documents today?"}]);
  const [input, setInput] = useState("");
  const send = async () => {
    if (!input.trim()) return;
    const userMsg = {role:"user", content:input};
    setMsgs(m=>[...m, userMsg]); setInput("");
    try {
      // const r = await fetch("/api/ai/chat",{method:"POST", headers:{'Content-Type':'application/json'}, body:JSON.stringify({messages:[...msgs, userMsg]})});
      // const {reply} = await r.json();
      const reply = "I'll route this to the right tool. (Replace with real model reply from backend.)";
      setMsgs(m=>[...m, {role:"assistant", content:reply}]);
    } catch {
      setMsgs(m=>[...m, {role:"assistant", content:"(Offline) Tip: Try the PDF tool for merging & splitting."}]);
    }
  };
  return (
    <Card className="p-4 flex flex-col h-full">
      <SectionTitle icon={<FaComments className="text-blue-600" />}>Assistant</SectionTitle>
      <div className="flex-1 overflow-auto space-y-2">
        {msgs.map((m,i)=>(
          <div key={i} className={`p-2 rounded-xl ${m.role==="user"?"bg-blue-600/10 dark:bg-blue-400/10 text-blue-900 dark:text-blue-100 ml-auto":"bg-neutral-100 dark:bg-neutral-800"} max-w-[80%]`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded-xl px-3 py-2 dark:bg-neutral-800" placeholder="Ask anything…"/>
        <button onClick={send} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground">Send</button>
      </div>
    </Card>
  );
}

// 8) Photo ID Enhancer (brightness/contrast/sharpness)
function ToolPhotoEnhancer() {
  const [src,setSrc]=useState(null); const [bri,setBri]=useState(1); const [con,setCon]=useState(1);
  const canvasRef = useRef(null);
  const onFile = e => { const f=e.target.files?.[0]; if (!f) return; setSrc(URL.createObjectURL(f)); };
  useEffect(()=>{ if (!src) return;
    const img = new Image(); img.src = src; img.onload=()=>{
      const c=canvasRef.current, ctx=c.getContext("2d");
      c.width=img.width; c.height=img.height;
      ctx.filter=`brightness(${bri}) contrast(${con})`;
      ctx.drawImage(img,0,0);
    };
  },[src,bri,con]);
  const download = ()=> canvasRef.current.toBlob(b=>downloadBlob(b,"enhanced.png"));
  return (
    <Card className="p-4 space-y-3">
      <SectionTitle icon={<FaCamera className="text-blue-600" />}>ID Enhancer</SectionTitle>
      <input type="file" accept="image/*" onChange={onFile} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800"/>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">Brightness {bri.toFixed(2)}<input type="range" min="0.5" max="1.8" step="0.01" value={bri} onChange={e=>setBri(Number(e.target.value))} className="w-full"/></label>
        <label className="text-sm">Contrast {con.toFixed(2)}<input type="range" min="0.5" max="1.8" step="0.01" value={con} onChange={e=>setCon(Number(e.target.value))} className="w-full"/></label>
      </div>
      <canvas ref={canvasRef} className="w-full max-h-[50vh] rounded-xl bg-neutral-200 dark:bg-neutral-800"/>
      <button onClick={download} className="px-4 py-2 rounded-xl border"><FaDownload/> Download</button>
    </Card>
  );
}

// 9) Audio to Text (Web Speech API + file upload hook)
function ToolAudioToText() {
  const [listening,setListening]=useState(false);
  const [transcript,setTranscript]=useState("");
  const recRef = useRef(null);

  const start = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Web Speech API not supported. Use file upload to backend.");
    const rec = new SpeechRecognition(); rec.lang="en-US"; rec.interimResults=true;
    rec.onresult = (e)=> {
      let t=""; for (const r of e.results){ t+=r[0].transcript+" "; }
      setTranscript(t.trim());
    };
    rec.onend = ()=> setListening(false);
    rec.start(); recRef.current=rec; setListening(true);
  };
  const stop = ()=>{ recRef.current?.stop(); setListening(false); };
  const onFile = async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    // const form = new FormData(); form.append("audio", f);
    // const r = await fetch("/api/ai/stt", {method:"POST", body:form});
    // const {text} = await r.json(); setTranscript(text);
    setTranscript("(Mock) Uploaded audio transcribed here…");
  };

  return (
    <Card className="p-4 space-y-3">
      <SectionTitle icon={<FaMicrophone className="text-blue-600" />}>Speech to Text</SectionTitle>
      <div className="flex gap-2">
        <button onClick={listening?stop:start} className={`px-4 py-2 rounded-xl ${listening?"bg-red-600 text-white":"bg-primary text-primary-foreground"} flex items-center gap-2`}>
          {listening ? <><FaStop/> Stop</> : <><FaPlay/> Record</>}
        </button>
        <label className="px-4 py-2 rounded-xl border cursor-pointer">
          Upload audio
          <input type="file" accept="audio/*" onChange={onFile} className="hidden"/>
        </label>
      </div>
      <textarea value={transcript} onChange={e=>setTranscript(e.target.value)} rows={8} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800" placeholder="Transcript…"/>
      <button onClick={()=>downloadBlob(new Blob([transcript],{type:"text/plain"}),"transcript.txt")} className="px-4 py-2 rounded-xl border"><FaDownload/> Download .txt</button>
    </Card>
  );
}

// 10) Document Translator (client demo + backend hook)
function ToolTranslator() {
  const [src,setSrc]=useState(""); const [dst,setDst]=useState(""); const [lang,setLang]=useState("sw");
  const translate = async () => {
    // const r = await fetch("/api/ai/translate",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({text:src, to:lang})});
    // const {text} = await r.json(); setDst(text);
    const demo = { sw:"(demo) Tafsiri ya Kiswahili", fr:"(démo) Traduction française", de:"(demo) Deutsche Übersetzung" };
    setDst(`${demo[lang] || "(demo) Translation"}:\n\n${src}`);
  };
  return (
    <Card className="p-4 space-y-3">
      <SectionTitle icon={<FaLanguage className="text-blue-600" />}>Translator</SectionTitle>
      <textarea value={src} onChange={e=>setSrc(e.target.value)} rows={6} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800" placeholder="Paste text to translate…"/>
      <div className="flex gap-2">
        <select value={lang} onChange={e=>setLang(e.target.value)} className="border rounded-xl px-3 py-2 dark:bg-neutral-800">
          <option value="sw">Swahili</option><option value="fr">French</option><option value="de">German</option>
        </select>
        <button onClick={translate} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground"><FaSync/> Translate</button>
      </div>
      <textarea value={dst} readOnly rows={6} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800"/>
    </Card>
  );
}

// 11) Data Privacy Scanner (regex PII)
function ToolPrivacyScanner() {
  const [text,setText]=useState("");
  const [findings,setFindings]=useState([]);
  const scan = () => {
    const patterns = [
      { label:"Email", re:/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi },
      { label:"Phone (KE)", re:/\b(?:\+?254|0)7\d{8}\b/g },
      { label:"National ID-like", re:/\b\d{7,8}\b/g }
    ];
    const out=[]; patterns.forEach(p=>{
      const matches = [...text.matchAll(p.re)].map(m=>({label:p.label, value:m[0]}));
      out.push(...matches);
    });
    setFindings(out);
  };
  return (
    <Card className="p-4 space-y-3">
      <SectionTitle icon={<FaShieldAlt className="text-blue-600" />}>Privacy Scanner</SectionTitle>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={8} className="w-full border rounded-xl px-3 py-2 dark:bg-neutral-800" placeholder="Paste document text…"/>
      <button onClick={scan} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground">Scan</button>
      <div className="text-sm">
        {findings.length===0 ? <div className="opacity-60 mt-2">No matches yet.</div> :
          <ul className="mt-3 space-y-1">{findings.map((f,i)=><li key={i} className="p-2 rounded bg-neutral-100 dark:bg-neutral-800"><b>{f.label}:</b> {f.value}</li>)}</ul>}
      </div>
    </Card>
  );
}

// 12) Smart Search (Fuse.js if available; fallback to includes)
function ToolSmartSearch() {
  const [docs,setDocs]=useLocal("ucyber.docs",[
    {title:"KRA Guide", body:"How to apply for KRA PIN and tax returns…"},
    {title:"HELB Steps", body:"Loan application portal steps…"},
    {title:"NTSA Transfer", body:"Vehicle transfer instructions…"},
  ]);
  const [q,setQ]=useState("");
  const fuse = useMemo(()=> Fuse ? new Fuse(docs, {keys:["title","body"], includeScore:true}) : null,[docs]);
  const results = useMemo(()=>{
    if (!q) return [];
    if (fuse) return fuse.search(q).map(r=>r.item);
    const s=q.toLowerCase(); return docs.filter(d=>d.title.toLowerCase().includes(s)||d.body.toLowerCase().includes(s));
  },[q, fuse, docs]);

  return (
    <Card className="p-2 space-y-3">
      <SectionTitle icon={<FaSearch className="text-blue-600" />}>Smart Search</SectionTitle>
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 border rounded-xl px-3 py-2 dark:bg-neutral-800" placeholder="Search guides, notes…"/>
        <button onClick={()=>setQ("")} className="px-3 py-2 rounded-xl border">Clear</button>
      </div>
      <ul className="mt-3 space-y-2">
        {results.map((r,i)=>(
          <li key={i} className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm opacity-80">{r.body}</div>
          </li>
        ))}
        {q && results.length===0 && <div className="opacity-60">No results.</div>}
      </ul>
      <div className="mt-4">
        <SectionTitle icon={<FaPlus className="text-blue-600" />}>Add Note</SectionTitle>
        <button onClick={()=>setDocs(d=>[{title:`Note ${d.length+1}`, body:"…"},...d])} className="px-4 py-2 rounded-xl border">Add Blank</button>
      </div>
    </Card>
  );
}

// ---------- Main Dashboard ----------
export default function AiTools() {
  const [selectedTool, setSelectedTool] = useLocal("ucyber.ai.selected", toolsList[0]);
  const [history, setHistory] = useLocal("ucyber.ai.history", []);
  const [query, setQuery] = useState("");

  const launchTool = (tool) => {
    setSelectedTool(tool);
    setHistory(h=>[{ tool: tool.name, time: new Date().toLocaleString() }, ...h].slice(0,50));
  };

  const renderTool = () => {
    switch (selectedTool.name) {
      case "AI Resume Builder": return <ToolResumeBuilder/>;
      case "AI Document Editor": return <ToolDocumentEditor/>;
      case "Passport Photo Maker": return <ToolPassportPhoto/>;
      case "Form Auto-Filler": return <ToolFormAutofill/>;
      case "Image Background Remover": return <ToolBgRemover/>;
      case "PDF Merger & Splitter": return <ToolPDF/>;
      case "AI Chat Assistant": return <ToolChat/>;
      case "Photo ID Enhancer": return <ToolPhotoEnhancer/>;
      case "Audio to Text": return <ToolAudioToText/>;
      case "Document Translator": return <ToolTranslator/>;
      case "Data Privacy Scanner": return <ToolPrivacyScanner/>;
      case "Smart Search": return <ToolSmartSearch/>;
      default: return <div className="opacity-70">Select a tool.</div>;
    }
  };

  const filteredTools = toolsList.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="  w-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900 rounded-2xl overflow-hidden shadow-xl">

      {/* HEADER */}
      <header className="flex items-center justify-between px-2 py-4 bg-white dark:bg-neutral-900 border-b">
        <div className="flex items-center gap-3">
          <FaRobot className="text-blue-600 text-2xl"/>
          <div>
            <div className="text-xl font-bold">Ultimate Cyber — AI Studio</div>
            <div className="text-xs opacity-60">Automate resumes, PDFs, photos, speech, translation & more</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tools…" className="pl-9 pr-3 py-2 rounded-xl border dark:bg-neutral-800"/>
          </div>
          <button className="px-3 py-2 rounded-xl border flex items-center gap-2"><FaPlus/> Request Tool</button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-72 bg-white dark:bg-neutral-900 border-r p-4 overflow-y-auto">
          <div className="text-sm font-semibold mb-2">Tools</div>
          <ul className="space-y-2">
            {filteredTools.map((tool) => {
              const active = selectedTool.name === tool.name;
              return (
                <li key={tool.name}>
                  <button
                    onClick={()=>launchTool(tool)}
                    className={`w-full text-left flex items-center gap-3 p-2 rounded-xl transition ${active ? "bg-blue-600 text-white" : "hover:bg-blue-50 dark:hover:bg-neutral-800"}`}
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{tool.name}</div>
                      <div className={`text-xs ${active ? "opacity-90" : "opacity-60"}`}>{tool.desc}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* MAIN PANEL */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-4">
            <div className="text-2xl font-bold">{selectedTool.name}</div>
            <div className="opacity-70">{selectedTool.desc}</div>
          </div>
          {renderTool()}
        </main>

        {/* HISTORY */}
        <aside className="w-72 bg-white dark:bg-neutral-900 border-l p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2"><FaHistory/> History</div>
            <button onClick={()=>setHistory([])} className="text-xs opacity-60 hover:opacity-100"><FaTrash/></button>
          </div>
          <ul className="space-y-2 text-sm">
            {history.length===0 && <div className="opacity-60">No recent activity.</div>}
            {history.map((h,i)=>(
              <li key={i} className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <div className="font-medium">{h.tool}</div>
                <div className="opacity-60">{h.time}</div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

