import {
  Clock3,
  CalendarX2,
  Baby,
  PawPrint,
  CigaretteOff,
  ShieldCheck,
} from "lucide-react";

// ==========================
// DEFAULT / FALLBACK VALUES
// Used whenever `settings` doesn't provide a value.
// ==========================
const DEFAULTS = {
  checkInTime: "02:00 PM",
  checkOutTime: "11:00 AM",
  freeCancellationHours: 24,
  maxChildren: null, // null => "Children of all ages are welcome."
  childAgeLimit: null,
  petsAllowed: false,
  smokingAllowed: false,
  importantNotice:
    "Guests are required to present a valid government-issued ID during check-in. Additional charges may apply for extra guests or special requests.",
};

// ==========================
// DISPLAY TIME (always 12-hour with AM/PM)
// Settings may be saved as "14:00" (24-hour, from an <input type="time">)
// or "02:00 PM" (12-hour). This always renders it as "02:00 PM" for
// display, regardless of which format was stored.
// ==========================
const formatTimeDisplay = (timeStr) => {
  if (!timeStr) return "";

  const str = String(timeStr).trim();

  // Already 12-hour with AM/PM — just normalize casing/padding.
  const ampmMatch = str.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);

  if (ampmMatch) {
    let [, hh, mm, ampm] = ampmMatch;
    return `${String(Number(hh)).padStart(2, "0")}:${mm} ${ampm.toUpperCase()}`;
  }

  // 24-hour "14:00" or "14:00:00"
  const h24Match = str.match(/^(\d{1,2}):(\d{2})/);

  if (h24Match) {
    let [, hh, mm] = h24Match;
    hh = Number(hh);

    const ampm = hh >= 12 ? "PM" : "AM";
    let hh12 = hh % 12;
    if (hh12 === 0) hh12 = 12;

    return `${String(hh12).padStart(2, "0")}:${mm} ${ampm}`;
  }

  return str;
};

export default function RoomPolicies({ settings }) {
  // ==========================
  // BUILD POLICY VALUES FROM SETTINGS (with fallbacks)
  // ==========================

  const checkInTime = formatTimeDisplay(settings?.checkInTime) || DEFAULTS.checkInTime;
  const checkOutTime = formatTimeDisplay(settings?.checkOutTime) || DEFAULTS.checkOutTime;

  const cancellationHours =
    settings?.freeCancellationHours ?? DEFAULTS.freeCancellationHours;

  const maxChildren = settings?.maxChildren ?? DEFAULTS.maxChildren;
  const childAgeLimit = settings?.childAgeLimit ?? DEFAULTS.childAgeLimit;

  const childrenText =
    maxChildren === null || maxChildren === undefined
      ? "Children of all ages are welcome."
      : maxChildren === 0
      ? "This property does not accommodate children."
      : `Up to ${maxChildren} ${maxChildren === 1 ? "child" : "children"} allowed${
          childAgeLimit ? ` (below ${childAgeLimit} years)` : ""
        }.`;

  const petsAllowed = settings?.petsAllowed ?? DEFAULTS.petsAllowed;
  const smokingAllowed = settings?.smokingAllowed ?? DEFAULTS.smokingAllowed;

  const importantNotice =
    settings?.hotelNotice || settings?.importantNotice || DEFAULTS.importantNotice;

  const policies = [
    {
      icon: Clock3,
      title: "Check-In",
      value: `From ${checkInTime}`,
    },
    {
      icon: Clock3,
      title: "Check-Out",
      value: `Until ${checkOutTime}`,
    },
    {
      icon: CalendarX2,
      title: "Cancellation",
      value: `Free cancellation up to ${cancellationHours} hours before check-in.`,
    },
    {
      icon: Baby,
      title: "Children",
      value: childrenText,
    },
    {
      icon: PawPrint,
      title: "Pets",
      value: petsAllowed ? "Pets are allowed." : "Pets are not allowed.",
    },
    {
      icon: CigaretteOff,
      title: "Smoking",
      value: smokingAllowed
        ? "Smoking is allowed in designated areas only."
        : "Smoking is strictly prohibited inside the room.",
    },
  ];

  return (
    <section className="mt-10 sm:mt-16">
      <div className="mb-6 sm:mb-8">
        <p className="text-sm font-semibold uppercase tracking-[3px] text-yellow-500 sm:text-base">
          Hotel Policies
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          Stay Information
        </h2>

        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          Please review our policies before confirming your booking.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {policies.map((policy) => {
          const Icon = policy.icon;

          return (
            <div
              key={policy.title}
              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-yellow-500 hover:shadow-md sm:gap-4 sm:p-5"
            >
              <div className="shrink-0 rounded-full bg-yellow-100 p-2.5 sm:p-3">
                <Icon size={20} className="text-yellow-600 sm:size-[22px]" />
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                  {policy.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  {policy.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice */}
      <div className="mt-6 flex gap-3 rounded-2xl border border-yellow-300 bg-yellow-50 p-4 sm:mt-8 sm:p-5">
        <ShieldCheck
          className="mt-1 shrink-0 text-yellow-600"
          size={22}
        />

        <div className="min-w-0">
          <h4 className="font-semibold text-gray-900">Important Notice</h4>

          <p className="mt-2 text-sm text-gray-600">{importantNotice}</p>
        </div>
      </div>
    </section>
  );
}