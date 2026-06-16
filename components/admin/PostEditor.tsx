"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { CMS_CATEGORIES, slugify } from "@/lib/cms-categories";

type SavedPost = {
  id: number;
  slug: string;
  lang: "es" | "en";
  title: string;
  status: "draft" | "published";
};

type Props = {
  initial?: {
    id?: number;
    lang: "es" | "en";
    title: string;
    slug: string;
    excerpt: string;
    html: string;
    hero: string;
    thumbnail: string;
    category_slug: string;
    status: "draft" | "published";
  };
};

const accent = "#31B1F8";
const accentDeep = "#1E89C7";
const navy = "#15163A";
const ink = "#4A4F66";
const ink3 = "#6E7488";
const rule = "rgba(15,23,42,0.12)";

const card: React.CSSProperties = { background: "#fff", border: `1px solid ${rule}`, borderRadius: 12, padding: "18px 22px" };
const inp: React.CSSProperties = { padding: "10px 14px", borderRadius: 8, border: `1px solid ${rule}`, background: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit", color: navy, width: "100%" };
const btn: React.CSSProperties = { padding: "8px 16px", borderRadius: 8, fontSize: 13, border: `1px solid ${rule}`, background: "#fff", cursor: "pointer", color: navy, fontFamily: "inherit", fontWeight: 500 };
const btnPrimary: React.CSSProperties = { ...btn, background: navy, color: "#fff", border: "none", fontWeight: 600 };
const btnAccent: React.CSSProperties = { ...btn, background: accent, color: "#fff", border: "none", fontWeight: 600 };

export default function PostEditor({ initial }: Props) {
  const [lang, setLang] = useState<"es" | "en">(initial?.lang || "es");
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugLocked, setSlugLocked] = useState(!!initial?.id);
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [category, setCategory] = useState(initial?.category_slug || "blog");
  const [hero, setHero] = useState(initial?.hero || "");
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail || "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [savedId, setSavedId] = useState<number | undefined>(initial?.id);
  const [showPreview, setShowPreview] = useState(false);
  const heroInputRef = useRef<HTMLInputElement | null>(null);
  const thumbInputRef = useRef<HTMLInputElement | null>(null);
  const bodyImgInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Image.configure({
        HTMLAttributes: { style: "max-width:100%;height:auto;border-radius:12px;margin:24px 0;" },
      }),
      Placeholder.configure({
        placeholder: "Empieza a escribir tu post… usa los botones para títulos, listas, citas, enlaces e imágenes.",
      }),
    ],
    content: initial?.html || "",
    immediatelyRender: false,
  });

  // Slug auto desde título cuando el slug no está bloqueado
  useEffect(() => {
    if (!slugLocked && title) setSlug(slugify(title));
  }, [title, slugLocked]);

  const uploadImage = useCallback(async (file: File, folder = "cms"): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/admin/posts/upload-image/", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok || !data?.ok) {
      alert(`Error subiendo imagen: ${data?.error || res.status}`);
      return null;
    }
    return data.url as string;
  }, []);

  const onPickHero = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await uploadImage(f, "case-studies");
    if (url) setHero(url);
    e.target.value = "";
  };
  const onPickThumb = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await uploadImage(f, "case-studies");
    if (url) setThumbnail(url);
    e.target.value = "";
  };
  const onPickBodyImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await uploadImage(f, "cms/body");
    if (url && editor) editor.chain().focus().setImage({ src: url, alt: f.name }).run();
    e.target.value = "";
  };

  const insertLink = () => {
    if (!editor) return;
    const prev = editor.getAttributes("link")?.href || "";
    const href = window.prompt("URL del enlace (ej: /es/conteo-personas/ o https://...)", prev);
    if (href === null) return;
    if (href === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  const save = async (asPublished: boolean) => {
    if (!editor) return;
    setStatus("saving"); setErrorMsg("");
    const html = editor.getHTML();
    const payload = {
      id: savedId,
      lang, title, slug, excerpt,
      html,
      hero, thumbnail,
      category_slug: category,
      status: asPublished ? "published" : "draft",
    };
    const res = await fetch("/api/admin/posts/save/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data?.ok) {
      setStatus("error");
      setErrorMsg(data?.error || "Error guardando");
      return;
    }
    const saved = data.post as SavedPost;
    setSavedId(saved.id);
    setSlugLocked(true);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2500);
    if (asPublished) {
      // Abrir vista previa real en otra pestaña
      window.open(`/${saved.lang}/${saved.slug}/`, "_blank", "noopener");
    }
  };

  const btnTb: React.CSSProperties = { padding: "6px 10px", borderRadius: 6, border: `1px solid ${rule}`, background: "#fff", cursor: "pointer", fontSize: 13, color: navy, fontFamily: "inherit", minWidth: 30 };
  const btnTbActive: React.CSSProperties = { ...btnTb, background: navy, color: "#fff", borderColor: navy };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start" }}>
      {/* Columna principal */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Título + slug */}
        <div style={card}>
          <label style={{ fontSize: 11, color: ink3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe el título del post…"
            style={{ ...inp, marginTop: 6, fontSize: 22, fontWeight: 600, color: navy, border: "none", padding: "4px 0", borderBottom: `1px solid ${rule}`, borderRadius: 0 }}
          />
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: ink3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>URL</span>
            <span style={{ fontSize: 13, color: ink3, fontFamily: "monospace" }}>/{lang}/</span>
            <input
              value={slug}
              onChange={(e) => { setSlug(slugify(e.target.value)); setSlugLocked(true); }}
              placeholder="auto-desde-título"
              style={{ ...inp, padding: "6px 10px", fontSize: 13, fontFamily: "monospace", color: navy }}
            />
            <span style={{ fontSize: 13, color: ink3, fontFamily: "monospace" }}>/</span>
          </div>
        </div>

        {/* Editor */}
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${rule}`, display: "flex", gap: 6, flexWrap: "wrap", background: "#FAFBFC" }}>
            <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} style={editor?.isActive("heading", { level: 2 }) ? btnTbActive : btnTb} title="Título sección (H2)">H2</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} style={editor?.isActive("heading", { level: 3 }) ? btnTbActive : btnTb} title="Subtítulo (H3)">H3</button>
            <span style={{ width: 1, background: rule, margin: "0 4px" }} />
            <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} style={editor?.isActive("bold") ? btnTbActive : btnTb} title="Negrita"><b>B</b></button>
            <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} style={editor?.isActive("italic") ? btnTbActive : btnTb} title="Cursiva"><i>I</i></button>
            <button type="button" onClick={insertLink} style={editor?.isActive("link") ? btnTbActive : btnTb} title="Enlace">🔗</button>
            <span style={{ width: 1, background: rule, margin: "0 4px" }} />
            <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} style={editor?.isActive("bulletList") ? btnTbActive : btnTb} title="Lista">•</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} style={editor?.isActive("orderedList") ? btnTbActive : btnTb} title="Lista numerada">1.</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} style={editor?.isActive("blockquote") ? btnTbActive : btnTb} title="Cita destacada">&ldquo;</button>
            <span style={{ width: 1, background: rule, margin: "0 4px" }} />
            <button type="button" onClick={() => bodyImgInputRef.current?.click()} style={btnTb} title="Insertar imagen en el cuerpo">🖼 Imagen</button>
            <input ref={bodyImgInputRef} type="file" accept="image/*" onChange={onPickBodyImg} hidden />
            <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
              <button type="button" onClick={() => editor?.chain().focus().undo().run()} style={btnTb} title="Deshacer">↶</button>
              <button type="button" onClick={() => editor?.chain().focus().redo().run()} style={btnTb} title="Rehacer">↷</button>
              <span style={{ width: 1, background: rule, margin: "0 4px" }} />
              <button type="button" onClick={() => setShowPreview(p => !p)} style={btnTb} title="Ver/ocultar previa HTML">{showPreview ? "Editor" : "HTML"}</button>
            </div>
          </div>
          <div style={{ padding: "20px 28px", background: "#fff", minHeight: 380, fontSize: 17, lineHeight: 1.65, color: navy, fontFamily: "var(--font-body), -apple-system, sans-serif" }}>
            <EditorContent editor={editor} />
          </div>
          {showPreview && (
            <pre style={{ borderTop: `1px solid ${rule}`, background: "#F6F7FB", padding: 18, fontSize: 12, color: ink, margin: 0, maxHeight: 280, overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{editor?.getHTML() || ""}</pre>
          )}
        </div>

        {/* Resumen / excerpt */}
        <div style={card}>
          <label style={{ fontSize: 11, color: ink3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Resumen para meta-descripción y tarjeta del listado</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            maxLength={200}
            placeholder="1–2 frases. Aparece en Google y en la card del listado."
            style={{ ...inp, marginTop: 8, resize: "vertical", lineHeight: 1.5, fontSize: 14 }}
          />
          <div style={{ fontSize: 11, color: ink3, marginTop: 4, textAlign: "right" }}>{excerpt.length} / 200</div>
        </div>

        {/* Estilo Editor + acciones flotantes */}
        <style>{`
          .tiptap-editor :is(p) { margin: 0 0 14px; }
          .tiptap-editor :is(h2) { font-family: var(--font-display); font-weight: 500; color: ${navy}; font-size: 26px; letter-spacing: -0.02em; line-height: 1.18; margin: 28px 0 12px; }
          .tiptap-editor :is(h3) { font-family: var(--font-display); font-weight: 500; color: ${navy}; font-size: 21px; letter-spacing: -0.015em; line-height: 1.22; margin: 22px 0 10px; }
          .tiptap-editor :is(strong) { color: ${navy}; font-weight: 600; }
          .tiptap-editor :is(a) { color: ${accentDeep}; text-decoration: underline; text-underline-offset: 3px; }
          .tiptap-editor :is(ul, ol) { margin: 0 0 14px 22px; }
          .tiptap-editor :is(li) { margin-bottom: 6px; }
          .tiptap-editor :is(blockquote) { margin: 24px 0; padding: 0 0 0 22px; border-left: 4px solid ${accent}; font-family: var(--font-display); font-size: 21px; font-style: italic; color: ${navy}; }
          .tiptap-editor :is(img) { max-width: 100%; height: auto; border-radius: 10px; margin: 18px 0; }
          .tiptap-editor :is(p.is-editor-empty:first-child)::before { content: attr(data-placeholder); float: left; color: ${ink3}; pointer-events: none; height: 0; }
          .ProseMirror:focus { outline: none; }
        `}</style>
      </div>

      {/* Sidebar */}
      <aside style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 20 }}>
        <div style={card}>
          <div style={{ fontSize: 11, color: ink3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 12 }}>Publicación</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button type="button" onClick={() => save(false)} disabled={status === "saving"} style={{ ...btn, flex: 1, opacity: status === "saving" ? 0.6 : 1 }}>
              {status === "saving" ? "Guardando…" : "Guardar borrador"}
            </button>
            <button type="button" onClick={() => save(true)} disabled={status === "saving"} style={{ ...btnAccent, flex: 1, opacity: status === "saving" ? 0.6 : 1 }}>
              Publicar →
            </button>
          </div>
          {status === "saved" && <p style={{ fontSize: 12, color: "#10b981", margin: 0 }}>✓ Guardado correctamente</p>}
          {status === "error" && <p style={{ fontSize: 12, color: "#DC2626", margin: 0 }}>✗ {errorMsg}</p>}
          {savedId && (
            <p style={{ fontSize: 11, color: ink3, margin: "8px 0 0" }}>
              Post id <code>{savedId}</code> · <a href={`/${lang}/${slug}/`} target="_blank" rel="noreferrer" style={{ color: accentDeep }}>Ver en la web →</a>
            </p>
          )}
        </div>

        <div style={card}>
          <label style={{ fontSize: 11, color: ink3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Idioma</label>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            {(["es", "en"] as const).map(L => (
              <button key={L} type="button" onClick={() => setLang(L)} style={lang === L ? btnPrimary : btn}>{L === "es" ? "Español" : "English"}</button>
            ))}
          </div>
        </div>

        <div style={card}>
          <label style={{ fontSize: 11, color: ink3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inp, marginTop: 6 }}>
            {CMS_CATEGORIES.map(c => (
              <option key={c.slug} value={c.slug}>{lang === "es" ? c.name_es : c.name_en} ({c.slug})</option>
            ))}
          </select>
        </div>

        <div style={card}>
          <label style={{ fontSize: 11, color: ink3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Imagen interior (banner)</label>
          {hero ? (
            <div style={{ marginTop: 8 }}>
              <img src={hero} alt="hero" style={{ width: "100%", borderRadius: 8, border: `1px solid ${rule}` }} />
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                <button type="button" onClick={() => heroInputRef.current?.click()} style={{ ...btn, flex: 1 }}>Cambiar</button>
                <button type="button" onClick={() => setHero("")} style={btn}>✕</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => heroInputRef.current?.click()} style={{ ...btn, width: "100%", marginTop: 8, padding: "20px 12px", borderStyle: "dashed" }}>
              ⬆ Subir imagen
            </button>
          )}
          <input ref={heroInputRef} type="file" accept="image/*" onChange={onPickHero} hidden />
        </div>

        <div style={card}>
          <label style={{ fontSize: 11, color: ink3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Imagen del listado (opcional)</label>
          <p style={{ fontSize: 11, color: ink3, margin: "4px 0 8px" }}>Si no la subes, se usa la del banner.</p>
          {thumbnail ? (
            <div>
              <img src={thumbnail} alt="thumb" style={{ width: "100%", borderRadius: 8, border: `1px solid ${rule}` }} />
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                <button type="button" onClick={() => thumbInputRef.current?.click()} style={{ ...btn, flex: 1 }}>Cambiar</button>
                <button type="button" onClick={() => setThumbnail("")} style={btn}>✕</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => thumbInputRef.current?.click()} style={{ ...btn, width: "100%", padding: "16px 12px", borderStyle: "dashed" }}>
              ⬆ Subir imagen
            </button>
          )}
          <input ref={thumbInputRef} type="file" accept="image/*" onChange={onPickThumb} hidden />
        </div>
      </aside>

      <style jsx global>{`
        .ProseMirror { min-height: 320px; }
        .ProseMirror p { margin: 0 0 14px; }
        .ProseMirror h2 { font-family: var(--font-display); font-weight: 500; color: ${navy}; font-size: 26px; letter-spacing: -0.02em; line-height: 1.18; margin: 28px 0 12px; }
        .ProseMirror h3 { font-family: var(--font-display); font-weight: 500; color: ${navy}; font-size: 21px; letter-spacing: -0.015em; line-height: 1.22; margin: 22px 0 10px; }
        .ProseMirror strong { color: ${navy}; font-weight: 600; }
        .ProseMirror a { color: ${accentDeep}; text-decoration: underline; text-underline-offset: 3px; }
        .ProseMirror ul, .ProseMirror ol { margin: 0 0 14px 22px; }
        .ProseMirror li { margin-bottom: 6px; }
        .ProseMirror blockquote { margin: 24px 0; padding: 0 0 0 22px; border-left: 4px solid ${accent}; font-family: var(--font-display); font-size: 21px; font-style: italic; color: ${navy}; }
        .ProseMirror img { max-width: 100%; height: auto; border-radius: 10px; margin: 18px 0; }
        .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); float: left; color: ${ink3}; pointer-events: none; height: 0; }
        .ProseMirror:focus { outline: none; }
      `}</style>
    </div>
  );
}
