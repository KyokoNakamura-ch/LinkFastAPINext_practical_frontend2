"use client";
import { Suspense, useState, useEffect } from "react";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

// 🔥 `useSearchParams()` を分ける
function CustomerInfo({ customer_id }) {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      if (!customer_id) return;
      const customerData = await fetchCustomer(customer_id);
      setCustomer(customerData);
    };
    fetchAndSetCustomer();
  }, [customer_id]);

  if (!customer) return <div>Loading...</div>;

  return <OneCustomerInfoCard {...customer} />;
}

// 🔥 `Suspense` の外で `useSearchParams` を処理
function CustomerDataWrapper({ searchParams }) {
  const customer_id = searchParams.get("customer_id");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerInfo customer_id={customer_id} />
    </Suspense>
  );
}

export default function ConfirmPage({ searchParams }) {
  const router = useRouter();

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      {/* 🔥 Suspense の外で searchParams を処理 */}
      <CustomerDataWrapper searchParams={searchParams} />
      <button onClick={() => router.push("./../../customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

// "use client";
// import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
// import fetchCustomer from "./fetchCustomer";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export const dynamic = 'force-dynamic';
// export default function ConfirmPage() {
//   const router = useRouter();
//   const customer_id = useSearchParams().get("customer_id");
//   const [customer, setCustomer] = useState(null);

//   useEffect(() => {
//     const fetchAndSetCustomer = async () => {
//       const customerData = await fetchCustomer(customer_id);
//       setCustomer(customerData);
//     };
//     fetchAndSetCustomer();
//   }, []);

//   return (
//     <>
//       <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
//         <div className="alert alert-success p-4 text-center">
//           正常に作成しました
//         </div>
//         <OneCustomerInfoCard {...customer} />
//         <button onClick={() => router.push("./../../customers")}>
//           <div className="btn btn-primary m-4 text-2xl">戻る</div>
//         </button>
//       </div>
//     </>
//   );
// }
