"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  RefreshCw,
} from "lucide-react";

import { getChannels } from "./channelApi";

import ChannelTable from "./ChannelTable";

import ChannelModal from "./ChannelModal";

export default function ChannelsPage() {

  const [channels,setChannels]=useState([]);

  const [loading,setLoading]=useState(true);

  const [search,setSearch]=useState("");

  const [open,setOpen]=useState(false);

  const loadChannels=async()=>{

    try{

      setLoading(true);

      const res=await getChannels();

      setChannels(res.data.data || []);

    }catch(err){

      console.log(err);

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    loadChannels();

  },[]);

  return(

<div className="space-y-8">

<div className="flex items-center justify-between">

<div>

<h1 className="text-3xl font-bold">

OTA Channels

</h1>

<p className="mt-2 text-gray-500">

Manage all connected OTA channels.

</p>

</div>

<button
onClick={()=>setOpen(true)}
className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
>

<Plus size={18}/>

Add Channel

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

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search channel..."

className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-orange-500"

/>

</div>

<button

onClick={loadChannels}

className="rounded-xl border p-3 hover:bg-gray-50"

>

<RefreshCw size={18}/>

</button>

</div>

<ChannelTable

loading={loading}

channels={channels}

search={search}

reload={loadChannels}

/>

</div>

<ChannelModal

open={open}

setOpen={setOpen}

reload={loadChannels}

/>

</div>

  );

}