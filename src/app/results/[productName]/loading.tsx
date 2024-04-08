import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 min-h-screen">
      <div className="h-8 w-8" />
      <div className="text-center">
        <h4 className="font-semibold">Loading products...</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please wait a moment while we fetch the latest products
          <div className="animate-spin"></div>
        </p>
      </div>
    </div>
  );
};

export default loading;
