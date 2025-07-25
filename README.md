# 💰 Spending Tracker

A React.js web application for tracking personal spending habits with detailed analytics and visualizations.

## 📖 Overview

The Spending Tracker is a single-user application that helps you monitor and analyze your spending patterns. Built with React.js and utilizing localStorage for data persistence, this app provides comprehensive insights into your financial habits through interactive charts and detailed breakdowns.

## ✨ Features

### 📊 Analytics Dashboard
- **Multi-timeframe Analysis**: View spending data by Daily, Weekly, or Monthly periods
- **Total Spending Summary**: See all-time spending and period-specific totals
- **Interactive Charts**: 
  - Line chart showing cumulative spending trends over time
  - Pie chart displaying spending distribution by category
- **Category Breakdown**: Detailed table with amounts and percentages per category
- **Smart Filtering**: Easily switch between different time periods and months

### 📝 Spending Journal
- **Easy Record Entry**: Add spending records with date, category, amount, and optional description
- **Predefined Categories**: Choose from common spending categories (Groceries, Transportation, Entertainment, etc.)
- **Custom Categories**: Create and save your own spending categories
- **Recent Records View**: See your latest spending entries at a glance
- **Quick Stats**: View total records count and total amount spent
- **Record Management**: Delete individual records with confirmation

### 🔧 Technical Features
- **Responsive Design**: Built with Bootstrap for mobile-friendly experience
- **Local Storage**: All data persists locally in your browser
- **Real-time Updates**: Charts and statistics update immediately when new records are added
- **No Backend Required**: Fully client-side application

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/spending-tracker.git
cd spending-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

```bash
npm run deploy
```

## 📱 Usage

### Adding a Spending Record
1. Navigate to the **Journal** page
2. Fill in the required fields:
   - **Date**: When the expense occurred
   - **Category**: Select from existing categories or create a new one
   - **Amount**: The amount spent (in dollars)
   - **Description**: Optional details about the expense
3. Click **Add Record** to save

### Viewing Analytics
1. Go to the **Dashboard** page
2. Select your desired time view (Daily, Weekly, Monthly)
3. For monthly view, choose specific month and year
4. Explore the charts and statistics:
   - View spending trends over time with the line chart
   - See category distribution with the pie chart
   - Review detailed breakdowns in the summary table

### Managing Categories
- Use predefined categories from the dropdown
- Add custom categories by clicking the "+" button
- New categories are automatically saved and available for future use

## 🏗️ Project Structure

```
spending-tracker/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard.js       # Analytics dashboard component
│   │   └── Journal.js         # Spending journal component
│   ├── spending_data.json     # Predefined spending categories
│   ├── App.js                 # Main application component
│   ├── App.css               # Application styles
│   └── index.js              # Application entry point
├── package.json
└── README.md
```

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Chart.js & React-ChartJS-2** - Data visualization
- **Bootstrap** - UI styling and responsive design
- **Local Storage API** - Data persistence
- **GitHub Pages** - Deployment platform

## 📊 Sample Data

The application comes with predefined spending categories:
- Groceries
- Utilities
- Transportation
- Entertainment
- Dining Out
- Health
- Shopping
- Travel
- Education
- Miscellaneous

## 👥 Team Members

- **[Team Member 1]** - Frontend Development
- **[Team Member 2]** - UI/UX Design & Charts Integration
- **[Team Member 3]** - Data Management & Testing

## 🎯 Project Requirements Met

✅ **React.js Implementation**: Built entirely with React.js  
✅ **Local Storage**: All data persists using localStorage  
✅ **Two-Page Application**: Dashboard and Journal pages  
✅ **Analytics Dashboard**: Daily/Weekly/Monthly views with totals  
✅ **Line Chart**: Cumulative spending visualization  
✅ **Pie Chart**: Category-based spending distribution  
✅ **Spending Journal**: Complete record entry system  
✅ **Custom Categories**: Ability to add new spending categories  
✅ **Bootstrap Styling**: Responsive and modern UI  
✅ **GitHub Pages Deployment**: Ready for web deployment  

## 🔮 Future Enhancements

- Export data to CSV/PDF formats
- Budget setting and tracking
- Spending goal notifications
- Data backup and restore functionality
- Multi-currency support
- Advanced filtering and search capabilities

## 📝 License

This project is developed as part of a web development course assignment.

## 🚀 Live Demo

Visit the live application: [https://your-username.github.io/spending-tracker](https://your-username.github.io/spending-tracker)

---

*Last updated: July 2025*