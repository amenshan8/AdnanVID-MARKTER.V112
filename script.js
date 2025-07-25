// GSAP and ScrollTrigger registration
gsap.registerPlugin(ScrollTrigger);

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add clapperboard animation sequence for intro
document.addEventListener('DOMContentLoaded', () => {
    const clapperTop = document.querySelector('.clapper-top'); // The main title "A D N A N"
    const clapperBottom = document.querySelector('.clapper-bottom'); // The subtitle

    if (!clapperTop || !clapperBottom) return;

    // Initial setup for clapperTop (main title) and clapperBottom (subtitle)
    // Set initial state for 'A D N A N' to be invisible and slightly above its final position
    gsap.set(clapperTop, {
        opacity: 0,
        y: -30 // Start slightly above for a subtle slide-down effect
    });
    // Set initial state for the subtitle
    gsap.set(clapperBottom, {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        scale: 0.8,
        opacity: 0
    });

    // Create timeline for the intro animation
    const clapperTL = gsap.timeline({
        delay: 0.5, // Initial delay before the animation starts
        defaults: {
            ease: "power3.out"
        }
    });

    // Animate clapperTop (main title) first, then clapperBottom (subtitle)
    clapperTL
        .to(clapperTop, { // Animate 'A D N A N' to full opacity and correct position
            opacity: 1,
            y: 0,
            duration: 1.5, // Duration for 'A D N A N' animation
            ease: "power2.out"
        }, "start") // Start this animation at the beginning of the timeline
        .to(clapperBottom, { // Animate the subtitle
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out"
        }, "<0.5"); // Start subtitle animation 0.5 seconds before clapperTop finishes, for overlap

    // Add subtle film grain effect after the main intro animation
    gsap.to('.hero', {
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a0a 100%)",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        delay: clapperTL.duration() + clapperTL.delay() + 0.2, // Start after the entire text animation, plus a small buffer
        opacity: 0.98
    });
});

// Parallax effect for hero
gsap.to('.hero-video-container', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// Logo animation
gsap.from('.logo-animation', {
    y: -30,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.1
});

// Section reveal animations
gsap.utils.toArray('section').forEach(section => {
    // Exclude the testimonials section from the generic section reveal as Swiper has its own animation
    // Also exclude portfolio sections as their video loading function handles animation.
    if (section.id === 'testimonials' || section.classList.contains('portfolio-reels') || section.classList.contains('work-page')) return; 

    gsap.from(section.querySelectorAll('.section-title, .about-text, .service-item'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Portfolio filtering (currently unused, can be removed if not needed)
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                gsap.fromTo(item, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
                );
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }

    lastScroll = currentScroll;
});

// Service items animation - Fixed to ensure services are visible
gsap.from('.service-item', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
            // Ensure services are visible
            document.querySelectorAll('.service-item').forEach(item => {
                item.style.opacity = '1';
                item.style.visibility = 'visible';
            });
        }
    }
});

// Service items hover effect - Fixed
document.querySelectorAll('.service-item').forEach(item => {
    item.style.opacity = '1';
    item.style.visibility = 'visible';
    
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Force services to be visible on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.service-item').forEach(item => {
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.style.display = 'block';
    });
});

// Social links animation
gsap.from('.social-link', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.social-links',
        start: 'top 80%'
    }
});

// Language System
const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            work: "Work",
            services: "Services",
            contact: "Contact"
        },
        hero: {
            title: "A D N A N",
            subtitle: "Professional Videographer & Social Media Marketer",
            scroll: "Scroll to explore"
        },
        about: {
            title: "About Me",
            text: "Adnan Kousa is a creative professional who turns ideas into cinematic stories. As a videographer and social media marketer, Adnan helps brands, artists, and entrepreneurs grow through visual storytelling and digital content strategy."
        },
        work: {
            title: "My Work",
            subtitle: "Latest videos showcasing my creative vision",
            viewMore: "View More Videos"
        },
        services: {
            title: "Services",
            subtitle: "Professional creative services tailored to your needs",
            items: {
                videography: {
                    title: "Videography",
                    desc: "Professional shooting and editing for all your visual needs. From concept to final cut, we create stunning visuals that tell your story."
                },
                social: {
                    title: "Social Media Marketing",
                    desc: "Strategic content creation, ad campaigns, and growth strategies across platforms. Build your brand presence and engage your audience effectively."
                },
                commercial: {
                    title: "Commercials & Ads",
                    desc: "High-impact commercial production for brands and businesses. Create compelling advertisements that drive results and elevate your brand."
                },
                event: {
                    title: "Event Videography",
                    desc: "Complete event coverage with cinematic storytelling approach. Capture every moment of your special events with professional quality."
                },
                content: {
                    title: "Content Creation",
                    desc: "Platform-specific content for Instagram, TikTok and YouTube. Stay relevant with trending content that resonates with your audience."
                }
            }
        },
        testimonials: {
            title: "Client Stories",
            items: {
                1: { text: "Adnan transformed our brand's visual identity with stunning videos that doubled our engagement.", name: "- Sarah Johnson, Tech Startup CEO" },
                2: { text: "Working with Adnan was incredible. His creative vision brought our music to life visually.", name: "- Marcus Rivera, Recording Artist" },
                3: { text: "The wedding video exceeded all expectations. Every moment was captured perfectly.", name: "- Emily & David Chen" }
            }
        },
        contact: {
            title: "Let's Create Together",
            phone: "+31soon000",
            email: "adnankousa24@gmail.com",
            bioLink: "Bio Link",
            businessCard: "Business Card"
        },
        portfolio: {
            title: "Latest Work",
            subtitle: "A selection of recent projects shot in cinematic Reels format, optimized for social media impact.",
            viewMore: "View More Projects",
            items: [
                { title: "Cinematic Reel", category: "Brand Video" },
                { title: "Social Media Campaign", category: "Content Creation" },
                { title: "Event Highlights", category: "Event Coverage" },
                { title: "Product Showcase", category: "Commercial" },
                { title: "Behind the Scenes", category: "Documentary" }
            ]
        }
    },
    nl: {
        nav: {
            home: "Home",
            about: "Over Mij",
            work: "Werk",
            services: "Diensten",
            contact: "Contact"
        },
        hero: {
            title: "A D N A N",
            subtitle: "Professionele Videograaf & Social Media Marketeer",
            scroll: "Ontdek meer"
        },
        about: {
            title: "Over Mij",
            text: "Adnan Kousa is een creatieve professional die ideeën omzet in cinematische verhalen. Als videograaf en social media marketeer helpt Adnan merken, artiesten en ondernemers te groeien door visueel storytelling en digitale contentstrategie."
        },
        work: {
            title: "Mijn Werk",
            subtitle: "Nieuwste video's die mijn creatieve visie tonen",
            viewMore: "Meer Video's Bekijken"
        },
        services: {
            title: "Diensten",
            subtitle: "Professionele creatieve diensten op maat",
            items: {
                videography: {
                    title: "Videografie",
                    desc: "Professionele opnames, montage en dronebeelden voor al uw visuele behoeften. Van concept tot eindmontage creëren we prachtige beelden die uw verhaal vertellen."
                },
                social: {
                    title: "Social Media Marketing",
                    desc: "Strategische contentcreatie, advertentiecampagnes en groeistrategieën op alle platforms. Bouw uw merk aanwezigheid op en betrek uw publiek effectief."
                },
                commercial: {
                    title: "Commercials & Ads",
                    desc: "Impactvolle commercial productie voor merken en bedrijven. Creëer boeiende advertenties die resultaten opleveren en uw merk verheffen."
                },
                event: {
                    title: "Event Videografie",
                    desc: "Tegelijkertijd eventdekking met een cinematografische storytelling aanpak. Leg elk moment van uw speciale gebeurtenissen vast met professionele kwaliteit."
                },
                content: {
                    title: "Content Creatie",
                    desc: "Platform-specifieke content voor Instagram, TikTok en YouTube. Blijf relevant met trending content die resoneert met uw publiek."
                }
            }
        },
        testimonials: {
            title: "Klantverhalen",
            items: {
                1: { text: "Adnan transformeerde de visuele identiteit van ons merk met prachtige video's die onze betrokkenheid verdubbelden.", name: "- Sarah Johnson, Tech Startup CEO" },
                2: { text: "Met Adnan samenwerken was ongelooflijk. Zijn creatieve visie bracht onze muziek visueel tot leven.", name: "- Marcus Rivera, Muzikant" },
                3: { text: "De trouwfilm overtrof alle verwachtingen. Elk moment werd perfect vastgelegd.", name: "- Emily & David Chen" }
            }
        },
        contact: {
            title: "Laten We Creëren",
            phone: "+31soon000",
            email: "adnankousa24@gmail.com",
            bioLink: "Bio Link",
            businessCard: "Visitekaartje"
        }
    },
    ar: {
        nav: {
            home: "الرئيسية",
            about: "عنّي",
            work: "أعمالي",
            services: "الخدمات",
            contact: "تواصل"
        },
        hero: {
            title: "A D N A N",
            subtitle: "مصور فيديو ومسوق لوسائل التواصل الاجتماعي",
            scroll: "استكشف"
        },
        about: {
            title: "عنّي",
            text: "عدنان يساعد العلامات التجارية على الظهور بشكل احترافي وجذاب من خلال الفيديوهات، الصور، والإعلانات الرقمية. يمزج بين الإبداع والمعرفة التسويقية ليصنع محتوى يلفت الانتباه ويترك أثر. شغفه هو تحويل الأفكار إلى صور تنحكى… وتتشارك."
        },
        work: {
            title: "أعمالي",
            subtitle: "أحدث مقاطع الفيديو التي تعرض رؤيتي الإبداعية",
            viewMore: "عرض المزيد من الفيديوهات"
        },
        services: {
            title: "الخدمات",
            subtitle: "خدمات إبداعية احترافية مصممة حسب احتياجاتك",
            items: {
                videography: {
                    title: "تصوير الفيديو",
                    desc: "تصوير ومونتاج احترافي لجميع احتياجاتك البصرية. من الفكرة إلى اللقطة النهائية، نحن نخلق لقطات مذهلة تروي قصتك."
                },
                social: {
                    title: "تسويق وسائل التواصل",
                    desc: "إنشاء محتوى استراتيجي، حملات إعلانية، واستراتيجيات نمو عبر جميع المنصات. بناء حضور علامتك التجارية والتفاعل مع جمهورك بشكل فعال."
                },
                commercial: {
                    title: "فيديوهات إعلانية",
                    desc: "إنتاج فيديو إعلاني عالي التأثير للعلامات التجارية والشركات. إنشاء إعلانات جذابة تحقق نتائج وتعزز علامتك التجارية."
                },
                event: {
                    title: "تصوير المناسبات",
                    desc: "تغطية كاملة للمناسبات مع نهج سينمائي للسرد. التقاط كل لحظة من مناسباتك الخاصة بجودة احترافية."
                },
                content: {
                    title: "إنشاء المحتوى",
                    desc: "محتوى مخصص للمنصات مثل إنستغرام، تيك توك ويوتيوب. محتوى يتناسب مع جمهورك ويعكس تطلعاتهم."
                }
            }
        },
        testimonials: {
            title: "قصص العملاء",
            items: {
                1: { text: "عدنان غيّر الهوية البصرية لعلامتنا التجارية بفيديوهات مذهلة مضاعفتة لمعدلات التفاعل.", name: "- سارة جونسون، الرئيس التنفيذي لشركة تكنولوجيا" },
                2: { text: "العمل مع عدنان كان لا يصدق. رؤيته الإبداعية أحيت موسيقانا بصريًا.", name: "- ماركوس ريفيرا، فنان موسيقي" },
                3: { text: "فيديو الزفاف تفوق على جميع التوقعات. تم التقاط كل لحظة بشكل مثالي.", name: "- إميلي وديفيد تشين" }
            }
        },
        contact: {
            title: "لنبدع معًا",
            phone: "+31soon000",
            email: "adnankousa24@gmail.com",
            bioLink: "رابط السيرة",
            businessCard: "بطاقة العمل"
        }
    }

};

let currentLang = 'en';

// Language switcher component
function createLanguageSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
        <div class="language-toggle">
            <div class="language-option active" data-lang="en">EN</div>
            <div class="language-option" data-lang="nl">NL</div>
            <div class="language-option" data-lang="ar">ع</div>
            <div class="language-slider"></div>
        </div>
    `;
    
    document.querySelector('.nav-container').appendChild(switcher);
    
    // Add event listeners
    switcher.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    if (currentLang === lang) return;
    
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Special handling for portfolio section
    const portfolioSection = document.querySelector('.portfolio');
    if (portfolioSection) {
        // Always keep video content LTR
        portfolioSection.setAttribute('dir', 'ltr');
        
        // Update video items
        const videoItems = portfolioSection.querySelectorAll('.video-item, .swiper-container, .swiper-slide');
        videoItems.forEach(item => {
            item.setAttribute('dir', 'ltr');
        });
    }
    
    // Update active state
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    });
    
    // Animate slider based on offsetLeft and offsetWidth
    const slider = document.querySelector('.language-slider');
    const activeOption = document.querySelector(`.language-option[data-lang="${lang}"]`);
    if (slider && activeOption) {
        slider.style.left = activeOption.offsetLeft + 'px';
        slider.style.width = activeOption.offsetWidth + 'px';
    }
    
    // Update all text content
    updateTextContent();
    
    // Add transition effect
    document.body.style.opacity = '0.9';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
}

// Function to update all text content on the page based on current language
function updateTextContent() {
    const t = translations[currentLang];
    
    // Safely update elements
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 6) {
        navLinks[0].textContent = t.nav.home;
        navLinks[1].textContent = t.nav.about;
        navLinks[2].textContent = t.nav.work;
        navLinks[3].textContent = t.nav.services;
        navLinks[4].textContent = t.nav.testimonials;
        navLinks[5].textContent = t.nav.contact;
    }
    
    // Hero
    const heroTitle = document.querySelector('.hero-title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const scrollText = document.querySelector('.scroll-indicator span');
    
    if (heroTitle) heroTitle.textContent = t.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    if (scrollText) scrollText.textContent = t.hero.scroll;
    
    // About
    const aboutTitle = document.querySelector('#about .section-title');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutTitle) aboutTitle.textContent = t.about.title;
    if (aboutText) aboutText.textContent = t.about.text;
    
    // Work
    const workTitle = document.querySelector('#work .section-title');
    const portfolioSubtitle = document.querySelector('.portfolio-subtitle'); // Corrected selector for homepage work subtitle
    const seeMoreBtnText = document.querySelector('.see-more-btn span');
    
    // Check if elements exist before updating
    if (workTitle) workTitle.textContent = t.work.title;
    if (portfolioSubtitle) portfolioSubtitle.textContent = t.work.subtitle;
    if (seeMoreBtnText) seeMoreBtnText.textContent = t.work.viewMore;

    // For my-work.html specific titles if they exist
    const myWorkPageTitle = document.querySelector('.work-page .section-title');
    const myWorkPageSubtitle = document.querySelector('.work-page .work-subtitle');
    if (myWorkPageTitle) myWorkPageTitle.textContent = translations[currentLang].work.title; // Re-use work title
    if (myWorkPageSubtitle) myWorkPageSubtitle.textContent = translations[currentLang].work.subtitle; // Re-use work subtitle
    
    // Services
    const servicesTitle = document.querySelector('#services .section-title');
    const servicesSubtitle = document.querySelector('.services-subtitle');
    
    if (servicesTitle) servicesTitle.textContent = t.services.title;
    if (servicesSubtitle) servicesSubtitle.textContent = t.services.subtitle;
    
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceKeys = Object.keys(t.services.items);
    serviceItems.forEach((item, index) => {
        if (serviceKeys[index]) {
            const service = t.services.items[serviceKeys[index]];
            const title = item.querySelector('h3');
            const desc = item.querySelector('p');
            
            if (title) title.textContent = service.title;
            if (desc) desc.textContent = service.desc;
        }
    });
    
    // Testimonials - Now handled by updateTestimonialText
    updateTestimonialText();
    
    // Contact
    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) contactTitle.textContent = t.contact.title;
    
    const phoneText = document.querySelector('.contact-info .elementor-icon-list-item:nth-child(1) .elementor-icon-list-text');
    const emailText = document.querySelector('.contact-info .elementor-icon-list-item:nth-child(2) .elementor-icon-list-text');
    const bioLink = document.querySelector('.contact-links .btn-outline:nth-child(1)');
    const businessCard = document.querySelector('.contact-links .btn-outline:nth-child(2)');
    
    if (phoneText) phoneText.textContent = t.contact.phone;
    if (emailText) emailText.textContent = t.contact.email;
    if (bioLink) bioLink.textContent = t.contact.bioLink;
    if (businessCard) businessCard.textContent = t.contact.businessCard;
}

/**
 * Loads videos from reviews.json and populates the specified container.
 * This function is used for both the homepage (limited videos) and the work page (all videos).
 * @param {string} containerId - The ID of the HTML element where videos should be displayed.
 * @param {number|null} limit - The maximum number of videos to display. If null, all videos are displayed.
 */
async function loadProjectVideos(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container with ID "${containerId}" not found.`);
        return;
    }

    // Determine base class name based on containerId to apply correct styles
    // 'videoGallery' is for homepage (reels-grid, reel-item), 'workGrid' is for my-work.html (work-grid, work-item)
    const baseClassName = containerId === 'videoGallery' ? 'reel' : 'work';

    try {
        const response = await fetch('videos.json');
        const allVideos = await response.json();

        if (!allVideos || allVideos.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                    <h3 style="font-size: 24px; color: var(--text-muted); margin-bottom: 20px;">
                        No videos available at the moment.
                    </h3>
                    <p style="color: var(--text-muted); font-size: 16px;">
                        Check back soon for new content.
                    </p>
                </div>
            `;
            return;
        }

        container.innerHTML = ''; // Clear previous content

        const videosToShow = limit !== null ? allVideos.slice(0, limit) : allVideos;

        videosToShow.forEach((video, index) => {
            const videoItem = document.createElement('div');
            videoItem.className = `${baseClassName}-item`; // e.g., 'reel-item' or 'work-item'
            videoItem.style.animationDelay = `${index * 0.1}s`;

            videoItem.innerHTML = `
                <div class="${baseClassName}-video-container">
                    <iframe src="${video.url}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            loading="lazy">
                    </iframe>
                </div>
                <div class="${baseClassName}-info">
                    <h3 class="${baseClassName}-title">${video.title}</h3>
                    <p class="${baseClassName}-category">Professional Reel</p>
                </div>
            `;
            container.appendChild(videoItem);
        });

        // Animate items on scroll after they are added to the DOM
        gsap.from(container.querySelectorAll(`.${baseClassName}-item`), {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

    } catch (error) {
        console.error('Error loading videos:', error);
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <h3 style="font-size: 24px; color: var(--primary-color); margin-bottom: 20px;">
                    Error Loading Videos
                </h3>
                <p style="color: var(--text-muted); font-size: 16px;">
                    Please check your connection and refresh the page.
                </p>
            </div>
        `;
    }
}

// Global Swiper instance for testimonials
let testimonialsSwiper;

/**
 * Loads testimonials from reviews.json and initializes the Swiper carousel.
 *
 * How to add/remove/change reviews:
 * 1. Open 'reviews.json'.
 * 2. To add a review: Add a new JSON object to the array following the existing structure.
 *    - "name": Client's Name
 *    - "title": Client's Title/Role
 *    - "image": Path to client's logo/image (e.g., "images/clients/new_client.png")
 *    - "review": An object containing review text for each supported language (en, nl, ar).
 * 3. To remove a review: Simply delete its JSON object from the array.
 * 4. To change a review: Edit the text, name, title, or image path of an existing JSON object.
 * 5. Ensure all image paths are correct and the images exist in the 'images/clients/' folder.
 * 6. The system will automatically update the carousel.
 */
async function loadTestimonials() {
    const testimonialSwiperWrapper = document.querySelector('.testimonial-swiper .swiper-wrapper');
    const testimonialEmptyState = document.querySelector('.testimonial-empty-state');
    const swiperNavButtons = document.querySelectorAll('.testimonial-swiper .swiper-button-prev, .testimonial-swiper .swiper-button-next');

    if (!testimonialSwiperWrapper || !testimonialEmptyState) return;

    try {
        const response = await fetch('reviews.json');
        const reviews = await response.json();

        // Clear existing content in wrapper
        testimonialSwiperWrapper.innerHTML = '';
        // Hide empty state by default
        testimonialEmptyState.style.display = 'none';
        // Show navigation buttons by default
        swiperNavButtons.forEach(btn => btn.style.display = 'flex');


        if (!reviews || reviews.length === 0) {
            // No reviews, show empty state message
            testimonialEmptyState.style.display = 'block';
            testimonialEmptyState.querySelector('h3').textContent = translations[currentLang].testimonials.empty.title;
            testimonialEmptyState.querySelector('p').textContent = translations[currentLang].testimonials.empty.message;
            // Hide Swiper navigation if no content
            swiperNavButtons.forEach(btn => btn.style.display = 'none');

            // Destroy Swiper if it exists
            if (testimonialsSwiper) {
                testimonialsSwiper.destroy(true, true);
                testimonialsSwiper = null;
            }
            return;
        }

        reviews.forEach((review, index) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `
                <div class="testimonial-content">
                    <p class="testimonial-review-text" data-review-key="${index}"></p>
                    <div class="testimonial-author-info">
                        <img src="${review.image}" alt="${review.name} logo" class="client-image" onerror="this.src='images/clients/placeholder.png';">
                        <span class="client-name">${review.name}</span>
                        <span class="client-title">${review.title}</span>
                    </div>
                </div>
            `;
            testimonialSwiperWrapper.appendChild(slide);
        });

        // Initialize Swiper after content is loaded
        // Destroy old instance if it exists to prevent re-initialization issues
        if (testimonialsSwiper) {
            testimonialsSwiper.destroy(true, true);
        }

        testimonialsSwiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1, // Default for mobile
            spaceBetween: 30, // Space between slides
            loop: true, // Enable infinite loop for smooth continuous navigation
            speed: 800, // Smooth transition speed
            effect: 'slide', // Use slide effect
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000, // Auto-advance every 5 seconds
                disableOnInteraction: true, // Stop autoplay on user interaction (e.g., clicking arrows)
            },
            breakpoints: {
                // When window width is >= 768px, show 2 slides
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                // When window width is >= 1024px, show 3 slides
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 60,
                }
            },
            on: {
                init: function() {
                    // Stagger animation for slides on init when they appear
                    gsap.to(this.slides, {
                        opacity: 1,
                        y: 0,
                        visibility: "visible",
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: 0.1,
                        delay: 0.3 // Delay to run after page load animations
                    });
                },
                // Re-enable autoplay if it was disabled by user interaction
                autoplayStop: function() {
                    this.autoplay.start();
                }
            }
        });

        // Update testimonial text immediately after loading/initializing Swiper
        // This ensures correct language is displayed on first load.
        updateTestimonialText(); 

    } catch (error) {
        console.error('Error loading testimonials:', error);
        // Display error message in the empty state container
        testimonialEmptyState.style.display = 'block';
        testimonialEmptyState.querySelector('h3').textContent = translations[currentLang].testimonials.error.title;
        testimonialEmptyState.querySelector('p').textContent = translations[currentLang].testimonials.error.message;
        // Hide Swiper navigation
        swiperNavButtons.forEach(btn => btn.style.display = 'none');
        
        // Ensure Swiper instance is destroyed on error too
        if (testimonialsSwiper) {
            testimonialsSwiper.destroy(true, true);
            testimonialsSwiper = null;
        }
    }
}

/**
 * Updates the text content of testimonial slides based on the current language.
 * This function is called by `updateTextContent()` when the language is switched.
 */
async function updateTestimonialText() {
    try {
        const response = await fetch('reviews.json');
        const reviews = await response.json();

        const reviewParagraphs = document.querySelectorAll('.testimonial-review-text');
        reviewParagraphs.forEach(p => {
            const index = p.getAttribute('data-review-key');
            if (reviews[index] && reviews[index].review[currentLang]) {
                p.textContent = reviews[index].review[currentLang];
            }
        });

        // Update the main section title for testimonials
        const testimonialsTitle = document.querySelector('#testimonials .section-title');
        if (testimonialsTitle) {
            testimonialsTitle.textContent = translations[currentLang].testimonials.title;
        }
        
        // Update the empty/error state messages if they are visible
        const testimonialEmptyState = document.querySelector('.testimonial-empty-state');
        if (testimonialEmptyState && testimonialEmptyState.style.display !== 'none') {
             if (reviews.length === 0) {
                testimonialEmptyState.querySelector('h3').textContent = translations[currentLang].testimonials.empty.title;
                testimonialEmptyState.querySelector('p').textContent = translations[currentLang].testimonials.empty.message;
            } else { // This else block handles the case where it's an error state
                testimonialEmptyState.querySelector('h3').textContent = translations[currentLang].testimonials.error.title;
                testimonialEmptyState.querySelector('p').textContent = translations[currentLang].testimonials.error.message;
            }
        }

    } catch (error) {
        console.error('Error fetching reviews for language update:', error);
    }
}

// Initialize language system and load dynamic content
document.addEventListener('DOMContentLoaded', async () => {
    createLanguageSwitcher();
    // Call switchLanguage once to set the initial state correctly for the slider and text
    switchLanguage(currentLang); 
    await loadTestimonials(); // Load and initialize testimonials FIRST

    // Check for specific elements to determine which page we are on
    const homepageVideoGallery = document.getElementById('videoGallery'); // ID for the homepage work section
    const myWorkGrid = document.getElementById('workGrid'); // ID for the my-work.html grid

    if (homepageVideoGallery) {
        // This is the homepage, load only 3 videos
        loadProjectVideos('videoGallery', 3);
    } else if (myWorkGrid) {
        // This is the my-work.html page, load all videos
        loadProjectVideos('workGrid');
    }
});

// Add this to ensure video content doesn't flip in RTL mode (now more comprehensive)
document.addEventListener('DOMContentLoaded', () => {
    // Force LTR direction for video content in RTL mode for relevant sections
    const portfolioSections = document.querySelectorAll('.portfolio-reels, .work-page');
    portfolioSections.forEach(section => {
        section.setAttribute('dir', 'ltr');
    });
    
    // Ensure video items maintain LTR
    const videoItems = document.querySelectorAll('.reel-item, .work-item, .swiper-container, .swiper-slide');
    videoItems.forEach(item => {
        item.setAttribute('dir', 'ltr');
    });
});

// Add staggered animation for reels
document.addEventListener('DOMContentLoaded', () => {
    const reelItems = document.querySelectorAll('.reel-item');
    reelItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
});
