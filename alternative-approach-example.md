# Alternative Approach: Pre-rendered Form

Instead of a separate HTML file, you could add this to any Next.js page that gets server-side rendered:

```jsx
// In any page component (like app/page.tsx)
export default function HomePage() {
  return (
    <div>
      {/* Your regular page content */}
      
      {/* Hidden form for Netlify detection */}
      <form name="conta