"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  getRatePlans,
  syncRatePlans,
} from "./ratePlanApi";

import RatePlanTable from "./RatePlanTable";
import RatePlanFilter from "./RatePlanFilter";
import RatePlanModal from "./RatePlanModal";

export default function RatePlansPage() {

  const [plans, setPlans] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const [filters, setFilters] =
    useState({

      room: "",

      channel: "",

    });

  const loadPlans = async () => {

    try {

      setLoading(true);

      const res =
        await getRatePlans(filters);

      setPlans(res.data.data || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadPlans();

  }, []);

  const handleSync = async () => {

    try {

      await syncRatePlans();

      loadPlans();

    } catch (err) {

      console.log(err);

    }

  };

  return (

<div className="space-y-8">

<div className="flex items-center justify-between">

<div>

<h1 className="text-3xl font-bold">

Rate Plans

</h1>

<p className="mt-2 text-gray-500">

Manage OTA pricing.

</p>

</div>

<div className="flex gap-3">

<button

onClick={handleSync}

className="flex items-center gap-2 rounded-xl border px-5 py-3"

>

<RefreshCw size={18}/>

Sync

</button>

<button

onClick={() =>
setOpen(true)
}

className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white"

>

<Plus size={18}/>

Add Rate

</button>

</div>

</div>

<RatePlanFilter

filters={filters}

setFilters={setFilters}

reload={loadPlans}

/>

<RatePlanTable

plans={plans}

loading={loading}

reload={loadPlans}

/>

<RatePlanModal

open={open}

setOpen={setOpen}

reload={loadPlans}

/>

</div>

  );

}