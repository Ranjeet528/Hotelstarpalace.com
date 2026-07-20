"use client";
"use client";

import {
  useEffect,
  useState,
} from "react";

import { Save } from "lucide-react";

import {
  getSettings,
  updateSettings,
} from "./settingsApi";

export default function ChannelManagerSettingsPage() {

  const [form, setForm] = useState({

    bookingApiKey: "",
    bookingSecret: "",

    agodaApiKey: "",
    agodaSecret: "",

    expediaApiKey: "",
    expediaSecret: "",

    mmtApiKey: "",
    mmtSecret: "",

    autoSync: true,
    syncInterval: 1,

    currency: "INR",

  });

  useEffect(() => {

  loadSettings();

}, []);

const loadSettings = async () => {

  try {

    const res =
      await getSettings();

    if (res.data.success) {

      setForm({

        ...form,

        ...res.data.data,

      });

    }

  } catch (error) {

    console.log(error);

  }

};

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

   setForm((prev) => ({

  ...prev,

  ...res.data.data,

}));

  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    await updateSettings(form);

    alert(
      "Settings Saved Successfully"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Failed to Save Settings"
    );

  }

};

  return (

<div className="space-y-8">

<div>

<h1 className="text-3xl font-bold">

Channel Manager Settings

</h1>

<p className="mt-2 text-gray-500">

Configure OTA credentials & synchronization.

</p>

</div>

<form
onSubmit={handleSubmit}
className="space-y-8 rounded-2xl border bg-white p-8 shadow-sm"
>

{/* Booking.com */}

<div>

<h2 className="mb-5 text-lg font-semibold">

Booking.com

</h2>

<div className="grid gap-5 md:grid-cols-2">

<input

name="bookingApiKey"

placeholder="API Key"

value={form.bookingApiKey}

onChange={handleChange}

className="rounded-xl border p-3 outline-none focus:border-orange-500"

/>

<input

name="bookingSecret"

placeholder="API Secret"

value={form.bookingSecret}

onChange={handleChange}

className="rounded-xl border p-3 outline-none focus:border-orange-500"

/>

</div>

</div>

{/* Agoda */}

<div>

<h2 className="mb-5 text-lg font-semibold">

Agoda

</h2>

<div className="grid gap-5 md:grid-cols-2">

<input

name="agodaApiKey"

placeholder="API Key"

value={form.agodaApiKey}

onChange={handleChange}

className="rounded-xl border p-3 outline-none focus:border-orange-500"

/>

<input

name="agodaSecret"

placeholder="API Secret"

value={form.agodaSecret}

onChange={handleChange}

className="rounded-xl border p-3 outline-none focus:border-orange-500"

/>

</div>

</div>

{/* Expedia */}

<div>

<h2 className="mb-5 text-lg font-semibold">

Expedia

</h2>

<div className="grid gap-5 md:grid-cols-2">

<input

name="expediaApiKey"

placeholder="API Key"

value={form.expediaApiKey}

onChange={handleChange}

className="rounded-xl border p-3 outline-none focus:border-orange-500"

/>

<input

name="expediaSecret"

placeholder="API Secret"

value={form.expediaSecret}

onChange={handleChange}

className="rounded-xl border p-3 outline-none focus:border-orange-500"

/>

</div>

</div>

{/* MMT */}

<div>

<h2 className="mb-5 text-lg font-semibold">

MakeMyTrip

</h2>

<div className="grid gap-5 md:grid-cols-2">

<input

name="mmtApiKey"

placeholder="API Key"

value={form.mmtApiKey}

onChange={handleChange}

className="rounded-xl border p-3 outline-none focus:border-orange-500"

/>

<input

name="mmtSecret"

placeholder="API Secret"

value={form.mmtSecret}

onChange={handleChange}

className="rounded-xl border p-3 outline-none focus:border-orange-500"

/>

</div>

</div>

{/* Sync */}

<div>

<h2 className="mb-5 text-lg font-semibold">

Synchronization

</h2>

<div className="grid gap-5 md:grid-cols-2">

<label className="flex items-center gap-3">

<input

type="checkbox"

name="autoSync"

checked={form.autoSync}

onChange={handleChange}

/>

<span>

Enable Auto Sync

</span>

</label>

<select

name="syncInterval"

value={form.syncInterval}

onChange={handleChange}

className="rounded-xl border p-3"

>

<option value={1}>

Every 1 Minute

</option>

<option value={5}>

Every 5 Minutes

</option>

<option value={10}>

Every 10 Minutes

</option>

<option value={15}>

Every 15 Minutes

</option>

</select>

</div>

</div>

{/* Currency */}

<div>

<h2 className="mb-5 text-lg font-semibold">

Currency

</h2>

<select

name="currency"

value={form.currency}

onChange={handleChange}

className="w-60 rounded-xl border p-3"

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

<option value="AED">

AED

</option>

</select>

</div>

<div>

<button

type="submit"

className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3 text-white hover:bg-orange-600"

>

<Save size={18}/>

Save Settings

</button>

</div>

</form>

</div>

  );

}