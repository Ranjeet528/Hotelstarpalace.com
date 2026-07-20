"use client";

import Link from "next/link";

import {
Server,
RefreshCw,
MapPinned,
BadgeIndianRupee,
AlertTriangle,
CheckCircle2,
ArrowRight,
} from "lucide-react";

export default function ChannelManagerDashboard(){

const cards=[

{
title:"Channels",
value:"--",
icon:Server,
href:"/admin/channel-manager/channels",
color:"bg-blue-500",
},

{
title:"Room Mapping",
value:"--",
icon:MapPinned,
href:"/admin/channel-manager/room-mapping",
color:"bg-green-500",
},

{
title:"Rate Plans",
value:"--",
icon:BadgeIndianRupee,
href:"/admin/channel-manager/rate-plans",
color:"bg-orange-500",
},

{
title:"Pending Sync",
value:"--",
icon:RefreshCw,
href:"/admin/channel-manager/sync-logs",
color:"bg-yellow-500",
},

];

return(

<div className="space-y-8">

<div>

<h1 className="text-3xl font-bold">

Channel Manager

</h1>

<p className="mt-2 text-gray-500">

Manage OTA Channels, Inventory, Mapping and Synchronization.

</p>

</div>

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

{cards.map((item)=>{

const Icon=item.icon;

return(

<Link

key={item.title}

href={item.href}

className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"

>

<div className="flex items-center justify-between">

<div>

<p className="text-gray-500">

{item.title}

</p>

<h2 className="mt-3 text-3xl font-bold">

{item.value}

</h2>

</div>

<div className={`${item.color} rounded-2xl p-4 text-white`}>

<Icon size={28}/>

</div>

</div>

<div className="mt-6 flex items-center text-orange-500">

Open

<ArrowRight
size={18}
className="ml-2"
/>

</div>

</Link>

);

})}

</div>

<div className="grid gap-6 lg:grid-cols-2">

<div className="rounded-2xl border bg-white p-6 shadow-sm">

<div className="mb-5 flex items-center gap-3">

<CheckCircle2 className="text-green-500"/>

<h2 className="text-lg font-semibold">

System Status

</h2>

</div>

<div className="space-y-4">

<div className="flex justify-between">

<span>

Inventory Sync

</span>

<span className="font-medium text-green-600">

Healthy

</span>

</div>

<div className="flex justify-between">

<span>

Rate Sync

</span>

<span className="font-medium text-green-600">

Healthy

</span>

</div>

<div className="flex justify-between">

<span>

Room Mapping

</span>

<span className="font-medium text-green-600">

Healthy

</span>

</div>

</div>

</div>

<div className="rounded-2xl border bg-white p-6 shadow-sm">

<div className="mb-5 flex items-center gap-3">

<AlertTriangle className="text-orange-500"/>

<h2 className="text-lg font-semibold">

Recent Activity

</h2>

</div>

<div className="text-sm text-gray-500">

No recent activity.

</div>

</div>

</div>

</div>

);

}