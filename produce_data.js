/**
 * =======================================================================
 * TARUSHA FARMS — FRESH PRODUCE & HARVEST CATALOG DATA
 * =======================================================================
 * 
 * HOW TO EDIT THIS FILE:
 * 1. TO ADD A NEW PRODUCT:
 *    Copy an existing product block below inside PRODUCE_CATALOG, 
 *    paste it, and give it a unique 'id' (e.g. 'prod-coriander').
 * 
 * 2. TO CHANGE PRICES OR SIZES:
 *    Simply update the 'price' (number in INR) and 'unit' string.
 * 
 * 3. TO MARK AS OUT OF STOCK:
 *    Set 'inStock: false'. It will show as "Harvest Sold Out" on the website.
 * 
 * 4. TO UPDATE HARVEST DAYS OR OPERATIONAL SETTINGS:
 *    Update the STORE_CONFIG section below.
 * =======================================================================
 */

const STORE_CONFIG = {
    farmName: "TarUsha Hydroponic Farm",
    farmLocation: "Sector 64, Gurgaon",
    farmPincode: "122101",
    whatsappNumber: "919220902015",
    // Harvest slots (harvested on-demand for maximum freshness)
    harvestDays: [
        { id: "wednesday", label: "Wednesday Morning (Order by Tuesday 8 PM)" },
        { id: "friday", label: "Friday Morning (Order by Thursday 8 PM)" }
    ],
    // Delivery policy
    deliveryPolicy: {
        method: "Porter",
        chargeType: "actuals",
        tagline: "Delivery on actuals via Porter (or free self-pickup from Sector 64)",
        estimatedRange: "₹40 – ₹110 within 10 km depending on exact sector distance",
        freePickupAddress: "TarUsha, 2nd Floor, Khatana Palace, Sector 64, Gurgaon 122101"
    },
    // Max hyperlocal radius
    serviceRadiusKm: 10,
    // Minimum order recommendation
    minOrderValue: 200
};

// =======================================================================
// SECTORS & LOCALITIES WITHIN 10 KM OF SECTOR 64, GURGAON
// =======================================================================
const SERVICEABLE_SECTORS = [
    // Golf Course Extension Road & SPR Corridor
    { name: "Sector 64", area: "Golf Course Extn Rd / Sohna Rd", km: 0.5 },
    { name: "Sector 65", area: "M3M Golfestate / Worldmark", km: 1.5 },
    { name: "Sector 66", area: "Emaar Palm Drive / Marbella", km: 2.0 },
    { name: "Sector 67", area: "Ireo Victory Valley / Bestech", km: 2.5 },
    { name: "Sector 68", area: "Sohna Road Corridor", km: 3.5 },
    { name: "Sector 69", area: "Tulip Violet / SPR", km: 3.5 },
    { name: "Sector 70", area: "Kocoon / AIPL Peaceful Homes", km: 4.0 },
    { name: "Sector 70A", area: "BPTP Astaire / Tata Primanti", km: 4.5 },
    { name: "Sector 71", area: "CHD Avenue / SPR", km: 5.0 },
    { name: "Sector 72", area: "Subhash Chowk / Hero Honda", km: 5.5 },
    { name: "Sector 73", area: "Spaze Privvy / SPR", km: 5.5 },
    { name: "Sector 74", area: "DLF Corporate Greens", km: 6.5 },
    { name: "Sector 75", area: "Southern Peripheral Road", km: 7.0 },

    // Established Central & Sohna Road Enclaves
    { name: "Sector 47", area: "Malibu Towne / Uniworld Gardens", km: 5.5 },
    { name: "Sector 48", area: "Vipul World / Sispal Vihar", km: 4.5 },
    { name: "Sector 49", area: "South City 2 / Rosewood City", km: 3.5 },
    { name: "Sector 50", area: "Nirvana Country / Unitech Fresco", km: 3.0 },
    { name: "Sector 51", area: "Mayfield Garden / Artemis", km: 4.0 },
    { name: "Sector 52", area: "Wazirabad / Ardee City", km: 5.5 },
    { name: "Sector 53", area: "DLF Phase 5 / Golf Course Rd", km: 6.5 },
    { name: "Sector 54", area: "The Camellias / Magnolias / Aralias", km: 7.0 },
    { name: "Sector 55", area: "Golf Course Extension / Rapid Metro", km: 4.5 },
    { name: "Sector 56", area: "Kendriya Vihar / Huda Market", km: 4.0 },
    { name: "Sector 57", area: "Sushant Lok 2 / Rail Vihar", km: 3.5 },
    { name: "Sector 58", area: "Grand Hyatt Residences / Ireo", km: 3.0 },
    { name: "Sector 59", area: "Tata Raisina / Ireo Skyon", km: 3.5 },
    { name: "Sector 60", area: "Pioneer Araya / Presidia", km: 2.5 },
    { name: "Sector 61", area: "Pioneer Urban / Smart World", km: 2.0 },
    { name: "Sector 62", area: "Pioneer Urban Square / Heritage", km: 1.5 },
    { name: "Sector 63", area: "Paras Trinity / Dhoot Time", km: 1.5 },
    { name: "Sector 42", area: "DLF Golf Course / Rapid Metro", km: 8.5 },
    { name: "Sector 43", area: "Sushant Lok 1 / Galleria", km: 8.5 },
    { name: "Sector 45", area: "Greenwood City / Fortis", km: 7.5 },
    { name: "Sector 46", area: "Near Bakhtawar Chowk", km: 6.5 }
];

// =======================================================================
// PRODUCE CATALOG (Easily Editable)
// =======================================================================
const PRODUCE_CATALOG = [
    // -------------------------------------------------------------------
    // 1. SALAD BOXES
    // -------------------------------------------------------------------
    {
        id: "prod-chef-salad",
        name: "Chef's Gourmet Salad Box",
        category: "salad-boxes",
        price: 449,
        unit: "Harvest Box (approx. 350g • 3–4 Salads)",
        tag: "Bestseller",
        badgeColor: "#1e3b22",
        harvestSchedule: "Harvested Fresh Wed & Fri",
        description: "A chef-curated blend of crisp Butterhead, ruby Lollo Rosso, crunchy Romaine, finished with a living radish microgreens garnish.",
        image: "assets/salad/chefgourmet.jpg",
        inStock: true
    },
    {
        id: "prod-crunch-salad",
        name: "Mediterranean Crunch Box",
        category: "salad-boxes",
        price: 299,
        unit: "Harvest Box (approx. 300g • 2–3 Salads)",
        tag: "Family Favorite",
        badgeColor: "#2c5e3b",
        harvestSchedule: "Harvested Fresh Wed & Fri",
        description: "Crisp romaine leaves, fresh Italian basil leaves, and crunchy cucmbers. High crunch factor, zero pesticides, washed with pure filtered water.",
        image: "assets/salad/crunch.jpg",
        inStock: true
    },
    {
        id: "prod-superfood-box",
        name: "Superfood Detox Green Box",
        category: "salad-boxes",
        price: 399,
        unit: "Harvest Box (approx. 400g • 4 Salads)",
        tag: "High Nutrient",
        badgeColor: "#416d19",
        harvestSchedule: "Harvested Fresh Wed & Fri",
        description: "Powerhouse cleansing greens featuring baby curly kale, tender baby spinach, crisp locarno lettuce, fresh mint, and concentrated broccoli microgreens.",
        image: "assets/salad/superfood.jpg",
        inStock: true
    },

    // -------------------------------------------------------------------
    // 2. LIVING MICROGREENS
    // -------------------------------------------------------------------
    {
        id: "prod-radish-micro",
        name: "Zesty White Radish Microgreens",
        category: "microgreens",
        price: 120,
        unit: "1 Living Punnet (with root base)",
        tag: "Zesty & Spicy",
        badgeColor: "#c0392b",
        harvestSchedule: "Delivered Living on Root Base",
        description: "Vibrant pink-stemmed radish microgreens with an invigorating peppery bite. Delivered alive in punnet for 7+ days fresh kitchen shelf life.",
        image: "assets/microgreens/whiteradish.jpg",
        inStock: true
    },
    {
        id: "prod-broccoli-micro",
        name: "Broccoli Microgreens (Sulforaphane Rich)",
        category: "microgreens",
        price: 140,
        unit: "1 Living Punnet (with root base)",
        tag: "Superfood",
        badgeColor: "#27ae60",
        harvestSchedule: "Delivered Living on Root Base",
        description: "Gentle nutty flavor loaded with up to 50x the sulforaphane antioxidant density of mature broccoli. Perfect for morning eggs, juices, and toasts.",
        image: "assets/microgreens/brocolli.jpg",
        inStock: true
    },
    {
        id: "prod-pea-shoots",
        name: "Crunchy Sweet Pea Shoots",
        category: "microgreens",
        price: 130,
        unit: "1 Living Punnet (with root base)",
        tag: "Sweet & Crisp",
        badgeColor: "#2e7d32",
        harvestSchedule: "Delivered Living on Root Base",
        description: "Sweet, succulent pea tendrils loved by kids and gourmet chefs. Rich in plant protein, vitamins A, C, and essential minerals.",
        image: "assets/microgreens/pea.jpg",
        inStock: true
    },
    {
        id: "prod-micro-trio",
        name: "Superfood Microgreens Trio Pack",
        category: "microgreens",
        price: 449,
        unit: "Bundle of 3 Living Punnets",
        tag: "Save ₹40 • Trio Value",
        badgeColor: "#1e3b22",
        harvestSchedule: "Delivered Living on Root Base",
        description: "The complete superfood trifecta: 1x Broccoli, 1x Zesty Radish, and 1x Sweet Pea Shoots. Snip fresh leaves right at your kitchen counter.",
        image: "assets/microgreens/trio.jpg",
        inStock: true
    },

    // -------------------------------------------------------------------
    // 3. CULINARY & EXOTIC HERBS
    // -------------------------------------------------------------------
    {
        id: "prod-sweet-basil",
        name: "Italian Genovese Sweet Basil",
        category: "herbs",
        price: 60,
        unit: "Fresh Cut Bunch (50g)",
        tag: "Aromatic",
        badgeColor: "#2e7d32",
        harvestSchedule: "Harvested Fresh Wed & Fri",
        description: "Authentic broad-leaf Italian basil bursting with essential oils and sweet aroma. Clean hydroponic stems, perfect for pesto, pasta, and pizza.",
        image: "assets/herbs/basil.jpg",
        inStock: true
    },
    {
        id: "prod-peppermint",
        name: "Hydroponic Crisp Peppermint",
        category: "herbs",
        price: 50,
        unit: "Fresh Cut Bunch (50g)",
        tag: "Refreshing",
        badgeColor: "#00796b",
        harvestSchedule: "Harvested Fresh Wed & Fri",
        description: "Cool, clean peppermint grown completely without soil or gritty dirt. Ideal for detox waters, fresh mocktails, herbal tea, and chutneys.",
        image: "assets/herbs/mint.jpg",
        inStock: true
    },
    {
        id: "prod-culinary-duo",
        name: "Exotic Herb Duo (Rosemary & Thyme)",
        category: "herbs",
        price: 90,
        unit: "Mixed Gourmet Pack (40g)",
        tag: "Chef Selection",
        badgeColor: "#4e342e",
        harvestSchedule: "Harvested Fresh Wed & Fri",
        description: "Fragrant needle-fresh rosemary sprigs and French thyme. Excellent for gourmet roasting, herbal sourdough, marinades, and continental broths.",
        image: "assets/herbs/r_n_t.jpg",
        inStock: true
    }
];

// Universal module export for browser and Node.js test scripts
if (typeof window !== 'undefined') {
    window.produceData = {
        storeConfig: STORE_CONFIG,
        serviceableSectors: SERVICEABLE_SECTORS,
        produceCatalog: PRODUCE_CATALOG
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STORE_CONFIG,
        SERVICEABLE_SECTORS,
        PRODUCE_CATALOG
    };
}
