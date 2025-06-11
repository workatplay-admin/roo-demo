# Agentic AI Fundamentals Workshop Landing Page

A responsive landing page for the "Agentic AI Fundamentals for Product Managers" workshop, built following Test-Driven Development (TDD) principles.

## Features

- **Responsive Design**: Mobile-first approach with clean, minimalist design
- **Secure Form**: Email signup form with comprehensive security measures
- **TDD Implementation**: All JavaScript functionality is thoroughly tested
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA attributes
- **Performance Optimized**: Lightweight CSS and JavaScript with no external dependencies

## Security Features

- **Input Validation**: Client-side validation for email and name fields
- **Input Sanitization**: XSS protection through input sanitization
- **Honeypot Protection**: Hidden field to detect and block bots
- **Rate Limiting**: Prevents spam submissions with cooldown periods
- **CSRF Protection**: Token-based protection against cross-site request forgery

## Project Structure

```
workshop-landing-page/
├── index.html          # Main landing page
├── css/
│   ├── styles.css      # Main stylesheet
│   └── normalize.css   # CSS reset for cross-browser consistency
├── js/
│   └── main.js         # JavaScript for form validation and submission
├── tests/              # Test files following TDD principles
│   ├── test-runner.js  # Simple test framework
│   ├── test.html       # Test runner page
│   └── unit/
│       └── form-validation.test.js  # Unit tests for form functions
└── README.md           # This file
```

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser to view the landing page
3. **Run tests** by opening `tests/test.html` in a browser

## Testing

This project follows Test-Driven Development principles. All JavaScript functionality is tested using a custom lightweight test framework.

### Running Tests

1. Open `tests/test.html` in a web browser
2. Click "Run Tests" to execute all unit tests
3. View test results in the browser console and on-page display

### Test Coverage

- Email validation (valid/invalid formats)
- Name validation (length, required fields)
- Input sanitization (XSS protection)
- Form validation (complete form data)
- Security measures (honeypot, rate limiting)

## Workshop Details

**Title**: Agentic AI Fundamentals for Product Managers  
**Date**: July 15, 2025  
**Time**: 9:00 AM - 4:00 PM  
**Location**: Downtown Tech Hub  

### What You'll Learn

- Core agentic AI concepts: autonomy, tool use, planning, memory
- Hands-on experience with GitHub Codespaces + Roo platform
- Low-code solutions for multi-agent workflows
- PM best practices for AI feature development
- Building stakeholder buy-in for AI initiatives

### Target Audience

- Product Managers working with AI features
- PMs looking to understand agentic AI capabilities
- Product leaders planning AI strategy
- Anyone interested in low-code AI development

## Technical Implementation

### HTML Structure
- Semantic HTML5 elements
- Proper heading hierarchy
- Accessibility features (ARIA attributes, alt text)
- Form with security measures

### CSS Features
- CSS custom properties for consistent theming
- Mobile-first responsive design
- Flexbox and Grid layouts
- Smooth transitions and hover effects
- Print-friendly styles

### JavaScript Functionality
- Form validation and submission handling
- Input sanitization for security
- Smooth scrolling navigation
- Local storage for demo data persistence
- Rate limiting and spam protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies
- Optimized CSS with minimal specificity
- Lightweight JavaScript (~6KB)
- Fast loading times
- Efficient DOM manipulation

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Semantic HTML structure

## Development

### Adding New Features

1. **Write tests first** (following TDD principles)
2. **Run tests** to ensure they fail (red phase)
3. **Implement functionality** to make tests pass (green phase)
4. **Refactor** code while maintaining test coverage (refactor phase)

### Customization

- **Colors**: Modify CSS custom properties in `:root`
- **Typography**: Update font family and sizes in CSS variables
- **Content**: Edit HTML content in `index.html`
- **Functionality**: Add new JavaScript functions with corresponding tests

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions about the workshop or this landing page, contact:
- Email: info@agenticai-workshop.com
- Website: [Workshop Details](index.html)

---

Built with ❤️ following Test-Driven Development principles