"use client";

import { X, Trash2, Loader2 } from "lucide-react";

export default function DeleteModal({

  open,

  setOpen,

  loading,

  onConfirm,

}) {

  if (!open) return null;

  return (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

<div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

<div className="flex items-center justify-between border-b px-6 py-5">

<h2 className="text-xl font-bold">

Delete Record

</h2>

<button

onClick={()=>setOpen(false)}

className="rounded-lg p-2 hover:bg-gray-100"

>

<X size={20}/>

</button>

</div>


<div className="p-6">

<div className="mb-6 flex justify-center">

<div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

<Trash2

size={36}

className="text-red-600"

/>

</div>

</div>

<p className="text-center text-lg font-semibold">

Are you sure?

</p>

<p className="mt-2 text-center text-sm text-gray-500">

This action cannot be undone.

</p>

<div className="mt-8 flex justify-end gap-3">

<button

type="button"

onClick={()=>setOpen(false)}

disabled={loading}

className="rounded-xl border px-6 py-3 hover:bg-gray-50"

>

Cancel

</button>

<button

type="button"

onClick={onConfirm}

disabled={loading}

className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:opacity-50"

>

{loading ? (

<>

<Loader2
size={18}
className="animate-spin"
/>

Deleting...

</>

) : (

<>

<Trash2 size={18}/>

Delete

</>

)}

</button>

</div>

</div>

</div>

</div>

  );

}