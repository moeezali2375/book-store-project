import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <header className="top-0  flex h-16 items-center gap-4 border-b px-4 md:px-6 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <span>Book</span>
          <span>Store</span>
          <span className="sr-only">Book Store</span>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:hidden"
        >
          Book Store
          <span className="sr-only">Book Store</span>
        </Link>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              Book Store
              <span className="sr-only">Book Store</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Coming Soon...
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full justify-end items-center gap-4">
        <div className="relative">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
