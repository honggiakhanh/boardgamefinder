import BoardGameCard from "@/components/BoardGameCard";
import BoardGameList from "@/components/BoardGameList";
import BoardGameListSkeleton from "@/components/BoardGameListSkeleton";
import SearchForm from "@/components/SearchForm";
import { testBoardGames } from "@/lib/testBoardGames";

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
        <BoardGameList store={testBoardGames[0]}></BoardGameList>
        <BoardGameListSkeleton title="Board Game Discounts"></BoardGameListSkeleton>
      </main>
    </div>
  );
}
