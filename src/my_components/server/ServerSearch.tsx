import { memo, useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface ServerSearchProps {
  type: "Channel";
  data: {
    name: string;
    _id: string;
    type: string;
    imageUrl?: string;
  }[];
}

function ServerSearch({ data, type }: ServerSearchProps) {
  const [open, setOpen] = useState(false);
  const methodForUseEffect = useCallback((e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", methodForUseEffect);
    return () => {
      document.removeEventListener("keydown", methodForUseEffect);
    };
  }, []);

  return (
    <div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="group p-2 cursor-pointer border border-1 border-gray-700 rounded-md flex items-center justify-between gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <div className="flex items-center justify-center gap-x-2">
          <Search className="size-4 text-zinc-500 dark:text-zinc-300" />
          <h1 className="font-semibold max-w-max text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
            Search
          </h1>
        </div>
        <kbd className="text-muted-foreground font-mono font-medium bg-muted border rounded px-1 flex items-center justify-center">
          <span className="text-xs mr-1">CTRL+</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem></CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default memo(ServerSearch);
