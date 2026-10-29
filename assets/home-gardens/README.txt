================================================================================
TarUsha Home & Residential Gardening - Asset Storage Guide
================================================================================

This directory stores photographs for your residential projects showcase page (home-gardens.html).

1. FOLDER STRUCTURE:
   - assets/home-gardens/categories/
     Place category overview images here:
     - balcony-gardens.jpg (Recommended: 800x600 px, landscape)
     - rooftop-terrace-gardens.jpg (Recommended: 800x600 px, landscape)
     - kitchen-vegetable-gardens.jpg (Recommended: 800x600 px, landscape)
     - custom-residential.jpg (Recommended: 800x600 px, landscape)

   - assets/home-gardens/projects/
     Place client project showcase images here:
     - project1-main.jpg
     - project1-before.jpg (Optional before photo)
     - project1-after.jpg (Optional after photo)
     - project1-detail1.jpg
     - project2-main.jpg
     - project2-before.jpg
     - project2-after.jpg
     - project3-main.jpg (When adding a 3rd project)

2. FORMATS & SIZES:
   - Formats: .jpg, .jpeg, .png, .webp
   - Recommended resolution: 1200x800 px (3:2) or 800x600 px (4:3)
   - Keep file sizes under 400KB per image for optimal page speed.

3. HOW TO CONNECT WITH CODE:
   Simply reference the path in `home-gardens-data.js`, e.g.:
   mainImage: 'assets/home-gardens/projects/project1-main.jpg'

* Note: The page includes graceful fallback handling. If an image file is missing,
  the existing authentic TarUsha project assets (assets/g1.jpg to g6.jpg) or styled
  placeholders display automatically without breaking the layout.
================================================================================
