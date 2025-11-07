'use client';

import React, { useState, useEffect } from 'react';
import { MaintenanceTab, EmergencyTab } from './AdminTabs';

// Icon component for outline icons
const OutlineIcon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    'bar-chart': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    ),
    'activity': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
      </svg>
    ),
    'settings': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    'server': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="3" width="20" height="4" rx="1" ry="1"></rect>
        <rect x="2" y="9" width="20" height="4" rx="1" ry="1"></rect>
        <rect x="2" y="15" width="20" height="4" rx="1" ry="1"></rect>
        <line x1="6" y1="5" x2="6.01" y2="5"></line>
        <line x1="6" y1="11" x2="6.01" y2="11"></line>
        <line x1="6" y1="17" x2="6.01" y2="17"></line>
      </svg>
    ),
    'trending-up': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
        <polyline points="17,6 23,6 23,12"></polyline>
      </svg>
    ),
    'tool': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    'alert-triangle': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="m12 17 .01 0"></path>
      </svg>
    )
  };

  return icons[name] || null;
};

interface HealthStatus {
  timestamp: string;
  status: string;
  services: {
    crm: { status: string; details: any };
    email: { status: string; details: any };
    security: { status: string; details: any };
    gdpr: { status: string; details: any };
  };
  environment: {
    nodeEnv: string;
    nextVersion: string;
    platform: string;
    nodeVersion: string;
  };
}

interface TroubleshootingData {
  title: string;
  sections: Array<{
    category: string;
    problems: Array<{
      issue: string;
      symptoms: string[];
      causes: string[];
      solutions: string[];
      code?: string;
    }>;
  }>;
}

interface APIReference {
  title: string;
  baseUrl: string;
  endpoints: Array<{
    category: string;
    endpoints: Array<{
      path: string;
      method: string;
      description: string;
      rateLimit?: string;
      parameters?: any;
      response?: any;
      example?: string;
      authentication?: string;
    }>;
  }>;
}

interface MonitoringData {
  title: string;
  timestamp: string;
  metrics: {
    security: {
      totalRequests: number;
      blockedRequests: number;
      rateLimitHits: number;
      lastHour: number;
    };
    gdpr: {
      totalConsentRecords: number;
      dataExportRequests: number;
      dataDeletionRequests: number;
      cookieConsentRate: string;
    };
    system: {
      uptime: number;
      memoryUsage: any;
      nodeVersion: string;
      platform: string;
    };
  };
  alerts: Array<{
    level: string;
    message: string;
    timestamp: string;
  }>;
  recentActivity: Array<{
    timestamp: string;
    action: string;
    ip: string;
    blocked: boolean;
  }>;
}

export default function SuperAdminHelpTab() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [troubleshootingData, setTroubleshootingData] = useState<TroubleshootingData | null>(null);
  const [apiReference, setApiReference] = useState<APIReference | null>(null);
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bar-chart' },
    { id: 'health', label: 'System Health', icon: 'activity' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: 'settings' },
    { id: 'api', label: 'API Reference', icon: 'server' },
    { id: 'monitoring', label: 'Monitoring', icon: 'trending-up' },
    { id: 'maintenance', label: 'Maintenance', icon: 'tool' },
    { id: 'emergency', label: 'Emergency', icon: 'alert-triangle' }
  ];

  const fetchData = async (action: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/super-admin/help?action=${action}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'health') {
      fetchData('system_health').then(setHealthData);
    } else if (activeTab === 'troubleshooting') {
      fetchData('troubleshooting_guide').then(setTroubleshootingData);
    } else if (activeTab === 'api') {
      fetchData('api_reference').then(setApiReference);
    } else if (activeTab === 'monitoring' || activeTab === 'dashboard') {
      fetchData('monitoring_dashboard').then(setMonitoringData);
    }
  }, [activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'not_configured': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <OutlineIcon name="settings" className="w-8 h-8 text-[var(--brand)]" />
              Super Admin Help Center
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Comprehensive system administration, troubleshooting, and monitoring tools
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <span className="mr-2">
                  <OutlineIcon name={tab.icon} className="w-4 h-4" />
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && monitoringData && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">📊 System Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 dark:text-blue-200">Total Requests</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {monitoringData.metrics.security.totalRequests}
                  </p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-red-800 dark:text-red-200">Blocked Requests</h3>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {monitoringData.metrics.security.blockedRequests}
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 dark:text-green-200">Consent Rate</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {monitoringData.metrics.gdpr.cookieConsentRate}
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-800 dark:text-purple-200">Uptime</h3>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {formatUptime(monitoringData.metrics.system.uptime)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Recent Activity</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {monitoringData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div>
                          <span className="text-sm font-medium">{activity.action}</span>
                          <span className="text-xs text-gray-500 ml-2">{activity.ip}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${activity.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {activity.blocked ? 'Blocked' : 'Allowed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">System Alerts</h3>
                  <div className="space-y-2">
                    {monitoringData.alerts.map((alert, index) => (
                      <div key={index} className={`p-3 rounded ${
                        alert.level === 'error' ? 'bg-red-100 text-red-800' :
                        alert.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs opacity-75">{new Date(alert.timestamp).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'health' && healthData && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">🏥 System Health Status</h2>
              
              <div className="mb-6">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  healthData.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  Overall Status: {healthData.status.toUpperCase()}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Last checked: {new Date(healthData.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(healthData.services).map(([service, data]) => (
                  <div key={service} className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium capitalize">{service} Service</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(data.status)}`}>
                        {data.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {JSON.stringify(data.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t dark:border-gray-700 pt-6">
                <h3 className="font-medium mb-3">Environment Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Environment:</span>
                    <p className="text-gray-600 dark:text-gray-400">{healthData.environment.nodeEnv}</p>
                  </div>
                  <div>
                    <span className="font-medium">Next.js:</span>
                    <p className="text-gray-600 dark:text-gray-400">{healthData.environment.nextVersion}</p>
                  </div>
                  <div>
                    <span className="font-medium">Node.js:</span>
                    <p className="text-gray-600 dark:text-gray-400">{healthData.environment.nodeVersion}</p>
                  </div>
                  <div>
                    <span className="font-medium">Platform:</span>
                    <p className="text-gray-600 dark:text-gray-400">{healthData.environment.platform}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Troubleshooting Tab */}
        {activeTab === 'troubleshooting' && troubleshootingData && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">🔧 {troubleshootingData.title}</h2>
              
              {troubleshootingData.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-blue-600 dark:text-blue-400">
                    {section.category}
                  </h3>
                  
                  {section.problems.map((problem, problemIndex) => (
                    <div key={problemIndex} className="border dark:border-gray-700 rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-3 text-red-600 dark:text-red-400">
                        🚨 {problem.issue}
                      </h4>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Symptoms:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {problem.symptoms.map((symptom, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2">Possible Causes:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {problem.causes.map((cause, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-yellow-400 mr-2">•</span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2">Solutions:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {problem.solutions.map((solution, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {problem.code && (
                        <div>
                          <h5 className="font-medium text-sm mb-2">Test Code:</h5>
                          <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                            {problem.code}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Reference Tab */}
        {activeTab === 'api' && apiReference && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">📡 {apiReference.title}</h2>
              
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Base URL:</h3>
                <code className="text-blue-600 dark:text-blue-400">{apiReference.baseUrl}</code>
              </div>
              
              {apiReference.endpoints.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-purple-600 dark:text-purple-400">
                    {category.category}
                  </h3>
                  
                  {category.endpoints.map((endpoint, endpointIndex) => (
                    <div key={endpointIndex} className="border dark:border-gray-700 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="font-mono text-sm">{endpoint.path}</code>
                        {endpoint.authentication && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                            🔒 {endpoint.authentication}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {endpoint.description}
                      </p>
                      
                      {endpoint.rateLimit && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-3">
                          ⚡ Rate Limit: {endpoint.rateLimit}
                        </p>
                      )}
                      
                      {endpoint.parameters && (
                        <div className="mb-3">
                          <h5 className="font-medium text-sm mb-2">Parameters:</h5>
                          <pre className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs overflow-x-auto">
                            {JSON.stringify(endpoint.parameters, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {endpoint.response && (
                        <div className="mb-3">
                          <h5 className="font-medium text-sm mb-2">Response:</h5>
                          <pre className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs overflow-x-auto">
                            {JSON.stringify(endpoint.response, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {endpoint.example && (
                        <div>
                          <h5 className="font-medium text-sm mb-2">Example:</h5>
                          <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                            {endpoint.example}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && monitoringData && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">📈 System Monitoring</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Security Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Requests:</span>
                      <span className="font-bold">{monitoringData.metrics.security.totalRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blocked:</span>
                      <span className="font-bold">{monitoringData.metrics.security.blockedRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate Limited:</span>
                      <span className="font-bold">{monitoringData.metrics.security.rateLimitHits}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">GDPR Compliance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Consent Records:</span>
                      <span className="font-bold">{monitoringData.metrics.gdpr.totalConsentRecords}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Export Requests:</span>
                      <span className="font-bold">{monitoringData.metrics.gdpr.dataExportRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deletion Requests:</span>
                      <span className="font-bold">{monitoringData.metrics.gdpr.dataDeletionRequests}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">System Health</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-bold">{formatUptime(monitoringData.metrics.system.uptime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory:</span>
                      <span className="font-bold">{formatBytes(monitoringData.metrics.system.memoryUsage.rss)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform:</span>
                      <span className="font-bold">{monitoringData.metrics.system.platform}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">📊 Real-time Activity</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {monitoringData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
                          <div className="flex items-center space-x-3">
                            <span className={`w-3 h-3 rounded-full ${activity.blocked ? 'bg-red-500' : 'bg-green-500'}`}></span>
                            <div>
                              <p className="text-sm font-medium">{activity.action}</p>
                              <p className="text-xs text-gray-500">{activity.ip}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">🚨 System Alerts</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {monitoringData.alerts.map((alert, index) => (
                        <div key={index} className={`p-3 rounded shadow-sm ${
                          alert.level === 'error' ? 'bg-red-100 border-l-4 border-red-500' :
                          alert.level === 'warning' ? 'bg-yellow-100 border-l-4 border-yellow-500' :
                          'bg-blue-100 border-l-4 border-blue-500'
                        }`}>
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <MaintenanceTab />
        )}

        {/* Emergency Tab */}
        {activeTab === 'emergency' && (
          <EmergencyTab />
        )}

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => fetchData('system_health').then(setHealthData)}
              className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-2xl mb-2">🔄</div>
              <div className="font-medium">Refresh Health Check</div>
              <div className="text-sm text-gray-500">Check all system services</div>
            </button>
            
            <button 
              onClick={() => window.open('/api/security/admin?action=audit-logs', '_blank')}
              className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium">View Security Logs</div>
              <div className="text-sm text-gray-500">Check recent security events</div>
            </button>
            
            <button 
              onClick={() => window.open('/api/gdpr?action=privacy_policy', '_blank')}
              className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-medium">GDPR Status</div>
              <div className="text-sm text-gray-500">Check privacy compliance</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}