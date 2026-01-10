"use client";

import React, { useEffect } from 'react';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, 
  Link as LinkIcon, Image as ImageIcon, Undo, Redo, Quote
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { applyWatermark } from '@/lib/image-utils';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          let processedFile = file;
          try {
            processedFile = await applyWatermark(file);
          } catch (e) {
            console.error("Watermark error:", e);
          }

          const fileName = `${Math.random().toString(36).substring(2)}.${processedFile.name.split('.').pop()}`;
          const { data, error } = await supabase.storage
            .from('product-images')
            .upload(`descriptions/${fileName}`, processedFile);

          if (error) throw error;
          if (data) {
            const { data: { publicUrl } } = supabase.storage
              .from('product-images')
              .getPublicUrl(`descriptions/${fileName}`);
            
            editor.chain().focus().setImage({ src: publicUrl }).run();
          }
        } catch (error: any) {
          alert(`Error uploading image: ${error.message}`);
        }
      }
    };
    input.click();
  };

  const setLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 text-navy' : 'text-slate-600'}`}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 text-navy' : 'text-slate-600'}`}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('underline') ? 'bg-slate-200 text-navy' : 'text-slate-600'}`}
      >
        <UnderlineIcon size={18} />
      </button>
      <div className="w-[1px] bg-slate-200 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 text-navy' : 'text-slate-600'}`}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 text-navy' : 'text-slate-600'}`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('blockquote') ? 'bg-slate-200 text-navy' : 'text-slate-600'}`}
      >
        <Quote size={18} />
      </button>
      <div className="w-[1px] bg-slate-200 mx-1" />
      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('link') ? 'bg-slate-200 text-navy' : 'text-slate-600'}`}
      >
        <LinkIcon size={18} />
      </button>
      <button
        type="button"
        onClick={addImage}
        className="p-2 rounded hover:bg-slate-200 transition-colors text-slate-600"
      >
        <ImageIcon size={18} />
      </button>
      <div className="flex-grow" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-slate-200 transition-colors text-slate-400 hover:text-navy"
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-slate-200 transition-colors text-slate-400 hover:text-navy"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto my-4',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] p-5 text-slate-700',
      },
    },
    immediatelyRender: false,
  });

  // Update editor content when external content changes (e.g. on edit)
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="w-full border border-slate-100 rounded-2xl bg-slate-50 focus-within:bg-white focus-within:ring-4 focus-within:ring-navy/5 transition-all overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
