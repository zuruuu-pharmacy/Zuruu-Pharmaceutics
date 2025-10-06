# Industry Dashboard - Microcopy Pack

## Overview
This document contains all microcopy, tooltips, error messages, and ARIA text for the Industry Dashboard feature. All text is ready to paste into the application.

## Page Headers & Titles

### Main Header
- **Title**: "Industry Dashboard"
- **Subtitle**: "Predictive supply chain & automated restock"
- **Description**: "From factory floor to pharmacy shelf: forecast, trace, and fulfill with AI accuracy"

### Tab Headers
- **Forecast Tab**: "Demand Forecast"
- **Analytics Tab**: "SKU & Batch Analytics"
- **Restock Tab**: "Auto Restock Workflow"
- **Integrations Tab**: "Integrations & Export"

## KPI Tiles

### Predicted Stockouts
- **Title**: "Predicted Stockouts (7d)"
- **Value**: "{number} SKUs at risk"
- **Description**: "Based on current demand patterns"
- **Tooltip**: "Number of SKUs predicted to run out of stock within 7 days based on current demand patterns and lead times"

### Average Lead Time
- **Title**: "Avg Lead Time"
- **Value**: "{number} days"
- **Description**: "Across all suppliers"
- **Tooltip**: "Average time from order placement to delivery across all suppliers and SKUs"

### Batch Traceability
- **Title**: "Batch Traceability"
- **Value**: "{number}% coverage"
- **Description**: "End-to-end visibility"
- **Tooltip**: "Percentage of batches with complete traceability from origin to retail location"

## Forecast Tab

### Controls
- **Export Button**: "Export CSV"
- **Settings Button**: "Settings"
- **Chart Placeholder**: "Interactive forecast chart"
- **Chart Description**: "Historical 180d + forecast bands"
- **Scenario Label**: "Scenario:"
- **Scenario Buttons**: "7d", "30d", "90d"

### Tooltips
- **Export CSV**: "Download forecast data as CSV file"
- **Settings**: "Configure forecast parameters and display options"
- **7d Scenario**: "Show 7-day forecast with high detail"
- **30d Scenario**: "Show 30-day forecast with medium detail"
- **90d Scenario**: "Show 90-day forecast with low detail"

## SKU Analytics Tab

### Search & Filter
- **Search Placeholder**: "Search SKUs..."
- **Filter Button**: "Filter"
- **Search Tooltip**: "Search by SKU ID or product name"

### Table Headers
- **SKU ID**: "SKU ID"
- **Name**: "Name"
- **Stock**: "Stock"
- **Stockout Days**: "Stockout (days)"
- **Lead Time**: "Lead Time"
- **Traceability**: "Trace %"
- **Status**: "Status"
- **Actions**: "Actions"

### Table Actions
- **Timeline Button**: "Timeline"
- **Timeline Tooltip**: "View batch movement timeline for this SKU"

### Timeline Modal
- **Title**: "Batch Timeline: {SKU_ID}"
- **Close Button**: "×"
- **Timeline Nodes**: "Factory A", "Port", "Warehouse Z", "Retail"
- **Timeline Description**: "Showing batch movement from origin to retail location"

### Status Badges
- **OK Status**: "Normal"
- **Low Stock Status**: "Low Stock"
- **Recall Status**: "Recall"
- **Unknown Status**: "Unknown"

### Status Tooltips
- **OK**: "Stock levels are within normal range"
- **Low Stock**: "Stock levels are below recommended minimum"
- **Recall**: "This batch has been flagged for recall"

## Auto Restock Tab

### Workflow Steps
- **Step 1 Title**: "Step 1: Select SKUs"
- **Step 2 Title**: "Step 2: Recommended Quantities"
- **Step 3 Title**: "Step 3: Preview Purchase Order"

### SKU Selection
- **Checkbox Label**: "Select SKU for restock"
- **Stock Info**: "Current: {number} | Stockout: {number}d"
- **Selection Tooltip**: "Click to select this SKU for restock"

### Recommended Quantities
- **Quantity Label**: "Recommended: {number} units"
- **Cost Label**: "Estimated cost"
- **Cost Value**: "${amount}"
- **Quantity Tooltip**: "AI-recommended quantity based on demand forecast and lead time"

### Purchase Order Preview
- **Supplier Label**: "Supplier"
- **ETA Label**: "ETA"
- **Quantity Label**: "Total Quantity"
- **Cost Label**: "Total Cost"
- **Auto-approve Label**: "Auto-approve"
- **Queue Restock Label**: "Queue restock"

### Action Buttons
- **Queue Restock Button**: "Queue Restock"
- **Clear Selection Button**: "Clear Selection"
- **Queue Tooltip**: "Add selected SKUs to restock queue"
- **Clear Tooltip**: "Remove all selected SKUs"

### Simulation Mode
- **Badge Text**: "Simulation Mode"
- **Simulation Tooltip**: "This is a simulation - no real orders will be placed"

## Integrations Tab

### Integration Cards
- **SAP Status**: "Connected"
- **Oracle Status**: "Available"
- **Microsoft Dynamics Status**: "Available"
- **Custom API Status**: "Available"

### Action Buttons
- **Connect Button**: "Connect to ERP"
- **API Sample Button**: "Request API Sample"
- **Download CSV Button**: "Download Sample CSV"

### Button Tooltips
- **Connect ERP**: "Establish connection to your ERP system"
- **API Sample**: "Get sample API documentation and code"
- **Download CSV**: "Download sample data in CSV format"

## Toast Notifications

### Success Messages
- **Restock Queued**: "Restock queued for {number} SKUs"
- **Queue Cleared**: "Restock queue cleared"
- **CSV Downloaded**: "Sample CSV downloaded successfully"

### Action Buttons
- **Undo Button**: "Undo"
- **Close Button**: "×"
- **Undo Tooltip**: "Reverse the last action"
- **Close Tooltip**: "Dismiss notification"

### Toast Timing
- **Success Toast**: "Auto-dismisses after 8 seconds"
- **Undo Toast**: "Auto-dismisses after 3 seconds"

## Error Messages

### General Errors
- **Network Error**: "Unable to connect. Please check your internet connection and try again."
- **Server Error**: "Something went wrong on our end. Please try again later."
- **Validation Error**: "Please check your input and try again."

### Form Errors
- **Required Field**: "This field is required"
- **Invalid Format**: "Please enter a valid format"
- **Selection Required**: "Please select at least one item"

### Action Errors
- **No Selection**: "Please select SKUs before proceeding"
- **Export Failed**: "Failed to export data. Please try again."
- **Save Failed**: "Failed to save changes. Please try again."

## Loading States

### General Loading
- **Loading Text**: "Loading..."
- **Processing Text**: "Processing..."
- **Saving Text**: "Saving..."

### Specific Actions
- **Exporting**: "Exporting CSV..."
- **Connecting**: "Connecting to ERP..."
- **Queuing**: "Adding to restock queue..."

## Accessibility Text

### ARIA Labels
- **Main Content**: "Industry Dashboard main content"
- **KPI Section**: "Key performance indicators"
- **Forecast Chart**: "Demand forecast chart"
- **SKU Table**: "SKU analytics table"
- **Restock Form**: "Auto restock workflow form"
- **Integrations Grid**: "Integration options"

### Screen Reader Announcements
- **KPI Update**: "Predicted stockouts: {number}"
- **Tab Change**: "Switched to {tab name} tab"
- **Selection Change**: "{number} SKUs selected"
- **Action Complete**: "Restock queued successfully"
- **Error Occurred**: "Error: {error message}"

### Focus Management
- **Tab Focus**: "Use Tab to navigate, Enter to activate"
- **Modal Focus**: "Modal opened, focus trapped"
- **Table Navigation**: "Use arrow keys to navigate table rows"

## Help Text

### General Help
- **Dashboard Overview**: "This dashboard provides predictive supply chain management tools for pharmaceutical operations."
- **Getting Started**: "Start by exploring the different tabs to understand available features."

### Feature Help
- **Forecast Help**: "View demand forecasts and export data for analysis."
- **Analytics Help**: "Search and analyze SKU data with batch traceability information."
- **Restock Help**: "Select SKUs and queue them for automated restocking."
- **Integrations Help**: "Connect to external systems and download sample data."

### Tool Help
- **Search Help**: "Type SKU ID or product name to filter results"
- **Filter Help**: "Use filters to narrow down results by status or other criteria"
- **Export Help**: "Download data in CSV format for external analysis"

## Legal & Compliance

### Data Usage
- **Data Notice**: "All data is for demonstration purposes only"
- **Privacy Notice**: "No personal data is collected or stored"
- **Simulation Notice**: "This is a simulation environment - no real transactions occur"

### Terms
- **Terms Link**: "Terms of Service"
- **Privacy Link**: "Privacy Policy"
- **Support Link**: "Support"

## Success Messages

### Action Confirmations
- **Restock Queued**: "Successfully queued {number} SKUs for restock"
- **CSV Exported**: "CSV file downloaded successfully"
- **Settings Saved**: "Settings saved successfully"
- **Connection Established**: "Successfully connected to {system}"

### Status Updates
- **Status Changed**: "Status updated to {new status}"
- **Selection Updated**: "Selection updated: {number} items selected"
- **Filter Applied**: "Filter applied: {filter description}"

## Empty States

### No Data
- **No SKUs**: "No SKUs match your search criteria"
- **No Results**: "No results found. Try adjusting your filters"
- **No Selection**: "No SKUs selected for restock"

### Loading States
- **Loading Data**: "Loading data..."
- **Loading Chart**: "Generating forecast chart..."
- **Loading Table**: "Loading SKU data..."

## Confirmation Dialogs

### Destructive Actions
- **Clear Selection**: "Are you sure you want to clear all selections?"
- **Cancel Restock**: "Are you sure you want to cancel the restock queue?"
- **Reset Settings**: "Are you sure you want to reset all settings?"

### Action Confirmations
- **Queue Restock**: "Queue {number} SKUs for restock?"
- **Export Data**: "Export {number} records to CSV?"
- **Connect System**: "Connect to {system name}?"

## Button States

### Enabled States
- **Primary Button**: "Ready to proceed"
- **Secondary Button**: "Alternative action available"
- **Danger Button**: "Destructive action available"

### Disabled States
- **No Selection**: "Select items to proceed"
- **Loading**: "Please wait..."
- **Error**: "Action unavailable"

## Form Validation

### Real-time Validation
- **Valid Input**: "✓ Valid"
- **Invalid Input**: "✗ Invalid format"
- **Required Field**: "✗ Required field"

### Submission Validation
- **Form Valid**: "All fields are valid"
- **Form Invalid**: "Please fix errors before submitting"
- **Submission Error**: "Submission failed - please try again"

---

## Usage Notes

1. **Consistency**: All microcopy follows the same tone and style
2. **Accessibility**: All text is screen reader friendly
3. **Localization**: Text is ready for translation
4. **Updates**: This document should be updated when microcopy changes
5. **Testing**: All text should be tested with actual users

## Version History

- **v1.0**: Initial microcopy pack
- **v1.1**: Added accessibility text
- **v1.2**: Added error messages and help text
