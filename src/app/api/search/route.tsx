import { BGG_SearchResult } from "@/lib/types";
import { xmlToJson } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "No name provided" }, { status: 400 });
  }

  try {
    console.log("Getting data for: " + name);

    const response = await fetch(
      `https://www.boardgamegeek.com/xmlapi2/search?query=${name}&type=boardgame`
    );

    const text = await response.text();

    const parsedData = (await xmlToJson(text)) as BGG_SearchResult;

    if (
      !parsedData.items ||
      !parsedData.items.item ||
      parsedData.items.item.length === 0
    ) {
      return NextResponse.json([]);
    }

    const items = parsedData.items.item.slice(0, 9);

    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
