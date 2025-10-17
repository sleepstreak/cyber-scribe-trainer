import { Scenario, Badge } from "@/types/scenario";

export const scenarios: Scenario[] = [
  // Incident Response - Easy
  {
    id: "ir-easy-1",
    domain: "incident-response",
    title: "Suspicious Email Detection",
    description: "An employee reports receiving a suspicious email with an attachment claiming to be an invoice. What steps should you take?",
    difficulty: "easy",
    points: 100,
    actions: [
      { id: "ir-e1-a1", text: "Isolate the employee's device from the network", correctOrder: 1 },
      { id: "ir-e1-a2", text: "Document the email details (sender, subject, timestamp)", correctOrder: 2 },
      { id: "ir-e1-a3", text: "Report to security team and do not open the attachment", correctOrder: 3 },
      { id: "ir-e1-a4", text: "Run a malware scan on the device", correctOrder: 4 },
      { id: "ir-e1-a5", text: "Monitor for any suspicious activity", correctOrder: 5 }
    ]
  },
  {
    id: "ir-easy-2",
    domain: "incident-response",
    title: "Lost Company Device",
    description: "An employee reports their company laptop was stolen. What immediate actions should be taken?",
    difficulty: "easy",
    points: 100,
    actions: [
      { id: "ir-e2-a1", text: "Report the incident to security team immediately", correctOrder: 1 },
      { id: "ir-e2-a2", text: "Remotely wipe or lock the device", correctOrder: 2 },
      { id: "ir-e2-a3", text: "Change all passwords used on that device", correctOrder: 3 },
      { id: "ir-e2-a4", text: "File a police report", correctOrder: 4 },
      { id: "ir-e2-a5", text: "Review access logs for suspicious activity", correctOrder: 5 }
    ]
  },

  // Incident Response - Medium
  {
    id: "ir-medium-1",
    domain: "incident-response",
    title: "Ransomware Attack",
    description: "Multiple workstations display ransomware messages demanding payment. Files are being encrypted rapidly across the network.",
    difficulty: "medium",
    points: 200,
    actions: [
      { id: "ir-m1-a1", text: "Activate incident response team and declare incident", correctOrder: 1 },
      { id: "ir-m1-a2", text: "Isolate infected systems from the network immediately", correctOrder: 2 },
      { id: "ir-m1-a3", text: "Identify patient zero and attack vector", correctOrder: 3 },
      { id: "ir-m1-a4", text: "Preserve evidence and create forensic images", correctOrder: 4 },
      { id: "ir-m1-a5", text: "Begin recovery from clean backups", correctOrder: 5 },
      { id: "ir-m1-a6", text: "Notify relevant stakeholders and authorities", correctOrder: 6 }
    ]
  },
  {
    id: "ir-medium-2",
    domain: "incident-response",
    title: "Data Breach Discovery",
    description: "Your monitoring system detects unusual data exfiltration from a database server during off-hours.",
    difficulty: "medium",
    points: 200,
    actions: [
      { id: "ir-m2-a1", text: "Contain the breach by blocking suspicious connections", correctOrder: 1 },
      { id: "ir-m2-a2", text: "Capture network traffic and system logs", correctOrder: 2 },
      { id: "ir-m2-a3", text: "Identify compromised accounts and reset credentials", correctOrder: 3 },
      { id: "ir-m2-a4", text: "Analyze the scope of data accessed or stolen", correctOrder: 4 },
      { id: "ir-m2-a5", text: "Patch vulnerabilities that enabled the breach", correctOrder: 5 },
      { id: "ir-m2-a6", text: "Notify affected parties per compliance requirements", correctOrder: 6 }
    ]
  },

  // Incident Response - Hard
  {
    id: "ir-hard-1",
    domain: "incident-response",
    title: "Advanced Persistent Threat (APT)",
    description: "Forensic analysis reveals a sophisticated attacker has maintained access to your network for months, exfiltrating intellectual property.",
    difficulty: "hard",
    points: 300,
    actions: [
      { id: "ir-h1-a1", text: "Form specialized incident response team with external experts", correctOrder: 1 },
      { id: "ir-h1-a2", text: "Conduct covert investigation to map attacker's infrastructure", correctOrder: 2 },
      { id: "ir-h1-a3", text: "Identify all compromised systems and persistence mechanisms", correctOrder: 3 },
      { id: "ir-h1-a4", text: "Develop coordinated remediation plan for simultaneous cleanup", correctOrder: 4 },
      { id: "ir-h1-a5", text: "Execute network-wide credential reset and access review", correctOrder: 5 },
      { id: "ir-h1-a6", text: "Implement enhanced monitoring and threat hunting program", correctOrder: 6 },
      { id: "ir-h1-a7", text: "Conduct lessons learned and update security controls", correctOrder: 7 }
    ]
  },

  // Cyber Hygiene - Easy
  {
    id: "ch-easy-1",
    domain: "cyber-hygiene",
    title: "Password Best Practices",
    description: "You need to create a new password for an important company account. What steps ensure good password hygiene?",
    difficulty: "easy",
    points: 100,
    actions: [
      { id: "ch-e1-a1", text: "Create a strong password (12+ characters, mixed types)", correctOrder: 1 },
      { id: "ch-e1-a2", text: "Ensure password is unique and not reused", correctOrder: 2 },
      { id: "ch-e1-a3", text: "Store password in approved password manager", correctOrder: 3 },
      { id: "ch-e1-a4", text: "Enable multi-factor authentication (MFA)", correctOrder: 4 },
      { id: "ch-e1-a5", text: "Set reminder to change password per policy", correctOrder: 5 }
    ]
  },
  {
    id: "ch-easy-2",
    domain: "cyber-hygiene",
    title: "Software Update Routine",
    description: "Your computer is prompting you to install security updates. How should you handle this?",
    difficulty: "easy",
    points: 100,
    actions: [
      { id: "ch-e2-a1", text: "Verify the update is legitimate", correctOrder: 1 },
      { id: "ch-e2-a2", text: "Save all work and close applications", correctOrder: 2 },
      { id: "ch-e2-a3", text: "Install the security updates", correctOrder: 3 },
      { id: "ch-e2-a4", text: "Restart the system if required", correctOrder: 4 },
      { id: "ch-e2-a5", text: "Verify system is functioning properly after update", correctOrder: 5 }
    ]
  },

  // Cyber Hygiene - Medium
  {
    id: "ch-medium-1",
    domain: "cyber-hygiene",
    title: "Secure Remote Work Setup",
    description: "You're setting up a home office for remote work with access to sensitive company data.",
    difficulty: "medium",
    points: 200,
    actions: [
      { id: "ch-m1-a1", text: "Install and configure company VPN", correctOrder: 1 },
      { id: "ch-m1-a2", text: "Enable firewall and antivirus on home network", correctOrder: 2 },
      { id: "ch-m1-a3", text: "Secure WiFi with WPA3 and strong password", correctOrder: 3 },
      { id: "ch-m1-a4", text: "Encrypt hard drive with BitLocker/FileVault", correctOrder: 4 },
      { id: "ch-m1-a5", text: "Configure automatic screen lock and updates", correctOrder: 5 },
      { id: "ch-m1-a6", text: "Test secure connection to company resources", correctOrder: 6 }
    ]
  },
  {
    id: "ch-medium-2",
    domain: "cyber-hygiene",
    title: "Data Classification Handling",
    description: "You need to share a document containing customer information with your team and external partners.",
    difficulty: "medium",
    points: 200,
    actions: [
      { id: "ch-m2-a1", text: "Identify and classify the data sensitivity level", correctOrder: 1 },
      { id: "ch-m2-a2", text: "Verify recipients are authorized to access this data", correctOrder: 2 },
      { id: "ch-m2-a3", text: "Remove or redact unnecessary sensitive information", correctOrder: 3 },
      { id: "ch-m2-a4", text: "Use approved secure file sharing platform", correctOrder: 4 },
      { id: "ch-m2-a5", text: "Enable password protection and expiration date", correctOrder: 5 },
      { id: "ch-m2-a6", text: "Document the sharing in compliance log", correctOrder: 6 }
    ]
  },

  // Cyber Hygiene - Hard
  {
    id: "ch-hard-1",
    domain: "cyber-hygiene",
    title: "Comprehensive Security Audit",
    description: "Perform a comprehensive security hygiene audit of your department's digital infrastructure.",
    difficulty: "hard",
    points: 300,
    actions: [
      { id: "ch-h1-a1", text: "Inventory all devices, software, and data repositories", correctOrder: 1 },
      { id: "ch-h1-a2", text: "Review and document access controls and permissions", correctOrder: 2 },
      { id: "ch-h1-a3", text: "Assess patch management and software update status", correctOrder: 3 },
      { id: "ch-h1-a4", text: "Evaluate backup procedures and test recovery process", correctOrder: 4 },
      { id: "ch-h1-a5", text: "Audit security configurations against baseline standards", correctOrder: 5 },
      { id: "ch-h1-a6", text: "Conduct vulnerability scanning and penetration testing", correctOrder: 6 },
      { id: "ch-h1-a7", text: "Generate findings report and remediation roadmap", correctOrder: 7 }
    ]
  }
];

export const allBadges: Badge[] = [
  {
    id: "first-scenario",
    name: "First Steps",
    description: "Complete your first scenario",
    icon: "🎯",
    earned: false
  },
  {
    id: "perfect-score",
    name: "Perfectionist",
    description: "Complete a scenario with 100% accuracy on first try",
    icon: "💯",
    earned: false
  },
  {
    id: "incident-master",
    name: "Incident Response Master",
    description: "Complete 5 incident response scenarios",
    icon: "🚨",
    earned: false
  },
  {
    id: "hygiene-expert",
    name: "Cyber Hygiene Expert",
    description: "Complete 5 cyber hygiene scenarios",
    icon: "🛡️",
    earned: false
  },
  {
    id: "hard-mode",
    name: "Elite Defender",
    description: "Complete a hard difficulty scenario",
    icon: "⭐",
    earned: false
  },
  {
    id: "point-collector",
    name: "Point Collector",
    description: "Earn 1000 total points",
    icon: "💰",
    earned: false
  },
  {
    id: "dedicated",
    name: "Dedicated Learner",
    description: "Complete 10 scenarios",
    icon: "🎓",
    earned: false
  }
];
