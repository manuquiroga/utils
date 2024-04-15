import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" flex justify-between items-center border-t mt-16">
      <div className="container p-8">
        <p className=" text-sm">
          Built by{" "}
          <Link href="https://manuquiroga.vercel.app" target="_blank" className="underline text-primary">
            manuquiroga
          </Link>
        </p>
        <div className="flex gap-2"></div>
      </div>
    </footer>
  );
};

export default Footer;
