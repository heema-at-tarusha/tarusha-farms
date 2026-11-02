/**
 * ==============================================================================
 * TarUsha - Commercial Hydroponic Farm Projects & Technical Capabilities Data
 * ==============================================================================
 * 
 * HOW TO MANAGE OR ADD COMMERCIAL PROJECTS IN THE FUTURE:
 * ------------------------------------------------------------------------------
 * 1. Place project photographs into `assets/commercial-farms/projects/`
 * 2. Copy the project template block below and add it to `commercialFarmProjects`.
 * 3. Fill in the technical specifications (title, location, farmType, area,
 *    greenhouseType, hydroponicSystem, duration, clientRequirement, challenges,
 *    approach, systemsAndInfrastructure, outcome, etc.)
 * 4. Save this file and refresh your browser. The new commercial farm project will
 *    automatically render into the portfolio showcase with its interactive gallery,
 *    technical metadata badges, and consultation action links!
 * 
 * ==============================================================================
 */

const commercialFarmCapabilities = [
    {
        id: 'cap-farm-planning',
        title: 'Commercial Farm Planning & Layout',
        subtitle: 'Site Feasibility, Microclimate Analysis & Hydraulic CAD Design',
        description: 'Comprehensive commercial master-planning tailored to your topography, available land parcels, groundwater analysis, electrical infrastructure, and target crop economics.',
        image: 'assets/commercial-farms/capabilities/farm.jpeg',
        fallbackImage: 'assets/turnkey.jpeg',
        features: [
            'Topographical survey & orientation for optimal solar trajectory',
            'Water quality (pH, EC, alkalinity & heavy metal) lab profiling',
            'Hydraulic sizing for plumbing, pipe networks & pump head requirements',
            'Phased scalability roadmaps from pilot acre to multi-hectare farms'
        ],
        ctaText: 'Discuss Farm Planning'
    },
    {
        id: 'cap-greenhouse-infrastructure',
        title: 'Greenhouse & Protected Cultivation',
        subtitle: 'Naturally Ventilated Polyhouses & Climate-Controlled Structures',
        description: 'Heavy-gauge GI structural engineering designed to withstand extreme North Indian ambient weather (45°C+ summer heat, dust storms, high monsoon humidity, and winter drops).',
        image: 'assets/commercial-farms/capabilities/turnkey.jpeg',
        fallbackImage: 'assets/g4.jpg',
        features: [
            'Multi-span Naturally Ventilated Polyhouse (NVPH) engineering',
            'UV-stabilized 200-micron anti-drip, anti-dust diffusant poly film',
            'Motorized retractable top & side ventilation and thermal shade screens',
            'Heavy-duty 40-mesh insect-proof netting on all perimeter openings'
        ],
        ctaText: 'Explore Polyhouse Setups'
    },
    {
        id: 'cap-nft-systems',
        title: 'Commercial NFT Hydroponic Systems',
        subtitle: 'High-Density Closed-Loop Channels for Leafy Greens & Culinary Herbs',
        description: 'Food-grade Nutrient Film Technique (NFT) installations engineered for rapid crop turnarounds, minimal root zone temperature fluctuations, and maximum yield per square metre.',
        image: 'assets/farm.jpg',
        fallbackImage: 'assets/turnkey.jpeg',
        features: [
            'Virgin food-grade UV-stabilized PVC gullies with detachable lids for sanitation',
            'Precision laser-leveled slope alignment for uniform nutrient film velocity',
            'Closed-loop recirculating plumbing with inline aeration & dissolved oxygen boost',
            'Configured for Romaine, Butterhead, Lollo Rosso, Basil, Bok Choy & Arugula'
        ],
        ctaText: 'Explore Commercial NFT'
    },
    {
        id: 'cap-substrate-dutch-buckets',
        title: 'Substrate & Dutch Bucket Systems',
        subtitle: 'Engineered for Vine Crops: Tomatoes, Bell Peppers & Cucumbers',
        description: 'Heavy-yield substrate configurations utilizing specialized Dutch (Bato) buckets and cocopeat slabs with pressure-compensating drip irrigation for high-biomass fruiting crops.',
        image: 'assets/indoor_dutch_bucket.jpeg',
        fallbackImage: 'assets/turnkey.jpeg',
        features: [
            'Food-grade UV-treated HDPE Dutch buckets with dual siphon overflow elbows',
            'Trellising crop wire infrastructure engineered for heavy vine canopy loads',
            'Pressure-compensating (PC) button drippers delivering uniform mL/hr per plant',
            'Central drainage collection channels with optional recirculating filtration'
        ],
        ctaText: 'Explore Substrate Setups'
    },
    {
        id: 'cap-fertigation-irrigation',
        title: 'Irrigation & Fertigation Infrastructure',
        subtitle: 'Automated Recipe-Based Nutrient Dosing & Real-Time Monitoring',
        description: 'Industrial dosing skids and multi-stage filtration networks that maintain strict electrical conductivity (EC) and pH stability across thousands of growing points.',
        image: 'assets/commercial-farms/capabilities/irrigation.jpeg',
        fallbackImage: 'assets/farm.jpg',
        features: [
            'Multi-channel Venturi & proportional dosing pumps for A/B/Acid solutions',
            'Automated EC & pH digital controllers with high/low alert thresholds',
            'Industrial disc, media & reverse osmosis (RO) blending water treatment',
            'Independent multi-zone valve automation for distinct crop growth phases'
        ],
        ctaText: 'Discuss Fertigation'
    },
    {
        id: 'cap-nursery-seedling',
        title: 'Nursery & Seedling Production Systems',
        subtitle: 'High-Germination Propagation Benches & Microclimate Chambers',
        description: 'Dedicated nursery infrastructure ensuring uniform, disease-free seedling batches ready for transplantation on strict production schedules without crop gaps.',
        image: 'assets/course-indoor.png',
        fallbackImage: 'assets/Microgreens_product_range.png',
        features: [
            'Ebb-and-flow sub-irrigation benches & capillary matting germination',
            'Sterile inert plug media (rockwool, Oasis cubes & washed cocopeat plugs)',
            'Auxiliary PAR spectrum lighting for seedling vigor during cloudy monsoons',
            '98%+ verified germination consistency across all seasonal transitions'
        ],
        ctaText: 'Explore Nursery Systems'
    },
    {
        id: 'cap-environmental-automation',
        title: 'Environmental Control & Farm Automation',
        subtitle: 'VPD Management, Retractable Screens & Evaporative Cooling',
        description: 'Active and passive climate moderation hardware engineered for subtropical climates, keeping canopy vapor pressure deficit (VPD) in optimal photosynthetic range.',
        image: 'assets/g4.jpg',
        fallbackImage: 'assets/g6.jpg',
        features: [
            'High-pressure fogging/misting systems for summer evaporative cooling',
            'Automated motorized shade curtains with aluminized heat-reflective weaves',
            'Digital environmental sensors (Temperature, Relative Humidity, VPD & Lux)',
            'Central automation panel with remote mobile telemetry & emergency alarms'
        ],
        ctaText: 'Explore Farm Automation'
    },
    {
        id: 'cap-commissioning-agronomy',
        title: 'Farm Commissioning & Agronomy Setup',
        subtitle: 'Turnkey Handover, Standard Operating Procedures & Operator Training',
        description: 'We don’t just build hardware; our agronomists calibrate the water chemistry, guide your first trial crops, and train on-site farm operators on SOPs and hygiene.',
        image: 'assets/farm.jpg',
        fallbackImage: 'assets/turnkey.jpeg',
        features: [
            'Comprehensive on-site hydraulic pressure & sensor calibration testing',
            'Crop-specific nutritional recipes (PPM elemental targets) for every stage',
            'Integrated Pest Management (IPM) protocols adhering to residue-free norms',
            'Standard Operating Procedure (SOP) manuals and farm manager training'
        ],
        ctaText: 'Discuss Project Handover'
    }
];

const commercialFarmProjects = [
    {
        id: 'project-commercial-polyhouse-nft-gurgaon',
        title: 'Commercial Polyhouse NFT Facility: High-Yield Leafy Greens & Culinary Herbs',
        location: 'Sohna Road Agricultural Corridor, Gurgaon, Haryana',
        farmType: 'Commercial Greenhouse Hydroponics (CEA)',
        area: '10,000 sq ft (~1,000 sq. m) with 1-Acre Masterplan',
        greenhouseType: 'Naturally Ventilated Polyhouse (NVPH) with Top Continuous Vent & UV-Stabilized 200µ Polyethylene',
        hydroponicSystem: 'Commercial Food-Grade NFT Channels + Dedicated Nursery Germination Benches',
        duration: '8-Week Turnkey Execution & Commissioning',
        featuredImage: 'assets/farm.jpg',
        gallery: [
            'assets/farm.jpg',
            'assets/turnkey.jpeg',
            'assets/g4.jpg'
        ],
        clientRequirement: 'An agricultural enterprise aimed to establish a high-throughput, protected commercial hydroponic facility to supply premium residue-free salad greens and culinary herbs directly to high-end HoReCa partners (hotels, restaurants, and cloud kitchens) in Gurgaon and South Delhi on strict recurring weekly supply contracts.',
        challenges: [
            'High ambient summer temperatures exceeding 44°C causing heat stress in cool-season lettuce varieties',
            'Borewell water supply with high electrical conductivity (TDS > 1,100 ppm) and heavy carbonate hardness',
            'Need for rigorous biological cleanliness and root temperature control to prevent Pythium root rot during summer recirculation',
            'Strict client requirement for continuous, staggered weekly harvests with zero supply chain interruption'
        ],
        approach: 'TarUsha engineered a high-gutter multi-span naturally ventilated polyhouse structure with continuous top ridge venting and motorized 50% aluminized thermal shade screens. We installed an industrial RO blending skid to normalize incoming water chemistry to an optimal baseline (TDS < 80 ppm). The production zone was laid out with virgin food-grade NFT gullies featuring removable snap-on lids for effortless hygiene cycles. Nutrient solutions were managed via a dual-reservoir batch circulation loop with dissolved oxygen aeration and inline temperature moderation.',
        systemsAndInfrastructure: [
            'UV-stabilized virgin PVC food-grade NFT channels with removable top lids',
            'Multi-channel Venturi automated fertigation dosing skid (A/B/Acid)',
            'Industrial Reverse Osmosis (RO) filtration and water blending reservoir',
            'Multi-tier ebb-and-flow propagation nursery with capillary irrigation',
            'Automated motorized ridge vent curtains and 50% thermal shade screen',
            'Central dissolved oxygen injection manifold to maximize root vigor'
        ],
        outcome: 'The facility was commissioned on schedule and achieved steady commercial production within 28 days of seedling transplant. Operates 365 days a year with predictable weekly harvests, achieving over 90% water conservation compared to field farming, zero synthetic chemical residues, and consistent culinary grade uniformity that secured long-term contracts with regional HoReCa buyers.',
        inquiryMessage: 'Hi TarUsha, I saw your Commercial Polyhouse NFT Facility project and would like to discuss setting up a commercial hydroponic farm.'
    },
    {
        id: 'project-high-wire-dutch-bucket-haryana',
        title: 'High-Wire Dutch Bucket Greenhouse: Indeterminate Colored Capsicum & Vine Crops',
        location: 'Haryana Agricultural Belt, Delhi NCR',
        farmType: 'Commercial Substrate-Based Protected Cultivation',
        area: '0.5 Acre (approx. 2,000 sq. m)',
        greenhouseType: 'Naturally Ventilated Polyhouse with Heavy-Duty GI Overhead Trellis Framing',
        hydroponicSystem: 'Substrate-Based Dutch Bucket (Bato Bucket) System with Precision Pressure-Compensating Drip Fertigation',
        duration: '10-Week Turnkey Installation',
        featuredImage: 'assets/turnkey.jpeg',
        gallery: [
            'assets/turnkey.jpeg',
            'assets/indoor_dutch_bucket.jpeg',
            'assets/g6.jpg'
        ],
        clientRequirement: 'A progressive agriculturalist transitioning from open-field conventional crops to modern controlled environment horticulture sought to establish a dedicated, protected commercial facility for high-value indeterminate vine crops (red/yellow bell peppers and European seedless cucumbers).',
        challenges: [
            'High pre-monsoon squall wind loads requiring robust structural anchoring and windbreak calculations',
            'Heavy vine canopy weight requiring high-tensile overhead trellising capable of carrying over 25 kg per linear metre',
            'High regional pest pressure (whiteflies and thrips) common in neighboring open-field agricultural lands',
            'Distinct nutrient formulation transitions needed between vegetative branching, flowering, and heavy fruit-load phases'
        ],
        approach: 'TarUsha implemented a heavy-duty galvanized structural framework with reinforced trussing and 40-mesh UV-stabilized insect netting across all perimeter ventilation openings. We deployed dual-siphon food-grade Dutch buckets configured with washed, low-EC cocopeat and perlite media. Precision pressure-compensating button drippers (2L/hr) were installed at each plant station, controlled by a multi-schedule digital fertigation timer delivering tailored EC/pH recipes based on solar accumulation.',
        systemsAndInfrastructure: [
            'Food-grade UV-treated polypropylene Dutch buckets with dual siphon overflow elbows',
            'Washed and buffered low-EC cocopeat + horticultural perlite substrate blend',
            'High-tensile GI trellising wire framework with crop support twine bobbins and plant clips',
            'Pressure-compensating (PC) button drippers with micro-tube distribution stakes',
            'Digital multi-recipe fertigation control panel with automated cycle timing',
            'Centralized drainage collection channel with monitoring sumps'
        ],
        outcome: 'The farm achieved complete turnkey completion from civil leveling to first harvest within 10 weeks. The controlled environment and precision root feeding extended the commercial harvesting window across 8 continuous months, yielding grade-A fruit sizing with vibrant coloration and high export-grade market value.',
        inquiryMessage: 'Hi TarUsha, I saw your High-Wire Dutch Bucket Greenhouse project and would like to explore a commercial vine crop setup.'
    },
    {
        id: 'project-indoor-vertical-cea-propagation',
        title: 'Controlled Environment Agriculture (CEA): High-Density Indoor Vertical Propagation Unit',
        location: 'NCR Urban Agri-Tech Hub, Delhi NCR',
        farmType: 'Indoor Vertical Farming & Seedling Propagation Facility',
        area: '1,500 sq ft High-Density Controlled Space',
        greenhouseType: 'Fully Insulated Climate-Controlled Cleanroom Facility',
        hydroponicSystem: 'Multi-Tier Vertical NFT & Nursery Benches with Horticultural LED Spectrum Arrays',
        duration: '4-Week Setup & Commissioning',
        featuredImage: 'assets/course-indoor.png',
        gallery: [
            'assets/course-indoor.png',
            'assets/abundance.jpeg',
            'assets/Microgreens_product_range.png'
        ],
        clientRequirement: 'An urban agritech venture required a bio-secure, year-round controlled indoor facility to mass-produce hardened seedling plugs for regional hydroponic greenhouse growers, while concurrently harvesting commercial batches of fresh culinary microgreens for premium retail supermarkets.',
        challenges: [
            'Complete absence of natural solar irradiance requiring 100% artificial photosynthetic lighting',
            'Thermal management and heat dissipation from dense multi-tier LED lighting arrays',
            'Strict relative humidity and Vapor Pressure Deficit (VPD) control to prevent fungal damping-off during germination'
        ],
        approach: 'TarUsha designed a 4-tier vertical farming structure using powder-coated industrial steel racking integrated with high-efficiency IP65 photosynthetic LED fixtures tuned to blue (450nm) and deep red (660nm) wavelengths. We deployed a dedicated closed-loop HVAC network with automated industrial dehumidification and laminar airflow fans. Automated ebb-and-flow sub-irrigation was coupled with digital dosing controllers for precision water and nutrient management.',
        systemsAndInfrastructure: [
            'Heavy-duty 4-tier powder-coated vertical racking with integrated drainage trays',
            'Full-spectrum horticultural LED fixtures with passive aluminum heat sinks',
            'Automated ebb-and-flow sub-irrigation flood tables with timed delivery',
            'Closed-loop HVAC with automated dehumidification linked to digital VPD sensors',
            'Sanitary laminar flow inoculation and seeding prep bench',
            'Compact reverse osmosis and automated nutrient replenishment skid'
        ],
        outcome: 'Commissioned as a benchmark indoor propagation facility with 98%+ uniform germination rates. Reduced seedling turn times from 21 days to 14 days, providing regional commercial greenhouse operations with guaranteed, pathogen-free planting stock year-round.',
        inquiryMessage: 'Hi TarUsha, I saw your Controlled Environment CEA Vertical Facility and would like to discuss an indoor commercial setup.'
    }
];

// Export for browser script or node environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { commercialFarmCapabilities, commercialFarmProjects };
}
