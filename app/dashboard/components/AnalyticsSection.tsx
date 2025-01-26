export default function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Total Players', 'Active Games', 'Revenue'].map((metric) => (
          <div key={metric} className="bg-[#071A2F] p-6 rounded-xl">
            <h3 className="text-[#0CC0DF] text-lg">{metric}</h3>
            <p className="text-white text-2xl font-bold">0</p>
          </div>
        ))}
      </div>
    </div>
  )
} 