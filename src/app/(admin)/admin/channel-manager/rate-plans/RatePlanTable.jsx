"use client";

import { useState } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  deleteRatePlan,
} from "./ratePlanApi";

import DeleteModal from "../channels/DeleteModal";
import RatePlanModal from "./RatePlanModal";

export default function RatePlanTable({

  plans = [],

  loading,

  reload,

}) {

  const [editOpen, setEditOpen] =
    useState(false);

  const [editData, setEditData] =
    useState(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const handleDelete = async () => {

    try {

      setDeleteLoading(true);

      await deleteRatePlan(deleteId);

      reload();

      setDeleteOpen(false);

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    } finally {

      setDeleteLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="py-20 text-center text-gray-500">

        Loading Rate Plans...

      </div>

    );

  }

  if (!plans.length) {

    return (

      <div className="py-20 text-center text-gray-500">

        No Rate Plans Found

      </div>

    );

  }

  return (

<>

<div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

<table className="min-w-[1800px]">

<thead className="bg-gray-50">

<tr>

<th className="px-5 py-4 text-left">
Room
</th>

<th className="px-5 py-4 text-left">
Channel
</th>

<th className="px-5 py-4 text-left">
Name
</th>

<th className="px-5 py-4 text-left">
Code
</th>

<th className="px-5 py-4 text-center">
Base
</th>

<th className="px-5 py-4 text-center">
Adult
</th>

<th className="px-5 py-4 text-center">
Child
</th>

<th className="px-5 py-4 text-center">
Currency
</th>

<th className="px-5 py-4 text-center">
Min Stay
</th>

<th className="px-5 py-4 text-center">
Max Stay
</th>

<th className="px-5 py-4 text-center">
Weekend
</th>

<th className="px-5 py-4 text-center">
Season
</th>

<th className="px-5 py-4 text-center">
Channel
Multiplier
</th>

<th className="px-5 py-4 text-center">
Breakfast
</th>

<th className="px-5 py-4 text-center">
Refundable
</th>

<th className="px-5 py-4 text-center">
Tax
</th>

<th className="px-5 py-4 text-center">
Sync
</th>

<th className="px-5 py-4 text-center">
Status
</th>

<th className="px-5 py-4 text-center">
Actions
</th>

</tr>

</thead>

<tbody>
    {plans.map((item) => (

<tr
key={item._id}
className="border-t hover:bg-gray-50"
>

{/* Room */}

<td className="px-5 py-4">

<div className="font-semibold">

{item.roomId?.title || "-"}

</div>

</td>

{/* Channel */}

<td className="px-5 py-4">

<span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

{item.channelId?.name || "Direct"}

</span>

</td>

{/* Name */}

<td className="px-5 py-4 font-medium">

{item.name}

</td>

{/* Code */}

<td className="px-5 py-4">

{item.code}

</td>

{/* Base Price */}

<td className="px-5 py-4 text-center">

₹{item.basePrice}

</td>

{/* Extra Adult */}

<td className="px-5 py-4 text-center">

₹{item.extraAdultPrice}

</td>

{/* Extra Child */}

<td className="px-5 py-4 text-center">

₹{item.extraChildPrice}

</td>

{/* Currency */}

<td className="px-5 py-4 text-center">

{item.currency}

</td>

{/* Min Stay */}

<td className="px-5 py-4 text-center">

{item.minimumStay}

</td>

{/* Max Stay */}

<td className="px-5 py-4 text-center">

{item.maximumStay}

</td>

{/* Weekend */}

<td className="px-5 py-4 text-center">

x{item.weekendMultiplier}

</td>

{/* Seasonal */}

<td className="px-5 py-4 text-center">

x{item.seasonalMultiplier}

</td>

{/* Channel Multiplier */}

<td className="px-5 py-4 text-center">

x{item.channelMultiplier}

</td>

{/* Breakfast */}

<td className="px-5 py-4 text-center">

{item.breakfastIncluded ? (

<span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">

Yes

</span>

) : (

<span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">

No

</span>

)}

</td>

{/* Refundable */}

<td className="px-5 py-4 text-center">

{item.refundable ? (

<span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">

Yes

</span>

) : (

<span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">

No

</span>

)}

</td>

{/* Tax */}

<td className="px-5 py-4 text-center">

{item.taxIncluded ? (

<span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">

Included

</span>

) : (

<span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">

Extra

</span>

)}

</td>

{/* Sync */}

<td className="px-5 py-4 text-center">

<span
className={`rounded-full px-3 py-1 text-xs

${
item.syncStatus === "success"
? "bg-green-100 text-green-700"
: item.syncStatus === "failed"
? "bg-red-100 text-red-700"
: item.syncStatus === "syncing"
? "bg-blue-100 text-blue-700"
: "bg-yellow-100 text-yellow-700"
}

`}
>

{item.syncStatus}

</span>

</td>

{/* Status */}

<td className="px-5 py-4 text-center">

{item.isActive ? (

<span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">

Active

</span>

) : (

<span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">

Inactive

</span>

)}

</td>

{/* Actions */}

<td className="px-5 py-4">

<div className="flex justify-center gap-3">

<button

onClick={() => {

setEditData(item);

setEditOpen(true);

}}

className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"

>

<Pencil size={18}/>

</button>

<button

onClick={() => {

setDeleteId(item._id);

setDeleteOpen(true);

}}

className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"

>

<Trash2 size={18}/>

</button>

</div>

</td>

</tr>

))}
        </tbody>

      </table>

    </div>

    <RatePlanModal

      open={editOpen}

      setOpen={setEditOpen}

      editData={editData}

      reload={reload}

    />

    <DeleteModal

      open={deleteOpen}

      setOpen={setDeleteOpen}

      loading={deleteLoading}

      onConfirm={handleDelete}

    />

</>

  );

}