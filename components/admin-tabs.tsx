'use client';

import React, { useState, useEffect } from 'react';

interface MaintenanceTask {
  task: string;
  command: string;
  description: string;
}

interface MaintenanceData {
  title: string;
  schedules: {
    daily: MaintenanceTask[];
    weekly: MaintenanceTask[];
    monthly: MaintenanceTask[];
  };
  automatedTasks: string[];
}

interface EmergencyProcedure {
  emergency: string;
  severity: string;
  steps: string[];
  contacts: string[];
  sla: string;
  legalRequirements?: string[];
}

interface EmergencyData {
  title: string;
  scenarios: EmergencyProcedure[];
  contacts: Record<string, string>;
  escalationMatrix: Record<string, string>;
}

export function MaintenanceTab() {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [executingTask, setExecutingTask] = useState<string | null>(null);
  const [taskResults, setTaskResults] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  const fetchMaintenanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/super-admin/help?action=maintenance_tasks');
      const data = await response.json();
      setMaintenanceData(data);
    } catch (error) {
      console.error('Failed to fetch maintenance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeTask = async (command: string, taskName: string) => {
    setExecutingTask(taskName);
    try {
      // For demo purposes, we'll simulate task execution
      // In a real implementation, you'd have specific endpoints for each task
      const response = await fetch('/api/super-admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskName, command })
      });
      
      const result = await response.json();
      setTaskResults(prev => ({ ...prev, [taskName]: result }));
    } catch (error) {
      setTaskResults(prev => ({ 
        ...prev, 
        [taskName]: { 
          error: error instanceof Error ? error.message : 'Unknown error' 
        } 
      }));
    } finally {
      setExecutingTask(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!maintenanceData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load maintenance data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Automated Tasks Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">🤖 Automated Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {maintenanceData.automatedTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-sm">{task}</span>
              <span className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs">
                ✅ Running
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Tasks */}
      {Object.entries(maintenanceData.schedules).map(([schedule, tasks]) => (
        <div key={schedule} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 capitalize">
            📅 {schedule} Tasks
          </h3>
          
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium">{task.task}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => executeTask(task.command, task.task)}
                    disabled={executingTask === task.task}
                    className="ml-4 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {executingTask === task.task ? 'Running...' : 'Execute'}
                  </button>
                </div>
                
                <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                  {task.command}
                </div>
                
                {taskResults[task.task] && (
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <h5 className="text-sm font-medium mb-2">Result:</h5>
                    <pre className="text-xs overflow-x-auto">
                      {JSON.stringify(taskResults[task.task], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Maintenance Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => executeTask('cleanup', 'System Cleanup')}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="text-2xl mb-2">🧹</div>
            <div className="font-medium">Clean System</div>
            <div className="text-sm text-gray-500">Remove expired data and logs</div>
          </button>
          
          <button 
            onClick={() => executeTask('health_check', 'Full Health Check')}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="text-2xl mb-2">🏥</div>
            <div className="font-medium">Health Check</div>
            <div className="text-sm text-gray-500">Comprehensive system check</div>
          </button>
          
          <button 
            onClick={() => executeTask('backup', 'Create Backup')}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="text-2xl mb-2">💾</div>
            <div className="font-medium">Backup Data</div>
            <div className="text-sm text-gray-500">Create system backup</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export function EmergencyTab() {
  const [emergencyData, setEmergencyData] = useState<EmergencyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<number | null>(null);

  useEffect(() => {
    fetchEmergencyData();
  }, []);

  const fetchEmergencyData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/super-admin/help?action=emergency_procedures');
      const data = await response.json();
      setEmergencyData(data);
    } catch (error) {
      console.error('Failed to fetch emergency data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!emergencyData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load emergency procedures</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Emergency Contact Information */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
          🚨 Emergency Contacts
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.entries(emergencyData.contacts).map(([role, contact]) => (
            <div key={role} className="bg-white dark:bg-gray-800 p-3 rounded border">
              <div className="font-medium text-sm">{role}</div>
              <div className="text-blue-600 dark:text-blue-400 text-sm">{contact}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded border">
          <h4 className="font-medium mb-3">Escalation Matrix</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(emergencyData.escalationMatrix).map(([time, contact]) => (
              <div key={time} className="flex justify-between items-center text-sm">
                <span className="font-medium">{time}:</span>
                <span>{contact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Procedures */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">🚨 Emergency Procedures</h3>
        
        <div className="space-y-4">
          {emergencyData.scenarios.map((procedure, index) => (
            <div key={index} className="border dark:border-gray-700 rounded-lg">
              <button
                onClick={() => setSelectedProcedure(selectedProcedure === index ? null : index)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(procedure.severity)}`}>
                      {procedure.severity.toUpperCase()}
                    </span>
                    <h4 className="font-medium">{procedure.emergency}</h4>
                  </div>
                  <span className="text-2xl">
                    {selectedProcedure === index ? '▼' : '▶'}
                  </span>
                </div>
              </button>
              
              {selectedProcedure === index && (
                <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">📋 Response Steps</h5>
                      <ol className="space-y-2">
                        {procedure.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">👥 Primary Contacts</h5>
                        <div className="space-y-1">
                          {procedure.contacts.map((contact, contactIndex) => (
                            <span key={contactIndex} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">
                              {contact}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">⏱️ SLA</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{procedure.sla}</p>
                      </div>
                      
                      {procedure.legalRequirements && (
                        <div>
                          <h5 className="font-medium mb-2">⚖️ Legal Requirements</h5>
                          <ul className="space-y-1">
                            {procedure.legalRequirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="text-xs text-gray-600 dark:text-gray-400">
                                • {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Action Buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">⚡ Emergency Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <div className="text-2xl mb-2">🛑</div>
            <div className="font-medium">Emergency Stop</div>
            <div className="text-sm opacity-90">Stop all non-critical services</div>
          </button>
          
          <button className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-medium">Lock System</div>
            <div className="text-sm opacity-90">Block all external access</div>
          </button>
          
          <button className="p-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            <div className="text-2xl mb-2">📞</div>
            <div className="font-medium">Alert Team</div>
            <div className="text-sm opacity-90">Send emergency notifications</div>
          </button>
        </div>
      </div>

      {/* Incident Reporting */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">📝 Incident Reporting</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Incident Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>Security Breach</option>
              <option>System Outage</option>
              <option>Data Loss</option>
              <option>Service Degradation</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
              placeholder="Describe the incident, impact, and actions taken..."
            />
          </div>
          
          <button 
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Submit Incident Report
          </button>
        </form>
      </div>
    </div>
  );
}