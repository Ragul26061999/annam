# HMS Annam Theme Guide

## Complete UI/UX Theme Documentation for Replication

This comprehensive guide captures all visual elements, color schemes, component patterns, and design principles from the HMS Annam Hospital Management System to enable seamless theme replication in other projects.

---

## 🎨 Color Palette

### Primary Colors

#### Orange Theme (Primary Brand Color)
```css
/* Orange Gradients */
background: linear-gradient(135deg, #FF7A00 0%, #FF9500 100%);
/* Orange variants */
bg-orange-50: #fff7ed
bg-orange-100: #ffedd5
bg-orange-500: #f97316
bg-orange-600: #ea580c
text-orange-600: #ea580c
border-orange-200: #fed7aa
```

#### Medical Blue (Secondary)
```css
/* Medical Blue Variants */
bg-blue-50: #f0f9ff
bg-blue-100: #e0f2fe
bg-blue-500: #0ea5e9
bg-blue-600: #0284c7
text-blue-600: #0284c7
border-blue-200: #bae6fd
```

#### Success Green
```css
/* Success States */
bg-green-50: #f0fdf4
bg-green-100: #dcfce7
bg-green-500: #22c55e
bg-green-600: #16a34a
text-green-600: #16a34a
text-green-700: #15803d
text-green-900: #14532d
border-green-200: #bbf7d0
border-green-300: #86efac
```

#### Warning Orange
```css
/* Warning States */
bg-warning-50: #fff7ed
bg-warning-100: #ffedd5
bg-warning-500: #f97316
bg-warning-600: #ea580c
text-warning-600: #ea580c
```

#### Danger Red
```css
/* Error/Danger States */
bg-red-50: #fef2f2
bg-red-100: #fee2e2
bg-red-500: #ef4444
bg-red-600: #dc2626
text-red-600: #dc2626
```

#### Gray Scale
```css
/* Neutral Grays */
bg-gray-50: #f9fafb
bg-gray-100: #f3f4f6
bg-gray-200: #e5e7eb
bg-gray-300: #d1d5db
bg-gray-400: #9ca3af
bg-gray-500: #6b7280
bg-gray-600: #4b5563
bg-gray-700: #374151
bg-gray-800: #1f2937
bg-gray-900: #111827
text-gray-500: #6b7280
text-gray-600: #4b5563
text-gray-700: #374151
text-gray-900: #111827
```

### Hospital-Specific Colors
```css
/* Hospital Department Colors */
bg-hospital-50: #f8fafc
bg-hospital-100: #f1f5f9
bg-hospital-200: #e2e8f0
bg-hospital-300: #cbd5e1
bg-hospital-400: #94a3b8
bg-hospital-500: #64748b
bg-hospital-600: #475569
bg-hospital-700: #334155
bg-hospital-800: #1e293b
bg-hospital-900: #0f172a
```

### Medical Theme Colors
```css
/* Medical Specialty Colors */
bg-medical-50: #f0fdfa
bg-medical-100: #ccfbf1
bg-medical-200: #99f6e4
bg-medical-300: #5eead4
bg-medical-400: #2dd4bf
bg-medical-500: #14b8a6
bg-medical-600: #0d9488
bg-medical-700: #0f766e
bg-medical-800: #115e59
bg-medical-900: #134e4a
```

---

## 🎯 Design System

### Typography

#### Font Hierarchy
```css
/* Headings */
h1: text-3xl font-bold text-gray-900
h2: text-2xl font-semibold text-gray-900
h3: text-lg font-semibold text-gray-900
h4: text-base font-semibold text-gray-900

/* Body Text */
body: text-sm text-gray-600
small: text-xs text-gray-500

/* Special Text */
font-mono: font-mono (for codes, UHID, etc.)
tracking-wider: tracking-wider (for important codes)
```

#### Text Colors by Context
```css
/* Primary Text */
text-primary: text-gray-900

/* Secondary Text */
text-secondary: text-gray-600

/* Muted Text */
text-muted: text-gray-500

/* Success Text */
text-success: text-green-700

/* Warning Text */
text-warning: text-orange-700

/* Error Text */
text-error: text-red-700
```

### Spacing System
```css
/* Consistent Spacing */
space-1: 0.25rem (4px)
space-2: 0.5rem (8px)
space-3: 0.75rem (12px)
space-4: 1rem (16px)
space-5: 1.25rem (20px)
space-6: 1.5rem (24px)
space-8: 2rem (32px)
space-10: 2.5rem (40px)
space-12: 3rem (48px)
```

### Border Radius
```css
/* Rounded Corners */
rounded-sm: 0.125rem (2px)
rounded: 0.25rem (4px)
rounded-md: 0.375rem (6px)
rounded-lg: 0.625rem (10px)
rounded-xl: 0.75rem (12px)
rounded-2xl: 1rem (16px)
rounded-full: 9999px (circle)
```

### Shadows
```css
/* Elevation System */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

---

## 🧩 Component Patterns

### Form Components

#### Input Fields
```css
/* Standard Input */
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg 
         focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
         text-gray-900 placeholder-gray-500;
}

/* Input with Icon */
.input-with-icon {
  @apply input-field pl-10;
}

/* Select Dropdown */
.select-field {
  @apply input-field;
}

/* Textarea */
.textarea-field {
  @apply input-field resize-none;
}
```

#### Form Labels
```css
/* Standard Label */
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

/* Optional Field Label */
.form-label-optional {
  @apply form-label;
}

.form-label-optional span {
  @apply text-gray-400;
}
```

#### Form Sections
```css
/* Section Header */
.form-section-header {
  @apply flex items-center gap-3 mb-6;
}

.form-section-icon {
  @apply p-2 bg-orange-100 rounded-lg;
}

.form-section-title {
  @apply text-lg font-semibold text-gray-900;
}

.form-section-subtitle {
  @apply text-sm text-gray-500;
}
```

### Button System

#### Primary Button
```css
.btn-primary {
  @apply bg-orange-600 text-white px-4 py-2 rounded-lg 
         hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 
         focus:ring-offset-2 transition-colors duration-200;
}
```

#### Secondary Button
```css
.btn-secondary {
  @apply bg-gray-200 text-gray-900 px-4 py-2 rounded-lg 
         hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 
         focus:ring-offset-2 transition-colors duration-200;
}
```

#### Success Button
```css
.btn-success {
  @apply bg-green-600 text-white px-4 py-2 rounded-lg 
         hover:bg-green-700 focus:ring-2 focus:ring-green-500 
         focus:ring-offset-2 transition-colors duration-200;
}
```

#### Danger Button
```css
.btn-danger {
  @apply bg-red-600 text-white px-4 py-2 rounded-lg 
         hover:bg-red-700 focus:ring-2 focus:ring-red-500 
         focus:ring-offset-2 transition-colors duration-200;
}
```

#### Icon Button
```css
.btn-icon {
  @apply p-2 rounded-lg transition-colors duration-200;
}

.btn-icon-primary {
  @apply btn-icon bg-orange-100 text-orange-600 hover:bg-orange-200;
}

.btn-icon-secondary {
  @apply btn-icon bg-gray-100 text-gray-600 hover:bg-gray-200;
}
```

### Card Components

#### Standard Card
```css
.card {
  @apply bg-white rounded-lg shadow-md border border-gray-200;
}

.card-header {
  @apply px-6 py-4 border-b border-gray-200;
}

.card-body {
  @apply px-6 py-4;
}

.card-footer {
  @apply px-6 py-4 border-t border-gray-200 bg-gray-50;
}
```

#### Colored Info Cards
```css
/* Success Card */
.card-success {
  @apply bg-green-50 border-green-200;
}

.card-success .card-header {
  @apply border-green-200;
}

/* Warning Card */
.card-warning {
  @apply bg-orange-50 border-orange-200;
}

/* Error Card */
.card-error {
  @apply bg-red-50 border-red-200;
}

/* Info Card */
.card-info {
  @apply bg-blue-50 border-blue-200;
}
```

### Modal Components

#### Modal Container
```css
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.modal-content {
  @apply bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-y-auto;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.modal-body {
  @apply p-6;
}

.modal-footer {
  @apply flex justify-end gap-3 p-6 border-t border-gray-200;
}
```

### Badge Components

#### Status Badges
```css
.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.badge-success {
  @apply bg-green-100 text-green-800;
}

.badge-warning {
  @apply bg-orange-100 text-orange-800;
}

.badge-error {
  @apply bg-red-100 text-red-800;
}

.badge-info {
  @apply bg-blue-100 text-blue-800;
}

.badge-gray {
  @apply bg-gray-100 text-gray-800;
}
```

### Alert Components

#### Alert Boxes
```css
.alert {
  @apply p-4 rounded-lg border;
}

.alert-success {
  @apply bg-green-50 border-green-200 text-green-800;
}

.alert-warning {
  @apply bg-orange-50 border-orange-200 text-orange-800;
}

.alert-error {
  @apply bg-red-50 border-red-200 text-red-800;
}

.alert-info {
  @apply bg-blue-50 border-blue-200 text-blue-800;
}

.alert-icon {
  @apply flex items-center gap-3;
}
```

---

## 📱 Layout Patterns

### Grid Systems

#### Two Column Layout
```css
.grid-2-col {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.grid-2-col-lg {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}
```

#### Three Column Layout
```css
.grid-3-col {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}
```

#### Responsive Grid
```css
.grid-responsive {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4;
}
```

### Container Patterns

#### Page Container
```css
.page-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.page-header {
  @apply mb-8;
}

.page-title {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.page-subtitle {
  @apply text-gray-600;
}
```

#### Content Container
```css
.content-container {
  @apply bg-white rounded-lg shadow-md border border-gray-200 p-6;
}
```

### Navigation Patterns

#### Sidebar Navigation
```css
.sidebar {
  @apply bg-white border-r border-gray-200 w-64 min-h-screen;
}

.sidebar-item {
  @apply flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 
         hover:text-gray-900 transition-colors duration-200;
}

.sidebar-item.active {
  @apply bg-orange-50 text-orange-700 border-r-2 border-orange-600;
}
```

#### Top Navigation
```css
.top-nav {
  @apply bg-white border-b border-gray-200 px-4 py-3;
}

.top-nav-content {
  @apply flex items-center justify-between;
}
```

---

## 🎨 Special UI Elements

### Step Indicators

#### Wizard Steps
```css
.step-indicator {
  @apply flex items-center justify-center w-8 h-8 rounded-full border-2 
         font-semibold text-sm;
}

.step-active {
  @apply bg-orange-600 border-orange-600 text-white;
}

.step-completed {
  @apply bg-green-600 border-green-600 text-white;
}

.step-inactive {
  @apply bg-gray-200 border-gray-300 text-gray-600;
}

.step-connector {
  @apply flex-1 h-0.5 bg-gray-300;
}

.step-connector.completed {
  @apply bg-green-600;
}
```

### Progress Bars

#### Progress Indicator
```css
.progress-bar {
  @apply w-full bg-gray-200 rounded-full h-2;
}

.progress-fill {
  @apply bg-orange-600 h-2 rounded-full transition-all duration-300;
}
```

### Loading States

#### Spinner
```css
.spinner {
  @apply animate-spin rounded-full border-2 border-gray-300 border-t-orange-600;
}

.spinner-sm {
  @apply w-4 h-4;
}

.spinner-md {
  @apply w-6 h-6;
}

.spinner-lg {
  @apply w-8 h-8;
}
```

#### Loading Overlay
```css
.loading-overlay {
  @apply absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center;
}

.loading-content {
  @apply flex items-center gap-3 text-gray-600;
}
```

### Data Display

#### Table Styles
```css
.table-container {
  @apply overflow-x-auto;
}

.table {
  @apply min-w-full divide-y divide-gray-200;
}

.table-header {
  @apply bg-gray-50;
}

.table-header-cell {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-body {
  @apply bg-white divide-y divide-gray-200;
}

.table-row {
  @apply hover:bg-gray-50;
}

.table-cell {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
}
```

#### Stats Cards
```css
.stats-card {
  @apply bg-white rounded-lg shadow-md border border-gray-200 p-6;
}

.stats-icon {
  @apply p-3 rounded-full;
}

.stats-value {
  @apply text-2xl font-bold text-gray-900;
}

.stats-label {
  @apply text-sm text-gray-600;
}

.stats-change {
  @apply text-sm font-medium;
}

.stats-change.positive {
  @apply text-green-600;
}

.stats-change.negative {
  @apply text-red-600;
}
```

---

## 🌈 Gradient Patterns

### Background Gradients

#### Orange Gradient (Primary)
```css
.gradient-orange {
  background: linear-gradient(135deg, #FF7A00 0%, #FF9500 100%);
}
```

#### Subtle Gray Gradient
```css
.gradient-gray {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
}
```

#### Medical Blue Gradient
```css
.gradient-blue {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
}
```

#### Success Green Gradient
```css
.gradient-green {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
}
```

### Card Gradients

#### Module Cards (Dashboard)
```css
.module-card {
  @apply relative overflow-hidden rounded-xl shadow-lg;
}

.module-card-patients {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
}

.module-card-pharmacy {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.module-card-appointments {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.module-card-lab {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}
```

---

## 📐 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Responsive Patterns
```css
/* Mobile Stack, Desktop Grid */
.responsive-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Mobile Full, Desktop Sidebar */
.responsive-layout {
  @apply flex flex-col lg:flex-row gap-6;
}

/* Mobile Hidden, Desktop Visible */
.desktop-only {
  @apply hidden lg:block;
}

/* Mobile Visible, Desktop Hidden */
.mobile-only {
  @apply block lg:hidden;
}
```

---

## 🎯 Icon System

### Icon Sizes
```css
.icon-xs {
  @apply w-3 h-3;
}

.icon-sm {
  @apply w-4 h-4;
}

.icon-md {
  @apply w-5 h-5;
}

.icon-lg {
  @apply w-6 h-6;
}

.icon-xl {
  @apply w-8 h-8;
}

.icon-2xl {
  @apply w-10 h-10;
}
```

### Icon Colors
```css
.icon-primary {
  @apply text-orange-600;
}

.icon-secondary {
  @apply text-gray-600;
}

.icon-success {
  @apply text-green-600;
}

.icon-warning {
  @apply text-orange-600;
}

.icon-error {
  @apply text-red-600;
}

.icon-info {
  @apply text-blue-600;
}
```

---

## 🔧 Implementation Guide

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
        },
        // ... (include all colors from the palette above)
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        lg: '0.625rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
```

### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-primary: #ea580c;
  --color-primary-light: #ffedd5;
  --color-primary-dark: #c2410c;
  
  --color-success: #16a34a;
  --color-warning: #f97316;
  --color-error: #dc2626;
  --color-info: #0284c7;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Component Classes
```css
/* Utility Classes */
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-200;
}

.btn-primary {
  @apply btn bg-orange-600 text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2;
}

.btn-secondary {
  @apply btn bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
}

.card {
  @apply bg-white rounded-lg shadow-md border border-gray-200;
}

.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500;
}
```

---

## 📱 Mobile App Theme (Flutter)

### Color Scheme
```dart
// Flutter Color Scheme
ColorScheme get colorScheme => ColorScheme.fromSeed(
  seedColor: const Color(0xFFFF7A00), // Orange primary
  brightness: Brightness.light,
  primary: const Color(0xFFFF7A00),
  onPrimary: Colors.white,
  secondary: const Color(0xFF0EA5E9),
  onSecondary: Colors.white,
  surface: Colors.white,
  onSurface: const Color(0xFF111827),
  error: const Color(0xFFDC2626),
  onError: Colors.white,
);
```

### Theme Data
```dart
// Flutter Theme
ThemeData get appTheme => ThemeData(
  useMaterial3: true,
  colorScheme: colorScheme,
  appBarTheme: const AppBarTheme(
    backgroundColor: Colors.white,
    foregroundColor: Color(0xFF111827),
    elevation: 0,
    centerTitle: false,
  ),
  cardTheme: CardTheme(
    color: Colors.white,
    elevation: 2,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
    ),
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: const Color(0xFFFF7A00),
      foregroundColor: Colors.white,
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    ),
  ),
  inputDecorationTheme: InputDecorationTheme(
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: const BorderSide(color: Color(0xFFFF7A00), width: 2),
    ),
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
  ),
);
```

---

## 🎨 Usage Examples

### Complete Form Example
```jsx
<div className="space-y-6">
  {/* Section Header */}
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-orange-100 rounded-lg">
      <User className="h-5 w-5 text-orange-600" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <p className="text-sm text-gray-500">Basic patient details <span className="text-gray-400">(All fields optional)</span></p>
    </div>
  </div>

  {/* Form Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
        First Name <span className="text-gray-400">(Optional)</span>
      </label>
      <input
        type="text"
        id="firstName"
        className="input-field"
        placeholder="Enter first name"
      />
    </div>
    
    <div>
      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
        Last Name <span className="text-gray-400">(Optional)</span>
      </label>
      <input
        type="text"
        id="lastName"
        className="input-field"
        placeholder="Enter last name"
      />
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
    <button
      type="button"
      className="btn-secondary"
      onClick={onCancel}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="btn-primary"
      disabled={isLoading}
    >
      {isLoading ? 'Saving...' : 'Save Patient'}
    </button>
  </div>
</div>
```

### Dashboard Card Example
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Stats Card */}
  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Total Patients</p>
        <p className="text-2xl font-bold text-gray-900">1,234</p>
        <p className="text-sm text-green-600">+12% from last month</p>
      </div>
      <div className="p-3 bg-purple-100 rounded-full">
        <Users className="h-6 w-6 text-purple-600" />
      </div>
    </div>
  </div>

  {/* Module Card */}
  <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6">
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
          <Users className="h-6 w-6" />
        </div>
        <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
          123
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-1">Patients</h3>
      <p className="text-sm opacity-90">Manage patient records</p>
    </div>
    <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8"></div>
  </div>
</div>
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install tailwindcss @tailwindcss/forms @tailwindcss/typography
# or
yarn add tailwindcss @tailwindcss/forms @tailwindcss/typography
```

### 2. Configure Tailwind
Copy the `tailwind.config.js` configuration from the Implementation Guide section.

### 3. Import Base Styles
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component classes */
@layer components {
  .btn { /* ... */ }
  .card { /* ... */ }
  .input-field { /* ... */ }
}
```

### 4. Use Components
Start using the predefined classes and patterns documented in this guide.

---

## 📋 Checklist for Theme Replication

### ✅ Color System
- [ ] Implement primary orange color scheme
- [ ] Set up medical blue secondary colors
- [ ] Configure success/warning/error states
- [ ] Define gray scale for neutral elements
- [ ] Create gradient patterns

### ✅ Typography
- [ ] Set up font hierarchy (h1-h4, body, small)
- [ ] Configure text colors for different contexts
- [ ] Implement monospace for codes/IDs

### ✅ Components
- [ ] Create button variants (primary, secondary, success, danger)
- [ ] Design form components (inputs, labels, selects)
- [ ] Build card components with proper shadows
- [ ] Implement modal patterns
- [ ] Create badge and alert components

### ✅ Layout
- [ ] Set up grid systems (2-col, 3-col, responsive)
- [ ] Define container patterns
- [ ] Create navigation components
- [ ] Implement spacing system

### ✅ Interactive Elements
- [ ] Design hover states
- [ ] Create focus states with proper accessibility
- [ ] Implement loading states
- [ ] Add transition animations

### ✅ Responsive Design
- [ ] Configure mobile-first breakpoints
- [ ] Test on all device sizes
- [ ] Ensure touch-friendly interactions

### ✅ Accessibility
- [ ] Maintain proper color contrast ratios
- [ ] Implement keyboard navigation
- [ ] Add proper ARIA labels
- [ ] Test with screen readers

---

## 📖 Additional Resources

### Design Tokens
All colors, spacing, and other design values are documented above and can be extracted as design tokens for use in design systems like Figma, Sketch, or design token management tools.

### Component Library
This theme is designed to work with component libraries like:
- Headless UI
- Radix UI
- Chakra UI
- Material-UI (with custom theming)

### Animation Library
For smooth transitions and micro-interactions, consider using:
- Framer Motion
- React Spring
- Lottie (for complex animations)

---

*This theme guide captures the complete visual identity of HMS Annam Hospital Management System. Use this documentation to maintain consistency across all implementations and ensure the theme is properly replicated in new projects.*
