"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {
  createRoomMapping,
  updateRoomMapping,
} from "./roomMappingApi";

import axios from "@/lib/axios";

export default function RoomMappingModal({

  open,

  setOpen,

  reload,

  editData,

}) {

  const [loading,setLoading]=
    useState(false);

  const [rooms,setRooms]=
    useState([]);

  const [channels,setChannels]=
    useState([]);

  const [form,setForm]=
    useState({

      roomId:"",

      channelId:"",

      otaRoomId:"",

      otaRoomName:"",

      isActive:true,

  });

  useEffect(()=>{

    if(open){

      loadData();

    }

  },[open]);

  useEffect(()=>{

    if(editData){

      setForm({

        roomId:
          editData.roomId?._id || "",

        channelId:
          editData.channelId?._id || "",

        otaRoomId:
          editData.otaRoomId || "",

        otaRoomName:
          editData.otaRoomName || "",

        isActive:
          editData.isActive,

      });

    }else{

      setForm({

        roomId:"",

        channelId:"",

        otaRoomId:"",

        otaRoomName:"",

        isActive:true,

      });

    }

  },[editData,open]);

  const loadData=async()=>{

    try{

      const [

        roomsRes,

        channelRes,

      ]=await Promise.all([

        axios.get("/rooms"),

        axios.get("/channels"),

      ]);

      setRooms(
        roomsRes.data.data || []
      );

      setChannels(
        channelRes.data.data || []
      );

    }catch(err){

      console.log(err);

    }

  };

  const handleChange=(e)=>{

    const {

      name,

      value,

    }=e.target;

    setForm({

      ...form,

      [name]:

      name==="isActive"

      ? value==="true"

      : value,

    });

  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      if(editData){

        await updateRoomMapping(

          editData._id,

          form

        );

      }else{

        await createRoomMapping(

          form

        );

      }

      reload();

      setOpen(false);

    }catch(err){

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Something went wrong"

      );

    }finally{

      setLoading(false);

    }

  };

  if(!open) return null;

  return(

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

<div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

<div className="flex items-center justify-between border-b px-6 py-5">

<div>

<h2 className="text-xl font-bold">

{editData

? "Edit Room Mapping"

: "New Room Mapping"}

</h2>

<p className="mt-1 text-sm text-gray-500">

Connect hotel room with OTA room.

</p>

</div>

<button

onClick={()=>setOpen(false)}

className="rounded-lg p-2 hover:bg-gray-100"

>

<X size={20}/>

</button>

</div>

<form

onSubmit={handleSubmit}

className="space-y-5 p-6"
>
    {/* Hotel Room */}
<div>
  <label className="mb-2 block text-sm font-medium">
    Hotel Room
  </label>

  <select
    name="roomId"
    value={form.roomId}
    onChange={handleChange}
    required
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
  >
    <option value="">
      Select Room
    </option>

    {rooms.map((room) => (
      <option
        key={room._id}
        value={room._id}
      >
        {room.title}
      </option>
    ))}
  </select>
</div>

{/* OTA Channel */}
<div>
  <label className="mb-2 block text-sm font-medium">
    OTA Channel
  </label>

  <select
    name="channelId"
    value={form.channelId}
    onChange={handleChange}
    required
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
  >
    <option value="">
      Select Channel
    </option>

    {channels.map((channel) => (
      <option
        key={channel._id}
        value={channel._id}
      >
        {channel.name}
      </option>
    ))}
  </select>
</div>

{/* OTA Room ID */}
<div>
  <label className="mb-2 block text-sm font-medium">
    OTA Room ID
  </label>

  <input
    type="text"
    name="otaRoomId"
    value={form.otaRoomId}
    onChange={handleChange}
    required
    placeholder="Enter OTA Room ID"
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
  />
</div>

{/* OTA Room Name */}
<div>
  <label className="mb-2 block text-sm font-medium">
    OTA Room Name
  </label>

  <input
    type="text"
    name="otaRoomName"
    value={form.otaRoomName}
    onChange={handleChange}
    required
    placeholder="Enter OTA Room Name"
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
  />
</div>

{/* Status */}
<div>
  <label className="mb-2 block text-sm font-medium">
    Status
  </label>

  <select
    name="isActive"
    value={String(form.isActive)}
    onChange={handleChange}
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
  >
    <option value="true">
      Active
    </option>

    <option value="false">
      Inactive
    </option>
  </select>
</div>

{/* Footer */}
<div className="flex justify-end gap-3 border-t pt-6">

  <button
    type="button"
    onClick={() => setOpen(false)}
    className="rounded-xl border px-6 py-3 hover:bg-gray-50"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading}
    className="rounded-xl bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600 disabled:opacity-50"
  >
    {loading
      ? "Saving..."
      : editData
      ? "Update Mapping"
      : "Create Mapping"}
  </button>

</div>

</form>

</div>

</div>

);
}
