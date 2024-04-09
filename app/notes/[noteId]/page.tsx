"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Note } from "@/types";

const NotePage = () => {
  const router = useRouter();
  const { noteId } = useParams();
  const [note, setNote] = useState<Note>();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const noteString = localStorage.getItem(noteId as string);
    const parsedNote: Note = noteString ? JSON.parse(noteString) : null;
    setNote(parsedNote);

    if (parsedNote) {
      setContent(parsedNote.content);
      setTitle(parsedNote.title);
    }
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content.toString() }}></div>
    </div>
  );
};
export default NotePage;
