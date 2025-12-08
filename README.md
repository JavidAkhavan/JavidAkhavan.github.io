# Javid Akhavan - Portfolio Website

A modern, modular portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a plugin-based architecture for easy customization and content management.

## 🚀 Live Demo

- **Local**: [http://localhost:3000](http://localhost:3000)
- **Production**: [https://javidakhavan.github.io](https://javidakhavan.github.io)

## ✨ Features

- **Modular Architecture** - Plugin-based system for easy feature management
- **Content-Agnostic** - All content externalized in JSON for easy updates
- **Dark/Light Mode** - System-aware theme with manual toggle
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Type-Safe** - Full TypeScript support with strict type checking
- **Modern Stack** - Next.js 14 with App Router and React Server Components
- **Component Library** - shadcn/ui components with customizable theming
- **Code Quality** - ESLint, Prettier, Husky hooks, and commitlint
- **Performance** - Optimized builds with Next.js and Turbopack

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── core/             # Core system components (Header, Footer, Theme)
├── modules/          # Feature modules (Hero, About, Experience, etc.)
├── registry/         # Module registry for feature flags
├── data/             # Content files (site-content.json)
├── types/            # TypeScript type definitions
├── config/           # Configuration files
├── lib/              # Utilities and adapters
└── components/       # shadcn/ui components
    └── ui/
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky, commitlint
- **Package Manager**: npm

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/javidakhavan/javidakhavan.github.io.git
cd javidakhavan.github.io
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

## 🎨 Customization

### Update Content

Edit `src/data/site-content.json` to update:

- Personal information
- Work experience
- Education
- Skills
- Projects
- Contact information

### Enable/Disable Modules

Modify `src/registry/module-registry.ts` to control which sections appear:

```typescript
export const moduleRegistry = {
  hero: { id: 'hero', enabled: true, order: 1 },
  about: { id: 'about', enabled: true, order: 2 },
  // ... toggle enabled: true/false
};
```

### Add New Modules

1. Create module in `src/modules/{module-name}/`
2. Register in `src/registry/module-registry.ts`
3. Add types to `src/types/content.ts`
4. Update content in `src/data/site-content.json`

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed guidelines.

## 📦 Deployment

### GitHub Pages

1. Update `next.config.ts` if using a custom domain
2. Build the project:

```bash
npm run build
```

3. Deploy to GitHub Pages (configure GitHub Actions or manual deployment)

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

## 🏗️ Architecture

This project uses a **modular, content-agnostic architecture**:

- **Modules**: Self-contained features (Hero, About, Experience, etc.)
- **Registry**: Central control for enabling/disabling modules
- **Content Adapter**: Abstraction layer for data sources (JSON, CMS, API)
- **Core System**: Shared components (Layout, Theme, Header, Footer)

Benefits:

- Easy to add/remove features
- Content reusable across projects
- Future-proof and scalable
- Clean separation of concerns

## 📚 Documentation

- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Architecture and guidelines
- [DEVELOPMENT_PROGRESS.md](DEVELOPMENT_PROGRESS.md) - Development status and tracking

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Javid Akhavan**

- GitHub: [@javidakhavan](https://github.com/javidakhavan)
- LinkedIn: [linkedin.com/in/javidakhavan](https://linkedin.com/in/javidakhavan)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

Built with ❤️ using Next.js and TypeScript
