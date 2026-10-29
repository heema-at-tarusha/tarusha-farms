/**
 * ==============================================================================
 * TarUsha - Home & Residential Gardens Project Data
 * ==============================================================================
 * 
 * HOW TO MANAGE OR ADD PROJECTS IN THE FUTURE:
 * ------------------------------------------------------------------------------
 * 1. Place your project photos into `assets/home-gardens/projects/`
 * 2. Copy the template block below and add it to the `homeGardenProjects` array.
 * 3. Fill in the fields (title, location, gardenType, challenges, approach, outcome, etc.)
 * 4. Save this file and refresh your browser. The new project will automatically
 *    render into the editorial showcase with its gallery and inquiry buttons!
 * 
 * ==============================================================================
 */

const homeGardenCategories = [
    {
        id: 'balcony-gardens',
        title: 'Balcony Gardens',
        subtitle: 'Turn Compact Urban Balconies into Lush Green Sanctuaries',
        description: 'Engineered specifically for apartments and flats. Utilizing vertical space, lightweight planter frames, railing boxes, and automated drip lines that keep your balcony spotless, mud-free, and full of life.',
        image: 'assets/g3.jpg',
        fallbackImage: 'assets/kit-starter.jpg',
        features: [
            'Vertical tiered wall frames to maximize floor area',
            'Zero water leakage or dirty runoff onto lower floors',
            'Low-maintenance air-purifying foliage and shade ferns',
            'Integrated micro-drip irrigation on smart timer'
        ],
        ctaText: 'Explore Balcony Setups'
    },
    {
        id: 'rooftop-terrace-gardens',
        title: 'Rooftop & Terrace Gardens',
        subtitle: 'Expansive Open-Air Retreats for Relaxation and Entertaining',
        description: 'Custom rooftop landscaping designed to withstand intense North Indian summer heat and wind exposure. Modular raised beds, pergolas, fruit-bearing shrubs, and cooling green canopies tailored to your roof’s structural load.',
        image: 'assets/g1.jpeg',
        fallbackImage: 'assets/farm.jpg',
        features: [
            'Lightweight growing media engineered for roof load safety',
            'Automated closed-loop watering that thrives even when you travel',
            'Wind-tolerant screening plants and flowering perennials',
            'Natural ambient temperature reduction for the top floor'
        ],
        ctaText: 'Explore Terrace Gardens'
    },
    {
        id: 'kitchen-vegetable-gardens',
        title: 'Home Vegetable & Kitchen Gardens',
        subtitle: 'Harvest Clean, Pesticide-Free Greens Steps from Your Pan',
        description: 'Grow your own culinary herbs, fresh salad greens, bell peppers, and cherry tomatoes at home. Available in modular soil-less hydroponic systems and organic sub-irrigated planters.',
        image: 'assets/g5.jpg',
        fallbackImage: 'assets/indoor_dutch_bucket.jpeg',
        features: [
            'Daily harvest of fresh Spearmint, Basil, Coriander & Spinach',
            '100% free from synthetic pesticides and harmful chemical sprays',
            'Rapid turnaround with up to 3x faster growth cycles',
            'Easy weekly nutrient monitoring with minimal maintenance'
        ],
        ctaText: 'Explore Kitchen Gardens'
    },
    {
        id: 'custom-residential',
        title: 'Custom Residential Green Spaces',
        subtitle: 'Bespoke Courtyards, Living Walls & Experiential Green Corners',
        description: 'From aesthetic vertical living walls in home lobbies and patios to serene reading alcoves and experiential family gardens. We collaborate with homeowners and interior designers to build living architecture.',
        image: 'assets/vertical_wall.jpg',
        fallbackImage: 'assets/g2.jpg',
        features: [
            'Bespoke architectural living green wall installations',
            'Indoor grow-light integration for low-light corridors',
            'Sensory and aromatic botanical design',
            'Full turnkey setup with ongoing botanical health checks'
        ],
        ctaText: 'Plan a Custom Space'
    }
];

const homeGardenProjects = [
    {
        id: 'project-dlf-phase-5-terrace',
        title: 'The Private Home: All-Season Terrace Retreat',
        location: 'Sector 64, Gurgaon',
        gardenType: 'Rooftop & Terrace Garden',
        area: '2000 sq ft',
        duration: '1 week Turnkey Setup',
        featuredImage: 'assets/home-gardens/projects/1main.jpeg',
        gallery: [
            'assets/home-gardens/projects/1g1.jpeg',
            'assets/home-gardens/projects/1g2.jpeg'
        ],
        beforeImage: 'assets/home-gardens/projects/1before.jpeg', // Leave empty string or add 'assets/home-gardens/projects/dlf-before.jpg'
        afterImage: 'assets/home-gardens/projects/1g1.jpeg',
        clientRequirement: 'The homeowner wanted to convert an underutilized, barren 2000 sq ft top-floor terrace into a tranquil green sanctuary for growing vegetables and daily fresh culinary herbs, without the mess of heavy mud pots.',
        challenges: [
            'Direct, unshaded exposure to Gurgaon summer temperatures exceeding 44°C',
            'High wind velocities on the upper floor causing rapid moisture evaporation',
            'Strict structural requirement to avoid heavy waterlogging or water seepage into the roof slab',
            'Homeowners travel regularly and needed a self-sustaining irrigation solution'
        ],
        approach: 'TarUsha engineered a lightweight, modular terrace layout using specialized coco-peat and perlite media rather than heavy soil. We positioned heat-resilient flowering bougainvillea and windbreaks along the outer perimeter, creating a sheltered microclimate for inner tiers of mint, holy basil, and cherry tomatoes. A battery-backed automated micro-drip system was connected directly to the terrace tap line.',
        systemsAndPlants: [
            'Automated Micro-Drip Irrigation with programmable digital timer',
            'Lightweight UV-stabilized HDPE Dutch bucket system with root aeration',
            'Culinary Herbs: Spearmint, Holy Basil (Tulsi), Thai Basil, Oregano, Mexican Mint',
            'Vegetables: Heirloom Cherry Tomatoes, Green Chillies',
            'Foliage & Flowering: Syngoniums, Petunia, Tulips in shaded corners'
        ],
        outcome: 'A vibrant, all-season living terrace that lowered the room temperature below by ~2°C. The automated system ensures plants thrive with zero daily manual watering, yielding fresh culinary herbs for every evening meal.',
        inquiryMessage: 'Hi TarUsha, I saw "The Private Home: All-Season Terrace Retreat project on your site and would like to explore a similar garden for my terrace.'
    },
 
{
    id: 'project-sector-86-quaint-corner',
    title: 'A Quaint Green Corner: Blue Pea Flowers & Homegrown Tea',
    location: 'Sector 86, Gurgaon',
    gardenType: 'Compact Home Garden & Flower Garden',
    area: '',
    duration: '',
    featuredImage: 'assets/home-gardens/projects/2after.jpeg',
    gallery: [
        'assets/home-gardens/projects/2before.jpg',
        'assets/home-gardens/projects/2after.jpeg'
    ],
    beforeImage: 'assets/home-gardens/projects/2before.jpg',
    afterImage: 'assets/home-gardens/projects/2after.jpeg',
    clientRequirement: 'The homeowner wanted to transform an underutilised corner into a quaint, green space that would add beauty to her home while offering something useful in return: fresh blue pea flowers to brew into tea.',
    challenges: [
        'Making a small corner feel inviting and green without overwhelming the available space',
        'Combining ornamental greenery with plants that offer a practical, everyday benefit',
        'Creating a visually appealing arrangement that makes effective use of the available growing space'
    ],
    approach: 'TarUsha designed a charming green corner combining blue pea creepers, spider plants and Mexican mint in a Dutch bucket growing system. The arrangement brings together climbing greenery, attractive foliage and a useful flowering plant, turning an ordinary corner into a living feature that adds character to the space while giving the homeowner access to fresh blue pea flowers for her tea.',
    systemsAndPlants: [
        'Dutch bucket growing system',
        'Blue pea (butterfly pea) creepers for fresh flowers to brew into tea',
        'Spider plants for ornamental foliage',
        'Mexican mint for aromatic greenery'
    ],
    outcome: 'A once-unremarkable corner became a quaint, living green feature with both ornamental and practical value. The blue pea creepers add colour and provide flowers the homeowner can use to prepare tea, while the spider plants and Mexican mint bring variety and texture to the arrangement. The project demonstrates how even a small space can be made greener, more personal and more rewarding.',
    inquiryMessage: 'Hi TarUsha, I saw your quaint corner garden project in Sector 86, Gurgaon, and would love to explore a similar setup for my home.'
}

];

// Export for browser script or node environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { homeGardenCategories, homeGardenProjects };
}
