import SearchForm from "@/components/SearchForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <header className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger id="categories">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="strategy">Strategy</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="party">Party</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="dice">Dice</SelectItem>
            </SelectContent>
          </Select>
          <div className="size-8 bg-gray-300"></div>
        </div>
        <div className="flex items-center space-x-4">
          <Link className="text-sm" href="#">
            Login / Create account
          </Link>
          <div className="size-8 bg-gray-300"></div>
        </div>
      </header>
      <main>
        <section className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">TableTopFinder</h1>
          <p className="max-w-md mx-auto mb-6">
            TableTopFinder is the biggest European board game database that will
            help you discover your favorite tabletop games. Start by choosing a
            category at the top or use the searchbar below to start your board
            game quest.
          </p>
          <SearchForm />
        </section>
        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-4">
            Most popular board games
          </h2>
          <div className="grid grid-cols-5 gap-4">
            <Card className="w-full">
              <div className="w-full h-44 bg-gray-300"></div>

              <CardHeader>
                <CardTitle>Dune: Imperium – Deluxe Upgrade Pack</CardTitle>
                <CardDescription>€ 62.95</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="text-right mt-4">
            <Link className="text-blue-600 hover:underline" href="#">
              Browse more board games
            </Link>
          </div>
        </section>
        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Board game discounts</h2>
          <div className="grid grid-cols-5 gap-4">
            <Card className="w-full">
              <div className="w-full h-44 bg-gray-300"></div>

              <CardHeader>
                <CardTitle>Roll & Wall</CardTitle>
                <CardDescription className="text-red-600">
                  -88.7%
                </CardDescription>
                <CardDescription>€ 5.08</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
