# Ikoha Community Development Platform

A comprehensive web platform for the Ikoha Community in Ovia South-West, Edo State, Nigeria, showcasing mineral resources, community development projects, and fostering local engagement.

## 🚀 Features

- **Community Information Hub** - History, demographics, and location details
- **Mineral Resources Management** - Comprehensive inventory and mapping
- **Development Projects Tracking** - Active and completed projects
- **Local Business Directory** - Community businesses and services
- **News & Events** - Community updates and event calendar
- **Resource Library** - Documents and reports
- **Contact & Engagement** - Forms and communication channels
- **Admin Dashboard** - Content management system

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (recommended) or SQLite (development)
- **Deployment**: Netlify
- **Maps**: Google Maps API / Mapbox

## 📁 Project Structure

See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for detailed directory structure.

## 🗄️ Database Schema

**Database Name**: "Ikoha Community Development"

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete database design.
See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for database setup instructions.

## 🎨 Design & Wireframes

See [WIREFRAMES.md](./WIREFRAMES.md) for page layouts and UI designs.

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL (or SQLite for development)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ikoha-community-development
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example.txt .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   - Create a PostgreSQL database named "Ikoha Community Development"
   - Use: `createdb "Ikoha Community Development"` (quotes required for names with spaces)
   - Update `DATABASE_URL` in `.env.local` with your connection string
   - Run migrations (when implemented)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 🌐 Deployment

### Netlify Deployment

1. **Connect your repository** to Netlify
2. **Build settings** are in `netlify.toml` (build command, `@netlify/plugin-nextjs`).
3. **Set environment variables** in the Netlify dashboard.
4. **Deploy!**

The `netlify.toml` file is already configured for Next.js.

## 📚 Documentation

- [Project Plan](./PROJECT_PLAN.md) - Features and ideas
- [Database Schema](./DATABASE_SCHEMA.md) - Database design
- [Wireframes](./WIREFRAMES.md) - UI/UX designs
- [Folder Structure](./FOLDER_STRUCTURE.md) - Project organization

## 🤝 Contributing

This is a community project. Contributions are welcome!

## 📄 License

[Specify your license here]

## 📧 Contact

For inquiries about the Ikoha Community Development Platform, please use the contact form on the website.

---

**Location**: Ovia South-West, Edo State, South South Nigeria, Nigeria, West Africa, Africa
