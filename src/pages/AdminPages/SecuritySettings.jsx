import React, { useState } from "react";
import {
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  RefreshCw,
} from "lucide-react";

const SecuritySettings = () => {
  const [securityScanMessage, setSecurityScanMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // "success" or "failure"
  const [recentActivity, setRecentActivity] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSecurityScan = () => {
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      setMessageType("success");
      setSecurityScanMessage(
        "Security scan completed successfully. No threats detected."
      );
      setRecentActivity([
        {
          type: "Success",
          icon: <CheckCircle className="w-4 h-4 text-green-600" />,
          message: "System secure. No threats detected.",
          details: `Checked at ${getCurrentTime()}`,
        },
        {
          type: "Success",
          icon: <User className="w-4 h-4 text-green-600" />,
          message: "All user permissions verified.",
          details: `Checked at ${getCurrentTime()}`,
        },
      ]);
    } else {
      setMessageType("failure");
      setSecurityScanMessage(
        "Security scan failed. Threats detected, immediate action required!"
      );
      setRecentActivity([
        {
          type: "Alert",
          icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
          message: "Failed login attempt detected.",
          details: `IP: 203.0.113.42 • ${getCurrentTime()}`,
        },
        {
          type: "Alert",
          icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
          message: "Unauthorized file access attempt.",
          details: `IP: 198.51.100.23 • ${getCurrentTime()}`,
        },
        {
          type: "Warning",
          icon: <Clock className="w-4 h-4 text-yellow-600" />,
          message: "Password change required for some users.",
          details: `Checked at ${getCurrentTime()}`,
        },
      ]);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Security Settings
        </h1>
        <p className="text-sm text-gray-600">
          Manage system security settings and policies
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">
            Security Summary
          </h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleSecurityScan}
          >
            Run Security Scan
          </button>
        </div>
        {securityScanMessage && (
          <div
            className={`mt-4 p-3 rounded ${
              messageType === "success"
                ? "bg-green-50 border-l-4 border-green-500"
                : "bg-red-50 border-l-4 border-red-500"
            }`}
          >
            <p
              className={`text-sm ${
                messageType === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {securityScanMessage}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium text-gray-800">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-1 bg-gray-100 rounded-full">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.details}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Run a security scan to view activity.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
