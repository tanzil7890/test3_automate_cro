'use client';

export default function DashboardPage() {
  return (
    <div className="pt-16">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Projects</h3>
          <p className="text-gray-600">No recent projects to display.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
              Create New Project
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition">
              View Reports
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Feed</h3>
          <p className="text-gray-600">No recent activities to display.</p>
        </div>
      </div>
    </div>
  );
} 