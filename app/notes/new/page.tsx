"use client";
import TextEditor from "@/app/notes/components/TextEditor";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NewNote() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const id = uuidv4();
    const date = new Date();
    const data = {
      title: title,
      content: content,
      date: date,
    };
    localStorage.setItem(id, JSON.stringify(data));
    router.push("/notes");
  };

  const onCancel = () => {
    router.push("/notes");
  };
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
              <Input id="title" placeholder="Title of your note" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label>Description</Label>
              <TextEditor setDescription={setContent} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create</Button>
      </CardFooter>
    </Card>
  );
}
