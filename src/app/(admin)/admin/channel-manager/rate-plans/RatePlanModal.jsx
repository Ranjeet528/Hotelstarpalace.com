"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {

createRatePlan,

updateRatePlan,

} from "./ratePlanApi";

import { getChannels } from "../channels/channelApi";

import axios from "@/lib/axios";

export default function RatePlanModal({

open,

setOpen,

reload,

editData,

}) {

const [loading, setLoading] = useState(false);

const [rooms, setRooms] = useState([]);

const [channels, setChannels] = useState([]);

const [form, setForm] = useState({

roomId: "",

channelId: "",

name: "",

code: "",

basePrice: "",

extraAdultPrice: 0,

extraChildPrice: 0,

currency: "INR",

minimumStay: 1,

maximumStay: 365,

weekendMultiplier: 1,

seasonalMultiplier: 1,

channelMultiplier: 1,

taxIncluded: true,

breakfastIncluded: false,

refundable: true,

isActive: true,

});

const loadData = async () => {

try {

const roomRes = await axios.get("/rooms");

const channelRes = await getChannels();

setRooms(roomRes.data.data || []);

setChannels(channelRes.data.data || []);

} catch (err) {

console.log(err);

}

};

useEffect(() => {

if (!open) return;

loadData();

}, [open]);

useEffect(() => {

if (editData) {

setForm({

roomId: editData.roomId?._id || "",

channelId: editData.channelId?._id || "",

name: editData.name || "",

code: editData.code || "",

basePrice: editData.basePrice || "",

extraAdultPrice: editData.extraAdultPrice || 0,

extraChildPrice: editData.extraChildPrice || 0,

currency: editData.currency || "INR",

minimumStay: editData.minimumStay || 1,

maximumStay: editData.maximumStay || 365,

weekendMultiplier: editData.weekendMultiplier || 1,

seasonalMultiplier: editData.seasonalMultiplier || 1,

channelMultiplier: editData.channelMultiplier || 1,

taxIncluded: editData.taxIncluded,

breakfastIncluded: editData.breakfastIncluded,

refundable: editData.refundable,

isActive: editData.isActive,

});

} else {

setForm({

roomId: "",

channelId: "",

name: "",

code: "",

basePrice: "",

extraAdultPrice: 0,

extraChildPrice: 0,

currency: "INR",

minimumStay: 1,

maximumStay: 365,

weekendMultiplier: 1,

seasonalMultiplier: 1,

channelMultiplier: 1,

taxIncluded: true,

breakfastIncluded: false,

refundable: true,

isActive: true,

});

}

}, [editData, open]);

const handleChange = (e) => {

const {

name,

value,

type,

checked,

} = e.target;

setForm({

...form,

[name]:

type === "checkbox"

? checked

: value,

});

};

const handleSubmit = async (e) => {

e.preventDefault();

try {

setLoading(true);

if (editData) {

await updateRatePlan(

editData._id,

form

);

} else {

await createRatePlan(form);

}

reload();

setOpen(false);

} catch (err) {

console.log(err);

alert(

err?.response?.data?.message ||

"Something went wrong"

);

} finally {

setLoading(false);

}

};

if (!open) return null;

return (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

<div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">

<div className="flex items-center justify-between border-b px-6 py-5">

<div>

<h2 className="text-2xl font-bold">

{editData

? "Edit Rate Plan"

: "Create Rate Plan"}

</h2>

<p className="text-sm text-gray-500">

Manage OTA pricing

</p>

</div>

<button

onClick={() => setOpen(false)}

className="rounded-lg p-2 hover:bg-gray-100"

>

<X size={20} />

</button>

</div>

<form

onSubmit={handleSubmit}

className="space-y-6 p-6"

>
    <div className="grid grid-cols-2 gap-5">

{/* Room */}

<div>

<label className="mb-2 block text-sm font-medium">

Room

</label>

<select

name="roomId"

value={form.roomId}

onChange={handleChange}

className="w-full rounded-xl border p-3"

required

>

<option value="">

Select Room

</option>

{rooms.map((room)=>(

<option
key={room._id}
value={room._id}
>

{room.title}

</option>

))}

</select>

</div>

{/* Channel */}

<div>

<label className="mb-2 block text-sm font-medium">

Channel

</label>

<select

name="channelId"

value={form.channelId}

onChange={handleChange}

className="w-full rounded-xl border p-3"

>

<option value="">

Direct Booking

</option>

{channels.map((channel)=>(

<option
key={channel._id}
value={channel._id}
>

{channel.name}

</option>

))}

</select>

</div>

{/* Plan Name */}

<div>

<label className="mb-2 block text-sm font-medium">

Plan Name

</label>

<input

type="text"

name="name"

value={form.name}

onChange={handleChange}

placeholder="Standard Plan"

className="w-full rounded-xl border p-3"

required

/>

</div>

{/* Code */}

<div>

<label className="mb-2 block text-sm font-medium">

Plan Code

</label>

<input

type="text"

name="code"

value={form.code}

onChange={handleChange}

placeholder="STD01"

className="w-full rounded-xl border p-3"

required

/>

</div>

{/* Base Price */}

<div>

<label className="mb-2 block text-sm font-medium">

Base Price

</label>

<input

type="number"

name="basePrice"

value={form.basePrice}

onChange={handleChange}

className="w-full rounded-xl border p-3"

required

/>

</div>

{/* Extra Adult */}

<div>

<label className="mb-2 block text-sm font-medium">

Extra Adult Price

</label>

<input

type="number"

name="extraAdultPrice"

value={form.extraAdultPrice}

onChange={handleChange}

className="w-full rounded-xl border p-3"

/>

</div>

{/* Extra Child */}

<div>

<label className="mb-2 block text-sm font-medium">

Extra Child Price

</label>

<input

type="number"

name="extraChildPrice"

value={form.extraChildPrice}

onChange={handleChange}

className="w-full rounded-xl border p-3"

/>

</div>

{/* Currency */}

<div>

<label className="mb-2 block text-sm font-medium">

Currency

</label>

<select

name="currency"

value={form.currency}

onChange={handleChange}

className="w-full rounded-xl border p-3"

>

<option value="INR">

INR

</option>

<option value="USD">

USD

</option>

<option value="EUR">

EUR

</option>

</select>

</div>

</div>
<div className="grid gap-5 md:grid-cols-2">

  {/* Minimum Stay */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Minimum Stay
    </label>

    <input
      type="number"
      name="minimumStay"
      value={form.minimumStay}
      onChange={handleChange}
      className="w-full rounded-xl border p-3"
    />
  </div>

  {/* Maximum Stay */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Maximum Stay
    </label>

    <input
      type="number"
      name="maximumStay"
      value={form.maximumStay}
      onChange={handleChange}
      className="w-full rounded-xl border p-3"
    />
  </div>

  {/* Weekend Multiplier */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Weekend Multiplier
    </label>

    <input
      type="number"
      step="0.01"
      name="weekendMultiplier"
      value={form.weekendMultiplier}
      onChange={handleChange}
      className="w-full rounded-xl border p-3"
    />
  </div>

  {/* Seasonal Multiplier */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Seasonal Multiplier
    </label>

    <input
      type="number"
      step="0.01"
      name="seasonalMultiplier"
      value={form.seasonalMultiplier}
      onChange={handleChange}
      className="w-full rounded-xl border p-3"
    />
  </div>

  {/* Channel Multiplier */}
  <div>
    <label className="mb-2 block text-sm font-medium">
      Channel Multiplier
    </label>

    <input
      type="number"
      step="0.01"
      name="channelMultiplier"
      value={form.channelMultiplier}
      onChange={handleChange}
      className="w-full rounded-xl border p-3"
    />
  </div>

</div>

{/* Switches */}

<div className="grid gap-4 md:grid-cols-2">

  <label className="flex items-center justify-between rounded-xl border p-4">

    <span>Breakfast Included</span>

    <input
      type="checkbox"
      checked={form.breakfastIncluded}
      onChange={(e)=>
        setForm({
          ...form,
          breakfastIncluded:e.target.checked,
        })
      }
    />

  </label>

  <label className="flex items-center justify-between rounded-xl border p-4">

    <span>Refundable</span>

    <input
      type="checkbox"
      checked={form.refundable}
      onChange={(e)=>
        setForm({
          ...form,
          refundable:e.target.checked,
        })
      }
    />

  </label>

  <label className="flex items-center justify-between rounded-xl border p-4">

    <span>Tax Included</span>

    <input
      type="checkbox"
      checked={form.taxIncluded}
      onChange={(e)=>
        setForm({
          ...form,
          taxIncluded:e.target.checked,
        })
      }
    />

  </label>

  <label className="flex items-center justify-between rounded-xl border p-4">

    <span>Active</span>

    <input
      type="checkbox"
      checked={form.isActive}
      onChange={(e)=>
        setForm({
          ...form,
          isActive:e.target.checked,
        })
      }
    />

  </label>

</div>

{/* Footer */}

<div className="flex justify-end gap-3 border-t pt-5">

  <button
    type="button"
    onClick={()=>setOpen(false)}
    className="rounded-xl border px-5 py-3"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading}
    className="rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 disabled:opacity-60"
  >

    {loading ? (

      <Loader2
        size={18}
        className="animate-spin"
      />

    ) : editData ? (

      "Update Rate Plan"

    ) : (

      "Create Rate Plan"

    )}

  </button>

</div>

</form>

</div>

</div>
);
}