// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Star: ({ size, fill, color, style, ...props }) => (
    <div data-testid="star-icon" style={style} {...props}>
      Star
    </div>
  ),
  ChevronLeft: ({ className, color, strokeWidth, ...props }) => (
    <div data-testid="chevron-left" className={className} {...props}>
      ChevronLeft
    </div>
  ),
  ChevronRight: ({ className, color, strokeWidth, ...props }) => (
    <div data-testid="chevron-right" className={className} {...props}>
      ChevronRight
    </div>
  ),
  Filter: ({ size, ...props }) => (
    <div data-testid="filter-icon" {...props}>
      Filter
    </div>
  ),
}));

// Mock react-slick
jest.mock('react-slick', () => {
  return function MockSlider({ children, ...props }) {
    return <div data-testid="mock-slider" {...props}>{children}</div>;
  };
});

// Global test utilities
global.fetch = jest.fn(); 