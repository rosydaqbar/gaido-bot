/**
 * Weekly materials web page template
 */

export function getWeeklyPageTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Material Quest Mingguan</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    /* Dark Mode Atlassian/Jira Colors */
    :root {
      --jira-dark-bg: #0D1117;
      --jira-dark-surface: #161B22;
      --jira-dark-surface-hover: #21262D;
      --jira-dark-border: #30363D;
      --jira-dark-text-primary: #F0F6FC;
      --jira-dark-text-secondary: #8B949E;
      --jira-dark-text-muted: #6E7681;
      --jira-blue-500: #1F6FEB;
      --jira-blue-600: #1158C7;
      --jira-blue-400: #388BFD;
      --jira-blue-100: #0D419D;
      --jira-green-500: #238636;
      --jira-green-400: #2EA043;
      --jira-orange-500: #FB8500;
      --jira-orange-400: #FFA657;
      --jira-red-500: #DA3633;
      --jira-purple-500: #8957E5;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background-color: var(--jira-dark-bg);
      color: var(--jira-dark-text-primary);
      line-height: 1.5;
      overflow-x: hidden;
    }

    .app-container {
      display: flex;
      height: 100vh;
      padding: 24px;
      gap: 24px;
      transition: all 0.3s ease;
    }

    .app-container.guide-open {
      gap: 24px;
    }

    /* Left Sidebar Card */
    .sidebar {
      width: 320px;
      background: var(--jira-dark-surface);
      border: 1px solid var(--jira-dark-border);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      max-height: calc(100vh - 48px);
      flex-shrink: 0;
    }

    .sidebar-footer {
      margin-top: auto;
      padding: 16px 20px;
      border-top: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-surface);
      text-align: center;
    }

    .version-info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .version-badge {
      background: var(--jira-blue-500);
      color: white;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .dev-badge {
      background: var(--jira-orange-500);
      color: white;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .sidebar-header {
      padding: 24px 20px;
      border-bottom: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-surface);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .sidebar-header h1 {
      font-size: 20px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 8px;
    }

    .sidebar-header p {
      font-size: 14px;
      color: var(--jira-dark-text-secondary);
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .reset-timer {
      font-size: 13px;
      color: var(--jira-orange-500);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .reset-timer-icon {
      font-size: 12px;
    }

    .pulsating-colon {
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 50% {
        opacity: 1;
      }
      51%, 100% {
        opacity: 0.3;
      }
    }

    .skills-list {
      flex: 1;
      padding: 16px 0;
      overflow-y: auto;
      min-height: 0;
    }

    .skill-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      margin: 2px 0;
    }

    .skill-item:hover {
      background: var(--jira-dark-surface-hover);
    }

    .skill-item.active {
      background: var(--jira-blue-100);
      border-left-color: var(--jira-blue-500);
    }

    .skill-item.active:hover {
      background: var(--jira-blue-100);
    }

    .skill-icon {
      font-size: 20px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: var(--jira-dark-surface-hover);
      margin-right: 12px;
    }

    .skill-item.active .skill-icon {
      background: var(--jira-blue-500);
    }

    .skill-info h3 {
      font-size: 14px;
      font-weight: 500;
      color: var(--jira-dark-text-primary);
      margin-bottom: 2px;
    }

    .skill-info p {
      font-size: 12px;
      color: var(--jira-dark-text-secondary);
    }

    .skill-badge {
      margin-left: auto;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .skill-badge.gathering {
      background: var(--jira-green-500);
      color: white;
    }

    .skill-badge.crafting {
      background: var(--jira-orange-500);
      color: white;
    }

    /* Right Panel */
    .detail-panel {
      flex: 1;
      background: transparent;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      transition: all 0.3s ease;
    }

    .app-container.guide-open .detail-panel {
      flex: 0 0 600px;
      justify-content: flex-start;
    }

    .detail-content {
      width: 100%;
      max-width: 600px;
      background: var(--jira-dark-surface);
      border-radius: 12px;
      border: 1px solid var(--jira-dark-border);
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
      height: calc(100vh - 48px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .detail-content.visible {
      transform: translateX(0);
    }

    /* Guide Panel - Beside Detail Panel */
    .guide-panel {
      flex: 0;
      width: 0;
      background: transparent;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      transition: all 0.3s ease;
    }

    .app-container.guide-open .guide-panel {
      flex: 0 0 500px;
      width: auto;
    }

    .guide-content-card {
      width: 100%;
      background: var(--jira-dark-surface);
      border-radius: 12px;
      border: 1px solid var(--jira-dark-border);
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
      height: calc(100vh - 48px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      opacity: 0;
    }

    .guide-content-card.visible {
      transform: translateX(0);
      opacity: 1;
    }

    .detail-header {
      padding: 24px 32px;
      border-bottom: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-surface);
      border-radius: 12px 12px 0 0;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .detail-header-top {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .detail-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: var(--jira-blue-500);
      margin-right: 16px;
    }

    .detail-title h2 {
      font-size: 24px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 4px;
    }

    .detail-title p {
      font-size: 14px;
      color: var(--jira-dark-text-secondary);
    }

    .close-button {
      margin-left: auto;
      width: 32px;
      height: 32px;
      border: none;
      background: var(--jira-dark-surface-hover);
      color: var(--jira-dark-text-secondary);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      background: var(--jira-dark-border);
      color: var(--jira-dark-text-primary);
    }

    .detail-body {
      padding: 32px;
    }

    .materials-section {
      margin-bottom: 32px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .section-title-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .checklist-controls {
      margin-top: 16px;
      padding-top: 16px;
      padding-bottom: 16px;
      border-top: 1px solid var(--jira-dark-border);
      border-bottom: 1px solid var(--jira-dark-border);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .checklist-toggle-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .checklist-toggle-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--jira-dark-text-primary);
    }

    /* Shadcn-style Switch */
    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }

    .switch-input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .switch-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--jira-dark-border);
      transition: 0.3s;
      border-radius: 24px;
      border: 2px solid transparent;
    }

    .switch-slider:hover {
      background-color: var(--jira-dark-surface-hover);
    }

    .switch-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .switch-input:checked + .switch-slider {
      background-color: var(--jira-blue-500);
    }

    .switch-input:checked + .switch-slider:before {
      transform: translateX(20px);
    }

    .switch-input:focus + .switch-slider {
      box-shadow: 0 0 0 2px var(--jira-blue-400);
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.on-progress {
      background: var(--jira-orange-500);
      color: white;
    }

    .status-badge.completed {
      background: var(--jira-green-500);
      color: white;
    }

    .guide-button {
      background: var(--jira-blue-500);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .guide-button:hover {
      background: var(--jira-blue-600);
      transform: translateY(-1px);
    }

    /* Guide Sidebar */
    .guide-sidebar {
      display: none;
    }

    .guide-header {
      padding: 24px 32px;
      border-bottom: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-surface);
      border-radius: 12px 12px 0 0;
    }

    .guide-header-top {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .guide-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: var(--jira-green-500);
      margin-right: 16px;
    }

    .guide-title h3 {
      font-size: 20px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 4px;
    }

    .guide-title p {
      font-size: 14px;
      color: var(--jira-dark-text-secondary);
    }

    .guide-close {
      margin-left: auto;
      width: 32px;
      height: 32px;
      border: none;
      background: var(--jira-dark-surface-hover);
      color: var(--jira-dark-text-secondary);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .guide-close:hover {
      background: var(--jira-dark-border);
      color: var(--jira-dark-text-primary);
    }

    .guide-body {
      padding: 32px;
    }

    .guide-overview {
      background: var(--jira-dark-bg);
      border: 1px solid var(--jira-dark-border);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }

    .guide-overview h4 {
      font-size: 14px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 8px;
    }

    .guide-overview p {
      font-size: 13px;
      color: var(--jira-dark-text-secondary);
      line-height: 1.5;
    }

    .guide-section {
      margin-bottom: 24px;
    }

    .guide-section h4 {
      font-size: 14px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .guide-steps {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .guide-step {
      padding: 12px 0;
      font-size: 13px;
      color: var(--jira-dark-text-primary);
      line-height: 1.5;
      border-bottom: 1px solid var(--jira-dark-border);
    }

    .guide-step:last-child {
      border-bottom: none;
    }

    .guide-tips {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .guide-tip {
      padding: 10px 0;
      font-size: 12px;
      color: var(--jira-dark-text-secondary);
      line-height: 1.5;
      border-bottom: 1px solid var(--jira-dark-border);
      position: relative;
      padding-left: 16px;
    }

    .guide-tip:last-child {
      border-bottom: none;
    }

    .guide-tip:before {
      content: "•";
      color: var(--jira-blue-500);
      font-weight: bold;
      position: absolute;
      left: 0;
    }

    .materials-grid {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .material-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--jira-dark-border);
      transition: all 0.2s ease;
    }

    .material-card:last-child {
      border-bottom: none;
    }

    .material-card:hover {
      background: var(--jira-dark-surface-hover);
      margin: 0 -16px;
      padding: 12px 16px;
      border-radius: 6px;
    }

    .material-card.checklist-mode {
      padding: 8px 0;
    }

    .material-card.checklist-mode:hover {
      margin: 0 -12px;
      padding: 8px 12px;
    }

    .material-checkbox-container {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .material-checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid var(--jira-dark-border);
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .material-checkbox:hover {
      border-color: var(--jira-blue-500);
    }

    .material-checkbox.checked {
      background: var(--jira-green-500);
      border-color: var(--jira-green-500);
    }

    .material-checkbox.checked::after {
      content: "✓";
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    .material-name.checked {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .material-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .material-name {
      font-weight: 500;
      color: var(--jira-dark-text-primary);
      font-size: 14px;
    }

    .material-quantity {
      background: var(--jira-blue-500);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .material-location {
      display: none;
    }

    .skill-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      border: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-bg);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 48px);
      color: var(--jira-dark-text-muted);
      text-align: center;
      padding: 32px;
      width: 100%;
      max-width: 600px;
      background: var(--jira-dark-surface);
      border-radius: 12px;
      border: 1px solid var(--jira-dark-border);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .empty-state-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .empty-state h3 {
      font-size: 18px;
      margin-bottom: 8px;
      color: var(--jira-dark-text-secondary);
    }

    .empty-state p {
      font-size: 14px;
      max-width: 300px;
    }

    @media (max-width: 768px) {
      .app-container {
        flex-direction: column;
        padding: 16px;
        gap: 16px;
        height: 100vh;
      }
      
      .sidebar {
        width: 100%;
        height: 300px;
        max-height: 300px;
        min-height: 300px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      
      .sidebar-header {
        flex-shrink: 0;
        padding: 16px 20px;
      }

      .sidebar-footer {
        flex-shrink: 0;
        padding: 12px 20px;
      }
      
      .skills-list {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 0;
        padding: 8px 0;
        -webkit-overflow-scrolling: touch;
      }
      
      .skill-item {
        padding: 10px 20px;
        margin: 1px 0;
      }

      .version-info {
        gap: 6px;
      }

      .version-badge,
      .dev-badge {
        font-size: 9px;
        padding: 1px 4px;
      }
      
      .detail-panel {
        padding: 0;
        flex: 1;
        min-height: 0;
      }
      
      .detail-content {
        max-width: none;
        width: 100%;
        height: calc(100vh - 300px - 48px);
      }
      
      .detail-body {
        padding: 24px;
      }
      
      .detail-header {
        padding: 20px 24px;
      }
      
      .empty-state {
        height: calc(100vh - 300px - 48px);
      }
    }

    @media (max-width: 1024px) {
      .detail-content {
        max-width: 700px;
      }
      
      .app-container {
        padding: 20px;
        gap: 20px;
      }
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // Skills data will be injected here
    const skillsData = SKILLS_DATA_PLACEHOLDER;

    const { useState, useEffect } = React;

    // Cookie utility functions
    const setCookie = (name, value, days = 30) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = \`\${name}=\${encodeURIComponent(JSON.stringify(value))};expires=\${expires.toUTCString()};path=/\`;
    };

    const getCookie = (name) => {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          try {
            return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
          } catch (e) {
            return null;
          }
        }
      }
      return null;
    };

    // Calculate time until next Monday 05:00 AM GMT+7
    const getNextResetTime = () => {
      const now = new Date();
      const gmt7Offset = 7 * 60; // GMT+7 in minutes
      const localOffset = now.getTimezoneOffset(); // Local timezone offset in minutes
      const gmt7Now = new Date(now.getTime() + (gmt7Offset + localOffset) * 60 * 1000);
      
      // Find next Monday 05:00 AM GMT+7
      const nextReset = new Date(gmt7Now);
      const daysUntilMonday = (1 - gmt7Now.getDay() + 7) % 7; // 0 = Sunday, 1 = Monday
      
      if (daysUntilMonday === 0 && gmt7Now.getHours() < 5) {
        // It's Monday but before 5 AM, reset is today
        nextReset.setHours(5, 0, 0, 0);
      } else {
        // Reset is next Monday
        nextReset.setDate(gmt7Now.getDate() + (daysUntilMonday === 0 ? 7 : daysUntilMonday));
        nextReset.setHours(5, 0, 0, 0);
      }
      
      return nextReset;
    };

    // Check if cookies should be reset (past Monday 5 AM GMT+7)
    const shouldResetCookies = () => {
      const now = new Date();
      const gmt7Offset = 7 * 60;
      const localOffset = now.getTimezoneOffset();
      const gmt7Now = new Date(now.getTime() + (gmt7Offset + localOffset) * 60 * 1000);
      
      // Get last reset time from cookie
      const lastReset = getCookie('lastResetTime');
      if (!lastReset) return true; // First time, should reset
      
      const lastResetDate = new Date(lastReset);
      
      // Find the most recent Monday 5 AM GMT+7
      const currentMonday = new Date(gmt7Now);
      const daysSinceMonday = (gmt7Now.getDay() + 6) % 7; // 0 = Monday, 6 = Sunday
      
      if (daysSinceMonday === 0 && gmt7Now.getHours() >= 5) {
        // It's Monday after 5 AM
        currentMonday.setHours(5, 0, 0, 0);
      } else if (daysSinceMonday === 0) {
        // It's Monday before 5 AM, use last Monday
        currentMonday.setDate(gmt7Now.getDate() - 7);
        currentMonday.setHours(5, 0, 0, 0);
      } else {
        // Use the most recent Monday
        currentMonday.setDate(gmt7Now.getDate() - daysSinceMonday);
        currentMonday.setHours(5, 0, 0, 0);
      }
      
      return lastResetDate < currentMonday;
    };

    // Reset cookies and set new reset time
    const resetWeeklyCookies = () => {
      // Clear checklist data
      document.cookie = 'checklistMode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'checkedItems=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Set new reset time
      const now = new Date();
      const gmt7Offset = 7 * 60;
      const localOffset = now.getTimezoneOffset();
      const gmt7Now = new Date(now.getTime() + (gmt7Offset + localOffset) * 60 * 1000);
      setCookie('lastResetTime', gmt7Now.toISOString(), 365); // Store for 1 year
    };

    const formatCountdown = (timeLeft) => {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      
      if (days > 0) {
        return \`\${days}h \${hours}j \${minutes}m \${seconds}s\`;
      } else if (hours > 0) {
        return \`\${hours}j \${minutes}m \${seconds}s\`;
      } else {
        return \`\${minutes}m \${seconds}s\`;
      }
    };

    function WeeklyMaterials() {
      const [selectedSkill, setSelectedSkill] = useState(null);
      const [showGuide, setShowGuide] = useState(false);
      const [guideSkill, setGuideSkill] = useState(null);
      const [checklistMode, setChecklistMode] = useState({});
      const [checkedItems, setCheckedItems] = useState({});
      const [countdown, setCountdown] = useState('');

      // Update countdown every second
      useEffect(() => {
        const updateCountdown = () => {
          const now = new Date();
          const gmt7Offset = 7 * 60;
          const localOffset = now.getTimezoneOffset();
          const gmt7Now = new Date(now.getTime() + (gmt7Offset + localOffset) * 60 * 1000);
          const nextReset = getNextResetTime();
          const timeLeft = nextReset.getTime() - gmt7Now.getTime();
          
          if (timeLeft > 0) {
            setCountdown(formatCountdown(timeLeft));
          } else {
            setCountdown('Reset sekarang!');
          }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000); // Update every second

        return () => clearInterval(interval);
      }, []);

      // Load data from cookies on component mount
      useEffect(() => {
        // Check if cookies should be reset first
        if (shouldResetCookies()) {
          resetWeeklyCookies();
          setChecklistMode({});
          setCheckedItems({});
        } else {
          const savedChecklistMode = getCookie('checklistMode') || {};
          const savedCheckedItems = getCookie('checkedItems') || {};
          setChecklistMode(savedChecklistMode);
          setCheckedItems(savedCheckedItems);
        }
      }, []);

      // Save to cookies whenever state changes
      useEffect(() => {
        setCookie('checklistMode', checklistMode);
      }, [checklistMode]);

      useEffect(() => {
        setCookie('checkedItems', checkedItems);
      }, [checkedItems]);

      const selectSkill = (skillKey) => {
        setSelectedSkill(skillKey);
        // Close guide when switching skills
        setShowGuide(false);
        setGuideSkill(null);
      };

      const closeDetail = () => {
        setSelectedSkill(null);
      };

      const openGuide = (skillKey) => {
        setGuideSkill(skillKey);
        setShowGuide(true);
      };

      const closeGuide = () => {
        setShowGuide(false);
        setGuideSkill(null);
      };

      const toggleChecklistMode = (skillKey) => {
        setChecklistMode(prev => ({
          ...prev,
          [skillKey]: !prev[skillKey]
        }));
      };

      const toggleMaterialCheck = (skillKey, materialIndex) => {
        const key = \`\${skillKey}_\${materialIndex}\`;
        setCheckedItems(prev => ({
          ...prev,
          [key]: !prev[key]
        }));
      };

      const getSkillStatus = (skillKey) => {
        if (!checklistMode[skillKey]) return null;
        
        const materials = skillsData[skillKey].materials;
        const checkedCount = materials.filter((_, index) => 
          checkedItems[\`\${skillKey}_\${index}\`]
        ).length;
        
        return checkedCount === materials.length ? 'completed' : 'on-progress';
      };

      const getStatusText = (status) => {
        switch (status) {
          case 'completed': return 'Selesai';
          case 'on-progress': return 'On Progress';
          default: return '';
        }
      };

      return (
        <div className={\`app-container \${showGuide ? 'guide-open' : ''}\`}>
          {/* Left Sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <h1>📋 Material Quest Mingguan</h1>
              <p>Pilih life skill untuk melihat material yang dibutuhkan dan lokasinya. Quest memberikan 7200 XP per skill.</p>
              <div className="reset-timer">
                <span className="reset-timer-icon">⏰</span>
                <span>Waktu Reset<span className="pulsating-colon">:</span> {countdown}</span>
              </div>
            </div>
            
            <div className="skills-list">
              {Object.entries(skillsData).map(([key, skill]) => (
                <div 
                  key={key}
                  className={\`skill-item \${selectedSkill === key ? 'active' : ''}\`}
                  onClick={() => selectSkill(key)}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-info">
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-footer">
              <div className="version-info">
                <span className="version-badge">v0.14.3</span>
                <span className="dev-badge">Still in Development</span>
              </div>
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="detail-panel">
            {selectedSkill ? (
              <div className={\`detail-content \${selectedSkill ? 'visible' : ''}\`}>
                <div className="detail-header">
                  <div className="detail-header-top">
                    <div className="detail-icon">
                      {skillsData[selectedSkill].icon}
                    </div>
                    <div className="detail-title">
                      <h2>{skillsData[selectedSkill].title}</h2>
                      <p>{skillsData[selectedSkill].description}</p>
                    </div>
                    <button className="close-button" onClick={closeDetail}>
                      ✕
                    </button>
                  </div>
                </div>

                <div className="detail-body">
                  <div className="materials-section">
                    <h3 className="section-title">
                      <div className="section-title-left">
                        📦 Material yang Dibutuhkan
                        {getSkillStatus(selectedSkill) && (
                          <div className={\`status-badge \${getSkillStatus(selectedSkill)}\`}>
                            {getStatusText(getSkillStatus(selectedSkill))}
                          </div>
                        )}
                      </div>
                      <button 
                        className="guide-button"
                        onClick={() => openGuide(selectedSkill)}
                      >
                        📖 Cara Mendapatkan
                      </button>
                    </h3>
                    
                    <div className="checklist-controls">
                      <div className="checklist-toggle-container">
                        <label className="checklist-toggle-label">Aktifkan Checklist</label>
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            className="switch-input"
                            checked={checklistMode[selectedSkill] || false}
                            onChange={() => toggleChecklistMode(selectedSkill)}
                          />
                          <span className="switch-slider"></span>
                        </label>
                      </div>
                    </div>

                    <div className="materials-grid">
                      {skillsData[selectedSkill].materials.map((material, index) => (
                        <div 
                          key={index} 
                          className={\`material-card \${checklistMode[selectedSkill] ? 'checklist-mode' : ''}\`}
                        >
                          {checklistMode[selectedSkill] ? (
                            <div className="material-checkbox-container">
                              <div 
                                className={\`material-checkbox \${checkedItems[\`\${selectedSkill}_\${index}\`] ? 'checked' : ''}\`}
                                onClick={() => toggleMaterialCheck(selectedSkill, index)}
                              ></div>
                              <div className="material-header">
                                <div className={\`material-name \${checkedItems[\`\${selectedSkill}_\${index}\`] ? 'checked' : ''}\`}>
                                  {material.name}
                                </div>
                                <div className="material-quantity">x{material.quantity}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="material-header">
                              <div className="material-name">{material.name}</div>
                              <div className="material-quantity">x{material.quantity}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="materials-section">
                    <h3 className="section-title">
                      🖼️ Gambar Referensi
                    </h3>
                    <img 
                      src={skillsData[selectedSkill].image} 
                      alt={\`\${skillsData[selectedSkill].title} materials\`}
                      className="skill-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h3>Pilih Life Skill</h3>
                <p>Pilih life skill dari sidebar kiri untuk melihat detail material yang dibutuhkan dan lokasinya.</p>
              </div>
            )}
          </div>

          {/* Guide Panel - Beside Detail Panel */}
          <div className="guide-panel">
            {guideSkill && (
              <div className={\`guide-content-card \${showGuide ? 'visible' : ''}\`}>
                <div className="guide-header">
                  <div className="guide-header-top">
                    <div className="guide-icon">
                      📖
                    </div>
                    <div className="guide-title">
                      <h3>Cara Mendapatkan</h3>
                      <p>Panduan mendapatkan {skillsData[guideSkill].title}</p>
                    </div>
                    <button className="guide-close" onClick={closeGuide}>
                      ✕
                    </button>
                  </div>
                </div>

                <div className="guide-body">
                  <div className="guide-overview">
                    <h4>📝 Ringkasan</h4>
                    <p>{skillsData[guideSkill].guide.overview}</p>
                  </div>

                  <div className="guide-section">
                    <h4>🔧 Langkah-langkah Proses</h4>
                    <ul className="guide-steps">
                      {skillsData[guideSkill].guide.steps.map((step, index) => (
                        <li key={index} className="guide-step">{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="guide-section">
                    <h4>🛒 Cara Lain</h4>
                    <ul className="guide-tips">
                      {skillsData[guideSkill].guide.tips.map((tip, index) => (
                        <li key={index} className="guide-tip">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    ReactDOM.render(<WeeklyMaterials />, document.getElementById('root'));
  </script>
</body>
</html>`;
}