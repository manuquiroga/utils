"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SimpleNote from "./components/SimpleNote";
import { Note } from "@/types";

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    const keys = Object.keys(localStorage);
    const notesArray = keys
      .filter((key) => isUUID(key))
      .map((key) => {
        const item = localStorage.getItem(key);
        if (item !== null) {
          const note = JSON.parse(item) as Note;
          note.id = key;
          return note;
        } else {
          return null;
        }
      })
      .filter((note) => note !== null) as Note[];

    setNotes(notesArray);
  };

  const isUUID = (key: string): boolean => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(key);
  };

  const createNote = () => {
    router.push("/notes/new");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold">My Notes</h1>
        <Button onClick={() => createNote()}>Create a new Note</Button>
      </div>
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note, index) => <SimpleNote key={index} note={note} fetchNotes={fetchNotes}></SimpleNote>)
        ) : (
          <p>No hay notas</p>
        )}
      </div>
    </div>
  );
}
