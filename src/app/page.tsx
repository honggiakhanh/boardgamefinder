import SearchForm from "@/components/SearchForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <main>
        <section className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">TableTopFinder</h1>
          <p className="max-w-md mx-auto mb-6">
            TableTopFInder is a Finnish board game scraper that will help you
            discover your favorite tabletop games that finnish retailers have
            available. Start by choosing a category at the top or use the
            searchbar below to start your board game quest.
          </p>
          <SearchForm />
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
