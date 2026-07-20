"use client";

import { useEffect, useState } from "react";

import {
  RefreshCw,
} from "lucide-react";

import InventoryFilter from "./InventoryFilter";
import InventoryTable from "./InventoryTable";

import {
  getInventory,
  syncInventory,
} from "./inventoryApi";

export default function InventoryPage() {

  const [inventory, setInventory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    room: "",
    startDate: "",
    endDate: "",
  });

  const loadInventory = async () => {

    try {

      setLoading(true);

      const res = await getInventory(filters);

      setInventory(res.data.data || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadInventory();

  }, []);

  const handleSync = async () => {

    try {

      await syncInventory();

      loadInventory();

    } catch (err) {

      console.log(err);

    }

  };

  return (

<div className="space-y-8">

<div className="flex items-center justify-between">

<div>

<h1 className="text-3xl font-bold">

Inventory

</h1>

<p className="mt-2 text-gray-500">

Manage OTA inventory.

</p>

</div>

<button

onClick={handleSync}

className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white"

>

<RefreshCw size={18}/>

Sync Inventory

</button>

</div>

<InventoryFilter

filters={filters}

setFilters={setFilters}

reload={loadInventory}

/>

<InventoryTable

loading={loading}

inventory={inventory}

reload={loadInventory}

/>

</div>

  );

}