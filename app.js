/* -------------------------------------------------------------
   Tarusha Farms - Interactive Features & Local Storage Database (Migrated to Firebase)
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

            const accessKeyElement = document.querySelector('input[name="access_key"]');
            const accessKey = accessKeyElement ? accessKeyElement.value : null;

            if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE') {
                const submitBtn = document.getElementById('btn-submit-lead');
                if (submitBtn) {
                    submitBtn.innerText = 'Sending...';
                    submitBtn.disabled = true;
                }

                const formData = new FormData(leadForm);
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                }).then(response => {
                    if (response.status === 200) {
                        leadForm.style.display = 'none';
                        successCard.style.display = 'block';
                    } else {
                        alert('Something went wrong. Please try again.');
                    }
                }).catch(error => {
                    alert('Error submitting form. Please check your connection.');
                }).finally(() => {
                    if (submitBtn) {
                        submitBtn.innerText = 'Submit Inquiry';
                        submitBtn.disabled = false;
                    }
                });
            } else {
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
            }
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
            name: 'Tarusha Starter Kit',
            price: ' ',
            category: 'kits',
            desc: 'A complete customizable smart hydroponics kit featuring automatic circulation and specialized growth lighting. Perfect for kitchen salads and fresh herbs.',
            image: 'assets/kit-starter.jpg'
        },
        {
            id: 'sys-family-kit',
            name: 'Tarusha Family Kit',
            price: ' ',
            category: 'kits',
            desc: 'A complete customizable smart hydroponics kit featuring automatic circulation and specialized growth lighting for familys of four. Perfect for kitchen salads and fresh herbs.',
            image: 'assets/kit-family.jpg'
        },
        {
            id: 'sys-dutch-kit',
            name: 'Tarusha Indoor Dutch bucket Kit',
            price: ' ',
            category: 'kits',
            desc: 'A complete customizable Indoor dutch bucket hydroponics kit featuring automatic circulation and specialized growth lighting . Perfect for tomatoes, gourds,cucumbers and bellpeppers.',
            image: 'assets/indoor_dutch_bucket.jpeg'
        }            
    ];

    // Render Product Catalog
    const renderCatalog = () => {
        const grid = document.getElementById('catalog-products-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const allProducts = [...defaultProducts];

        allProducts.forEach(prod => {
            const card = document.createElement('article');
            card.className = 'solution-card'; 

            card.innerHTML = `
                <div class="solution-img-wrapper" style="height: 200px;">
                    <img src="${prod.image}" alt="${prod.name}" class="solution-img" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;">
                </div>
                <div class="solution-content">
                    <span class="client-type" style="margin-bottom: 8px;">${prod.category === 'kits' ? 'Hydroponic System' : prod.category === 'courses' ? 'Training Course' : 'Fresh Produce'}</span>
                    <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${prod.name}</h3>
                    <p style="font-size: 0.85rem; margin-bottom: 12px; flex-grow: 1;">${prod.desc}</p>
                    <div style="display: flex; justify-content: flex-end; align-items: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 12px;">
                        <a href="#consultation" class="btn btn-sm btn-primary" onclick="selectInterestInForm('Hydroponic Kits')">Request Quote</a>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    };


    // ==========================================
    // 6. SPA Hash Router
    // ==========================================
    const landingView = document.getElementById('landing-page-view');

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

        // Handle sub-section scroll target alignment if present
        if (hash && hash !== '#') {
            const targetEl = document.querySelector(hash);
            if (targetEl) {
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        }
    };

    window.addEventListener('hashchange', handleRouting);


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
    
    // To add a new flyer, copy the block below and replace the details.
    const defaultFlyers = [
        /* Example flyer format:
        {
            title: 'Home Kit Maintenance Guide',
            desc: 'Learn how to clean and maintain your hydroponic kit.',
            mime: 'application/pdf',
            data: 'assets/maintenance-guide.pdf'
        }
        */
    ];

    const getFlyers = () => defaultFlyers;

    const renderFlyers = () => {
        const flyers = getFlyers();
        const navLink = document.getElementById('nav-resources-link');
        const publicSection = document.getElementById('resources');
        const publicGrid = document.getElementById('flyers-grid');

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
                    <h3>${f.title}</h3>
                    <p>${f.desc}</p>
                    <a href="${f.data}" target="_blank" download="${f.title.replace(/\s+/g, '_')}${isPdf ? '.pdf' : '.png'}" class="btn btn-sm btn-outline btn-download">Download</a>
                `;
                publicGrid.appendChild(card);
            });
        }
    };

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
