import { Suspense } from "react";
import InvoiceClient from "./InvoiceClient";

export default function InvoicePage() {
  return (
    <Suspense fallback={<div className="py-40 text-center text-xl">Loading Invoice...</div>}>
      <InvoiceClient />
    </Suspense>
  );
}