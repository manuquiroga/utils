import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Note } from "@/types";
import Link from "next/link";

interface SimpleNoteProps {
  note: Note;
  fetchNotes: () => void;
}
const SimpleNote: React.FC<SimpleNoteProps> = ({ note, fetchNotes }) => {
  const router = useRouter();
  const date = new Date(note.date.toString());
  const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(date);

  const handleEditNote = (note: Note) => {
    router.push(`/notes/${note.id}/edit`);
  };

  const handleDeleteNote = (note: Note) => {
    localStorage.removeItem(note.id);
    fetchNotes();
    router.push("/notes");
  };

  return (
    <div className="border rounded-md flex justify-between items-center hover:border-black/40 dark:hover:border-white/25 transition duration-300">
      <Link href={`/notes/${note.id}`} className="flex-grow p-4">
        <h2 className="text-md sm:text-lg md-text-xl font-semibold text-primary">{note.title}</h2>
        <p className="text-muted-foreground text-xs sm:text-sm">{formattedDate}</p>
      </Link>

      <div className="flex px-4 gap-2 justify-between items-center">
        {" "}
        <Button variant="ghost" onClick={() => handleEditNote(note)}>
          <SquarePen className="h-5 w-5" />
        </Button>
        <Button variant="ghost" onClick={() => handleDeleteNote(note)}>
          <Trash className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SimpleNote;
