"use client";

import {
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
} from "lucide-react";

import { retrySync } from "./syncLogApi";

export default function SyncLogTable({

  logs=[],

  loading,

  search,

  reload,

}){

const filtered=logs.filter((item)=>{

return(

item.channelId?.name
?.toLowerCase()
.includes(search.toLowerCase())

||

item.operation
?.toLowerCase()
.includes(search.toLowerCase())

||

item.status
?.toLowerCase()
.includes(search.toLowerCase())

);

});

const handleRetry=async(id)=>{

try{

await retrySync(id);

alert("Retry Started");

reload();

}catch(err){

console.log(err);

alert("Retry Failed");

}

};

if(loading){

return(

<div className="py-20 text-center text-gray-500">

Loading Sync Logs...

</div>

);

}

if(!filtered.length){

return(

<div className="py-20 text-center text-gray-500">

No Sync Logs Found

</div>

);

}

return(

<div className="mt-6 overflow-x-auto rounded-2xl border">

<table className="min-w-full">

<thead className="bg-gray-50">

<tr>

<th className="px-5 py-4 text-left">

Channel

</th>

<th className="px-5 py-4 text-left">

Operation

</th>

<th className="px-5 py-4 text-left">

Status

</th>

<th className="px-5 py-4 text-left">

Retry

</th>

<th className="px-5 py-4 text-left">

Last Sync

</th>

<th className="px-5 py-4 text-left">

Error

</th>

<th className="px-5 py-4 text-center">

Action

</th>

</tr>

</thead>

<tbody>

{filtered.map((item)=>(

<tr

key={item._id}

className="border-t hover:bg-gray-50"

>

<td className="px-5 py-4 font-medium">

{item.channelId?.name}

</td>

<td className="px-5 py-4">

{item.operation}

</td>

<td className="px-5 py-4">

{item.status==="success" && (

<span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

<CheckCircle2 size={15}/>

Success

</span>

)}

{item.status==="pending" && (

<span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

<Clock3 size={15}/>

Pending

</span>

)}

{item.status==="processing" && (

<span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

<Clock3 size={15}/>

Processing

</span>

)}

{item.status==="failed" && (

<span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">

<XCircle size={15}/>

Failed

</span>

)}

</td>

<td className="px-5 py-4">

{item.retryCount || 0}

</td>

<td className="px-5 py-4">

{item.syncedAt

? new Date(item.syncedAt).toLocaleString()

: "-"}

</td>

<td className="max-w-xs px-5 py-4 text-sm text-red-600">

{item.error || "-"}

</td>

<td className="px-5 py-4">

<div className="flex justify-center">

<button

onClick={()=>handleRetry(item._id)}

disabled={item.status==="processing"}

className="rounded-lg bg-orange-100 p-2 text-orange-600 hover:bg-orange-200 disabled:opacity-50"

>

<RotateCcw size={18}/>

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