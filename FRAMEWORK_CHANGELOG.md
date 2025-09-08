# Framework Changelog

## [1.1.0] - 2025-01-XX

### Compliance System Enhancement
- Added comprehensive compliance tracking system
- Integrated Jornaya LeadiD for lead verification
- Integrated TrustedForm for form submission certification
- Scripts load when quiz opens (not page load) for better performance
- Automatic token/certificate capture during form interaction
- Clean production code with debug mode support
- Complete setup documentation and troubleshooting guide

### Code Quality Improvements
- Removed all debug console.log statements from production code
- Added debug mode toggle for development logging
- Cleaned up compliance utility functions
- Enhanced error handling with silent fallbacks
- Production-ready compliance configuration template

### Documentation
- Added COMPLIANCE_SETUP.md with complete setup guide
- Step-by-step instructions for both services
- Troubleshooting section for common issues
- Production checklist and monitoring guidelines

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