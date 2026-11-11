/**
 * TarUsha Blog Articles Database
 * 
 * =========================================================================
 * HOW TO PUBLISH A NEW ON-SITE ARTICLE:
 * =========================================================================
 * 1. Duplicate 'blog-template.html' and rename to your article's slug 
 *    (e.g., 'blog-monsoon-hydroponics.html').
 * 2. Paste your article content into the clearly commented zones of the HTML.
 * 3. Add a new article entry at the top of the 'blogArticles' array below:
 * 
 *    {
 *      "id": 4,
 *      "title": "Your Article Headline",
 *      "category": "Future Living", // e.g. Future Living, Urban Farming, Wellness & Health, Home Hydroponics
 *      "snippet": "A compelling 2-3 sentence teaser summarizing what the reader will learn...",
 *      "url": "blog-monsoon-hydroponics.html", // Links to your new on-site page
 *      "type": "article",                      // "article" (on-site full post) or "linkedin" (external)
 *      "linkedInUrl": "https://www.linkedin.com/pulse/...", // Optional cross-post link
 *      "imageUrl": "assets/blog/your-image.jpg",
 *      "date": "August 15, 2026",
 *      "readTime": "5 min read",
 *      "featured": true
 *    }
 * 
 * That's it! It automatically appears on blog.html with category filtering and thumbnail cards.
 */

const blogArticles = [
  {
    "id": 3,
    "title": "The Future Kitchen Will Grow Its Own Food",
    "category": "Future Living",
    "snippet": "For decades kitchens were designed around storing food. We built bigger refrigerators and smarter pantries. But what if the next generation of kitchens wasn't designed to store dying food—but to harvest living plants on demand?",
    "url": "blog-future-kitchen.html",
    "type": "article",
    "linkedInUrl": "https://www.linkedin.com/pulse/future-kitchen-grow-its-own-food-heema-hemant-kumar-rvgxc/?trackingId=NRXrYOymR4eKVe9ZVD1ekA%3D%3D",
    "imageUrl": "assets/blog/3.jpg",
    "date": "July 7, 2026",
    "readTime": "5 min read",
    "featured": true
  },
  {
    "id": 1,
    "title": "Your Next Salary Increment May Not Improve Your Health",
    "category": "Wellness & Health",
    "snippet": "Every year, millions of professionals celebrate a salary increment. A bigger paycheck often brings a better phone, a newer car, or a larger home. Yet there is one thing that doesn't automatically improve with income: the biological freshness of what we eat.",
    "url": "https://www.linkedin.com/pulse/your-next-salary-increment-may-improve-health-heema-hemant-kumar-ekpjc/",
    "type": "linkedin",
    "imageUrl": "assets/blog/1.jpeg",
    "date": "July 9, 2026",
    "readTime": "3 min read",
    "featured": false
  },
  {
    "id": 2,
    "title": "The Most Valuable Real Estate in Your Home Isn't the Living Room",
    "category": "Urban Living",
    "snippet": "People spend years saving for larger apartments, optimizing storage and maximizing comfort. But the most underutilized, high-impact square footage in any urban home is often the sunny balcony or utility space waiting to become a fresh living garden.",
    "url": "https://www.linkedin.com/pulse/most-valuable-real-estate-your-home-isnt-living-room-hemant-kumar-l03tc/",
    "type": "linkedin",
    "imageUrl": "assets/blog/2.jpeg",
    "date": "July 8, 2026",
    "readTime": "5 min read",
    "featured": false
  }
];

if (typeof window !== 'undefined') {
  window.blogArticles = blogArticles;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = blogArticles;
}

