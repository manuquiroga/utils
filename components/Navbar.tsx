import Link from "next/link";
import { Themetoggle } from "@/components/Themetoggle";

export function Navbar() {
  return (
    <nav className="border-b bg-background py-5 flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-4xl">
            <span className="text-primary">MUtils</span>
          </h1>
        </Link>

        <Themetoggle />
      </div>
    </nav>
  );
}
