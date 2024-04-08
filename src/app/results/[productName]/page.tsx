import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React from "react";
import Image from "next/image";

type Props = {
  params: {
    productName: string;
  };
};

const page = async ({ params }: Props) => {
  const products = await scrapeAndStoreProduct(params.productName);

  return (
    <div>
      <div className="text-base mb-5">
        Showing results for: `{decodeURI(params.productName)}`
      </div>
      <div className="">
        {products?.map((store: any, i: number) =>
          store.products.length === 0 ? null : (
            <div key={i} className="overflow-x-auto">
              <h1 className="text-base overflow-y-hidden">{store.store}</h1>
              <div className="w-full">
                <div className="flex w-max space-x-4 p-4">
                  {store.products?.map((product: any, i: number) => {
                    return (
                      <Card
                        key={i}
                        className="w-40 h-60 flex flex-col justify-between"
                      >
                        <CardHeader className=" p-3">
                          <CardTitle className=" text-base line-clamp-2">
                            {product.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="w-full h-full px-3 relative">
                          <Image
                            src={product.fullImageLink}
                            alt={product.name}
                            layout="fill"
                            objectFit="contain"
                          />
                        </CardContent>
                        <CardFooter className=" flex justify-between p-3">
                          <Button>
                            <a
                              href={product.fullProductLink}
                              target="_blank"
                              className="text-xs"
                            >
                              Visit
                            </a>
                          </Button>
                          <p className="text-md">
                            {product.price.match(/\d/) ? product.price : "N/A"}
                          </p>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
                {/* <ScrollBar orientation="horizontal" /> */}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default page;
