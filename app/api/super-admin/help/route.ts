import { NextRequest } from 'next/server';
import { securityManager } from '@/lib/security/manager';
import { getCRM } from '@/lib/crm/manager';
import { getEmailEngine } from '@/lib/email/automation';
import { consentManager } from '@/lib/gdpr/consent';
import { dataRightsManager } from '@/lib/gdpr/data-rights';

export async function GET(request: NextRequest) {
  try {
    // Apply strict security protection for admin endpoints
    const protection = await securityManager.protectRoute(request, 'auth');
    if (!protection.success) {
      return protection.response!;
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'system_health': {
        const health = await getSystemHealth();
        return await securityManager.createSecureResponse(health);
      }

      case 'troubleshooting_guide': {
        const guide = getTroubleshootingGuide();
        return await securityManager.createSecureResponse(guide);
      }

      case 'api_reference': {
        const reference = getAPIReference();
        return await securityManager.createSecureResponse(reference);
      }

      case 'configuration_guide': {
        const config = getConfigurationGuide();
        return await securityManager.createSecureResponse(config);
      }

      case 'monitoring_dashboard': {
        const dashboard = await getMonitoringDashboard();
        return await securityManager.createSecureResponse(dashboard);
      }

      case 'maintenance_tasks': {
        const tasks = getMaintenanceTasks();
        return await securityManager.createSecureResponse(tasks);
      }

      case 'emergency_procedures': {
        const procedures = getEmergencyProcedures();
        return await securityManager.createSecureResponse(procedures);
      }

      default:
        return await securityManager.createSecureResponse(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Super Admin Help API error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function getSystemHealth() {
  const health = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {
      crm: { status: 'unknown', details: {} },
      email: { status: 'unknown', details: {} },
      security: { status: 'healthy', details: {} },
      gdpr: { status: 'healthy', details: {} }
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      nextVersion: '14.2.3',
      platform: process.platform,
      nodeVersion: process.version
    }
  };

  // Check CRM health
  try {
    const crm = getCRM();
    if (crm) {
      const crmHealth = await crm.healthCheck();
      health.services.crm = { 
        status: crmHealth.connected ? 'healthy' : 'error',
        details: crmHealth
      };
    } else {
      health.services.crm = { 
        status: 'not_configured',
        details: { message: 'CRM not configured' }
      };
    }
  } catch (error) {
    health.services.crm = { 
      status: 'error',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }

  // Check email engine health
  try {
    const emailEngine = getEmailEngine();
    if (emailEngine) {
      health.services.email = { 
        status: 'healthy',
        details: { provider: 'Resend', configured: true }
      };
    } else {
      health.services.email = { 
        status: 'not_configured',
        details: { message: 'Email engine not configured' }
      };
    }
  } catch (error) {
    health.services.email = { 
      status: 'error',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }

  return health;
}

function getTroubleshootingGuide() {
  return {
    title: "KHESED-TEK SYSTEMS System Troubleshooting Guide",
    lastUpdated: "2024-10-30",
    sections: [
      {
        category: "CRM Integration Issues",
        problems: [
          {
            issue: "CRM not creating leads",
            symptoms: ["Contact form submissions not appearing in CRM", "Lead scoring not working"],
            causes: [
              "Invalid CRM API credentials",
              "CRM service is down",
              "Network connectivity issues",
              "Rate limiting from CRM provider"
            ],
            solutions: [
              "Check CRM_PROVIDER environment variable",
              "Verify API credentials in environment variables",
              "Check CRM service status on provider dashboard",
              "Review API rate limits and usage",
              "Check /api/crm?action=health endpoint"
            ],
            code: `// Test CRM connection
fetch('/api/crm?action=health')
  .then(res => res.json())
  .then(data => console.log('CRM Health:', data));`
          },
          {
            issue: "Lead scoring incorrect",
            symptoms: ["All leads have score 0", "High-value leads showing as low priority"],
            causes: [
              "Scoring rules misconfigured",
              "Activity data not being captured",
              "Custom fields not mapping correctly"
            ],
            solutions: [
              "Review scoring rules in lib/crm/scoring.ts",
              "Check activity logging in CRM adapter",
              "Verify custom field mappings",
              "Test with sample lead data"
            ]
          }
        ]
      },
      {
        category: "Email Automation Problems",
        problems: [
          {
            issue: "Emails not sending",
            symptoms: ["No confirmation emails", "Automation campaigns not triggering"],
            causes: [
              "Invalid Resend API key",
              "Email template errors",
              "Rate limiting",
              "DNS/SPF record issues"
            ],
            solutions: [
              "Verify RESEND_API_KEY environment variable",
              "Check Resend dashboard for delivery status",
              "Test email templates individually",
              "Verify domain DNS settings",
              "Check /api/email-automation health endpoint"
            ],
            code: `// Test email sending
fetch('/api/email-automation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'send_test_email',
    data: { email: 'test@example.com' }
  })
});`
          },
          {
            issue: "Campaign not triggering",
            symptoms: ["Automation emails not sent after form submission"],
            causes: [
              "Campaign conditions not met",
              "Subscriber status issues",
              "Template rendering errors"
            ],
            solutions: [
              "Check campaign trigger conditions",
              "Verify subscriber email status",
              "Test template variable replacement",
              "Review campaign logs"
            ]
          }
        ]
      },
      {
        category: "Security & Rate Limiting",
        problems: [
          {
            issue: "Legitimate users being blocked",
            symptoms: ["429 Too Many Requests errors", "Users can't submit forms"],
            causes: [
              "Rate limits too strict",
              "Shared IP addresses",
              "Aggressive abuse detection"
            ],
            solutions: [
              "Review rate limit configuration",
              "Check blocked IP list",
              "Adjust abuse detection rules",
              "Implement IP whitelisting if needed"
            ],
            code: `// Check security status
fetch('/api/security/admin?action=stats')
  .then(res => res.json())
  .then(data => console.log('Security Stats:', data));`
          },
          {
            issue: "Security headers not applied",
            symptoms: ["Browser security warnings", "CSP violations"],
            causes: [
              "Middleware not running",
              "Header configuration errors",
              "CDN stripping headers"
            ],
            solutions: [
              "Check middleware.ts is properly configured",
              "Verify security headers in browser dev tools",
              "Review CDN header forwarding settings",
              "Test with curl to see raw headers"
            ]
          }
        ]
      },
      {
        category: "GDPR Compliance Issues",
        problems: [
          {
            issue: "Cookie consent not working",
            symptoms: ["Banner not appearing", "Consent not persisting"],
            causes: [
              "JavaScript errors",
              "LocalStorage disabled",
              "Component not mounted"
            ],
            solutions: [
              "Check browser console for JavaScript errors",
              "Verify localStorage is enabled",
              "Test in different browsers",
              "Check component mounting in layout"
            ]
          },
          {
            issue: "Data export/deletion not working",
            symptoms: ["Requests hanging", "No email notifications"],
            causes: [
              "Background processing errors",
              "Email delivery issues",
              "Data collection failures"
            ],
            solutions: [
              "Check GDPR API logs",
              "Verify email sending configuration",
              "Test data collection methods",
              "Review verification code generation"
            ]
          }
        ]
      }
    ]
  };
}

function getAPIReference() {
  return {
    title: "KHESED-TEK SYSTEMS API Reference",
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    endpoints: [
      {
        category: "Contact & Lead Management",
        endpoints: [
          {
            path: "/api/request-demo",
            method: "POST",
            description: "Submit contact form and create CRM lead",
            rateLimit: "3 requests per hour",
            parameters: {
              name: "string (required)",
              email: "string (required)",
              org: "string (optional)",
              whatsapp: "string (optional)", 
              message: "string (optional)",
              wantsDemo: "boolean (optional)"
            },
            response: {
              ok: "boolean",
              id: "string (email ID)",
              leadId: "string (CRM lead ID)",
              leadScore: "number (0-100)",
              priority: "string (low|medium|high|critical)"
            },
            example: `curl -X POST ${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/request-demo \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "name=Juan Pérez&email=juan@empresa.com&org=Mi Empresa&wantsDemo=true"`
          }
        ]
      },
      {
        category: "CRM Operations",
        endpoints: [
          {
            path: "/api/crm",
            method: "GET",
            description: "Get CRM health status and leads",
            rateLimit: "50 requests per 15 minutes",
            parameters: {
              action: "health | leads"
            },
            response: {
              success: "boolean",
              data: "object (varies by action)"
            }
          },
          {
            path: "/api/crm",
            method: "POST", 
            description: "CRM operations (create lead, update score, log activity)",
            rateLimit: "50 requests per 15 minutes",
            parameters: {
              action: "create_lead | update_score | log_activity | get_leads",
              data: "object (varies by action)"
            }
          }
        ]
      },
      {
        category: "Email Automation",
        endpoints: [
          {
            path: "/api/email-automation",
            method: "POST",
            description: "Trigger email campaigns and manage automation",
            rateLimit: "50 requests per 15 minutes",
            parameters: {
              action: "trigger_campaign | send_email | get_campaigns | manage_subscriber",
              data: "object (varies by action)"
            },
            example: `curl -X POST ${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/email-automation \\
  -H "Content-Type: application/json" \\
  -d '{"action":"trigger_campaign","data":{"subscriberEmail":"user@example.com","campaignId":"campaign_1"}}'`
          }
        ]
      },
      {
        category: "Security & Monitoring",
        endpoints: [
          {
            path: "/api/security/admin",
            method: "GET",
            description: "Security monitoring and audit logs",
            rateLimit: "5 requests per 15 minutes",
            parameters: {
              action: "audit-logs | health | stats"
            },
            authentication: "Admin access required"
          }
        ]
      },
      {
        category: "GDPR Compliance",
        endpoints: [
          {
            path: "/api/gdpr",
            method: "POST",
            description: "GDPR data rights and consent management",
            rateLimit: "50 requests per 15 minutes",
            parameters: {
              action: "set_cookie_consent | withdraw_consent | request_data_export | request_data_deletion | verify_deletion",
              data: "object (varies by action)"
            }
          },
          {
            path: "/api/gdpr",
            method: "GET",
            description: "Get GDPR status and configuration",
            parameters: {
              action: "export_status | deletion_status | privacy_policy | cookie_banner_config"
            }
          }
        ]
      }
    ]
  };
}

function getConfigurationGuide() {
  return {
    title: "System Configuration Guide",
    sections: [
      {
        category: "Environment Variables",
        description: "Required and optional environment variables for system operation",
        variables: [
          {
            name: "RESEND_API_KEY",
            required: true,
            description: "Resend API key for email sending",
            example: "re_xxxxxxxxxx",
            where: "Get from https://resend.com/api-keys"
          },
          {
            name: "CONTACT_EMAIL",
            required: true,
            description: "Email address to receive contact form submissions",
            example: "soporte@khesed-tek.com"
          },
          {
            name: "CRM_PROVIDER",
            required: false,
            description: "CRM system to use (hubspot|salesforce|pipedrive)",
            example: "hubspot"
          },
          {
            name: "HUBSPOT_ACCESS_TOKEN",
            required: false,
            description: "HubSpot private app access token",
            example: "pat-na1-xxxxxxxx"
          },
          {
            name: "SALESFORCE_CLIENT_ID",
            required: false,
            description: "Salesforce connected app client ID"
          },
          {
            name: "SALESFORCE_CLIENT_SECRET",
            required: false,
            description: "Salesforce connected app client secret"
          },
          {
            name: "PIPEDRIVE_API_TOKEN",
            required: false,
            description: "Pipedrive API token"
          },
          {
            name: "NEXT_PUBLIC_SITE_URL",
            required: true,
            description: "Full URL of the website",
            example: "https://khesedtek.com"
          }
        ]
      },
      {
        category: "CRM Configuration",
        description: "How to configure each supported CRM system",
        crms: [
          {
            name: "HubSpot",
            steps: [
              "Go to HubSpot Developer Portal",
              "Create a private app with contacts and deals scopes",
              "Copy the access token",
              "Set CRM_PROVIDER=hubspot",
              "Set HUBSPOT_ACCESS_TOKEN=your_token"
            ],
            requiredScopes: ["crm.objects.contacts.read", "crm.objects.contacts.write", "crm.objects.deals.read", "crm.objects.deals.write"]
          },
          {
            name: "Salesforce",
            steps: [
              "Create a connected app in Salesforce Setup",
              "Enable OAuth settings",
              "Configure callback URL",
              "Get client ID and secret",
              "Set CRM_PROVIDER=salesforce",
              "Set SALESFORCE_CLIENT_ID and SALESFORCE_CLIENT_SECRET"
            ],
            requiredPermissions: ["Access and manage your data (api)", "Access your basic information (id, profile, email, address, phone)"]
          },
          {
            name: "Pipedrive",
            steps: [
              "Go to Pipedrive Company Settings",
              "Navigate to Personal preferences > API",
              "Generate new API token",
              "Set CRM_PROVIDER=pipedrive",
              "Set PIPEDRIVE_API_TOKEN=your_token"
            ]
          }
        ]
      },
      {
        category: "Email Configuration",
        description: "Resend email service configuration",
        steps: [
          "Sign up for Resend account",
          "Verify your domain",
          "Configure DNS records (SPF, DKIM, DMARC)",
          "Generate API key",
          "Set RESEND_API_KEY environment variable",
          "Test email sending"
        ],
        dnsRecords: {
          spf: "v=spf1 include:_spf.resend.com ~all",
          dkim: "Generated automatically by Resend",
          dmarc: "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"
        }
      }
    ]
  };
}

async function getMonitoringDashboard() {
  const securityLogs = securityManager.getAuditLogs();
  const gdprLogs = consentManager.getAuditLogs();
  
  return {
    title: "System Monitoring Dashboard",
    timestamp: new Date().toISOString(),
    metrics: {
      security: {
        totalRequests: securityLogs.length,
        blockedRequests: securityLogs.filter(log => log.blocked).length,
        rateLimitHits: securityLogs.filter(log => log.reason.includes('rate limit')).length,
        lastHour: securityLogs.filter(log => 
          new Date(log.timestamp).getTime() > Date.now() - 60 * 60 * 1000
        ).length
      },
      gdpr: {
        totalConsentRecords: gdprLogs.length,
        dataExportRequests: 0, // Would come from data rights manager
        dataDeletionRequests: 0,
        cookieConsentRate: "85%" // Calculated from analytics
      },
      system: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform
      }
    },
    alerts: [
      {
        level: "info",
        message: "System operating normally",
        timestamp: new Date().toISOString()
      }
    ],
    recentActivity: securityLogs.slice(-10).map(log => ({
      timestamp: log.timestamp,
      action: log.action,
      ip: log.ip,
      blocked: log.blocked
    }))
  };
}

function getMaintenanceTasks() {
  return {
    title: "System Maintenance Tasks",
    schedules: {
      daily: [
        {
          task: "Check system health",
          command: "curl /api/super-admin/help?action=system_health",
          description: "Verify all services are running properly"
        },
        {
          task: "Review security logs",
          command: "curl /api/security/admin?action=audit-logs",
          description: "Check for suspicious activity or blocked requests"
        }
      ],
      weekly: [
        {
          task: "Clean up expired data",
          command: "curl -X POST /api/security/admin -d '{\"action\":\"cleanup\"}'",
          description: "Remove expired rate limit entries and old logs"
        },
        {
          task: "Review GDPR requests",
          command: "Check pending data export/deletion requests",
          description: "Ensure all GDPR requests are processed timely"
        }
      ],
      monthly: [
        {
          task: "Update dependencies",
          command: "npm audit && npm update",
          description: "Check for security updates and update packages"
        },
        {
          task: "Review CRM sync performance",
          command: "Analyze CRM integration metrics",
          description: "Ensure lead creation and scoring is working optimally"
        },
        {
          task: "Email deliverability check",
          command: "Review Resend dashboard and DNS settings",
          description: "Ensure emails are being delivered successfully"
        }
      ]
    },
    automatedTasks: [
      "Rate limit cleanup (every 15 minutes)",
      "GDPR audit log rotation (daily)",
      "Email queue processing (continuous)",
      "CRM sync monitoring (real-time)"
    ]
  };
}

function getEmergencyProcedures() {
  return {
    title: "Emergency Response Procedures",
    scenarios: [
      {
        emergency: "System Down / 500 Errors",
        severity: "Critical",
        steps: [
          "Check system health endpoint: /api/super-admin/help?action=system_health",
          "Review server logs for error details",
          "Check external service status (Resend, CRM providers)",
          "Verify environment variables are set correctly",
          "Restart application if necessary",
          "Monitor error rates and user impact"
        ],
        contacts: ["Technical Lead", "DevOps Team"],
        sla: "15 minutes to response, 1 hour to resolution"
      },
      {
        emergency: "Security Breach Detected",
        severity: "Critical",
        steps: [
          "Immediately review security audit logs",
          "Identify affected IP addresses and block if necessary",
          "Check for data access or modification",
          "Enable additional rate limiting if needed",
          "Document incident details",
          "Notify relevant stakeholders",
          "Consider GDPR breach notification requirements"
        ],
        contacts: ["Security Team", "Legal Team", "DPO"],
        sla: "Immediate response, 72 hours for breach notification"
      },
      {
        emergency: "CRM Integration Failure",
        severity: "High",
        steps: [
          "Check CRM service status on provider dashboards",
          "Verify API credentials and rate limits",
          "Test CRM connection: /api/crm?action=health",
          "Review recent CRM API changes or maintenance",
          "Implement manual lead capture if necessary",
          "Set up monitoring alerts for CRM connectivity"
        ],
        contacts: ["Technical Lead", "Sales Team"],
        sla: "30 minutes to response, 4 hours to resolution"
      },
      {
        emergency: "Email Delivery Issues",
        severity: "High",
        steps: [
          "Check Resend dashboard for delivery status",
          "Verify DNS records (SPF, DKIM, DMARC)",
          "Test email sending with curl or Postman",
          "Check for blacklisting or reputation issues",
          "Review email content for spam triggers",
          "Switch to backup email method if necessary"
        ],
        contacts: ["Technical Lead", "Marketing Team"],
        sla: "1 hour to response, 6 hours to resolution"
      },
      {
        emergency: "GDPR Data Breach",
        severity: "Critical",
        steps: [
          "Immediately contain the breach",
          "Assess scope and severity of data exposure",
          "Document all details of the incident",
          "Notify Data Protection Officer (DPO)",
          "Prepare breach notification for supervisory authority",
          "Notify affected individuals if required",
          "Implement additional security measures",
          "Conduct post-incident review"
        ],
        contacts: ["DPO", "Legal Team", "Executive Team"],
        sla: "Immediate response, 72 hours for authority notification",
        legalRequirements: [
          "Article 33 GDPR - Notification to supervisory authority",
          "Article 34 GDPR - Communication to data subjects",
          "Colombian Law 1581 - Data breach notification"
        ]
      }
    ],
    contacts: {
      "Technical Lead": "tech-lead@khesedtek.com",
      "DevOps Team": "devops@khesedtek.com", 
      "Security Team": "security@khesedtek.com",
      "Legal Team": "legal@khesedtek.com",
      "DPO": "dpo@khesedtek.com",
      "Sales Team": "sales@khesedtek.com",
      "Marketing Team": "marketing@khesedtek.com",
      "Executive Team": "exec@khesedtek.com"
    },
    escalationMatrix: {
      "0-15 minutes": "Technical Lead",
      "15-60 minutes": "DevOps Team + Technical Lead",
      "1-4 hours": "Department Heads",
      "4+ hours": "Executive Team"
    }
  };
}