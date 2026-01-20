# Daily Bites - AI Coding Agent Instructions

## Project Overview
Daily Bites is a responsive food delivery landing/ordering website for a Nigerian restaurant. Built with **Tailwind CSS v4** for styling, vanilla JavaScript for interactivity, and HTML for markup. No backend or frameworks—purely frontend.

## Architecture

### CSS Strategy
- **input.css**: Single source of truth for Tailwind imports and custom CSS variables (color theme)
- **output.css**: Generated from input.css via Tailwind CLI—do NOT edit directly
- **style.css**: Legacy/supplementary styles (shapes, custom animations); will be phased out as Tailwind expands
- **Color System**: Defined as CSS custom properties in both `input.css` and `style.css`:
  - `--color-primary: #ff6600` (Orange)
  - `--color-secondary: #73ff00` (Green/Light Green)
  - `--color-accent: #00ff22` (Light Green)
  - `--color-dark: #0c0c0c` (Dark background)

### JavaScript Organization (main.js)
DOM-first vanilla JS with no module system. Patterns include:
- **Event listeners**: Mobile menu toggle, smooth scroll navigation
- **Scroll effects**: Navbar state changes (`.navbar-trans` ↔ `.navbar-reduce`) based on scroll position
- **Observers**: IntersectionObserver for counter animations on scroll
- **Typed.js library**: Hero text animation ("Fresh Foods", "To Your Doorstep")
- **Data-driven content**: Testimonial slider uses hardcoded array; manual updates required

### Navigation Structure
- **Desktop**: Horizontal nav with "Order Now" button
- **Mobile**: Hamburger toggle (id: `mobileMenuBtn`) reveals mobile menu (id: `mobileMenu`)
- **Smooth scroll**: Links with class `.js-scroll` trigger smooth navigation to hash targets

## Build & Development Workflow

### Tailwind CSS Build
```bash
npm install  # Installs @tailwindcss/cli and tailwindcss
npx tailwindcss -i src/input.css -o src/output.css --watch  # Development
npx tailwindcss -i src/input.css -o src/output.css --minify  # Production
```
- Always modify `src/input.css`, never edit `src/output.css` directly
- CSS variables must be defined in both `input.css` (`@theme`) and legacy `style.css` for consistency
- Watch mode useful for rapid iteration

### Git Workflow
- Repository initialized; commits already pushed
- No CI/CD pipeline; manual deployment expected
- Ensure npm packages (`node_modules/`) are installed before building

## Key Conventions & Patterns

### HTML Selectors
- **Mobile menu**: `#mobileMenuBtn` (toggle button), `#mobileMenu` (menu container)
- **Navbar**: `#mainNav` with classes `.navbar-trans` (transparent) / `.navbar-reduce` (scrolled)
- **Testimonial slider**: `#testimonial-slider` (rendered via JS)
- **Counters**: Class `.counter` with `data-target` attribute for animation
- **Typed.js**: `#typed-text` element

### CSS Classes
- Tailwind utilities predominate; use `mx-auto`, `px-4`, `flex`, `items-center`, etc.
- Legacy shape dividers: Classes like `.custom-shape-divider-top-1768938175` contain SVG paths
- Responsive: Mobile-first approach with `md:` breakpoint for desktop

### JavaScript Patterns
- No state management (e.g., Vuex, Redux)—state lives in DOM or simple variables (e.g., `currentTestimonial`)
- Event listeners attached via `getElementById()`, `querySelector()`, `querySelectorAll()`
- Deprecated code: Paystack payment handler is commented out (uncomment and add API key when ready)

## External Dependencies
- **Tailwind CSS v4.1.18**: Utility-first styling framework
- **Typed.js**: Hero text animation library (included via CDN)
- **Ionicons**: Icon library (CDN link present but appears unused)
- **WhatsApp link**: Contact button points to `https://wa.link/h84a2s`

## Multi-Page Structure (Partial)
- **index.html**: Main landing page (hero, about, services, reviews)
- **order.html**: Separate order/checkout page (referenced in nav; not visible in provided code)
- Link pattern: `href="order.html"` for same-directory pages

## Common Modifications
1. **Update testimonials**: Edit `testimonials` array in `main.js` (lines 113–126)
2. **Add/edit colors**: Sync changes across `input.css` (`@theme`) and `style.css` (`:root`)
3. **Add new animations**: Use Tailwind utilities or write CSS in `style.css`; regenerate `output.css`
4. **Payment integration**: Uncomment Paystack code and inject public API key in `main.js`
5. **Add sections**: Follow existing HTML structure (container, flex/grid, spacing utilities)

## When Modifying Code
- Always regenerate CSS after editing Tailwind config
- Test responsive design (mobile at 375px, tablet at 768px, desktop at 1024px)
- Verify smooth scroll and navbar effects work across browsers
- Update testimonial/counter data in JS; no database or API backing
- Keep inline styles (e.g., gradients in `style=` attributes) for component-level customization
