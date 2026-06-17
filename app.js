/* -------------------------------------------------------------
   Tarusha Farms - Interactive Features & Local Storage Database
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Navigation & Scroll Effects
    // ==========================================
    const header = document.getElementById('header-nav');
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    // Add backdrop style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open');
            
            const spans = menuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when link is clicked (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('open');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ==========================================
    // 2. Animated Impact Counter Statistics
    // ==========================================
    const impactSection = document.getElementById('impact');
    const counters = document.querySelectorAll('.impact-num');

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-val');
            const suffix = counter.textContent.includes('%') ? '%' : '';
            let count = 0;
            const duration = 1500; 
            const stepTime = Math.max(Math.floor(duration / target), 15);
            
            const timer = setInterval(() => {
                count += Math.ceil(target / (duration / stepTime));
                if (count >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = count + suffix;
                }
            }, stepTime);
        });
    };

    if ('IntersectionObserver' in window && impactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(impactSection);
    } else {
        animateCounters();
    }


    // ==========================================
    // 3. Testimonials Carousel
    // ==========================================
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-testimonial-btn');
    const nextBtn = document.getElementById('next-testimonial-btn');
    const dotsContainer = document.getElementById('carousel-dots-container');
    
    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const updateDots = (targetIndex) => {
            dots.forEach((dot, index) => {
                if (index === targetIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const goToSlide = (targetIndex) => {
            if (targetIndex < 0) {
                targetIndex = slides.length - 1;
            } else if (targetIndex >= slides.length) {
                targetIndex = 0;
            }

            slides.forEach((slide, index) => {
                if (index === targetIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            currentIndex = targetIndex;
            updateDots(currentIndex);
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
        }

        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 6000);
    }


    // ==========================================
    // 4. Lead Generation Form Handler
    // ==========================================
    const leadForm = document.getElementById('lead-gen-form');
    const successCard = document.getElementById('lead-success-msg');
    const btnResetLead = document.getElementById('btn-reset-lead');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Honeypot spam check
            const honeypot = document.getElementById('honeypot').value;
            if (honeypot) {
                console.warn("Spam blocked via Honeypot check.");
                return;
            }

            const nameInput = document.getElementById('lead-name');
            const companyInput = document.getElementById('lead-company');
            const emailInput = document.getElementById('lead-email');
            const phoneInput = document.getElementById('lead-phone');
            const cityInput = document.getElementById('lead-city');
            const interestSelect = document.getElementById('lead-interest');
            const messageText = document.getElementById('lead-message');

            const nameError = document.getElementById('lead-name-error');
            const emailError = document.getElementById('lead-email-error');
            const phoneError = document.getElementById('lead-phone-error');
            const cityError = document.getElementById('lead-city-error');
            const interestError = document.getElementById('lead-interest-error');

            const errors = [nameError, emailError, phoneError, cityError, interestError];
            errors.forEach(err => err.style.display = 'none');
            const inputs = [nameInput, emailInput, phoneInput, cityInput, interestSelect];
            inputs.forEach(inp => inp.classList.remove('invalid'));

            let isValid = true;

            if (!nameInput.value.trim()) {
                nameInput.classList.add('invalid');
                nameError.style.display = 'block';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                emailError.style.display = 'block';
                isValid = false;
            }

            if (!phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
                phoneInput.classList.add('invalid');
                phoneError.style.display = 'block';
                isValid = false;
            }

            if (!cityInput.value.trim()) {
                cityInput.classList.add('invalid');
                cityError.style.display = 'block';
                isValid = false;
            }

            if (!interestSelect.value) {
                interestSelect.classList.add('invalid');
                interestError.style.display = 'block';
                isValid = false;
            }

            if (!isValid) return;

            const leadData = {
                id: 'LEAD-' + Date.now(),
                name: nameInput.value.trim(),
                company: companyInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                city: cityInput.value.trim(),
                interest: interestSelect.value,
                message: messageText.value.trim(),
                timestamp: new Date().toISOString(),
                sourcePage: window.location.href
            };

            const leads = JSON.parse(localStorage.getItem('tarusha_leads') || '[]');
            leads.push(leadData);
            localStorage.setItem('tarusha_leads', JSON.stringify(leads));

            console.log("==========================================");
            console.log("DISPATCHING LEAD EMAIL TO: contact@tarushafarms.com");
            console.log("------------------------------------------");
            console.log(`Lead Name: ${leadData.name}`);
            console.log(`Email Address: ${leadData.email}`);
            console.log(`Phone Number: ${leadData.phone}`);
            console.log(`City: ${leadData.city}`);
            console.log(`Area of Interest: ${leadData.interest}`);
            console.log(`Message: ${leadData.message || '[None]'}`);
            console.log("==========================================");

            leadForm.style.display = 'none';
            successCard.style.display = 'block';
        });
    }

    if (btnResetLead) {
        btnResetLead.addEventListener('click', () => {
            leadForm.reset();
            leadForm.style.display = 'block';
            successCard.style.display = 'none';
        });
    }


    // ==========================================
    // 5. Dynamic Product Catalog & Uploader
    // ==========================================
    
    // Default system products
    const defaultProducts = [
        {
            id: 'sys-starter-kit',
            name: 'Tarusha Starter Grower',
            price: ' ',
            category: 'kits',
            desc: 'A complete smart hydroponics kit featuring automatic circulation and specialized growth lighting. Perfect for kitchen salads and fresh herbs.',
            image: 'assets/kit-starter.jpg'
        }        
        
    ];

    // Read custom user products from localStorage
    const getCustomProducts = () => {
        return JSON.parse(localStorage.getItem('tarusha_custom_products') || '[]');
    };

    // Render Product Catalog
    const renderCatalog = () => {
        const grid = document.getElementById('catalog-products-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const allProducts = [...defaultProducts, ...getCustomProducts()];

        allProducts.forEach(prod => {
            const card = document.createElement('article');
            card.className = 'solution-card'; // re-use matching styling rules

            const isCustom = !prod.id.toString().startsWith('sys-');
            const deleteBtnHtml = isCustom 
                ? `<button class="btn btn-sm btn-outline delete-prod-btn" data-id="${prod.id}" style="color: #e53e3e; border-color: #e53e3e; margin-top: 12px; display: inline-block;">Delete Product</button>`
                : '';

            card.innerHTML = `
                <div class="solution-img-wrapper" style="height: 200px;">
                    <img src="${prod.image}" alt="${prod.name}" class="solution-img" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;">
                </div>
                <div class="solution-content">
                    <span class="client-type" style="margin-bottom: 8px;">${prod.category === 'kits' ? 'Hydroponic System' : prod.category === 'courses' ? 'Training Course' : 'Fresh Produce'}</span>
                    <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${prod.name}</h3>
                    <p style="font-size: 0.85rem; margin-bottom: 12px; flex-grow: 1;">${prod.desc}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 12px;">
                        <span class="product-price" style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">${prod.price}</span>
                        <a href="#consultation" class="btn btn-sm btn-primary" onclick="selectInterestInForm('Hydroponic Kits')">Request Quote</a>
                    </div>
                    ${deleteBtnHtml}
                </div>
            `;

            grid.appendChild(card);
        });

        // Add listeners to custom delete buttons
        grid.querySelectorAll('.delete-prod-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = btn.getAttribute('data-id');
                deleteCustomProduct(idToDelete);
            });
        });
    };

    const deleteCustomProduct = (id) => {
        let customProds = getCustomProducts();
        customProds = customProds.filter(p => p.id.toString() !== id.toString());
        localStorage.setItem('tarusha_custom_products', JSON.stringify(customProds));
        renderCatalog();
        renderAdminTables();
    };

    // Product Form Upload (Base64 file reader)
    const prodForm = document.getElementById('admin-product-form');
    const imageFileInput = document.getElementById('prod-image-file');
    const imagePreviewContainer = document.getElementById('prod-image-preview');
    const imagePreviewTag = document.getElementById('prod-img-preview-tag');
    let uploadedImageBase64 = 'assets/kit-starter.png'; // default fallback

    if (imageFileInput) {
        imageFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedImageBase64 = event.target.result;
                imagePreviewTag.src = uploadedImageBase64;
                imagePreviewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        });
    }

    if (prodForm) {
        prodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('prod-name').value.trim();
            const price = document.getElementById('prod-price').value.trim();
            const category = document.getElementById('prod-category').value;
            const desc = document.getElementById('prod-desc').value.trim();

            if (!name || !price || !desc) {
                alert('Please fill out all fields.');
                return;
            }

            const newProduct = {
                id: 'custom-' + Date.now(),
                name,
                price,
                category,
                desc,
                image: uploadedImageBase64
            };

            const customProds = getCustomProducts();
            customProds.push(newProduct);
            localStorage.setItem('tarusha_custom_products', JSON.stringify(customProds));

            prodForm.reset();
            imagePreviewContainer.style.display = 'none';
            uploadedImageBase64 = 'assets/kit-starter.png';

            alert('Product uploaded successfully!');
            renderCatalog();
            renderAdminTables();
        });
    }


    // ==========================================
    // 6. Dynamic Custom Page Builder
    // ==========================================
    const pageForm = document.getElementById('admin-page-form');

    const getCustomPages = () => {
        return JSON.parse(localStorage.getItem('tarusha_custom_pages') || '[]');
    };

    if (pageForm) {
        pageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('page-title').value.trim();
            const slug = document.getElementById('page-slug').value.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
            const htmlContent = document.getElementById('page-html').value.trim();

            if (!title || !slug || !htmlContent) {
                alert('Please fill out all fields.');
                return;
            }

            const newPage = {
                title,
                slug,
                body: htmlContent
            };

            const customPages = getCustomPages();
            
            // Check for duplicate slugs
            if (customPages.some(p => p.slug === slug)) {
                alert('A page with this URL slug already exists. Please choose a different one.');
                return;
            }

            customPages.push(newPage);
            localStorage.setItem('tarusha_custom_pages', JSON.stringify(customPages));

            pageForm.reset();
            alert('Custom page published successfully!');
            renderAdminTables();
        });
    }

    const deleteCustomPage = (slug) => {
        let pages = getCustomPages();
        pages = pages.filter(p => p.slug !== slug);
        localStorage.setItem('tarusha_custom_pages', JSON.stringify(pages));
        renderAdminTables();
    };


    // ==========================================
    // 7. Admin Tables Management Renders
    // ==========================================
    const renderAdminTables = () => {
        const prodTbody = document.getElementById('admin-products-tbody');
        const pageTbody = document.getElementById('admin-pages-tbody');

        if (prodTbody) {
            prodTbody.innerHTML = '';
            const customProds = getCustomProducts();
            if (customProds.length === 0) {
                prodTbody.innerHTML = '<tr><td colspan="4" class="text-muted text-center">No custom products uploaded yet.</td></tr>';
            } else {
                customProds.forEach(prod => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${prod.name}</strong></td>
                        <td>${prod.category}</td>
                        <td>${prod.price}</td>
                        <td><button class="btn btn-sm btn-outline delete-item-btn" style="color: #e53e3e; border-color: #e53e3e; padding: 4px 8px; font-size: 0.75rem;">Delete</button></td>
                    `;
                    tr.querySelector('.delete-item-btn').addEventListener('click', () => {
                        deleteCustomProduct(prod.id);
                    });
                    prodTbody.appendChild(tr);
                });
            }
        }

        if (pageTbody) {
            pageTbody.innerHTML = '';
            const pages = getCustomPages();
            if (pages.length === 0) {
                pageTbody.innerHTML = '<tr><td colspan="3" class="text-muted text-center">No custom pages published yet.</td></tr>';
            } else {
                pages.forEach(p => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${p.title}</strong></td>
                        <td><a href="#page/${p.slug}" style="color: var(--primary); text-decoration: underline;">#page/${p.slug}</a></td>
                        <td><button class="btn btn-sm btn-outline delete-item-btn" style="color: #e53e3e; border-color: #e53e3e; padding: 4px 8px; font-size: 0.75rem;">Delete</button></td>
                    `;
                    tr.querySelector('.delete-item-btn').addEventListener('click', () => {
                        deleteCustomPage(p.slug);
                    });
                    pageTbody.appendChild(tr);
                });
            }
        }
    };


    // ==========================================
    // 8. SPA Hash Router
    // ==========================================
    const landingView = document.getElementById('landing-page-view');
    const adminView = document.getElementById('admin-view');
    const customPageView = document.getElementById('custom-page-view');

    const handleRouting = () => {
        const hash = window.location.hash;
        
        // Scroll navigation handling: close mobile navbar links
        if (navLinks) {
            navLinks.classList.remove('active');
            if (menuBtn) menuBtn.classList.remove('open');
            const spans = menuBtn.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }

        if (hash === '#tarusha-control-9220') {
            // Display Admin View
            landingView.style.display = 'none';
            customPageView.style.display = 'none';
            adminView.style.display = 'block';
            window.scrollTo({ top: 0 });
            renderAdminTables();
        } else if (hash.startsWith('#page/')) {
            // Display Custom Page View
            const slug = hash.replace('#page/', '');
            const pages = getCustomPages();
            const pageData = pages.find(p => p.slug === slug);

            landingView.style.display = 'none';
            adminView.style.display = 'none';
            customPageView.style.display = 'block';
            window.scrollTo({ top: 0 });

            const pageTitle = document.getElementById('custom-page-title');
            const pageBody = document.getElementById('custom-page-body');

            if (pageData) {
                pageTitle.textContent = pageData.title;
                pageBody.innerHTML = pageData.body;
            } else {
                pageTitle.textContent = '404 - Page Not Found';
                pageBody.innerHTML = '<p class="text-muted">The requested custom page could not be located in our local database catalog.</p>';
            }
        } else {
            // Display Main Landing View
            adminView.style.display = 'none';
            customPageView.style.display = 'none';
            landingView.style.display = 'block';

            // Handle sub-section scroll target alignment if present
            if (hash && hash !== '#') {
                const targetEl = document.querySelector(hash);
                if (targetEl) {
                    setTimeout(() => {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }
            }
        }
    };

    window.addEventListener('hashchange', handleRouting);
    
    // Add custom handler to simple scroll navigation items so routing switches back to landing view
    document.querySelectorAll('.nav-link-item').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHash = link.getAttribute('href');
            if (window.location.hash === '#tarusha-control-9220' || window.location.hash.startsWith('#page/')) {
                // If in Admin or Custom page, redirect hash back to home landing page first
                e.preventDefault();
                window.location.hash = '';
                setTimeout(() => {
                    window.location.hash = targetHash;
                }, 100);
            }
        });
    });


    // ==========================================
    // 9. Startup & Triggers
    // ==========================================
    renderCatalog();
    handleRouting();

    // Global utility function to select target interest from cards
    window.selectInterestInForm = (interestValue) => {
        const selectField = document.getElementById('lead-interest');
        if (selectField) {
            selectField.value = interestValue;
        }

        if (window.location.hash === '#tarusha-control-9220' || window.location.hash.startsWith('#page/')) {
            window.location.hash = '';
        }

        // Scroll to form smoothly
        const consultSection = document.getElementById('consultation');
        if (consultSection) {
            setTimeout(() => {
                consultSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    // ==========================================
    // 10. Downloadable Flyers Management
    // ==========================================
    const flyerForm = document.getElementById('admin-flyer-form');
    const flyerFileInput = document.getElementById('flyer-file');
    let uploadedFlyerBase64 = null;
    let uploadedFlyerMime = null;

    if (flyerFileInput) {
        flyerFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            uploadedFlyerMime = file.type;
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedFlyerBase64 = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    const getFlyers = () => {
        return JSON.parse(localStorage.getItem('tarusha_flyers') || '[]');
    };

    const deleteFlyer = (id) => {
        let flyers = getFlyers();
        flyers = flyers.filter(f => f.id.toString() !== id.toString());
        localStorage.setItem('tarusha_flyers', JSON.stringify(flyers));
        renderFlyers();
    };

    const renderFlyers = () => {
        const flyers = getFlyers();
        const navLink = document.getElementById('nav-resources-link');
        const publicSection = document.getElementById('resources');
        const publicGrid = document.getElementById('flyers-grid');
        const adminTbody = document.getElementById('admin-flyers-tbody');

        // Toggle visibility
        if (flyers.length === 0) {
            if (navLink) navLink.style.display = 'none';
            if (publicSection) publicSection.style.display = 'none';
        } else {
            if (navLink) navLink.style.display = 'inline-block';
            if (publicSection) publicSection.style.display = 'block';
        }

        // Render public grid
        if (publicGrid) {
            publicGrid.innerHTML = '';
            flyers.forEach(f => {
                const isPdf = f.mime && f.mime.includes('pdf');
                const card = document.createElement('div');
                card.className = 'flyer-card';
                card.innerHTML = `
                    <!--div class="flyer-icon">
                        ${isPdf ? '📄' : '🖼️'}
                    </div-->
                    <h3>${f.title}</h3>
                    <p>${f.desc}</p>
                    <a href="${f.data}" download="${f.title.replace(/\s+/g, '_')}${isPdf ? '.pdf' : '.png'}" class="btn btn-sm btn-outline btn-download">Download</a>
                `;
                publicGrid.appendChild(card);
            });
        }

        // Render admin table
        if (adminTbody) {
            adminTbody.innerHTML = '';
            if (flyers.length === 0) {
                adminTbody.innerHTML = '<tr><td colspan="2" class="text-muted text-center">No flyers uploaded yet.</td></tr>';
            } else {
                flyers.forEach(f => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${f.title}</strong></td>
                        <td><button class="btn btn-sm btn-outline delete-flyer-btn" style="color: #e53e3e; border-color: #e53e3e; padding: 4px 8px; font-size: 0.75rem;">Delete</button></td>
                    `;
                    tr.querySelector('.delete-flyer-btn').addEventListener('click', () => {
                        deleteFlyer(f.id);
                    });
                    adminTbody.appendChild(tr);
                });
            }
        }
    };

    if (flyerForm) {
        flyerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('flyer-title').value.trim();
            const desc = document.getElementById('flyer-desc').value.trim();

            if (!title || !desc || !uploadedFlyerBase64) {
                alert('Please fill out all fields and select a file.');
                return;
            }

            const newFlyer = {
                id: 'flyer-' + Date.now(),
                title,
                desc,
                mime: uploadedFlyerMime,
                data: uploadedFlyerBase64
            };

            const flyers = getFlyers();
            flyers.push(newFlyer);
            localStorage.setItem('tarusha_flyers', JSON.stringify(flyers));

            flyerForm.reset();
            uploadedFlyerBase64 = null;
            uploadedFlyerMime = null;
            
            alert('Flyer uploaded successfully!');
            renderFlyers();
        });
    }

    renderFlyers();

    // ==========================================
    // 11. WhatsApp Widget Logic
    // ==========================================
    const waToggleBtn = document.getElementById('wa-toggle-btn');
    const waChatBox = document.getElementById('whatsapp-chat-box');
    const waCloseBtn = document.getElementById('wa-close-btn');
    const waSendBtn = document.getElementById('wa-send-btn');
    const waInput = document.getElementById('wa-message-input');
    
    // The WhatsApp Business Number
    const WA_BUSINESS_NUMBER = '919220902015';

    if (waToggleBtn && waChatBox && waCloseBtn) {
        waToggleBtn.addEventListener('click', () => {
            waChatBox.classList.add('active');
            if (waInput) {
                setTimeout(() => waInput.focus(), 100);
            }
        });

        waCloseBtn.addEventListener('click', () => {
            waChatBox.classList.remove('active');
        });

        const sendWAMessage = () => {
            if (!waInput) return;
            const message = waInput.value.trim();
            if (message) {
                const url = `https://wa.me/${WA_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
                waInput.value = '';
                waChatBox.classList.remove('active');
            }
        };

        if (waSendBtn) {
            waSendBtn.addEventListener('click', sendWAMessage);
        }
        
        if (waInput) {
            waInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendWAMessage();
                }
            });
        }
    }

});
