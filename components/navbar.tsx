import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


export function Navbar() {

  const session = { email: "G" };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-2xl mx-auto px-4">
       
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 font-bold text-lg"
        >
          Social App
        </Link>

      
        <div className="flex flex-1 items-center justify-end space-x-2">
        
          <Link href="/post/new" passHref>
            <Button variant="ghost" size="icon" title="Create Post">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>

        
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="text-sm bg-gray-200">
              {session.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
