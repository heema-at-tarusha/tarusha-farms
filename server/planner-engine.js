const pricing = require('./garden-pricing.json');

/**
 * TarUsha Hydroponic Garden Feasibility & Cost Estimation Engine
 * Incorporates agronomic spacing rules, equipment sizing, and itemised calculations.
 */

// Categorized crop mapping
const CROP_CATEGORIES = {
  leafy: [
    'lettuce', 'spinach', 'kale', 'bok_choy', 'swiss_chard',
    'leafy_greens', 'salad_greens', 'palak', 'methi', 'amaranth'
  ],
  herbs: [
    'mint', 'pudina', 'coriander', 'dhaniya', 'basil', 'oregano',
    'thyme', 'parsley', 'celery', 'herbs'
  ],
  fruiting: [
    'tomatoes', 'cherry_tomatoes', 'capsicum', 'bell_peppers',
    'cucumbers', 'zucchini', 'fruiting_veggies'
  ],
  indian_veggies: [
    'chillies', 'green_chillies', 'okra', 'bhindi', 'brinjal',
    'eggplant', 'beans', 'indian_veggies'
  ]
};

/**
 * Calculates Dutch Bucket capacity based on user's exact specification:
 * Benchmark: 10 ft x 15 ft (150 sq ft) accommodates 4 rows of 16 buckets = 64 buckets.
 * Buckets are spaced ~1 ft apart in paired double-rows with walking aisles.
 */
function calculateDutchBucketCapacity(lengthFt, widthFt, isCombination = false) {
  const longerDim = Math.max(lengthFt, widthFt);
  const shorterDim = Math.min(lengthFt, widthFt);

  // Buckets along longer dimension at ~1 ft spacing
  // For 15 ft: 16 buckets. For 10 ft: 11 buckets.
  const bucketsPerRow = Math.max(2, Math.floor(longerDim / 1.0) + (longerDim >= 10 ? 1 : 0));

  // Determine number of rows across shorter dimension
  // Double-row layout needs ~4.5 - 5 ft width per pair including aisle
  let numRows = 2; // default 1 double-row
  if (shorterDim < 3.5) {
    numRows = 1; // single wall-mounted row
  } else if (shorterDim < 7.0) {
    numRows = 2; // 1 double-row pair
  } else if (shorterDim < 11.5) {
    numRows = 4; // 2 double-row pairs (e.g. 10 ft width -> 4 rows)
  } else {
    numRows = Math.floor(shorterDim / 5.0) * 2; // additional double-rows
  }

  // If combination system, allocate 50% footprint to Dutch Buckets
  const effectiveRows = isCombination ? Math.max(1, Math.round(numRows / 2)) : numRows;
  const totalBuckets = effectiveRows * bucketsPerRow;

  return {
    bucketsPerRow,
    numRows: effectiveRows,
    totalBuckets: Math.max(4, totalBuckets),
    layoutDescription: `${effectiveRows} bucket rows along ${longerDim} ft (${bucketsPerRow} buckets/row at 1 ft spacing in paired double-rows with service corridors)`
  };
}

/**
 * Calculates NFT Channel and plant capacity
 */
function calculateNFTCapacity(lengthFt, widthFt, isCombination = false) {
  const totalArea = lengthFt * widthFt;
  const usableFactor = isCombination ? 0.35 : 0.65; // dedicated footprint
  const usableArea = totalArea * usableFactor;

  // 0.75 ft between channels, 0.5 ft between plants (2 plants per linear foot)
  // Approx 1.6 plants per usable sq ft footprint
  const totalPlants = Math.max(16, Math.round(usableArea * 2.6));

  const longerDim = Math.max(lengthFt, widthFt);
  const channels = Math.max(2, Math.round(totalPlants / (longerDim * 2)));

  return {
    totalPlants,
    channels,
    plantSpacingFt: 0.5,
    channelSpacingFt: 0.75,
    layoutDescription: `${channels} UPVC channels along ${longerDim} ft on hot-dip GI multi-tier or flat-bed framing`
  };
}

/**
 * Determine water tank size
 * User comment: "100L for 16 buckets"
 */
function determineReservoir(dutchBuckets, nftPlants) {
  const reservoirs = pricing.water_reservoirs;
  
  if (dutchBuckets > 0 && nftPlants === 0) {
    // Pure Dutch Bucket sizing: 100L per 16 buckets
    if (dutchBuckets <= 16) return reservoirs.tier_100L;
    if (dutchBuckets <= 32) return reservoirs.tier_200L;
    if (dutchBuckets <= 48) return reservoirs.tier_300L;
    return reservoirs.tier_500L;
  }

  if (nftPlants > 0 && dutchBuckets === 0) {
    // Pure NFT sizing
    if (nftPlants <= 100) return reservoirs.tier_100L;
    if (nftPlants <= 220) return reservoirs.tier_200L;
    if (nftPlants <= 350) return reservoirs.tier_300L;
    return reservoirs.tier_500L;
  }

  // Combination sizing (effective load: 1 bucket ~ 5 NFT plant equivalents in transpiration)
  const combinedLoad = (dutchBuckets * 5) + nftPlants;
  if (combinedLoad <= 180) return reservoirs.tier_200L;
  if (combinedLoad <= 380) return reservoirs.tier_300L;
  return reservoirs.tier_500L;
}

/**
 * Determine pump size based on load
 */
function determinePump(dutchBuckets, nftPlants) {
  const pumps = pricing.pumps_and_controls;
  if (dutchBuckets <= 16 && nftPlants <= 40) return pumps.small;
  if (dutchBuckets <= 48 && nftPlants <= 150) return pumps.medium;
  return pumps.large;
}

/**
 * Main Assessment and Estimation Evaluator
 */
function calculateGardenAssessment(userInput) {
  const {
    spaceType = 'balcony', // 'balcony', 'terrace', 'backyard', 'indoor'
    lengthFt = 10,
    widthFt = 15,
    sunlightHours = '4-6', // '<3', '3-5', '5+'
    surfaceType = 'concrete', // 'concrete', 'tile', 'soil', 'waterproofed'
    waterAccess = 'nearby_tap', // 'nearby_tap', 'dedicated_line', 'manual'
    powerAccess = 'yes', // 'yes', 'no'
    familySize = 4,
    crops = ['lettuce', 'spinach', 'tomatoes', 'chillies'],
    monkeyPresence = 'none', // 'frequent', 'occasional', 'rare', 'none'
    includeMonkeyEnclosure = false,
    includeClimateControl = false
  } = userInput;

  const length = Math.max(4, parseFloat(lengthFt) || 10);
  const width = Math.max(3, parseFloat(widthFt) || 15);
  const areaSqFt = Math.round(length * width * 10) / 10;

  // 1. Analyze Crops & Determine Recommendation
  const normalizedCrops = crops.map(c => c.toLowerCase().trim());
  const wantsLeafyOrHerbs = normalizedCrops.some(c =>
    CROP_CATEGORIES.leafy.includes(c) || CROP_CATEGORIES.herbs.includes(c)
  );
  const wantsFruitingOrIndian = normalizedCrops.some(c =>
    CROP_CATEGORIES.fruiting.includes(c) || CROP_CATEGORIES.indian_veggies.includes(c)
  );

  let recommendedSystem = 'combination';
  let systemTitle = 'Combination System (NFT + Dutch Bucket)';
  let systemReason = 'You selected both leafy greens and fruiting/Indian vegetables. A dual-zone setup delivers fresh daily greens and heavy-producing fruiting plants.';

  if (wantsLeafyOrHerbs && !wantsFruitingOrIndian) {
    recommendedSystem = 'nft';
    systemTitle = 'NFT (Nutrient Film Technique) Channel System';
    systemReason = 'Optimized for high-turnover leafy greens and culinary herbs with food-grade UV-stabilized UPVC channels and minimal water consumption.';
  } else if (!wantsLeafyOrHerbs && wantsFruitingOrIndian) {
    recommendedSystem = 'dutch_bucket';
    systemTitle = 'Dutch Bucket Hydroponic System';
    systemReason = 'Commercial-grade Bato Dutch buckets filled with buffered cocopeat, ideal for deep-rooting fruiting crops (tomatoes, capsicum, chillies, cucumbers).';
  } else if (areaSqFt < 40) {
    // If small area but both wanted, recommend compact combination or priority
    recommendedSystem = 'combination';
    systemTitle = 'Compact Combination Garden';
    systemReason = 'Compact multi-tier configuration engineered to provide both salad greens in NFT and 8-12 Dutch buckets within your cozy space.';
  }

  // 2. Compute Capacities
  let dutchBucketCap = { totalBuckets: 0, layoutDescription: 'N/A' };
  let nftCap = { totalPlants: 0, layoutDescription: 'N/A' };

  if (recommendedSystem === 'dutch_bucket') {
    dutchBucketCap = calculateDutchBucketCapacity(length, width, false);
  } else if (recommendedSystem === 'nft') {
    nftCap = calculateNFTCapacity(length, width, false);
  } else {
    // Combination
    dutchBucketCap = calculateDutchBucketCapacity(length, width, true);
    nftCap = calculateNFTCapacity(length, width, true);
  }

  // Estimated harvest yields
  const estimatedGreensPerMonthKg = Math.round(nftCap.totalPlants * 0.12 * 10) / 10; // ~120g per plant cycle
  const estimatedVeggiesPerMonthKg = Math.round(dutchBucketCap.totalBuckets * 1.5 * 10) / 10; // ~1.5kg/bucket/mo
  const totalMonthlyHarvestKg = Math.round((estimatedGreensPerMonthKg + estimatedVeggiesPerMonthKg) * 10) / 10;

  // 3. Feasibility Warnings & Alerts
  const feasibilityAlerts = [];
  let growLightsRecommended = false;
  let growLightsCost = 0;
  let growLightsFixtures = 0;

  // Sunlight check
  if (sunlightHours === '<3' || sunlightHours === 'indoor') {
    feasibilityAlerts.push({
      type: 'warning',
      title: 'Low Natural Sunlight Alert',
      message: 'Direct sunlight is below 3 hours/day. Hydroponic fruiting plants need 5+ hours, while greens need 4 hours. We recommend full-spectrum horticultural LED grow lights for optimal yield.'
    });
    growLightsRecommended = true;
    growLightsFixtures = Math.max(2, Math.ceil(areaSqFt / 18));
    growLightsCost = growLightsFixtures * pricing.optional_upgrades.led_grow_lights.rate_per_fixture;
  } else if (sunlightHours === '3-5') {
    feasibilityAlerts.push({
      type: 'info',
      title: 'Moderate Sunlight (3–5 Hours)',
      message: 'Excellent for all leafy greens, mint, coriander, and spinach. For heavy tomatoes, position Dutch buckets along the sunniest edge.'
    });
  }

  // Monkey presence check
  const hasMonkeys = (monkeyPresence === 'frequent' || monkeyPresence === 'occasional');
  if (hasMonkeys) {
    feasibilityAlerts.push({
      type: 'monkey_alert',
      title: 'Wildlife / Monkey Protection Advisory',
      message: 'Monkeys frequently damage open hydroponic crops, irrigation drippers, and soft greens. We strongly advise enclosing the garden with our heavy-duty welded GI wire mesh canopy.'
    });
  }

  // Power check
  if (powerAccess === 'no') {
    feasibilityAlerts.push({
      type: 'warning',
      title: 'No Electrical Power Point',
      message: 'Hydroponic pumps and digital timers require a standard 220V power point nearby. A small solar inverter backup or extension line will be required.'
    });
  }

  // 4. Equipment Sizing
  const reservoir = determineReservoir(dutchBucketCap.totalBuckets, nftCap.totalPlants);
  const pump = determinePump(dutchBucketCap.totalBuckets, nftCap.totalPlants);
  const starterKit = areaSqFt > 100 
    ? pricing.propagation_and_nutrients.starter_kit_large 
    : pricing.propagation_and_nutrients.starter_kit_base;

  // 5. Itemised Bill of Materials (BOM)
  const items = [];

  // A. Primary Growing System & GI Frame
  if (recommendedSystem === 'dutch_bucket') {
    const rate = pricing.system_specifications.dutch_bucket.rate_per_bucket_installed;
    const amount = dutchBucketCap.totalBuckets * rate;
    items.push({
      item: 'Bato Dutch Bucket System with Cocopeat & Hot-Dip GI Frame',
      description: `${dutchBucketCap.totalBuckets} food-grade Dutch Buckets with dual siphon elbows, buffered cocopeat growing medium, and heavy-duty hot-dip Galvanized Iron (GI) frame (Powder-coated MS not offered).`,
      quantity: dutchBucketCap.totalBuckets,
      unit: 'buckets',
      unitPrice: rate,
      total: amount,
      category: 'growing_system'
    });
  } else if (recommendedSystem === 'nft') {
    const rate = pricing.system_specifications.nft.rate_per_plant_site_installed;
    const amount = nftCap.totalPlants * rate;
    items.push({
      item: 'Virgin UPVC NFT Channel System & Hot-Dip GI Stand',
      description: `${nftCap.totalPlants} plant sites across UV-stabilized food-grade NFT channels (100x60mm) with net pots, LECA pebbles, and hot-dip GI multi-tier or flat-bed support frame.`,
      quantity: nftCap.totalPlants,
      unit: 'plant sites',
      unitPrice: rate,
      total: amount,
      category: 'growing_system'
    });
  } else {
    // Combination
    const dbRate = pricing.system_specifications.dutch_bucket.rate_per_bucket_installed;
    const dbAmount = dutchBucketCap.totalBuckets * dbRate;
    items.push({
      item: 'Dutch Bucket Zone with Cocopeat & Hot-Dip GI Frame',
      description: `${dutchBucketCap.totalBuckets} Dutch buckets with dual siphon elbows, buffered cocopeat medium, and hot-dip GI framing for fruiting vegetables.`,
      quantity: dutchBucketCap.totalBuckets,
      unit: 'buckets',
      unitPrice: dbRate,
      total: dbAmount,
      category: 'growing_system'
    });

    const nftRate = pricing.system_specifications.nft.rate_per_plant_site_installed;
    const nftAmount = nftCap.totalPlants * nftRate;
    items.push({
      item: 'NFT Leafy Greens Zone & Hot-Dip GI Stand',
      description: `${nftCap.totalPlants} plant sites in virgin food-grade UPVC NFT channels with net pots, LECA pebbles, and hot-dip GI frame for continuous salad greens.`,
      quantity: nftCap.totalPlants,
      unit: 'plant sites',
      unitPrice: nftRate,
      total: nftAmount,
      category: 'growing_system'
    });
  }

  // B. Water Storage Tank
  items.push({
    item: `Food-Grade UV-Stabilized Water Reservoir (${reservoir.liters} Liters)`,
    description: `Heavy-duty food-grade water tank sized at ${reservoir.liters}L (100L reservoir per 16 Dutch Buckets benchmark), ensuring stable nutrient buffering.`,
    quantity: 1,
    unit: 'tank',
    unitPrice: reservoir.rate,
    total: reservoir.rate,
    category: 'irrigation'
  });

  // C. Pump & Cyclic Control
  items.push({
    item: pump.name,
    description: 'Continuous magnetic-drive submersible nutrient pump with automatic digital cyclic timer for programmed nutrient delivery.',
    quantity: 1,
    unit: 'set',
    unitPrice: pump.rate,
    total: pump.rate,
    category: 'irrigation'
  });

  // D. Nursery Propagation & Starter Nutrients
  items.push({
    item: starterKit.name,
    description: 'Includes Oasis horticultural cubes for pristine seed germination, balanced A+B hydroponic nutrient salts, micronutrient booster, and digital EC & pH testing pens.',
    quantity: 1,
    unit: 'kit',
    unitPrice: starterKit.rate,
    total: starterKit.rate,
    category: 'consumables'
  });

  // E. Turnkey Installation & Agronomy Commissioning
  const installCost = pricing.installation_and_agronomy.base_service_rate + 
    Math.round(areaSqFt * pricing.installation_and_agronomy.per_sqft_service_rate);
  items.push({
    item: 'Turnkey Installation, Anchoring & 30-Day Agronomy Care Support',
    description: 'On-site precision plumbing assembly, hot-dip GI frame leveling, water leak testing, nutrient balancing, Oasis cubes seed sowing demonstration, and 30-day initial crop onboarding.',
    quantity: 1,
    unit: 'turnkey',
    unitPrice: installCost,
    total: installCost,
    category: 'services'
  });

  // Calculate Base Subtotal
  const baseSubtotal = items.reduce((sum, item) => sum + item.total, 0);

  // 6. Optional Upgrades Calculation
  const optionalUpgrades = [];

  // A. Monkey Protection Enclosure
  const monkeyEnclosureRate = pricing.optional_upgrades.monkey_protection_enclosure.rate_per_sqft;
  const monkeyEnclosureCost = Math.round(areaSqFt * monkeyEnclosureRate);
  optionalUpgrades.push({
    id: 'monkey_protection',
    name: pricing.optional_upgrades.monkey_protection_enclosure.name,
    description: pricing.optional_upgrades.monkey_protection_enclosure.description,
    cost: monkeyEnclosureCost,
    recommended: hasMonkeys,
    selected: Boolean(includeMonkeyEnclosure || hasMonkeys)
  });

  // B. Climate Controlled Polyhouse / Greenhouse
  const polyhouseRate = pricing.optional_upgrades.climate_controlled_polyhouse.rate_per_sqft;
  const polyhouseCost = Math.round(areaSqFt * polyhouseRate);
  optionalUpgrades.push({
    id: 'climate_controlled_polyhouse',
    name: pricing.optional_upgrades.climate_controlled_polyhouse.name,
    description: pricing.optional_upgrades.climate_controlled_polyhouse.description,
    cost: polyhouseCost,
    recommended: spaceType === 'terrace' && areaSqFt >= 80,
    selected: Boolean(includeClimateControl)
  });

  // C. Full-Spectrum LED Grow Lights (if low sunlight)
  if (growLightsRecommended) {
    optionalUpgrades.push({
      id: 'led_grow_lights',
      name: `${growLightsFixtures}x ${pricing.optional_upgrades.led_grow_lights.name}`,
      description: `${growLightsFixtures} horticultural-grade LED fixtures providing 16-hour supplemental PAR spectrum for shaded balconies.`,
      cost: growLightsCost,
      recommended: true,
      selected: true
    });
  }

  // 7. Calculate Grand Total with Selected Upgrades
  let upgradesSelectedCost = 0;
  optionalUpgrades.forEach(u => {
    if (u.selected) upgradesSelectedCost += u.cost;
  });

  const totalBeforeTax = baseSubtotal + upgradesSelectedCost;
  const gstPercent = pricing.tax_and_disclaimers.gst_percent;
  const gstAmount = Math.round((totalBeforeTax * gstPercent) / 100);
  const grandTotal = totalBeforeTax + gstAmount;

  // Range estimation (+/- 5%)
  const minEstimatedTotal = Math.round((grandTotal * 0.95) / 500) * 500;
  const maxEstimatedTotal = Math.round((grandTotal * 1.05) / 500) * 500;

  return {
    dimensions: {
      lengthFt: length,
      widthFt: width,
      areaSqFt,
      spaceType
    },
    recommendation: {
      systemCode: recommendedSystem,
      systemTitle,
      systemReason,
      growingMedium: recommendedSystem === 'dutch_bucket' 
        ? 'Buffered & washed cocopeat' 
        : recommendedSystem === 'nft'
        ? 'LECA pebbles in 2-inch net pots; Oasis cubes for nursery'
        : 'Cocopeat for Dutch buckets; LECA pebbles & Oasis cubes for NFT',
      frameMaterial: 'Heavy-duty hot-dip Galvanized Iron (GI) frame (Powder-coated MS not offered)'
    },
    capacity: {
      dutchBuckets: dutchBucketCap.totalBuckets,
      dutchBucketLayout: dutchBucketCap.layoutDescription,
      nftPlants: nftCap.totalPlants,
      nftLayout: nftCap.layoutDescription,
      reservoirSizeLiters: reservoir.liters,
      estimatedGreensPerMonthKg,
      estimatedVeggiesPerMonthKg,
      totalMonthlyHarvestKg
    },
    feasibilityAlerts,
    billOfMaterials: items,
    baseSubtotal,
    optionalUpgrades,
    upgradesSelectedCost,
    totalBeforeTax,
    gstPercent,
    gstAmount,
    grandTotal,
    estimatedRange: {
      min: minEstimatedTotal,
      max: maxEstimatedTotal
    },
    disclaimer: pricing.tax_and_disclaimers.disclaimer
  };
}

module.exports = {
  calculateGardenAssessment,
  calculateDutchBucketCapacity,
  calculateNFTCapacity,
  CROP_CATEGORIES
};
