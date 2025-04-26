import React from "react";

const SystemOverviewCards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex mb-4">
            <div className="w-10 h-10 rounded bg-purple-500 mr-3"></div>
            <div>
              <div className="text-gray-500">Total Users</div>
              <div className="text-2xl font-bold">1,254</div>
            </div>
          </div>
          <div className="text-green-500">+12% from last period</div>
        </div>

        {/* Active Projects Card */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex mb-4">
            <div className="w-10 h-10 rounded bg-indigo-500 mr-3"></div>
            <div>
              <div className="text-gray-500">Active Projects</div>
              <div className="text-2xl font-bold">48</div>
            </div>
          </div>
          <div className="text-green-500">+3% from last period</div>
        </div>

        {/* System Health Card */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex mb-4">
            <div className="w-10 h-10 rounded bg-green-500 mr-3"></div>
            <div>
              <div className="text-gray-500">System Health</div>
              <div className="text-2xl font-bold">98%</div>
            </div>
          </div>
          <div className="text-green-500">+2% from last period</div>
        </div>

        {/* Pending Applications Card */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex mb-4">
            <div className="w-10 h-10 rounded bg-yellow-500 mr-3"></div>
            <div>
              <div className="text-gray-500">Pending Applications</div>
              <div className="text-2xl font-bold">23</div>
            </div>
          </div>
          <div className="text-red-500">-5% from last period</div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverviewCards;
