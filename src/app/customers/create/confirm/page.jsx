"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export const dynamic = "force-dynamic"; // ✅ Next.js に SSR を強制する設定

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
}

function ConfirmPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams?.get("customer_id") || null; // ✅ `undefined` の場合に `null` を設定

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!customer_id) return; // ✅ `customer_id` が `null` の場合は処理を実行しない

    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomer(customer_id);
        setCustomer(customerData);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchAndSetCustomer();
  }, [customer_id]); // ✅ `customer_id` を依存配列に追加し、変更時に実行

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      {customer ? <OneCustomerInfoCard {...customer} /> : <p>Loading...</p>}
      <button onClick={() => router.push("/customers")}>
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
