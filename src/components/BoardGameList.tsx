import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type Props = {};

const BoardGameList = (props: Props) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Most popular board games</h2>
      <div className="grid grid-cols-5 gap-4">
        <Card className="w-full">
          <div className="w-full h-44 bg-gray-300"></div>

          <CardHeader>
            <CardTitle>Dune: Imperium – Deluxe Upgrade Pack</CardTitle>
            <CardDescription>€ 62.95</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default BoardGameList;
