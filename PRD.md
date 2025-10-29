# Planning Guide

An autonomous cat meme generator that fetches random cat images from free APIs and overlays user-customizable or AI-generated meme text to create shareable cat memes.

**Experience Qualities**:
1. **Playful** - The interface should feel fun and lighthearted, matching the whimsical nature of cat memes with smooth animations and delightful interactions.
2. **Effortless** - Users can generate memes with a single click, making the experience fast andfrictionless with minimal input required.
3. **Creative** - The app should inspire creativity through AI-generated captions while allowing manual customization for those who want full control.

**Complexity Level**: Light Application (multiple features with basic state)
  - Features include random cat image fetching, AI-generated meme text, manual text editing, image generation, and meme history persistence.

## Essential Features

**Random Cat Image Fetching**
- Functionality: Fetches random cat images from The Cat API (free, no key required for basic usage)
- Purpose: Provides fresh, high-quality cat photos as meme templates
- Trigger: Page load and "New Cat" button click
- Progression: Click button → API call → Image loads with fade-in → Ready for caption
- Success criteria: Image loads within 2 seconds, displays properly, handles errors gracefully

**AI Meme Caption Generation**
- Functionality: Uses spark.llm to generate funny, contextually relevant meme captions
- Purpose: Automates the creative process while maintaining meme quality and humor
- Trigger: "Generate Caption" button or automatic on new image load
- Progression: Click generate → AI analyzes → Top/bottom text appears → User can edit or regenerate
- Success criteria: Captions are funny, appropriate length, and feel authentic to meme culture

**Manual Caption Editing**
- Functionality: Editable text inputs for top and bottom meme text with live preview
- Purpose: Allows users to customize or completely rewrite captions for personal touch
- Trigger: Click on caption text areas or manual input focus
- Progression: Focus input → Type text → Live preview updates → Text overlays on image
- Success criteria: Real-time updates, no lag, preserves formatting

**Meme Export/Download**
- Functionality: Generates final meme image with text overlaid and downloads to device
- Purpose: Enables sharing memes on social media and with friends
- Trigger: "Download Meme" button click
- Progression: Click download → Canvas renders → File downloads → Success notification
- Success criteria: High-quality image output, proper text rendering, filename includes timestamp

**Meme History**
- Functionality: Saves generated memes to local storage for later viewing
- Purpose: Lets users revisit and re-download their favorite creations
- Trigger: Automatic save on meme generation
- Progression: Generate meme → Auto-save to history → View in gallery → Re-download or delete
- Success criteria: Persists across sessions, thumbnail previews, easy management

**Satirical Blog Post Generation**
- Functionality: Uses spark.llm to generate hilarious, pretentious satirical articles analyzing each meme as if it's serious cultural commentary
- Purpose: Adds an extra layer of humor by treating silly cat memes with absurd academic seriousness
- Trigger: Automatic generation when meme is saved/downloaded
- Progression: Save meme → AI generates satirical analysis → Blog post stored with meme → View in blog tab
- Success criteria: Articles are funny, reference the meme text, use intellectual language ironically, include fake expert quotes

## Edge Case Handling

- **API Failure**: Display friendly error message with retry button, fallback to cached images if available
- **Slow Network**: Show loading skeletons and progress indicators, timeout after 10 seconds
- **Long Text**: Automatically scale font size down to fit text within image bounds
- **Empty Captions**: Disable download until at least one text field has content
- **Quota Limits**: Handle API rate limits gracefully, show appropriate messaging
- **Small Screens**: Ensure meme preview and controls are fully responsive on mobile devices
- **Blog Generation Failure**: If blog post generation fails, still save the meme but show a graceful error message

## Design Direction

The design should feel playful and modern with a focus on the meme itself, featuring bright accent colors, smooth animations, and a clean interface that doesn't distract from the content - balancing fun energy with functional clarity through a minimal yet vibrant approach.

## Color Selection

Triadic color scheme using vibrant, energetic colors that evoke the playful nature of internet meme culture while maintaining readability and modern aesthetics.

- **Primary Color**: Deep Purple (oklch(0.45 0.15 300)) - Represents creativity and the playful internet culture, used for main actions
- **Secondary Colors**: Soft Gray (oklch(0.96 0.01 270)) for backgrounds and Charcoal (oklch(0.35 0.02 270)) for text - providing neutral balance
- **Accent Color**: Electric Cyan (oklch(0.75 0.15 200)) - Bright, attention-grabbing highlight for CTAs and active states
- **Foreground/Background Pairings**:
  - Background (White oklch(0.99 0 0)): Charcoal text (oklch(0.25 0.02 270)) - Ratio 14.2:1 ✓
  - Card (Light Gray oklch(0.97 0.01 270)): Charcoal text (oklch(0.25 0.02 270)) - Ratio 13.8:1 ✓
  - Primary (Deep Purple oklch(0.45 0.15 300)): White text (oklch(0.99 0 0)) - Ratio 7.8:1 ✓
  - Secondary (Soft Gray oklch(0.96 0.01 270)): Charcoal text (oklch(0.25 0.02 270)) - Ratio 13.5:1 ✓
  - Accent (Electric Cyan oklch(0.75 0.15 200)): Charcoal text (oklch(0.25 0.02 270)) - Ratio 8.2:1 ✓
  - Muted (Light Gray oklch(0.94 0.01 270)): Medium Gray text (oklch(0.55 0.02 270)) - Ratio 4.8:1 ✓

## Font Selection

Bold, friendly sans-serif typefaces that communicate fun and approachability while maintaining excellent readability - using Inter for UI elements and Impact-style bold fonts for meme text overlays.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter-spacing (-0.02em)
  - H2 (Section Headers): Inter SemiBold/20px/normal letter-spacing
  - Body (Controls & Labels): Inter Regular/16px/relaxed line-height (1.6)
  - Meme Text (Overlays): System fallback to Impact/Arial Black/48px/uppercase/bold with heavy stroke

## Animations

Animations should enhance the playful nature of meme creation with bouncy, energetic transitions that celebrate each generation while keeping interactions snappy and responsive - subtle enough to not delay actions but noticeable enough to create moments of delight.

- **Purposeful Meaning**: Use bounce and spring animations to celebrate meme generation, fade transitions for image loading to build anticipation
- **Hierarchy of Movement**: Prioritize the "Generate" button with a satisfying press animation, new images fade + scale in, caption text typing has subtle reveal

## Component Selection

- **Components**: 
  - Card for meme preview container with subtle shadow
  - Button for all actions (generate, download, new cat) with primary/secondary variants
  - Input for manual caption editing with borderless design
  - Textarea for longer caption options
  - Tooltip for explaining features on hover
  - Tabs for switching between generator, history, and blog posts views
  - ScrollArea for meme history gallery and blog post list
  - Skeleton for loading states
  - Badge for new/saved indicators
  - Separator for blog post sections
  
- **Customizations**: 
  - Custom canvas component for rendering meme with text overlay
  - Custom meme text input with live character count
  - Custom gallery grid for history view with hover effects
  - Custom blog post article component with newspaper-style layout
  
- **States**: 
  - Buttons have pronounced hover lift and active press down animations
  - Inputs show focus with cyan accent ring and subtle background shift
  - Generated memes have subtle pulse animation on first render
  - Loading states show skeleton with shimmer effect
  
- **Icon Selection**: 
  - Cat icon for branding/empty states
  - Sparkles for AI generation
  - Download for saving memes
  - Shuffle/Refresh for new cat
  - Trash for deleting from history
  - Image for gallery view
  - Article/Document for blog posts
  
- **Spacing**: 
  - Main container: p-6 md:p-8
  - Card padding: p-6
  - Button spacing: px-6 py-3
  - Gap between elements: gap-4 for tight groups, gap-6 for sections
  - Meme preview: aspect-square with max-w-2xl
  
- **Mobile**: 
  - Single column layout on mobile (< 768px)
  - Stack controls vertically with full-width buttons
  - Meme preview scales to full container width
  - History gallery switches from 3-column to 1-column grid
  - Bottom sheet for caption editing on mobile
  - Touch-optimized hit areas (min 44px)
