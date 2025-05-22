import React, { useEffect, useState } from "react";
import { Wallet, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { wallet } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Pagination from "../othercomponent/Pagination";


const WalletMain = () => {
  const [balance, setBalance] = useState(0);
  const [number, setNumber] = useState(null)
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector(state => state.user)
  useEffect(() => {
    const getWallet = async () => {
      try {
        const res = await wallet(user.user.id, currentPage)
        if (res?.data?.results?.success) {
          setBalance(res?.data?.results?.balance)
          setNumber(res?.data?.results?.user_mobile)
          setTransactions(res?.data?.results?.transaction)
          setTotalPages(Math.ceil(res.data.count / 5))
        }
      } catch (error) {
        toast.error(error?.response?.data?.results.error || "Something went wrong")
      }
    }
    getWallet();
  }, [currentPage, user]);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className=" mx-auto p-4 md:p-6 animate-fade-in">

        <div className="p-6 pt-2">
          <div className={`bg-stone-900 rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl relative overflow-hidden  'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>

            <div className="flex items-center mb-4">
              <div className="bg-[#9b87f5] p-3 rounded-full mr-4 animate-pulse">
                <Wallet className="text-white" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Main Wallet</p>
                {/* <p className="text-white text-lg font-semibold"> ****** {number.slice(-4)}</p> */}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 text-sm">Total Balance</p>
              <h2 className="text-3xl font-bold text-white mt-1 mb-2">{balance}</h2>
            </div>

          </div>

        </div>

        <div className="p-6 pt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold">Transactions</h2>
          </div>

          <div className="bg-stone-900 rounded-xl overflow-hidden">
            <div className="divide-y divide-gray-800">
              {transactions.map((transaction, index) => {
                const { date, transaction_type, amount, description } = transaction;
                const isCredit = transaction_type === 'credit';

                return (
                  <div key={index} className="py-4 px-6 hover:bg-stone-950/40 transition-all cursor-pointer rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${isCredit ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                          {isCredit ? (
                            <ArrowUp className="text-green-500" size={20} />
                          ) : (
                            <ArrowDown className="text-red-500" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{description}</p>
                          <p className="text-gray-400 text-xs">{date}</p>
                        </div>
                      </div>
                      <div className={`font-semibold ${isCredit ? 'text-green-500' : 'text-red-400'}`}>
                        {isCredit ? '+' : '-'}{amount}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Pagination
        total={totalPages} current={currentPage} setPage={setCurrentPage}
      />

    </div>
  );
};

export default WalletMain;
