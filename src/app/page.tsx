import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/SearchInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button>Default</Button>
      <Button variant="darkening">Darkening</Button>
    </main>
  );
}
