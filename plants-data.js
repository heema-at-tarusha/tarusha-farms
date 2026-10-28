/**
 * ==============================================================================
 * TarUsha Hydroponics - Recommended Plants for Living Green Walls
 * ==============================================================================
 * 
 * HOW TO MANAGE PLANTS ON YOUR PAGE:
 * 1. Save your plant photos inside the folder: assets/plants/
 *    (e.g., assets/plants/money-plant.jpg)
 * 
 * 2. To ADD A NEW PLANT:
 *    Copy one of the objects below and paste it into the `recommendedPlants` array.
 *    Fill in the fields:
 *      - name: Common name of the plant
 *      - botanicalName: Latin/scientific name (optional)
 *      - category: "Foliage" | "Air Purifying" | "Ferns" | "Herbs" | "Flowering"
 *      - image: "assets/plants/your-filename.jpg"
 *      - light: Description of light requirements
 *      - lightLevel: "Low" | "Medium" | "High"
 *      - watering: Watering and hydroponic nutrient solution requirements
 *      - wateringFrequency: "Low" | "Moderate Drip" | "High Circulation"
 *      - suitability: Why it works great on a vertical living wall
 *      - indoorOutdoor: "Indoor" | "Indoor / Semi-Shade" | "Outdoor / High Light"
 * 
 * 3. Save this file and refresh your browser. Your new plant will appear automatically!
 * ==============================================================================
 */

const recommendedPlants = [
    {
        id: 'golden-pothos',
        name: 'Golden Pothos (Money Plant)',
        botanicalName: 'Epipremnum aureum',
        category: 'Air Purifying',
        image: 'assets/plants/golden-pothos.jpg',
        light: 'Bright indirect light to low light. Thrives under artificial grow lights.',
        lightLevel: 'Low-Medium',
        watering: 'Moderate automated drip cycle. Nutrient EC: 1.4 – 1.8 mS/cm, pH 5.5 – 6.5.',
        wateringFrequency: 'Moderate Drip',
        suitability: 'Unrivaled living wall staple. Rapid cascading growth provides lush, dense wall coverage with almost zero leaf drop.',
        benefits: 'High air-purifying capability (removes formaldehyde, benzene, and xylene). Highly resilient to moisture fluctuations.',
        indoorOutdoor: 'Indoor / Semi-Shade'
    },
    {
        id: 'syngonium',
        name: 'Syngonium (Arrowhead Plant)',
        botanicalName: 'Syngonium podophyllum',
        category: 'Foliage',
        image: 'assets/plants/syngonium.jpg',
        light: 'Medium to bright indirect light. Avoid direct scorching sun.',
        lightLevel: 'Medium',
        watering: 'Regular drip cycles. Prefers evenly moist root zones. Nutrient EC: 1.2 – 1.6 mS/cm, pH 5.8 – 6.2.',
        wateringFrequency: 'Moderate Drip',
        suitability: 'Distinctive arrow-shaped leaves create dynamic texturing and contrasting shades of variegated green, cream, or pink.',
        benefits: 'Excellent humidity tolerance; thrives in vertical pocket systems and hydroponic felt channels.',
        indoorOutdoor: 'Indoor / Semi-Shade'
    },
    {
        id: 'boston-fern',
        name: 'Boston Fern',
        botanicalName: 'Nephrolepis exaltata',
        category: 'Ferns',
        image: 'assets/plants/boston-fern.jpg',
        light: 'Filtered, indirect sunlight or diffused grow lighting. No harsh direct sun.',
        lightLevel: 'Medium',
        watering: 'High moisture consistency. Continuous micro-drip or automated misting. EC: 1.0 – 1.4 mS/cm, pH 5.5 – 6.0.',
        wateringFrequency: 'High Circulation',
        suitability: 'Feathery, cascading fronds soften geometric edges and hide structural wall modules with dramatic lushness.',
        benefits: 'Natural room humidifier and efficient air cleanser. Loves vertical hydroponic humidity.',
        indoorOutdoor: 'Indoor / Balcony Shade'
    },
    {
        id: 'peace-lily',
        name: 'Peace Lily',
        botanicalName: 'Spathiphyllum wallisii',
        category: 'Flowering',
        image: 'assets/plants/peace-lily.jpg',
        light: 'Low to moderate indirect light. Excellent for interior office and lobby walls.',
        lightLevel: 'Low',
        watering: 'Consistent hydration with high root oxygenation. EC: 1.2 – 1.5 mS/cm, pH 5.8 – 6.5.',
        wateringFrequency: 'Moderate Drip',
        suitability: 'Deep glossy green leaves with elegant white blooms that create striking focal accents on vertical living walls.',
        benefits: 'NASA top-rated air cleanser for VOC absorption. Communicates hydration needs visibly.',
        indoorOutdoor: 'Indoor'
    },
    {
        id: 'spider-plant',
        name: 'Spider Plant',
        botanicalName: 'Chlorophytum comosum',
        category: 'Air Purifying',
        image: 'assets/plants/spider-plant.jpg',
        light: 'Bright indirect light, semi-shade, or fluorescent / LED fixtures.',
        lightLevel: 'Low-Medium',
        watering: 'Moderate watering. Tolerates occasional dry cycles well. EC: 1.2 – 1.6 mS/cm, pH 6.0 – 6.5.',
        wateringFrequency: 'Moderate Drip',
        suitability: 'Arched variegated ribbons and cascading plantlets ("spidrettes") add wonderful depth, volume, and movement.',
        benefits: 'Very hardy, resilient against root rot, safe for pets, and powerful air purifier.',
        indoorOutdoor: 'Indoor / Semi-Shade'
    },
    {
        id: 'philodendron-oxycardium',
        name: 'Heartleaf Philodendron',
        botanicalName: 'Philodendron hederaceum',
        category: 'Foliage',
        image: 'assets/plants/philodendron-oxycardium.jpg',
        light: 'Medium to bright indirect light; also performs reliably in dim indoor settings.',
        lightLevel: 'Low-Medium',
        watering: 'Moderate automated drip cycles. Ensure good drainage. EC: 1.2 – 1.7 mS/cm, pH 5.6 – 6.2.',
        wateringFrequency: 'Moderate Drip',
        suitability: 'Graceful cascading heart-shaped leaves that drape effortlessly over modules, filling vertical gaps quickly.',
        benefits: 'Extremely forgiving, pest resistant, and tolerates variable office indoor temperatures.',
        indoorOutdoor: 'Indoor / Semi-Shade'
    },
    {
        id: 'aglaonema',
        name: 'Aglaonema (Chinese Evergreen)',
        botanicalName: 'Aglaonema commutatum',
        category: 'Foliage',
        image: 'assets/plants/aglaonema.jpg',
        light: 'Low to medium diffused light. Perfect for spaces with limited natural sunlight.',
        lightLevel: 'Low',
        watering: 'Low to moderate watering cycle. Highly resilient to lower moisture. EC: 1.0 – 1.4 mS/cm, pH 5.8 – 6.5.',
        wateringFrequency: 'Low',
        suitability: 'Broad patterned foliage with silver, cream, and pink variegations that break up green wall monotony with artistic contrast.',
        benefits: 'Exceptional slow-growth stability; requires minimal trimming or pruning on vertical installations.',
        indoorOutdoor: 'Indoor'
    },
    {
        id: 'english-ivy',
        name: 'English Ivy',
        botanicalName: 'Hedera helix',
        category: 'Foliage',
        image: 'assets/plants/english-ivy.jpg',
        light: 'Medium indirect light to bright filtered sunlight.',
        lightLevel: 'Medium-High',
        watering: 'Evenly moist root medium. Well-aerated nutrient solution. EC: 1.4 – 1.8 mS/cm, pH 6.0 – 6.5.',
        wateringFrequency: 'Moderate Drip',
        suitability: 'Classic trailing vines with lobed leaves that weave across panels to establish seamless, continuous living tapestries.',
        benefits: 'Durable, long-lived, and proven in temperature-controlled lobbies and covered building facades.',
        indoorOutdoor: 'Indoor / Outdoor Shade'
    },
    {
        id: 'wandering-jew',
        name: 'Wandering Dude (Tradescantia)',
        botanicalName: 'Tradescantia zebrina',
        category: 'Foliage',
        image: 'assets/plants/wandering-jew.jpg',
        light: 'Bright indirect light (maintains rich purple & silver foliage coloration).',
        lightLevel: 'Medium-High',
        watering: 'Moderate regular drip. Aerated nutrient solution. EC: 1.2 – 1.6 mS/cm, pH 5.8 – 6.3.',
        wateringFrequency: 'Moderate Drip',
        suitability: 'Vibrant metallic purple and silver striped leaves provide an eye-catching splash of colour amidst green foliage.',
        benefits: 'Fast vegetative growth and effortless propagation from vertical clippings.',
        indoorOutdoor: 'Indoor / Semi-Shade'
    },
    {
        id: 'hydroponic-mint',
        name: 'Spearmint / Peppermint',
        botanicalName: 'Mentha spicata',
        category: 'Herbs',
        image: 'assets/plants/mint.jpg',
        light: 'Bright indirect to direct light (4–6 hours daily or full-spectrum LED grow lamps).',
        lightLevel: 'High',
        watering: 'High water requirement. Continuous nutrient flow. EC: 1.8 – 2.2 mS/cm, pH 5.5 – 6.2.',
        wateringFrequency: 'High Circulation',
        suitability: 'Popular edible wall choice for commercial kitchens, cafés, hotel terraces, and wellness spaces.',
        benefits: 'Aromatic sensory appeal with continuous culinary harvest potential. Highly vigorous root growth.',
        indoorOutdoor: 'Balcony / Sunny Wall / Indoor with Grow Lights'
    }
];

// Export for browser script or node environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { recommendedPlants };
}
