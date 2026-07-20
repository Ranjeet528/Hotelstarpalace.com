"use client";

import { Search } from "lucide-react";

export default function RatePlanFilter({

  filters,

  setFilters,

  reload,

}) {

  const handleChange = (e) => {

    setFilters({

      ...filters,

      [e.target.name]: e.target.value,

    });

  };

  return (

<div className="rounded-2xl border bg-white p-5 shadow-sm">

<div className="grid gap-5 md:grid-cols-3">

{/* Room */}

<div>

<label className="mb-2 block text-sm font-medium">

Room

</label>

<input

type="text"

name="room"

value={filters.room}

onChange={handleChange}

placeholder="Deluxe Room"

className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"

/>

</div>

{/* Channel */}

<div>

<label className="mb-2 block text-sm font-medium">

Channel

</label>

<select

name="channel"

value={filters.channel}

onChange={handleChange}

className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"

>

<option value="">

All Channels

</option>

<option value="booking-com">

Booking.com

</option>

<option value="agoda">

Agoda

</option>

<option value="mmt">

MakeMyTrip

</option>

<option value="expedia">

Expedia

</option>

</select>

</div>

{/* Search */}

<div className="flex items-end">

<button

onClick={reload}

className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"

>

<Search size={18}/>

Search

</button>

</div>

</div>

</div>

  );

}