"use client";
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { normalizeBdPhone } from "@/app/utils/phone";
import Pagination from "../shared/Pagination";
import LoadingSkeleton from "../loader/TableLoading";

const ITEMS_PER_PAGE = 10;

const formatDate = (value) => (value && dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "—");
const formatTaka = (value) => `৳${(Number(value) || 0).toLocaleString("en-US")}`;

export const filterBuyers = (buyers, searchText, guestsOnly) => {
  const text = searchText.trim().toLowerCase();
  const phoneSearch = normalizeBdPhone(searchText);
  return buyers.filter((buyer) => {
    if (guestsOnly && buyer.registered) return false;
    if (!text) return true;
    return (
      (buyer.name || "").toLowerCase().includes(text) ||
      (!!phoneSearch && (buyer.phone || "").includes(phoneSearch))
    );
  });
};

const TypeBadge = ({ registered }) => (
  <span
    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
      registered ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
    }`}
  >
    {registered ? "নিবন্ধিত" : "অতিথি"}
  </span>
);

const PhoneLink = ({ phone }) => (
  <a href={`tel:${phone}`} className="font-medium text-gray-900 underline-offset-2 hover:underline">
    {phone}
  </a>
);

const OrderCount = ({ buyer }) => (
  <>
    {buyer.orderCount}
    {buyer.cancelledCount > 0 && (
      <span className="text-xs text-gray-400"> (বাতিল {buyer.cancelledCount})</span>
    )}
  </>
);

const GuestCustomers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [guestsOnly, setGuestsOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/v1/orders/guest-customers", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (active) setBuyers(Array.isArray(data?.customers) ? data.customers : []);
      } catch (err) {
        console.error("Failed to fetch guest customers:", err);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => setCurrentPage(0), [searchText, guestsOnly]);

  const filtered = useMemo(
    () => filterBuyers(buyers, searchText, guestsOnly),
    [buyers, searchText, guestsOnly]
  );
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
  const guestTotal = buyers.filter((buyer) => !buyer.registered).length;

  return (
    <div>
      <p className="text-sm text-gray-600">
        অর্ডার থেকে ফোন নম্বর ধরে ক্রেতাদের তালিকা (শুধু দেখার জন্য)। মোট কেনায় বাতিল অর্ডার ধরা হয়নি।
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:basis-2/3">
          <input
            type="text"
            placeholder="নাম বা ফোন নম্বর দিয়ে খুঁজুন"
            aria-label="নাম বা ফোন নম্বর দিয়ে খুঁজুন"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 px-10 outline-none"
          />
          <p className="absolute top-3 left-3">
            <FiSearch size={20} />
          </p>
          {searchText.length !== 0 && (
            <button
              type="button"
              aria-label="খোঁজা মুছুন"
              onClick={() => setSearchText("")}
              className="absolute top-3 right-3"
            >
              <GrClose size={15} />
            </button>
          )}
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={guestsOnly}
            onChange={(e) => setGuestsOnly(e.target.checked)}
          />
          শুধু অতিথি ক্রেতা
        </label>
      </div>

      {loading ? (
        <div className="mt-8">
          <LoadingSkeleton />
        </div>
      ) : error ? (
        <p role="alert" className="mt-8 rounded-lg bg-white p-6 text-sm text-red-600">
          ক্রেতাদের তথ্য আনা যায়নি। একটু পরে আবার চেষ্টা করুন।
        </p>
      ) : (
        <>
          <p className="mt-6 text-sm text-gray-600">
            মোট {buyers.length} জন ক্রেতা · অতিথি {guestTotal} জন · দেখানো হচ্ছে {filtered.length} জন
          </p>

          {filtered.length === 0 ? (
            <p className="mt-4 rounded-lg bg-white p-6 text-center text-sm text-gray-500">
              কোনো ক্রেতা পাওয়া যায়নি।
            </p>
          ) : (
            <>
              {/* Mobile: one card per buyer */}
              <ul className="mt-4 space-y-3 md:hidden">
                {pageItems.map((buyer) => (
                  <li key={buyer.phone} className="rounded-lg bg-white p-4 shadow-sm" data-testid="guest-card">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">{buyer.name || "—"}</p>
                        <PhoneLink phone={buyer.phone} />
                      </div>
                      <TypeBadge registered={buyer.registered} />
                    </div>
                    {buyer.address && <p className="mt-2 break-words text-sm text-gray-600">{buyer.address}</p>}
                    {buyer.email && <p className="mt-1 break-all text-sm text-gray-500">{buyer.email}</p>}
                    <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <dt className="text-gray-500">অর্ডার</dt>
                        <dd className="font-medium text-gray-900"><OrderCount buyer={buyer} /></dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">মোট কেনা</dt>
                        <dd className="font-medium text-gray-900">{formatTaka(buyer.totalSpent)}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">প্রথম অর্ডার</dt>
                        <dd className="text-gray-900">{formatDate(buyer.firstOrderAt)}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">শেষ অর্ডার</dt>
                        <dd className="text-gray-900">{formatDate(buyer.lastOrderAt)}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>

              {/* Tablet/desktop: table (scrolls horizontally if narrow) */}
              <div className="mt-4 hidden overflow-x-auto md:block">
                <div className="inline-block min-w-full align-middle bg-white py-8 px-6 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                    <thead>
                      <tr className="bg-primary-2">
                        {["নাম", "ফোন", "ঠিকানা", "ইমেইল", "অর্ডার", "মোট কেনা", "প্রথম অর্ডার", "শেষ অর্ডার", "ধরন"].map(
                          (label) => (
                            <th key={label} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark whitespace-nowrap">
                              {label}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {pageItems.map((buyer) => (
                        <tr key={buyer.phone}>
                          <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-900">{buyer.name || "—"}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-sm"><PhoneLink phone={buyer.phone} /></td>
                          <td className="min-w-[12rem] max-w-xs px-3 py-2 text-sm text-gray-500">{buyer.address || "—"}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{buyer.email || "—"}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-900"><OrderCount buyer={buyer} /></td>
                          <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-900">{formatTaka(buyer.totalSpent)}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{formatDate(buyer.firstOrderAt)}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{formatDate(buyer.lastOrderAt)}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-sm"><TypeBadge registered={buyer.registered} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {pageCount > 1 && (
                <Pagination
                  key={`${searchText}|${guestsOnly}`}
                  pageCount={pageCount}
                  handlePageChange={({ selected }) => setCurrentPage(selected)}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GuestCustomers;
