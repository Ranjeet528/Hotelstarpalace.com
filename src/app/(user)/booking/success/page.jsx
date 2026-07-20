import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="py-40 text-center text-xl">
        Loading...
      </div>
    }>
      <SuccessClient />
    </Suspense>
  );
}