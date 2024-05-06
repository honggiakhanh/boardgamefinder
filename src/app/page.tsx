import BoardGameGeekHot from "@/components/BoardGameGeekHot";
import BoardGameListSkeleton from "@/components/BoardGameListSkeleton";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <main>
        <section className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">BoardGameFinder</h1>
          <p className="max-w-md mx-auto mb-6">
            BoardGameFinder is a Finnish board game finder that will help you
            discover your favorite tabletop games that Finnish retailers have
            available. Start by using the search bar below or click on any board
            game below to start your board game finding quest.
          </p>
          <SearchForm />
        </section>
        <BoardGameGeekHot />
        <BoardGameListSkeleton title="Board Game Discounts"></BoardGameListSkeleton>
      </main>
    </div>
  );
}
