"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getpayements } from "../../Endpoints/APIs";

import PaymentManagement from "../../components/admin/allpayments/PaymentManagement";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import Pagination from "../../components/user/othercomponent/Pagination";

const TransactionsPage = () => {
  const [payments, setPayments] = useState([]);
  const [current, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("succeeded");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const handleGetPayments = async () => {
      const response = await getpayements(user?.user?.id, current, status);
      if (response?.data?.results?.success === true) {
        setPayments(response.data.results.payments);
        setTotal(Math.ceil(response.data.count / 2));
      }
    };

    handleGetPayments();
  }, [current, status]);

  return (
    <>
      {/* Tabler Icons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />

      <Navigation />

      <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">

            <PaymentManagement payments={payments} setStatus={setStatus} />

          <Pagination total={total} current={current} setPage={setPage} />
        </div>
      </main>
    </>
  );
};

export default TransactionsPage;
