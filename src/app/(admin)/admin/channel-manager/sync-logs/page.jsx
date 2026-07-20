"use client";

import { useEffect, useState } from "react";

import {
  Search,
  RefreshCw,
} from "lucide-react";

import {
  getSyncLogs,
} from "./syncLogApi";

import SyncLogTable from "./SyncLogTable";

export default function SyncLogsPage(){

const [logs,setLogs]=useState([]);

const [loading,setLoading]=
useState(true);

const [search,setSearch]=
useState("");

const loadLogs=async()=>{

try{

setLoading(true);

const res=
await getSyncLogs();

setLogs(
res.data.data || []
);

}catch(err){

console.log(err);

}finally{

setLoading(false);

}

};

useEffect(()=>{

loadLogs();

},[]);

return(

<div className="space-y-8">

<div>

<h1 className="text-3xl font-bold">

Sync Logs

</h1>

<p className="mt-2 text-gray-500">

View every synchronization performed with OTA channels.

</p>

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

placeholder="Search..."

className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-orange-500"

/>

</div>

<button

onClick={loadLogs}

className="rounded-xl border p-3 hover:bg-gray-50"

>

<RefreshCw size={18}/>

</button>

</div>

<SyncLogTable

logs={logs}

loading={loading}

search={search}

reload={loadLogs}

/>

</div>

</div>

);

}