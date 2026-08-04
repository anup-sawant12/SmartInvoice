import { useEffect, useState } from "react";
import { getShop } from "../services/shopService";
import { getProducts } from "../services/productService";
import { getBills } from "../services/billService";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentInvoices from "../components/dashboard/RecentInvoices";
import SalesOverview from "../components/dashboard/SalesOverview";
import { FiTrendingUp, FiFileText, FiBox, FiDollarSign } from "react-icons/fi";

const Dashboard = () => {
  const [shop, setShop] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [bills, setBills] = useState([]);
  const [metrics, setMetrics] = useState({
    todaySales: 0,
    todayInvoicesCount: 0,
    totalSales: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [shopRes, productsRes, billsRes] = await Promise.all([
          getShop().catch(() => ({ data: null })),
          getProducts().catch(() => ({ data: [] })),
          getBills().catch(() => ({ data: [] }))
        ]);

        if (shopRes.data) {
          setShop(shopRes.data);
        }
        if (productsRes.data) {
          setProductCount(productsRes.data.length);
        }

        const billsList = billsRes.data || [];
        setBills(billsList);

        // Calculate metrics
        let totalSales = 0;
        let todaySales = 0;
        let todayInvoicesCount = 0;

        const todayStr = new Date().toDateString();

        billsList.forEach((bill) => {
          const grandTotal = Number(bill.grandTotal) || 0;
          totalSales += grandTotal;

          const billDateStr = new Date(bill.createdAt).toDateString();
          if (billDateStr === todayStr) {
            todaySales += grandTotal;
            todayInvoicesCount += 1;
          }
        });

        setMetrics({
          todaySales,
          todayInvoicesCount,
          totalSales
        });
      } catch (err) {
        console.error("Error loading dashboard metrics:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">Dashboard</h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Welcome back{shop?.shopName ? `, ${shop.shopName}` : ""}! Here is what's happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiDollarSign}
          label="Today's Sales"
          value={`₹${metrics.todaySales.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
          colorClass="text-blue-600 bg-blue-50"
        />
        <StatCard
          icon={FiFileText}
          label="Today's Invoices"
          value={metrics.todayInvoicesCount.toString()}
          colorClass="text-purple-600 bg-purple-50"
        />
        <StatCard
          icon={FiBox}
          label="Total Products"
          value={productCount.toString()}
          colorClass="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Total Sales"
          value={`₹${metrics.totalSales.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
          colorClass="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Grid: Charts + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesOverview />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Invoices */}
      <RecentInvoices invoices={bills} />
    </div>
  );
};

export default Dashboard;