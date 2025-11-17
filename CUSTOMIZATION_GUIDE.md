# Saby Landing Page - Customization Guide

This guide will help you update and customize major parts of the Saby landing page template. Follow the step-by-step instructions for each customization task.

---

## Table of Contents

1. [Updating the Logo](#1-updating-the-logo)
2. [Updating the Favicon](#2-updating-the-favicon)
3. [Adding Demo Videos and Images](#3-adding-demo-videos-and-images)
4. [Customizing the Footer](#4-customizing-the-footer)
5. [Other Common Customizations](#5-other-common-customizations)
   - [Changing Brand Colors](#changing-brand-colors)
   - [Updating Navigation Links](#updating-navigation-links)
   - [Modifying Hero Section Content](#modifying-hero-section-content)
   - [Updating Stats and Metrics](#updating-stats-and-metrics)
   - [Changing Typography](#changing-typography)
   - [Updating Social Media Links](#updating-social-media-links)

---

## 1. Updating the Logo

### Current Implementation

The logo is currently implemented as a styled div with the letter "S" in the Navigation component. It appears in:
- **Navigation Bar** (top of every page)
- **Footer** (bottom of every page)

### Step-by-Step Instructions

#### Option A: Replace with Image Logo

1. **Add your logo image to the project:**
   - Create a `public` folder in the root directory if it doesn't exist:
     ```bash
     mkdir public
     ```
   - Add your logo files:
     - `public/saby-logo.svg` (recommended for scalability)
     - `public/saby-logo.png` (fallback)
     - `public/saby-logo-dark.svg` (optional: for dark mode)

2. **Update Navigation Component:**
   
   File: `src/components/Navigation.tsx`
   
   Find the logo section (around lines 50-66) and replace it:
   
   ```tsx
   {/* Logo */}
   <Link href="/" className="flex items-center cursor-pointer">
     <Image
       src="/saby-logo.svg"
       alt="Saby Logo"
       width={32}
       height={32}
       className="w-8 h-8"
     />
     <span
       className={`ml-2 text-xl font-bold ${
         isDark ? "text-white" : "text-gray-900"
       }`}>
       Saby
     </span>
   </Link>
   ```
   
   Don't forget to import `Image` from `next/image` at the top:
   ```tsx
   import Image from "next/image";
   ```

3. **Update Footer Component:**
   
   File: `src/components/Footer.tsx`
   
   Find the logo section (around lines 36-42) and replace it:
   
   ```tsx
   <div className="flex items-center mb-6">
     <Image
       src="/saby-logo.svg"
       alt="Saby Logo"
       width={32}
       height={32}
       className="w-8 h-8"
     />
     <span className="text-xl font-bold ml-3">Saby</span>
   </div>
   ```

#### Option B: Keep Text Logo but Customize Styling

If you want to keep the text-based logo but customize it:

1. **Update Navigation Component:**
   
   File: `src/components/Navigation.tsx` (lines 52-66)
   
   Modify the gradient colors, size, or text:
   
   ```tsx
   <div
     className={`w-10 h-10 rounded-lg ${
       isDark
         ? "bg-gradient-to-br from-blue-500 to-purple-600"
         : "bg-gradient-to-br from-blue-600 to-purple-700"
     } flex items-center justify-center`}>
     <span className={`text-lg font-bold text-white`}>S</span>
   </div>
   <span
     className={`ml-2 text-2xl font-bold ${
       isDark ? "text-white" : "text-gray-900"
     }`}>
     Saby
   </span>
   ```

### Logo Specifications

- **Recommended formats:** SVG (preferred), PNG with transparent background
- **Recommended sizes:**
  - Navigation: 32x32px (1x), 64x64px (2x for retina)
  - Footer: 32x32px (1x), 64x64px (2x for retina)
- **File naming:** Use `saby-logo.svg` or `saby-logo.png` for consistency

---

## 2. Updating the Favicon

### Current Implementation

The favicon is managed through Next.js's default favicon handling. You can add custom favicons to the `public` folder.

### Step-by-Step Instructions

1. **Create the public folder (if it doesn't exist):**
   ```bash
   mkdir public
   ```

2. **Add favicon files to the public folder:**
   - `public/favicon.ico` (16x16, 32x32, 48x48 sizes)
   - `public/favicon-16x16.png`
   - `public/favicon-32x32.png`
   - `public/apple-touch-icon.png` (180x180 for iOS)
   - `public/android-chrome-192x192.png`
   - `public/android-chrome-512x512.png`

3. **Update the Document Head:**
   
   File: `pages/_document.tsx`
   
   Add favicon links in the `<Head>` section:
   
   ```tsx
   <Head>
     {/* Favicon */}
     <link rel="icon" href="/favicon.ico" />
     <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
     <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
     <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
     <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
     <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
     
     {/* Existing font imports */}
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     {/* ... rest of your head content ... */}
   </Head>
   ```

4. **Create a web manifest (optional but recommended):**
   
   File: `public/site.webmanifest`
   
   ```json
   {
     "name": "Saby",
     "short_name": "Saby",
     "icons": [
       {
         "src": "/android-chrome-192x192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/android-chrome-512x512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ],
     "theme_color": "#2563eb",
     "background_color": "#ffffff",
     "display": "standalone"
   }
   ```
   
   Then add to `_document.tsx`:
   ```tsx
   <link rel="manifest" href="/site.webmanifest" />
   ```

### Favicon Specifications

- **favicon.ico:** Multi-size ICO file (16x16, 32x32, 48x48)
- **PNG favicons:** 16x16, 32x32
- **Apple Touch Icon:** 180x180 PNG
- **Android Chrome Icons:** 192x192, 512x512 PNG
- **Tools:** Use [RealFaviconGenerator](https://realfavicongenerator.net/) or [Favicon.io](https://favicon.io/) to generate all sizes

---

## 3. Adding Demo Videos and Images

### Current Implementation

The "Watch Demo" button is in the Hero section but doesn't currently link to a video. You can add:
- Embedded YouTube/Vimeo videos
- Self-hosted video files
- Demo screenshots/images
- Video modal/popup

### Step-by-Step Instructions

#### Option A: Add YouTube/Vimeo Video Modal

1. **Create a Video Modal Component:**
   
   File: `src/components/VideoModal.tsx` (create new file)
   
   ```tsx
   import React, { useEffect } from "react";
   import { X } from "lucide-react";

   interface VideoModalProps {
     isOpen: boolean;
     onClose: () => void;
     videoUrl: string;
     title?: string;
   }

   export default function VideoModal({
     isOpen,
     onClose,
     videoUrl,
     title = "Product Demo",
   }: VideoModalProps) {
     useEffect(() => {
       if (isOpen) {
         document.body.style.overflow = "hidden";
       } else {
         document.body.style.overflow = "unset";
       }
       return () => {
         document.body.style.overflow = "unset";
       };
     }, [isOpen]);

     if (!isOpen) return null;

     // Extract video ID from YouTube URL
     const getYouTubeId = (url: string) => {
       const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
       const match = url.match(regExp);
       return match && match[2].length === 11 ? match[2] : null;
     };

     // Extract video ID from Vimeo URL
     const getVimeoId = (url: string) => {
       const regExp = /vimeo.com\/(\d+)/;
       const match = url.match(regExp);
       return match ? match[1] : null;
     };

     const youtubeId = getYouTubeId(videoUrl);
     const vimeoId = getVimeoId(videoUrl);

     return (
       <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
         onClick={onClose}>
         <div
           className="relative w-full max-w-4xl mx-4"
           onClick={(e) => e.stopPropagation()}>
           <button
             onClick={onClose}
             className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
             <X className="w-6 h-6" />
           </button>
           <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-2xl">
             {youtubeId ? (
               <iframe
                 className="absolute top-0 left-0 w-full h-full"
                 src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                 frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
             ) : vimeoId ? (
               <iframe
                 className="absolute top-0 left-0 w-full h-full"
                 src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                 frameBorder="0"
                 allow="autoplay; fullscreen; picture-in-picture"
                 allowFullScreen
               />
             ) : (
               <video
                 className="absolute top-0 left-0 w-full h-full"
                 src={videoUrl}
                 controls
                 autoPlay
               />
             )}
           </div>
         </div>
       </div>
     );
   }
   ```

2. **Update Hero Section:**
   
   File: `src/components/HeroSection.tsx`
   
   Add state and modal:
   
   ```tsx
   import VideoModal from "./VideoModal";
   
   // Inside the component:
   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
   
   // Update the "Watch Demo" button (around line 189):
   <button
     onClick={() => setIsVideoModalOpen(true)}
     className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-colors ${
       isDark
         ? "text-white hover:bg-gray-800"
         : "text-gray-900 hover:bg-gray-100"
     }`}>
     <Play className="w-5 h-5" />
     Watch Demo
   </button>
   
   // Add at the end of the component, before closing div:
   <VideoModal
     isOpen={isVideoModalOpen}
     onClose={() => setIsVideoModalOpen(false)}
     videoUrl="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
     title="Saby Product Demo"
   />
   ```

#### Option B: Add Demo Screenshots/Images

1. **Add demo images to public folder:**
   ```bash
   public/
     demo/
       demo-1.png
       demo-2.png
       demo-3.png
   ```

2. **Create a Demo Section Component:**
   
   File: `src/components/DemoSection.tsx` (create new file)
   
   ```tsx
   import React, { useState } from "react";
   import Image from "next/image";
   import { ChevronLeft, ChevronRight } from "lucide-react";

   interface DemoSectionProps {
     isDark: boolean;
   }

   const demoImages = [
     { src: "/demo/demo-1.png", alt: "Dashboard Overview" },
     { src: "/demo/demo-2.png", alt: "Analytics View" },
     { src: "/demo/demo-3.png", alt: "Data Visualization" },
   ];

   export default function DemoSection({ isDark }: DemoSectionProps) {
     const [currentIndex, setCurrentIndex] = useState(0);

     const nextImage = () => {
       setCurrentIndex((prev) => (prev + 1) % demoImages.length);
     };

     const prevImage = () => {
       setCurrentIndex((prev) => (prev - 1 + demoImages.length) % demoImages.length);
     };

     return (
       <section
         className={`py-20 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
         id="demo">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2
               className={`text-4xl font-bold mb-4 ${
                 isDark ? "text-white" : "text-gray-900"
               }`}>
               See Saby in Action
             </h2>
             <p
               className={`text-xl ${
                 isDark ? "text-gray-400" : "text-gray-600"
               }`}>
               Explore our platform with interactive demos
             </p>
           </div>

           <div className="relative max-w-5xl mx-auto">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl">
               <Image
                 src={demoImages[currentIndex].src}
                 alt={demoImages[currentIndex].alt}
                 width={1200}
                 height={800}
                 className="w-full h-auto"
               />
             </div>

             <button
               onClick={prevImage}
               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all">
               <ChevronLeft className="w-6 h-6 text-gray-900" />
             </button>
             <button
               onClick={nextImage}
               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all">
               <ChevronRight className="w-6 h-6 text-gray-900" />
             </button>

             <div className="flex justify-center gap-2 mt-6">
               {demoImages.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => setCurrentIndex(index)}
                   className={`w-2 h-2 rounded-full transition-all ${
                     index === currentIndex
                       ? "bg-blue-600 w-8"
                       : "bg-gray-300"
                   }`}
                 />
               ))}
             </div>
           </div>
         </div>
       </section>
     );
   }
   ```

3. **Add to Landing Page:**
   
   File: `pages/index.tsx`
   
   ```tsx
   import DemoSection from "../src/components/DemoSection";
   
   // Add after HeroSection:
   <DemoSection isDark={isDark} />
   ```

### Video/Image Specifications

- **Video formats:** MP4 (H.264), WebM
- **Image formats:** PNG, JPG, WebP
- **Recommended sizes:**
  - Demo screenshots: 1920x1080px (16:9) or 1440x900px
  - Thumbnails: 1280x720px
- **File size:** Optimize images (use tools like [TinyPNG](https://tinypng.com/))

---

## 4. Customizing the Footer

### Current Implementation

The footer is located in `src/components/Footer.tsx` and includes:
- CTA button
- Logo and GitHub star
- Platform links
- Solutions links
- Resources links
- Compare links
- Support links
- Legal links and copyright

### Step-by-Step Instructions

1. **Update Footer Links:**
   
   File: `src/components/Footer.tsx`
   
   Modify the link sections (starting around line 34):
   
   ```tsx
   {/* Platform Section */}
   <div>
     <h3 className="text-white font-semibold mb-4">Platform</h3>
     <ul className="space-y-3 text-gray-400">
       <li>
         <Link href="/your-link" className="hover:text-white transition-colors">
           Your Link Text
         </Link>
       </li>
       {/* Add more links as needed */}
     </ul>
   </div>
   ```

2. **Update CTA Button:**
   
   File: `src/components/Footer.tsx` (around line 27-31)
   
   ```tsx
   <div className="text-center mb-16">
     <Link
       href="/subscribe"
       className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center">
       Start publishing now →
     </Link>
   </div>
   ```

3. **Update Copyright Text:**
   
   File: `src/components/Footer.tsx` (around line 314)
   
   ```tsx
   <span>Saby Technologies @ 2025</span>
   ```
   
   Change to your desired copyright text.

4. **Update Social Links:**
   
   The footer doesn't currently have social links, but you can add them:
   
   ```tsx
   {/* Add after the CTA section */}
   <div className="flex justify-center gap-4 mb-12">
     <a
       href="https://twitter.com/yourhandle"
       target="_blank"
       rel="noopener noreferrer"
       className="text-gray-400 hover:text-white transition-colors">
       Twitter
     </a>
     <a
       href="https://linkedin.com/company/yourcompany"
       target="_blank"
       rel="noopener noreferrer"
       className="text-gray-400 hover:text-white transition-colors">
       LinkedIn
     </a>
     {/* Add more social links */}
   </div>
   ```

5. **Update Badges/Certifications:**
   
   File: `src/components/Footer.tsx` (around lines 264-295)
   
   Modify or remove the certification badges:
   
   ```tsx
   <div className="flex items-center space-x-6 mb-6 md:mb-0">
     <div className="flex items-center space-x-2">
       <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
         <span className="text-xs font-bold text-gray-900">YOUR</span>
       </div>
       <div className="text-sm">
         <div className="text-white font-medium">CERTIFICATION</div>
         <div className="text-gray-400 text-xs">TEXT</div>
       </div>
     </div>
     {/* Add or remove more badges */}
   </div>
   ```

6. **Update GitHub Star Count:**
   
   File: `src/components/Footer.tsx` (around line 50)
   
   ```tsx
   <span className="bg-gray-800 px-3 py-2 rounded-lg text-sm">
     12,847
   </span>
   ```
   
   Update with your actual GitHub star count or remove if not applicable.

---

## 5. Other Common Customizations

### Changing Brand Colors

The brand color (blue) is used throughout the site. To change it:

1. **Update Tailwind Config:**
   
   File: `tailwind.config.js`
   
   ```javascript
   theme: {
     extend: {
       colors: {
         brand: {
           primary: '#YOUR_COLOR',
           secondary: '#YOUR_SECONDARY_COLOR',
         },
       },
     },
   },
   ```

2. **Find and Replace Color Classes:**
   
   Search for `blue-600`, `blue-500`, etc., and replace with your brand color:
   - `bg-blue-600` → `bg-brand-primary`
   - `text-blue-600` → `text-brand-primary`
   - `border-blue-600` → `border-brand-primary`

   Common files to update:
   - `src/components/Navigation.tsx`
   - `src/components/HeroSection.tsx`
   - `src/components/Footer.tsx`
   - `pages/pricing.tsx`
   - `pages/subscribe.tsx`

### Updating Navigation Links

File: `src/components/Navigation.tsx`

1. **Update Menu Items:**
   - Product dropdown (lines 70-89)
   - Resources dropdown (lines 108-127)
   - Direct links (Pricing, Explore)

2. **Update Social Links:**
   - X (Twitter) link (line 134)
   - Discord link (line 153)
   - GitHub link (line 165)

### Modifying Hero Section Content

File: `src/components/HeroSection.tsx`

1. **Update Headline Words:**
   - Primary words (lines 13-24)
   - Secondary words (lines 26-37)

2. **Update Subtitle:**
   - Line 175-178

3. **Update Stats:**
   - Lines 201-258 (Companies, Uptime, Data Points, Support)

4. **Update Announcement Badge:**
   - Lines 115-118

### Updating Stats and Metrics

File: `src/components/HeroSection.tsx` (lines 201-258)

```tsx
<div className="text-center">
  <div className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
    YOUR_STAT
  </div>
  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
    YOUR_LABEL
  </div>
</div>
```

### Changing Typography

1. **Update Font Family:**
   
   File: `tailwind.config.js`
   
   ```javascript
   theme: {
     extend: {
       fontFamily: {
         russo: ['"Russo One"', "sans-serif"],
         // Add your custom font
         custom: ['"Your Font"', "sans-serif"],
       },
     },
   },
   ```

2. **Update Font in Components:**
   
   Replace `font-russo` with `font-custom` where needed.

3. **Update Google Fonts:**
   
   File: `pages/_document.tsx`
   
   Update the Google Fonts link to include your font.

### Updating Social Media Links

1. **Navigation Social Links:**
   
   File: `src/components/Navigation.tsx`
   - X (Twitter): line 134
   - Discord: line 153
   - GitHub: line 165

2. **Update URLs:**
   ```tsx
   href="https://x.com/YOUR_HANDLE"
   href="https://discord.gg/YOUR_SERVER"
   href="https://github.com/YOUR_ORG/YOUR_REPO"
   ```

---

## Quick Reference: File Locations

| Component | File Path |
|-----------|-----------|
| Navigation | `src/components/Navigation.tsx` |
| Footer | `src/components/Footer.tsx` |
| Hero Section | `src/components/HeroSection.tsx` |
| Landing Page | `pages/index.tsx` |
| Document Head | `pages/_document.tsx` |
| Tailwind Config | `tailwind.config.js` |
| Static Assets | `public/` (create if needed) |

---

## Best Practices

1. **Image Optimization:**
   - Use Next.js `Image` component for automatic optimization
   - Compress images before adding to the project
   - Use WebP format when possible

2. **File Organization:**
   - Keep logos in `public/` root or `public/logos/`
   - Keep demo images in `public/demo/`
   - Keep videos in `public/videos/` or use external hosting

3. **Version Control:**
   - Commit logo and favicon files
   - Don't commit large video files (use external hosting)
   - Document changes in commit messages

4. **Testing:**
   - Test logo visibility in both light and dark modes
   - Test favicon in different browsers
   - Test video playback on different devices
   - Test footer links and ensure they work

5. **Accessibility:**
   - Always include `alt` text for images
   - Ensure logo has proper contrast
   - Test keyboard navigation for modals

---

## Troubleshooting

### Logo not showing
- Check file path is correct (should start with `/` for public folder)
- Ensure file exists in `public/` folder
- Check browser console for 404 errors

### Favicon not updating
- Clear browser cache
- Check file is in `public/` folder
- Verify links in `_document.tsx` are correct

### Video not playing
- Check video URL is correct
- Ensure video is publicly accessible
- Check browser console for errors

### Footer links not working
- Verify `href` attributes are correct
- Check if pages exist for internal links
- Test external links in a new tab

---

## Need Help?

If you encounter issues or need assistance with customizations not covered in this guide:

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Review the [Tailwind CSS Documentation](https://tailwindcss.com/docs)
3. Check existing components for similar implementations
4. Review the project's `README.md` and `CONTRIBUTING.md`

---

**Last Updated:** 2025-01-XX
**Template Version:** 1.0.0

