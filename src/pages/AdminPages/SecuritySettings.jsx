import React, { useState } from "react";
import {
  Shield,
  Lock,
  AlertTriangle,
  Eye,
  EyeOff,
  Clock,
  User,
  RefreshCw,
} from "lucide-react";

const SecuritySettings = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [ipRestrictionEnabled, setIpRestrictionEnabled] = useState(false);

  const securityEvents = [
    {
      user: "Admin",
      action: "Changed password policy",
      time: "Today, 10:45 AM",
      status: "Success",
    },
    {
      user: "System",
      action: "Security scan completed",
      time: "Yesterday, 8:30 PM",
      status: "Success",
    },
    {
      user: "Jamie Smith",
      action: "Failed login attempt",
      time: "Yesterday, 6:15 PM",
      status: "Alert",
    },
    {
      user: "System",
      action: "User permissions updated",
      time: "Apr 24, 2025",
      status: "Success",
    },
    {
      user: "Maya Johnson",
      action: "2FA disabled",
      time: "Apr 22, 2025",
      status: "Warning",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Security Settings
          </h1>
          <p className="text-sm text-gray-600">
            Manage system security settings and policies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Security Configuration
              </h2>
            </div>
            <div className="p-4 space-y-6">
              <div className="pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-blue-600" />
                    <h3 className="font-medium text-gray-800">
                      Password Policy
                    </h3>
                  </div>
                  <button className="text-blue-600 text-sm font-medium">
                    Edit
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-sm text-gray-600">
                      Minimum Length
                    </span>
                    <p className="font-medium text-gray-800">12 characters</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-sm text-gray-600">Complexity</span>
                    <p className="font-medium text-gray-800">
                      High (letters, numbers, symbols)
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-sm text-gray-600">Expiration</span>
                    <p className="font-medium text-gray-800">90 days</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-sm text-gray-600">History</span>
                    <p className="font-medium text-gray-800">
                      Last 5 passwords
                    </p>
                  </div>
                </div>
              </div>

              <div className="pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    <h3 className="font-medium text-gray-800">
                      Two-Factor Authentication
                    </h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Require all users to set up two-factor authentication for
                  enhanced security.
                </p>
                {twoFactorEnabled && (
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-blue-700">
                      Two-factor authentication is currently required for all
                      administrator accounts.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-blue-600" />
                    <h3 className="font-medium text-gray-800">
                      IP Restrictions
                    </h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={ipRestrictionEnabled}
                      onChange={() =>
                        setIpRestrictionEnabled(!ipRestrictionEnabled)
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Restrict system access to specific IP addresses or ranges.
                </p>
                {ipRestrictionEnabled && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center border border-gray-200 p-2 rounded">
                      <span className="flex-1 text-gray-800">
                        192.168.1.0/24
                      </span>
                      <button className="text-red-500 hover:text-red-700">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center border border-gray-200 p-2 rounded">
                      <span className="flex-1 text-gray-800">10.0.0.1</span>
                      <button className="text-red-500 hover:text-red-700">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <button className="mt-2 text-sm flex items-center text-blue-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      Add IP Address
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Security Events Log
              </h2>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {securityEvents.map((event, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                          {event.user}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {event.action}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {event.time}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                            ${
                              event.status === "Success"
                                ? "bg-green-100 text-green-800"
                                : event.status === "Alert"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:underline">
                  View All Security Events
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Security Summary
              </h2>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4 p-3 bg-green-50 rounded">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-green-700 text-sm font-medium">
                    Security Status: Good
                  </span>
                </div>
                <span className="text-green-600 text-lg font-bold">87%</span>
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Password Policy
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      Strong
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">2FA Adoption</span>
                    <span className="text-sm font-medium text-green-600">
                      87%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Session Security
                    </span>
                    <span className="text-sm font-medium text-yellow-600">
                      Medium
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Access Controls
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      Strong
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                  Run Security Scan
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Recent Activity
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-1 bg-red-100 rounded-full">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Failed login attempt detected
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      IP: 203.0.113.42 • 10:45 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-1 bg-green-100 rounded-full">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      User permissions updated
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      By: Admin • 9:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-1 bg-blue-100 rounded-full">
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Password policy updated
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      By: Admin • Yesterday
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-1 bg-yellow-100 rounded-full">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Session timeout settings changed
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      By: Admin • Yesterday
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:underline">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
