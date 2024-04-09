"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Note } from "@/types";
import TextEditor from "../../components/TextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// AGREGAR TRY CATCH CON TOAST

const EditNotePage = () => {
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

  // fix double console.log!!!
  console.log(JSON.stringify(note, null, 2));

  const onCancel = () => {
    router.push("/notes");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!note) {
      return;
    }

    const data = {
      title: title,
      content: content,
      date: note.date,
    };
    localStorage.setItem(noteId as string, JSON.stringify(data));
    router.push("/notes");
  };

  if (!note) {
    return <div>No se encontró la nota.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Note</CardTitle>
        <CardDescription>Create a new note</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2 w-full lg:w-[30%]">
              <Label htmlFor="title">Title</Label>
              <Input value={title} id="title" placeholder="Title of your note" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label>Description</Label>
              <TextEditor setDescription={setContent} content={note.content} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default EditNotePage;
