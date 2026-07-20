"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  getRoomMappings,
} from "./roomMappingApi";

import RoomMappingTable from "./RoomMappingTable";
import RoomMappingModal from "./RoomMappingModal";

export default function RoomMappingPage() {

  const [mappings,setMappings]=useState([]);

  const [loading,setLoading]=useState(true);

  const [search,setSearch]=useState("");

  const [open,setOpen]=useState(false);

  const loadMappings=async()=>{

    try{

      setLoading(true);

      const res=
      await getRoomMappings();

      setMappings(
        res.data.data || []
      );

    }catch(err){

      console.log(err);

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    loadMappings();

  },[]);

  return(

<div className="space-y-8">

<div className="flex items-center justify-between">

<div>

<h1 className="text-3xl font-bold">
Room Mapping
</h1>

<p className="mt-2 text-gray-500">
Map Hotel Rooms with OTA Rooms.
</p>

</div>

<button
onClick={()=>setOpen(true)}
className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
>

<Plus size={18}/>

New Mapping

</button>

</div>


<div className="rounded-2xl border bg-white p-5 shadow-sm">

<div className="flex items-center justify-between">

<div className="relative w-80">

<Search
size={18}
className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
/>

<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search Mapping..."

className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-orange-500"

/>

</div>

<button

onClick={loadMappings}

className="rounded-xl border p-3 hover:bg-gray-50"

>

<RefreshCw size={18}/>

</button>

</div>

<RoomMappingTable

loading={loading}

mappings={mappings}

search={search}

reload={loadMappings}

/>

</div>

<RoomMappingModal

open={open}

setOpen={setOpen}

reload={loadMappings}

/>

</div>

  );

}