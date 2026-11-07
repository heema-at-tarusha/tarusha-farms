/**
 * TarUsha Farms — Client Testimonials & Stories Data Engine
 * 
 * ============================================================================
 * HOW TO ADD A NEW VIDEO TESTIMONIAL AS IT IS SHOT:
 * ============================================================================
 * 1. Copy one of the object blocks in `testimonialVideos` below.
 * 2. Paste it at the top of the `testimonialVideos` array.
 * 3. Fill in the clientName, location, quote, and video details.
 *    - For YouTube: set `videoSource: 'youtube'` and `videoId: 'YOUR_YOUTUBE_ID'`.
 *      The thumbnail will automatically generate from YouTube if `thumbnail` is left empty!
 *    - For direct MP4s: set `videoSource: 'mp4'` and `videoUrl: 'assets/videos/filename.mp4'`.
 * 4. Save this file — the video will instantly appear on the website!
 * 
 * ============================================================================
 * HOW TO ADD A NEW GOOGLE BUSINESS PROFILE (GBP) REVIEW:
 * ============================================================================
 * 1. Copy one of the object blocks in `googleReviews` below.
 * 2. Paste it at the top of the `googleReviews` array.
 * 3. Fill in reviewerName, rating (usually 5), date, reviewText, and location/service.
 * 4. Save this file — the review card will immediately render on the page!
 */

const testimonialVideos = [ 
  /*
  {
    id: "verma-dlf-phase-5",
    clientName: "Aditya & Sneha Verma",
    location: "DLF Phase 5, Gurgaon",
    category: "home-gardens", // 'home-gardens' | 'commercial' | 'schools' | 'corporate'
    categoryLabel: "Home Balcony Garden",
    projectTitle: "Compact Balcony Edible Oasis",
    videoSource: "youtube",
    videoId: "LXb3EKWsInQ", // Sample YouTube ID (can be replaced with live video ID)
    thumbnail: "assets/home-gardens/hg_balcony_compact.png",
    duration: "2:14",
    quote: "We harvest fresh spinach, mint, and Italian basil every single week. Zero soil, zero pests, and the automated watering makes it practically effortless.",
    fullStory: "Aditya and Sneha wanted to enjoy pesticide-free greens in their high-rise apartment without dealing with heavy soil pots or water stains on their balcony floor.",
    date: "October 2026",
    featured: true
  },
  {
    id: "singhal-commercial-farm",
    clientName: "Rajiv Singhal",
    location: "Sohna Agricultural Belt, Haryana",
    category: "commercial",
    categoryLabel: "Commercial Hydroponic Farm",
    projectTitle: "1-Acre Polyhouse NFT Facility",
    videoSource: "youtube",
    videoId: "C0DPdy98e4c",
    thumbnail: "assets/commercial-farms/comm_polyhouse_hero.png",
    duration: "3:40",
    quote: "TarUsha took us from an empty plot to harvesting 3.5 tonnes of premium crisphead lettuce per month. Their fertigation skids and agronomy SOPs are world-class.",
    fullStory: "First-generation agripreneur Rajiv Singhal partnered with TarUsha to design, erect, and commission a 4,000 sq m climate-controlled greenhouse supplying NCR supermarkets.",
    date: "September 2026",
    featured: true
  },
  {
    id: "heritage-school-stem",
    clientName: "Dr. Sunita Rao & Students",
    location: "Sector 62, Gurgaon",
    category: "schools",
    categoryLabel: "School Experiential STEM",
    projectTitle: "Campus Living Science Lab",
    videoSource: "youtube",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "assets/media__1779443909593.png",
    duration: "2:05",
    quote: "Our middle school students don't just study biology from textbooks anymore—they measure electrical conductivity, test pH, and harvest their own salad crops.",
    fullStory: "A 400-plant vertical hydroponic educational installation integrated directly into the middle-school biology and environmental science curriculum.",
    date: "August 2026",
    featured: false
  },*/
  {
    id: "Vanshika-Singh-2",
    clientName: "Vanshika Singh ",
    location: "TarUsha Experience Center, Gurgaon",
    category: "General",
    categoryLabel: "Why Hydroponics is the need of the day",
    projectTitle: "Is Hydroponics really needed?",
    videoSource: "youtube",
    videoId: "MRrTL_FaF80",
    thumbnail: "assets/testimonials/vanshika-2.jpg",
    duration: "1:52",
   quote: "With the unreliable market supply of clean, pesticide free food, Hydroponics is the only alternative to traditional farming!",
    fullStory: "Ms Vanshika Singh approached us for learning Hydroponics to get an option. Option to be able to grow food without much hassle. As a frequent traveller, she was concerned of herplant babies suffering neglect. We were curious and asked her why she thinks Hydroponics will help. Hear what she has to say!",
    date: "Oct 2026",
    featured: false
  },
  {
    id: "Vanshika-Singh-1",
    clientName: "Vanshika Singh ",
    location: "TarUsha Experience Center, Gurgaon",
    category: "General",
    categoryLabel: "Why one doesnt trust the food available in the market these days",
    projectTitle: "Is Hydroponics really needed?",
    videoSource: "youtube",
    videoId: "FqbczBPLnUE",
    thumbnail: "assets/testimonials/vanshika-1.jpg",
    duration: "1:21",
    quote: "With the reports of factory produced food, Vanshika feelsone must start preparing for the future!",
    fullStory: "Ms Vanshika Singh approached us for learning Hydroponics to get an option. Option to be able to grow food without much hassle. As a frequent traveller, she was concerned of herplant babies suffering neglect. We were curious and asked her why she thinks Hydroponics will help. Hear what she has to say!",
    date: "Oct 2026",
    featured: false
  }
];

const googleReviews = [
  {
    id: "gbp-1",
    reviewerName: "Naresh Sahijwani",
    reviewerInitials: "NS",
    rating: 5,
    date: "1 week ago",
    reviewText: "The host and the faculty were both par excellence in their respective fields. Their passion, knowledge, and seamless coordination made the workshop a truly enriching experience. Kudos to the entire team for putting together such a well-conceived and professionally executed event. <p>To be candid, owing to my earlier experience in corresponding with the Noida team, I had gone to the workshop with rather modest expectations. In fact, I had already prepared and carried my list of queries in black and white, expecting that I might need to follow up on them later. However, the workshop turned out to be a pleasant surprise and changed my perception of hydroponics considerably. It certainly proved that one should never judge a book by its cover.</p><p> A special word of appreciation for Junior Hema for her warm hospitality and the insightful walkthrough of the live setup. She left no stone unturned in ensuring that visitors felt welcome and informed.</p><p> Arigatou gozaimasu. Domo arigatou. With sincere gratitude and deep appreciation to everyone who made this learning experience memorable.</p>",
    serviceType: "Home and Kitchen Hobby workshop",
    location: "TarUsha Experience centre, Gurgaon",
    verifiedGoogle: true,
    likes: 4
  },
  {
    id: "gbp-2",
    reviewerName: "Sheetal Saini",
    reviewerInitials: "SS",
    rating: 5,
    date: "3 weeks ago",
    reviewText: "Loved the in depth consultation provided by Heema for kitchen garden set up. Amazing produce, must visit and must try.<p>Bought the cherry tomatoes and butterhead lettuce.</p>",
    serviceType: "Farm Visit",
    location: "TarUsha Experience centre, Gurgaon",
    verifiedGoogle: true,
    likes: 7
  },
  {
    id: "gbp-3",
    reviewerName: "Shobhit Saraswat",
    reviewerInitials: "SS",
    rating: 5,
    date: "1 month ago",
    reviewText: "Recently tried lettuce and wheatgrass from Tarusha. The freshness, crunchiness was something I have never experienced before. Those who care for the heath of their families, should definitely give Tarusha Farms a try. Highly recommended.",
    serviceType: "Fresh Produce",
    location: "Sohna Road, Gurgaon",
    verifiedGoogle: true,
    likes: 3
  }/*,
  {
    id: "gbp-4",
    reviewerName: "Megha Nair",
    reviewerInitials: "MN",
    rating: 5,
    date: "2 months ago",
    reviewText: "Our office green walls have completely changed the floor workspace aesthetics. Employees love the farm-to-desk initiative. Beautiful biophilic design, quiet pumps, and flawless setup!",
    serviceType: "Office Green Wall",
    location: "Cyber Hub, Gurgaon",
    verifiedGoogle: true,
    likes: 5
  },
  {
    id: "gbp-5",
    reviewerName: "Chef Vikrant Kapoor",
    reviewerInitials: "VK",
    rating: 5,
    date: "3 months ago",
    reviewText: "Chefs are thrilled with the farm-to-table freshness. Harvesting living microgreens directly on-site elevates dish presentation and punchy flavors. TarUsha's post-installation support is outstanding.",
    serviceType: "Hospitality Microgreens System",
    location: "Sector 29, Gurgaon",
    verifiedGoogle: true,
    likes: 6
  },
  {
    id: "gbp-6",
    reviewerName: "Pooja Chawla",
    reviewerInitials: "PC",
    rating: 5,
    date: "4 months ago",
    reviewText: "Best decision for our kitchen! We have fresh coriander, mint, bok choy, and rosemary available round the clock. The team guided us with every feeding schedule and lighting setup.",
    serviceType: "Kitchen Hydroponic Setup",
    location: "Nirvana Country, Gurgaon",
    verifiedGoogle: true,
    likes: 2
  }*/
];

// Helper functions for easy consumption
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testimonialVideos, googleReviews };
}
