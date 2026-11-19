/**
 * =======================================================================
 * TARUSHA FARMS — PRODUCE STOREFRONT & WHATSAPP DIRECT CHECKOUT ENGINE
 * =======================================================================
 */

(function () {
    'use strict';

    // 1. STATE INITIALIZATION
    const CART_STORAGE_KEY = 'tarusha_produce_cart_v1';
    let cart = [];
    let activeCategory = 'all';
    let verifiedSector = null;

    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            cart = JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Could not read cart from localStorage', e);
        cart = [];
    }

    const saveCart = () => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (e) {
            console.warn('Could not save cart to localStorage', e);
        }
        updateCartBadges();
    };

    // 2. DOM ELEMENTS
    const gridEl = document.getElementById('produce-grid');
    const filterButtons = document.querySelectorAll('.produce-filter-btn');
    const floatingCartPill = document.getElementById('floating-cart-pill');
    const floatingCartCount = document.getElementById('floating-cart-count');
    const floatingCartTotal = document.getElementById('floating-cart-total');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartGrandTotalEl = document.getElementById('cart-grand-total');
    const cartEmptyState = document.getElementById('cart-empty-state');
    const cartContentArea = document.getElementById('cart-content-area');
    const btnCheckoutWa = document.getElementById('btn-checkout-whatsapp');

    // Sector Checker Elements
    const sectorInput = document.getElementById('sector-search-input');
    const sectorBtn = document.getElementById('btn-check-sector');
    const sectorResult = document.getElementById('sector-result-banner');
    const sectorChips = document.querySelectorAll('.sector-chip');

    // Cart Form Elements
    const custNameInput = document.getElementById('cust-name');
    const custPhoneInput = document.getElementById('cust-phone');
    const custAddressInput = document.getElementById('cust-address');
    const custSectorInput = document.getElementById('cust-sector');
    const custNotesInput = document.getElementById('cust-notes');

    // 3. RENDER PRODUCE CATALOG
    const renderCatalog = () => {
        if (!gridEl) return;
        const catalog = window.produceData ? window.produceData.produceCatalog : [];

        const filtered = activeCategory === 'all'
            ? catalog
            : catalog.filter(item => item.category === activeCategory);

        gridEl.innerHTML = '';

        if (filtered.length === 0) {
            gridEl.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No produce currently available in this category.</div>';
            return;
        }

        filtered.forEach(item => {
            const inCartItem = cart.find(c => c.id === item.id);
            const qty = inCartItem ? inCartItem.qty : 0;

            const card = document.createElement('article');
            card.className = 'produce-card';
            card.id = 'card-' + item.id;

            card.innerHTML = `
                <div class="produce-img-wrap">
                    <img src="${item.image}" alt="${item.name}" class="produce-img" loading="lazy" onerror="this.src='assets/abundance.jpeg'">
                    <span class="produce-card-tag" style="background-color: ${item.badgeColor || '#1e3b22'}">${item.tag}</span>
                    <span class="produce-card-schedule">${item.harvestSchedule}</span>
                </div>
                <div class="produce-card-body">
                    <span class="produce-category-label">${formatCategory(item.category)}</span>
                    <h3 class="produce-card-title">${item.name}</h3>
                    <div class="produce-unit">${item.unit}</div>
                    <p class="produce-desc">${item.description}</p>
                    <div class="produce-card-footer">
                        <div class="produce-price-block">
                            <span class="produce-price-label">Price</span>
                            <span class="produce-price">₹${item.price}</span>
                        </div>
                        <div class="produce-action-slot" id="action-slot-${item.id}">
                            ${renderCardAction(item.id, qty, item.inStock)}
                        </div>
                    </div>
                </div>
            `;

            gridEl.appendChild(card);
        });

        attachCardEventListeners();
    };

    const formatCategory = (cat) => {
        switch (cat) {
            case 'salad-boxes': return '🥗 Fresh Salad Box';
            case 'microgreens': return '🌱 Living Microgreens';
            case 'herbs': return '🌿 Culinary Herbs';
            default: return 'Fresh Harvest';
        }
    };

    const renderCardAction = (id, qty, inStock) => {
        if (!inStock) {
            return '<span style="color: #999; font-size: 0.85rem; font-weight: 600;">Harvest Sold Out</span>';
        }
        if (qty === 0) {
            return `<button class="btn-add-cart" data-id="${id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                Add to Cart
            </button>`;
        }
        return `<div class="produce-qty-stepper">
            <button class="qty-btn btn-qty-dec" data-id="${id}" aria-label="Decrease">&minus;</button>
            <span class="qty-count">${qty}</span>
            <button class="qty-btn btn-qty-inc" data-id="${id}" aria-label="Increase">&#43;</button>
        </div>`;
    };

    const attachCardEventListeners = () => {
        // Add to cart buttons
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id');
                addToCart(id);
            };
        });

        // Increment buttons
        document.querySelectorAll('.btn-qty-inc').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id');
                addToCart(id);
            };
        });

        // Decrement buttons
        document.querySelectorAll('.btn-qty-dec').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id');
                removeFromCart(id);
            };
        });
    };

    // 4. CART OPERATIONS
    const addToCart = (id) => {
        const catalog = window.produceData ? window.produceData.produceCatalog : [];
        const product = catalog.find(p => p.id === id);
        if (!product) return;

        const existing = cart.find(c => c.id === id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                unit: product.unit,
                image: product.image,
                qty: 1
            });
        }

        saveCart();
        updateActionSlot(id);
        renderCartDrawer();
    };

    const removeFromCart = (id) => {
        const index = cart.findIndex(c => c.id === id);
        if (index > -1) {
            if (cart[index].qty > 1) {
                cart[index].qty -= 1;
            } else {
                cart.splice(index, 1);
            }
        }
        saveCart();
        updateActionSlot(id);
        renderCartDrawer();
    };

    const updateActionSlot = (id) => {
        const slot = document.getElementById('action-slot-' + id);
        if (!slot) return;
        const catalog = window.produceData ? window.produceData.produceCatalog : [];
        const product = catalog.find(p => p.id === id);
        const inCartItem = cart.find(c => c.id === id);
        const qty = inCartItem ? inCartItem.qty : 0;
        slot.innerHTML = renderCardAction(id, qty, product ? product.inStock : true);
        attachCardEventListeners();
    };

    const updateCartBadges = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        if (floatingCartPill) {
            if (totalItems > 0) {
                floatingCartPill.classList.add('visible');
                if (floatingCartCount) floatingCartCount.textContent = totalItems + (totalItems === 1 ? ' item' : ' items');
                if (floatingCartTotal) floatingCartTotal.textContent = '₹' + subtotal;
            } else {
                floatingCartPill.classList.remove('visible');
            }
        }

        const navCartBadge = document.getElementById('nav-cart-badge');
        if (navCartBadge) {
            navCartBadge.textContent = totalItems;
            navCartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    };

    // 5. RENDER CART DRAWER
    const renderCartDrawer = () => {
        if (!cartItemsList) return;

        if (cart.length === 0) {
            if (cartEmptyState) cartEmptyState.style.display = 'block';
            if (cartContentArea) cartContentArea.style.display = 'none';
            if (btnCheckoutWa) btnCheckoutWa.disabled = true;
            return;
        }

        if (cartEmptyState) cartEmptyState.style.display = 'none';
        if (cartContentArea) cartContentArea.style.display = 'block';
        if (btnCheckoutWa) btnCheckoutWa.disabled = false;

        cartItemsList.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;

            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/abundance.jpeg'">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-unit">${item.unit}</div>
                    <div class="cart-item-price">₹${item.price} &times; ${item.qty} = ₹${itemTotal}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-stepper">
                        <button class="cart-stepper-btn btn-drawer-dec" data-id="${item.id}">&minus;</button>
                        <span class="cart-stepper-qty">${item.qty}</span>
                        <button class="cart-stepper-btn btn-drawer-inc" data-id="${item.id}">&#43;</button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(row);
        });

        if (cartSubtotalEl) cartSubtotalEl.textContent = '₹' + subtotal;
        if (cartGrandTotalEl) cartGrandTotalEl.textContent = '₹' + subtotal;

        // Drawer stepper handlers
        document.querySelectorAll('.btn-drawer-inc').forEach(btn => {
            btn.onclick = () => addToCart(btn.getAttribute('data-id'));
        });
        document.querySelectorAll('.btn-drawer-dec').forEach(btn => {
            btn.onclick = () => removeFromCart(btn.getAttribute('data-id'));
        });
    };

    // 6. 10 KM GURGAON SECTOR CHECKER
    const checkSectorServiceability = (query) => {
        if (!query || !query.trim()) return;
        const cleaned = query.trim().toLowerCase();
        const sectors = window.produceData ? window.produceData.serviceableSectors : [];

        // Check for out-of-town explicit locations
        const outOfTown = ['noida', 'delhi', 'faridabad', 'ghaziabad', 'mumbai', 'bangalore', 'kolkata', 'chennai', 'hyderabad'];
        const isOutOfTown = outOfTown.some(city => cleaned.includes(city));

        let match = null;
        if (!isOutOfTown) {
            match = sectors.find(s => {
                const sName = s.name.toLowerCase();
                const sArea = s.area.toLowerCase();
                const sNum = s.name.replace(/[^0-9]/g, '');

                // Exact sector name or area match (e.g. "sector 50", "nirvana country", "dlf 5", "golf course")
                if (sName === cleaned || sArea.includes(cleaned) || cleaned.includes(sName)) return true;

                // Bare number match (e.g. "50") or "sec 50" / "sector 50"
                const isSecPattern = /^(\s*sec(tor)?\s*)?\d+\s*$/i.test(cleaned);
                if (isSecPattern) {
                    const numMatch = cleaned.replace(/[^0-9]/g, '');
                    if (numMatch && sNum && numMatch === sNum) return true;
                }
                return false;
            });
        }

        if (!sectorResult) return;

        if (match) {
            verifiedSector = match;
            sectorResult.className = 'sector-result-banner success';
            sectorResult.innerHTML = `
                <div style="font-size: 1.4rem;">🌱</div>
                <div>
                    <strong>Great news! ${match.name} (${match.area}) is within our 10 km direct harvest zone.</strong><br>
                    <span>Distance from our Sector 64 farm: <strong>${match.km} km</strong>. Fresh harvests are dispatched on <strong>Wednesday & Friday mornings</strong>. Delivery charges are on actuals via Porter (or free self-pickup).</span>
                </div>
            `;
            if (custSectorInput) {
                custSectorInput.value = `${match.name} (${match.area})`;
            }
        } else {
            sectorResult.className = 'sector-result-banner warning';
            sectorResult.innerHTML = `
                <div style="font-size: 1.4rem;">📍</div>
                <div>
                    <strong>"${query}" appears outside our standard 10 km direct harvest zone.</strong><br>
                    <span>We can still deliver fresh produce via custom Porter runner or coordinate bulk community/corporate baskets! Please place your order or message us directly on WhatsApp to confirm logistics.</span>
                </div>
            `;
            if (custSectorInput && !custSectorInput.value) {
                custSectorInput.value = query;
            }
        }
    };

    // 7. WHATSAPP DIRECT ORDER GENERATOR
    const handleWhatsAppCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add some fresh produce before checking out.');
            return;
        }

        const name = (custNameInput ? custNameInput.value.trim() : '');
        const phone = (custPhoneInput ? custPhoneInput.value.trim() : '');
        const address = (custAddressInput ? custAddressInput.value.trim() : '');
        const sector = (custSectorInput ? custSectorInput.value.trim() : '');
        const notes = (custNotesInput ? custNotesInput.value.trim() : '');

        if (!name) {
            alert('Please enter your Name for the harvest delivery.');
            if (custNameInput) custNameInput.focus();
            return;
        }

        if (!phone || phone.length < 10) {
            alert('Please enter a valid 10-digit WhatsApp/Mobile Number.');
            if (custPhoneInput) custPhoneInput.focus();
            return;
        }

        if (!address) {
            alert('Please enter your Society / House / Flat Address.');
            if (custAddressInput) custAddressInput.focus();
            return;
        }

        // Selected harvest slot
        const slotRadio = document.querySelector('input[name="harvest-slot"]:checked');
        const slotText = slotRadio ? slotRadio.value : 'Next Available Harvest (Wed/Fri)';

        // Selected delivery method
        const deliveryMethodRadio = document.querySelector('input[name="delivery-method"]:checked');
        const deliveryMethod = deliveryMethodRadio ? deliveryMethodRadio.value : 'Porter Delivery (On Actuals)';

        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        // Format items text
        let itemsListText = '';
        cart.forEach(item => {
            itemsListText += `• ${item.qty}x ${item.name} (${item.unit}) @ ₹${item.price} = ₹${item.price * item.qty}\n`;
        });

        const storeConfig = window.produceData ? window.produceData.storeConfig : {};
        const waNumber = storeConfig.whatsappNumber || '919220902015';

        // Compose Message
        let message = `🌿 *TARUSHA FARMS — FRESH HARVEST ORDER* 🌿\n`;
        message += `----------------------------------------\n`;
        message += `👤 *Customer:* ${name}\n`;
        message += `📱 *Phone:* ${phone}\n`;
        message += `📍 *Delivery Address:* ${address}\n`;
        message += `🚚 *Sector / Area:* ${sector || 'Within Gurgaon 10 km zone'}\n`;
        message += `📅 *Harvest Slot:* ${slotText}\n`;
        message += `📦 *Fulfillment:* ${deliveryMethod}\n\n`;

        message += `🛒 *ITEMS ORDERED:*\n`;
        message += itemsListText;
        message += `----------------------------------------\n`;
        message += `💰 *Produce Subtotal:* ₹${subtotal}\n`;
        message += `🚚 *Delivery Fee:* On Actuals via Porter (from Sec 64) / Self-Pickup\n`;
        message += `✨ *Total Produce Payable:* ₹${subtotal} (+ Porter fare on actuals)\n`;

        if (notes) {
            message += `\n📝 *Special Instructions:* ${notes}\n`;
        }

        message += `----------------------------------------\n`;
        message += `Please confirm availability for harvest and share UPI QR / payment link. Thank you!`;

        // Direct WhatsApp URL
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

        // Optional: Copy to clipboard as backup
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(message).catch(() => {});
        }

        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');
    };

    // 8. EVENT BINDINGS
    const initEvents = () => {
        // Filter tabs
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                renderCatalog();
            });
        });

        // Floating Cart Pill Click
        if (floatingCartPill) {
            floatingCartPill.addEventListener('click', () => {
                if (cartOverlay) cartOverlay.classList.add('active');
                renderCartDrawer();
            });
        }

        // Header Cart Trigger (if exists)
        const headerCartBtn = document.getElementById('header-cart-btn');
        if (headerCartBtn) {
            headerCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (cartOverlay) cartOverlay.classList.add('active');
                renderCartDrawer();
            });
        }

        // Cart Drawer Close
        if (cartCloseBtn) {
            cartCloseBtn.addEventListener('click', () => {
                if (cartOverlay) cartOverlay.classList.remove('active');
            });
        }

        if (cartOverlay) {
            cartOverlay.addEventListener('click', (e) => {
                if (e.target === cartOverlay) {
                    cartOverlay.classList.remove('active');
                }
            });
        }

        // Sector Check Button
        if (sectorBtn && sectorInput) {
            sectorBtn.addEventListener('click', () => {
                checkSectorServiceability(sectorInput.value);
            });

            sectorInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    checkSectorServiceability(sectorInput.value);
                }
            });
        }

        // Quick Sector Chips
        sectorChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const sectorName = chip.getAttribute('data-sector');
                if (sectorInput) sectorInput.value = sectorName;
                checkSectorServiceability(sectorName);
            });
        });

        // Checkout Button
        if (btnCheckoutWa) {
            btnCheckoutWa.addEventListener('click', handleWhatsAppCheckout);
        }
    };

    // 9. BOOTSTRAP
    document.addEventListener('DOMContentLoaded', () => {
        renderCatalog();
        updateCartBadges();
        initEvents();
    });

})();
