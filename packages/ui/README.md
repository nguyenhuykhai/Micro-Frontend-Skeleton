# @repo/ui - Shared UI Components

Shared UI component library built with [shadcn/ui](https://ui.shadcn.com/) for the micro-frontend monorepo.

## Available Components

This package includes the following shadcn/ui components:

- **Button** - Versatile button with multiple variants
- **Card** - Card container with header, content, and footer
- **Input** - Styled input field
- **Avatar** - User avatar with fallback
- **Badge** - Small badge for labels and tags
- **Collapsible** - Collapsible content section
- **Dropdown Menu** - Dropdown menu with items
- **Loader** - Loading spinner component
- **Scroll Area** - Custom scrollable area
- **Separator** - Visual divider
- **Sheet** - Slide-over dialog panel
- **Sidebar** - Navigation sidebar
- **Skeleton** - Loading placeholder
- **Tooltip** - Informative tooltip

## Usage in Micro Frontends

### Import Components

```typescript
// In apps/mfe1 or apps/mfe2
import { Button, Card, Input, Avatar } from "@repo/ui";

function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
      <Input placeholder="Type here..." />
    </Card>
  );
}
```

### Import Utilities

```typescript
import { cn } from "@repo/ui";

// Use cn to merge Tailwind classes
<div className={cn("base-class", conditionalClass && "conditional-class")} />
```

## Adding New Components

To add a new shadcn/ui component to the shared package:

```bash
# Navigate to the UI package
cd packages/ui

# Add a component (e.g., dialog, select, etc.)
pnpm ui:add dialog

# The component will be added to src/components/
```

After adding a component, **export it** from `src/index.ts`:

```typescript
export * from "./components/dialog";
```

## Theme Customization

The package uses CSS variables for theming, defined in each micro-frontend's CSS file:

### MFE1 Theme Variables

Located in `apps/mfe1/src/mfe1.css` under `#mfe1-root`

### MFE2 Theme Variables

Located in `apps/mfe2/src/mfe2.css` under `#mfe2-root`

### Available CSS Variables

```css
--background
--foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--destructive
--destructive-foreground
--border
--input
--ring
--radius
```

## Styling Components

### Using Default Variants

Most components have built-in variants:

```typescript
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="default">Default Size</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Custom Styling

Add custom Tailwind classes via `className`:

```typescript
<Button className="bg-blue-600 hover:bg-blue-700">
  Custom Blue Button
</Button>
```

**Note**: Custom classes will merge with variant classes using `cn()` utility.

## CSS Isolation

Each micro-frontend has its own scoped theme:

- `#mfe1-root` for MFE1
- `#mfe2-root` for MFE2

This ensures theme variables are isolated and won't conflict when micro-frontends are loaded together.

## TypeScript Support

All components are fully typed. Import types directly:

```typescript
import type { ButtonProps } from "@repo/ui";

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Development

### Type Checking

````bash
pnpm typecheck
``
`

### Adding Dependencies

If you need to add a new Radix UI primitive:

```bash
pnpm add @radix-ui/react-<component-name>
````

## Package Structure

```
packages/ui/
├── src/
│   ├── components/     # shadcn/ui components
│   ├── devtools/       # Development tools (EventDebugger, etc.)
│   ├── hooks/          # Shared React hooks
│   ├── lib/            # Utilities (cn, etc.)
│   └── index.ts        # Main exports
├── components.json     # shadcn CLI config
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript config
└── package.json
```

## Troubleshooting

### Components not rendering correctly

Make sure the micro-frontend's CSS file includes CSS variables and Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

#mfe1-root {
  --background: 220 16% 96%;
  --primary: 222 20% 70%;
  /* ... other variables */
}
```

### Import errors

Ensure `tsconfig.json` has the correct path alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Styling conflicts

Use CSS isolation by wrapping your micro-frontend in a root container:

```typescript
<div id="mfe1-root">
  {/* Your app */}
</div>
```
