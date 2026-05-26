export default function AdminClientsPage() {
  const clients = [
    { name: "Sharma General Store", owner: "Ramesh Sharma", phone: "+91 98765 43210", status: "ACTIVE", credit: "₹50,000", outstanding: "₹12,400" },
    { name: "Patel Kirana", owner: "Suresh Patel", phone: "+91 98765 43211", status: "ACTIVE", credit: "₹75,000", outstanding: "₹31,000" },
    { name: "Gupta Mart", owner: "Anil Gupta", phone: "+91 98765 43212", status: "PENDING_APPROVAL", credit: "₹25,000", outstanding: "₹0" },
    { name: "Singh Provision Store", owner: "Harpreet Singh", phone: "+91 98765 43213", status: "ACTIVE", credit: "₹1,00,000", outstanding: "₹45,600" },
    { name: "Aman\'s Store", owner: "Aman Verma", phone: "+91 98765 43214", status: "PENDING_APPROVAL", credit: "₹30,000", outstanding: "₹0" },
    { name: "Mehta Traders", owner: "Vijay Mehta", phone: "+91 98765 43215", status: "SUSPENDED", credit: "₹40,000", outstanding: "₹38,200" },
  ];

  const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
    ACTIVE: { bg: "#10B98120", color: "#10B981", label: "Active" },
    PENDING_APPROVAL: { bg: "#F59E0B20", color: "#F59E0B", label: "Pending" },
    SUSPENDED: { bg: "#EF444420", color: "#EF4444", label: "Suspended" },
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Client Management
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Manage retailer accounts, approvals, and credit limits
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "#F59E0B20", color: "#F59E0B" }}
          >
            2 Pending Approvals
          </span>
        </div>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(30, 58, 95, 0.04)" }}>
                <th className="text-left px-6 py-4 font-semibold">Store</th>
                <th className="text-left px-6 py-4 font-semibold">Owner</th>
                <th className="text-left px-6 py-4 font-semibold">Phone</th>
                <th className="text-center px-6 py-4 font-semibold">Status</th>
                <th className="text-right px-6 py-4 font-semibold">Credit Limit</th>
                <th className="text-right px-6 py-4 font-semibold">Outstanding</th>
                <th className="text-center px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
              {clients.map((c) => {
                const st = statusConfig[c.status];
                return (
                  <tr key={c.name} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium">{c.name}</td>
                    <td className="px-6 py-4">{c.owner}</td>
                    <td className="px-6 py-4 text-xs font-mono">{c.phone}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: st.bg, color: st.color }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">{c.credit}</td>
                    <td className="px-6 py-4 text-right">{c.outstanding}</td>
                    <td className="px-6 py-4 text-center">
                      {c.status === "PENDING_APPROVAL" ? (
                        <button
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105"
                          style={{ background: "var(--kb-teal)" }}
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                          style={{ background: "rgba(30, 58, 95, 0.08)", color: "var(--kb-blue)" }}
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
