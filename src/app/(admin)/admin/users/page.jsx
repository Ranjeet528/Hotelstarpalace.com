"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import {
  Search,
  Users,
  ShieldCheck,
  ShieldX,
  Eye,
} from "lucide-react";

import {
  getAllUsers,
  toggleUserBlock,
  updateUserRole,
} from "@/services/user.service";

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");



  // ==========================
  // FETCH USERS
  // ==========================

  const fetchUsers = async () => {

    try {

      const res = await getAllUsers();

      setUsers(res.users || []);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchUsers();

  }, []);

  // ==========================
// BLOCK / UNBLOCK
// ==========================

const handleBlock = async (id) => {

  try {

    await toggleUserBlock(id);

    fetchUsers();

  }

  catch (err) {

    console.log(err);

    alert(
      err?.response?.data?.message ||
      "Unable to update user"
    );

  }

};



// ==========================
// UPDATE ROLE
// ==========================

const handleRoleChange = async (

  id,

  role

) => {

  try {

    await updateUserRole(

      id,

      role

    );

    fetchUsers();

  }

  catch (err) {

    console.log(err);

    alert(

      err?.response?.data?.message ||

      "Unable to update role"

    );

  }

};





  // ==========================
  // SEARCH
  // ==========================

  const filteredUsers = useMemo(() => {

    return users.filter((user) => {

      const keyword = search.toLowerCase();

      return (

        user.name.toLowerCase().includes(keyword)

        ||

        user.email.toLowerCase().includes(keyword)

        ||

        user.phone.includes(keyword)

      );

    });

  }, [users, search]);



  // ==========================
  // STATS
  // ==========================

  const totalUsers = users.length;

  const verifiedUsers = users.filter(
    (u) => u.isVerified
  ).length;

  const blockedUsers = users.filter(
    (u) => u.isBlocked
  ).length;





  return (

    <div className="space-y-8">

      {/* ===================== */}
      {/* PAGE HEADER */}
      {/* ===================== */}

      <div>

        <h1 className="text-3xl font-bold">

          Users Management

        </h1>

        <p className="text-gray-500 mt-2">

          Manage registered users of Hotel Star Palace.

        </p>

      </div>





      {/* ===================== */}
      {/* STATS */}
      {/* ===================== */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Total Users

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {totalUsers}

              </h2>

            </div>

            <Users
              className="text-orange-500"
              size={42}
            />

          </div>

        </div>



        <div className="rounded-3xl bg-white p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Verified

              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">

                {verifiedUsers}

              </h2>

            </div>

            <ShieldCheck
              className="text-green-600"
              size={42}
            />

          </div>

        </div>



        <div className="rounded-3xl bg-white p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Blocked

              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">

                {blockedUsers}

              </h2>

            </div>

            <ShieldX
              className="text-red-600"
              size={42}
            />

          </div>

        </div>

      </div>





      {/* ===================== */}
      {/* SEARCH */}
      {/* ===================== */}

      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            pl-12
            pr-4
            py-3
            outline-none
            focus:border-orange-500
          "
        />

      </div>





      {/* ===================== */}
      {/* TABLE */}
      {/* ===================== */}

      <div className="overflow-hidden rounded-3xl bg-white shadow">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4 text-left">

                  User

                </th>

                <th className="px-6 py-4">

                  Phone

                </th>

                <th className="px-6 py-4">

                  Role

                </th>

                <th className="px-6 py-4">

                  Status

                </th>

                <th className="px-6 py-4">

                  Joined

                </th>

                <th className="px-6 py-4">

                  Action

                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={6}
                    className="py-20 text-center"
                  >

                    Loading...

                  </td>

                </tr>

              ) : filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="py-20 text-center text-gray-500"
                  >

                    No users found.

                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="border-t"
                  >

                    {/* USER */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            h-12
                            w-12
                            rounded-full
                            bg-orange-500
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                          "
                        >

                          {user.name.charAt(0)}

                        </div>

                        <div>

                          <h3 className="font-semibold">

                            {user.name}

                          </h3>

                          <p className="text-sm text-gray-500">

                            {user.email}

                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="text-center">

                      {user.phone}

                    </td>
                                        {/* ROLE */}

                    <td className="text-center">

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold

                          ${
                            user.role === "superadmin"
                              ? "bg-purple-100 text-purple-700"

                              : user.role === "admin"
                              ? "bg-blue-100 text-blue-700"

                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >

                        {user.role}

                      </span>

                    </td>





                    {/* STATUS */}

                    <td className="text-center">

                      <div className="flex flex-col items-center gap-2">

                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold

                            ${
                              user.isVerified
                                ? "bg-green-100 text-green-700"

                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >

                          {user.isVerified
                            ? "Verified"
                            : "Pending"}

                        </span>



                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold

                            ${
                              user.isBlocked
                                ? "bg-red-100 text-red-700"

                                : "bg-emerald-100 text-emerald-700"
                            }
                          `}
                        >

                          {user.isBlocked
                            ? "Blocked"
                            : "Active"}

                        </span>

                      </div>

                    </td>





                    {/* JOIN DATE */}

                    <td className="text-center text-sm">

                      {new Date(
                        user.createdAt
                      ).toLocaleDateString("en-IN")}

                    </td>





                    {/* ACTION */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-3">

                        {/* VIEW */}

                        <Link
                          href={`/admin/users/${user._id}`}
                          className="
                            rounded-xl
                            bg-blue-500
                            p-2
                            text-white
                            transition
                            hover:bg-blue-600
                          "
                        >

                          <Eye size={18} />

                        </Link>



                        {/* BLOCK */}

                        <button

                          onClick={() =>
                            handleBlock(user._id)
                          }

                          className={`
                            rounded-xl
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            transition

                            ${
                              user.isBlocked
                                ? "bg-green-600 hover:bg-green-700"

                                : "bg-red-600 hover:bg-red-700"
                            }
                          `}
                        >

                          {user.isBlocked
                            ? "Unblock"
                            : "Block"}

                        </button>



                        {/* ROLE */}

                        <select

                          value={user.role}

                          onChange={(e) =>
                            handleRoleChange(
                              user._id,
                              e.target.value
                            )
                          }

                          className="
                            rounded-xl
                            border
                            px-3
                            py-2
                            text-sm
                          "
                        >

                          <option value="user">

                            User

                          </option>

                          <option value="admin">

                            Admin

                          </option>

                          <option value="superadmin">

                            Super Admin

                          </option>

                        </select>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}