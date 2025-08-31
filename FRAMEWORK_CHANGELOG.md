# Framework Changelog

## [1.0.0] - 2024-12-XX

### Initial Release
- Multi-step quiz with validation
- Multiple layout templates (Home, Hero)
- Real-time field validation (ZIP, email, phone)
- Session tracking and management
- Error handling and reporting
- Responsive design
- Legal pages framework
- Configuration-driven architecture

### Core Components
- QuizOverlay with multi-step flow
- Hero section with CTA
- Value Propositions
- How It Works
- Trust & Transparency
- FAQ section
- Footer with legal links

### Layouts
- HomeLayout: Full homepage experience
- HeroLayout: Minimal high-conversion layout

### Utilities
- ZIP validation with blacklist
- Email validation with MX checking
- Phone formatting and validation
- Session management
- Error boundary and reporting

### Framework Structure
- src/core/ - Framework components (never modified by clients)
- src/config/ - Client configuration files
- src/custom/ - Client-specific customizations
- netlify/functions/ - Serverless functions

### Configuration Files
- content.config.ts - All text and copy
- theme.config.ts - Colors and styling
- quiz.config.ts - Quiz questions and flow
- site.config.ts - Site metadata
- legal.config.ts - Legal page content
- layout.config.ts - Layout selection
- routes.config.ts - Routing configuration
- environment.config.ts - API endpoints