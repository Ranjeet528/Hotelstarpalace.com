"use client";

import { useState } from "react";

import {
  Save,
} from "lucide-react";

import {
  updateInventory,
} from "./inventoryApi";

export default function InventoryTable({

  inventory = [],

  loading,

  reload,

}) {

  const [saving, setSaving] =
    useState(null);

  const [rows, setRows] =
    useState(inventory);

  useState(() => {
    setRows(inventory);
  }, [inventory]);

  const handleChange = (

    index,

    field,

    value

  ) => {

    const copy = [...rows];

    copy[index][field] = value;

    setRows(copy);

  };

  const handleSave = async (

    row

  ) => {

    try {

      setSaving(row._id);

      await updateInventory(

        row._id,

        row

      );

      reload();

    } catch (err) {

      console.log(err);

      alert("Update Failed");

    } finally {

      setSaving(null);

    }

  };

  if (loading) {

    return (

      <div className="py-16 text-center text-gray-500">

        Loading Inventory...

      </div>

    );

  }

  if (!rows.length) {

    return (

      <div className="py-16 text-center text-gray-500">

        No Inventory Found

      </div>

    );

  }

  return (

<div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

<table className="min-w-full">

<thead className="bg-gray-50">

<tr>

<th className="px-5 py-4 text-left">
Room
</th>

<th className="px-5 py-4 text-left">
Date
</th>

<th className="px-5 py-4 text-center">
Available
</th>

<th className="px-5 py-4 text-center">
Booking.com
</th>

<th className="px-5 py-4 text-center">
Agoda
</th>

<th className="px-5 py-4 text-center">
MMT
</th>

<th className="px-5 py-4 text-center">
Expedia
</th>

<th className="px-5 py-4 text-center">
Action
</th>

</tr>

</thead>

<tbody>
    {rows.map((row, index) => (

<tr
key={row._id}
className="border-t hover:bg-gray-50"
>

<td className="px-5 py-4 font-medium">

{row.room?.title || row.roomName}

</td>

<td className="px-5 py-4">

{new Date(row.date).toLocaleDateString("en-IN")}

</td>

<td className="px-5 py-4 text-center">

<input

type="number"

value={row.availableRooms}

onChange={(e)=>

handleChange(
index,
"availableRooms",
Number(e.target.value)
)

}

className="w-20 rounded-lg border px-2 py-2 text-center"

/>

</td>

<td className="px-5 py-4 text-center">

<input

type="number"

value={row.bookingCom}

onChange={(e)=>

handleChange(
index,
"bookingCom",
Number(e.target.value)
)

}

className="w-20 rounded-lg border px-2 py-2 text-center"

/>

</td>

<td className="px-5 py-4 text-center">

<input

type="number"

value={row.agoda}

onChange={(e)=>

handleChange(
index,
"agoda",
Number(e.target.value)
)

}

className="w-20 rounded-lg border px-2 py-2 text-center"

/>

</td>

<td className="px-5 py-4 text-center">

<input

type="number"

value={row.mmt}

onChange={(e)=>

handleChange(
index,
"mmt",
Number(e.target.value)
)

}

className="w-20 rounded-lg border px-2 py-2 text-center"

/>

</td>

<td className="px-5 py-4 text-center">

<input

type="number"

value={row.expedia}

onChange={(e)=>

handleChange(
index,
"expedia",
Number(e.target.value)
)

}

className="w-20 rounded-lg border px-2 py-2 text-center"

/>

</td>

<td className="px-5 py-4">

<div className="flex justify-center">

<button

onClick={() => handleSave(row)}

disabled={saving === row._id}

className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-50"

>

<Save size={16}/>

{saving === row._id
? "Saving..."
: "Save"}

</button>

</div>

</td>

</tr>

))}
        </tbody>

      </table>

    </div>

  );

}