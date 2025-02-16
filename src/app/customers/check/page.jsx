export const dynamic = "force-dynamic"; // ✅ Next.js に SSR を強制する設定
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  if (!id) {
    console.error("Invalid customer ID"); // ✅ IDが不正な場合のエラーログ追加
    throw new Error("Invalid customer ID");
  }

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  if (!endpoint) {
    console.error("API endpoint is not defined"); // ✅ APIエンドポイント未設定時のエラーログ追加
    throw new Error("API endpoint is not defined");
  }

  const res = await fetch(`${endpoint}/customers?customer_id=${id}`);
  if (!res.ok) {
    console.error(`Failed to fetch customer. Status: ${res.status}`); // ✅ APIエラーの詳細をログに出力
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default async function ReadPage({ searchParams }) {
  const id = searchParams?.id || null; // ✅ `id` が `undefined` の場合に `null` を設定
  if (!id) {
    console.warn("No customer ID provided in searchParams"); // ✅ IDが提供されなかった場合の警告ログ
    return <div className="alert alert-error">顧客IDが見つかりません</div>;
  }

  let customerInfo;
  try {
    customerInfo = await fetchCustomer(id);
  } catch (error) {
    console.error("Error fetching customer data:", error); // ✅ API通信時のエラーハンドリングを強化
    return <div className="alert alert-error">データの取得に失敗しました</div>;
  }

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        {customerInfo.length > 0 ? (
          <OneCustomerInfoCard {...customerInfo[0]} />
        ) : (
          <p>顧客データが見つかりません</p>
        )}
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}

// export const dynamic = 'force-dynamic';
// import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

// async function fetchCustomer(id) {
//   const res = await fetch(
//     process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch customer");
//   }
//   return res.json();
// }

// export default async function ReadPage({ query }) {
//   const { id } = query;
//   const customerInfo = await fetchCustomer(id);

//   return (
//     <>
//       <div className="alert alert-success">更新しました</div>
//       <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
//         <OneCustomerInfoCard {...customerInfo[0]} />
//       </div>
//       <button className="btn btn-outline btn-accent">
//         <a href="/customers">一覧に戻る</a>
//       </button>
//     </>
//   );
// }
