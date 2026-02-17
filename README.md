# Job Tracker 🎯

<p align="center">
  <img src="https://img.shields.io/github/languages/top/mibragimov/job-tracker" alt="Language">
  <img src="https://img.shields.io/github/last-commit/mibragimov/job-tracker" alt="Last Commit">
  <img src="https://img.shields.io/github/license/mibragimov/job-tracker" alt="License">
</p>

A modern, sleek job application tracker built with Next.js 14 and Tailwind CSS. Perfect for developers and job seekers who want to organize and track their job search progress.

## ✨ Features

- 📊 **Dashboard** - Visual overview of all applications with status breakdown
- ➕ **Add Applications** - Track company, role, salary, location, and notes
- 🔄 **Status Tracking** - Track application status (Applied → Interview → Offer/Rejected)
- 💾 **Local Storage** - Data persists in your browser - no backend needed
- 🎨 **Modern UI** - Clean, dark theme with cyan accents
- 📱 **Responsive** - Works perfectly on desktop and mobile
- 🔗 **Quick Links** - Direct links to job postings
- 🗑️ **Easy Management** - Delete applications with one click

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mibragimov/job-tracker.git

# Navigate to project directory
cd job-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
job-tracker/
├── src/
│   └── app/
│       ├── globals.css     # Global styles with Tailwind
│       ├── layout.tsx     # Root layout with metadata
│       └── page.tsx      # Main application component
├── public/                # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── next.config.js       # Next.js configuration
└── README.md            # This file
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first CSS framework |
| Lucide React | Beautiful icons |
| Framer Motion | Smooth animations |

## 💡 How It Works

1. **Add Job** - Click the "Add Application" button to add a new job
2. **Fill Details** - Enter company name, role, location, salary range, and notes
3. **Track Status** - Use the dropdown to update application status:
   - 🟢 Applied - Initial application submitted
   - 🟡 Interview - Got interview call
   - 🟢 Offer - Received job offer
   - 🔴 Rejected - Application rejected
4. **Manage** - Click the external link to visit job posting or trash icon to remove

## 🎯 Use Cases

- Job seekers tracking multiple applications
- Developers managing interview процесс
- Fresh graduates organizing their job search
- Professionals exploring new opportunities

## 📝 Usage Tips

- Add salary range to compare offers later
- Use notes to track interview dates and recruiter contacts
- Bookmark job posting URLs for quick access
- Check dashboard for application status overview

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🔗 Links

- [View on GitHub](https://github.com/mibragimov/job-tracker)
- [Report Issues](https://github.com/mibragimov/job-tracker/issues)

---

Built with ❤️ using Next.js 14 by Muhammad Ibragimov
