## 👥 Team Members

- Lu Phone Maw
- Wai Yan Paing

## Screenshots
<img width="1056" height="721" alt="Screenshot 2025-07-26 at 04 23 43" src="https://github.com/user-attachments/assets/ea331221-ddad-4356-8528-bb9add9462a4" />
<img width="1396" height="791" alt="Screenshot 2025-07-26 at 04 22 33" src="https://github.com/user-attachments/assets/6d9ca62b-434f-47d4-bbf7-b2991e1f93ff" />
<img width="1007" height="769" alt="Screenshot 2025-07-26 at 04 22 57" src="https://github.com/user-attachments/assets/2892abe7-6418-4f1c-9c4a-c812d3fcb297" />
<img width="1025" height="768" alt="Screenshot 2025-07-26 at 04 23 02" src="https://github.com/user-attachments/assets/7fa30cd9-7195-4b94-9e6c-a2ac9bbd16c3" />
<img width="1020" height="739" alt="Screenshot 2025-07-26 at 04 23 10" src="https://github.com/user-attachments/assets/19a595c8-9a49-4046-8820-91ba48dfc007" />


# Spending Tracker

A React.js web application for tracking personal spending habits with detailed analytics and visualizations.

## 🚀 Live Demo

Visit the live application: [https://luphone04.github.io/SpendingTracker/](https://luphone04.github.io/SpendingTracker/)

## 📖 Overview

The Spending Tracker is a single-user application that helps you monitor and analyze your spending patterns. Built with React.js and utilizing localStorage for data persistence, this app provides comprehensive insights into your financial habits through interactive charts and detailed breakdowns.

## 🛠️ Technologies Used

- **React.js 19.1.0** - Frontend framework with modern hooks
- **Vite 5.4.19** - Fast build tool and development server
- **React Router 7.7.1** - Client-side routing
- **Chart.js & React-ChartJS-2** - Interactive data visualizations
- **Bootstrap 5.3.7** - UI styling and responsive design
- **Local Storage API** - Client-side data persistence
- **pnpm** - Fast, efficient package manager
- **GitHub Pages** - Deployment platform

## 🎯 Project Requirements Met

✅ **React.js Implementation**: Built entirely with React.js 19.1.0  
✅ **Local Storage**: All data persists using localStorage  
✅ **Two-Page Application**: Dashboard and Journal pages  
✅ **Analytics Dashboard**: Daily/Weekly/Monthly views with totals  
✅ **Line Chart**: Cumulative spending visualization over time  
✅ **Pie Chart**: Category-based spending distribution  
✅ **Bar Chart**: Alternative category visualization with precise values  
✅ **Spending Journal**: Complete record entry system  
✅ **Custom Categories**: Ability to add new spending categories  
✅ **Bootstrap Styling**: Responsive and modern UI  
✅ **GitHub Pages Deployment**: Ready for web deployment

## ✨ Key Features

### 📊 Analytics Dashboard
- **Time Period Filtering**: Switch between Daily, Weekly, and Monthly views
- **Total Spending Summary**: All-time and period-specific totals
- **Interactive Charts**: 
  - Line chart for spending trends over time
  - Pie chart for category distribution percentages
  - Bar chart for precise category spending amounts
- **Category Breakdown Table**: Detailed spending by category with percentages

### 📝 Spending Journal
- **Easy Record Entry**: Date, category, amount, and optional description
- **Pre-defined Categories**: 10 common spending categories included
- **Custom Categories**: Add your own spending categories
- **Recent Records View**: Quick overview of latest 10 transactions
- **Record Management**: Delete unwanted entries
- **Quick Stats**: Real-time total records and spending amounts

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Clean Bootstrap 5 styling with custom gradients
- **Fast Performance**: Lightning-fast Vite development and build
- **Smooth Animations**: Hover effects and transitions throughout

## 🚀 Development

### Prerequisites
- Node.js 16+ 
- pnpm (recommended) or npm

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/luphone04/SpendingTracker.git
cd SpendingTracker

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Deploy to GitHub Pages
pnpm deploy
```

### Development Commands
- `pnpm dev` - Start Vite development server (http://localhost:5173)
- `pnpm build` - Create optimized production build
- `pnpm preview` - Preview the production build locally
- `pnpm deploy` - Deploy to GitHub Pages

## 📁 Project Structure
```
SpendingTracker/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx    # Analytics dashboard with charts
│   │   └── Journal.jsx      # Spending entry form and records
│   ├── App.jsx             # Main app component with routing
│   ├── App.css             # Custom styles and animations
│   ├── index.jsx           # Application entry point
│   └── spending_data.json  # Default spending categories
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies and scripts
```

## 🎓 Academic Project

This project was developed as a group assignment for a web development course, demonstrating:
- Modern React.js development patterns
- Client-side data persistence with localStorage
- Interactive data visualization with Chart.js
- Responsive web design principles
- Git collaboration and deployment workflows