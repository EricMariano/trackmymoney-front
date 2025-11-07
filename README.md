# TrackMyMoney - Frontend

A modern personal finance management application built with Next.js 15 and HeroUI. Track your revenues, expenses, and investments all in one beautiful interface.

## ✨ Features

- 💰 **Revenue Tracking** - Monitor your income sources
- 💸 **Expense Management** - Keep track of your spending
- 📈 **Investment Portfolio** - Manage your investments
- 🎨 **Modern UI** - Beautiful interface built with HeroUI components
- 🌓 **Dark Mode** - Seamless theme switching
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Powered by Next.js 15 with Turbopack

## 🛠️ Technologies

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **UI Library:** [HeroUI v2](https://heroui.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)

## 🚀 Getting Started

### Prerequisites

Make sure you have one of the following package managers installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm / yarn / pnpm / bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/trackmymoney-front.git
cd trackmymoney-front
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Setup for pnpm (Optional)

If you're using `pnpm`, add this to your `.npmrc` file:

```
public-hoist-pattern[]=*@heroui/*
```

Then run `pnpm install` again.

## 📁 Project Structure

```
trackmymoney-front/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── expenses/          # Expense tracking page
│   │   ├── investments/       # Investment management page
│   │   ├── revenues/          # Revenue tracking page
│   │   ├── design/            # Design system showcase
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── home/             # Home page components
│   │   ├── navbar.tsx        # Navigation bar
│   │   └── theme-switch.tsx  # Theme toggle
│   ├── config/               # Configuration files
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── styles/               # Global styles
│   └── types/                # TypeScript types
├── public/                   # Static assets
└── package.json
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

Visit `/design` in the application to explore the design system and component library.

## 🔧 Configuration

The application can be customized through:
- `src/config/site.ts` - Site metadata and navigation
- `src/config/fonts.ts` - Typography settings
- `tailwind.config.js` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration

## 📝 License

Licensed under the [MIT license](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

Built with ❤️ using Next.js and HeroUI
