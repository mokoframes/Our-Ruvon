(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('fixed-top').css('padding', '0');
        } else {
            $('.nav-bar').removeClass('fixed-top').css('padding', '0px 90px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Donation progress
    $('.donation-item .donation-progress').waypoint(function () {
        $('.donation-item .progress .progress-bar').each(function () {
            $(this).css("height", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'rotateOutUpRight',
        animateIn: 'rotateInDownLeft',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);


 
    /* =========================================
       1. THE BRAIN: MASTER DATABASE (UPDATED)
       ========================================= */
    const siteDB = {
        categories: [
            { id: "inorganic", name: "Inorganic Chemicals", url: "Inorganic-Chemicals.html", keywords: ["caustic", "soda ash", "pac", "bleaching", "shmp", "alum"] },
            { id: "organic", name: "Organic Chemicals", url: "Organic-Chemicals.html", keywords: ["ipa", "isopropyl", "ethyl", "acetate", "acetone", "acetic", "phenol"] },
            { id: "agro", name: "Agro Chemicals & Fertilizers", url: "Agro-Chemicals.html", keywords: ["humate", "npk", "gibberellic", "zinc", "magnesium", "fertilizer", "urea"] },
            { id: "dyes", name: "Dyes & Pigments", url: "Dyes-Pigments.html", keywords: ["reactive", "pigment", "dye", "color", "colour", "black b", "blue 15", "titanium", "tio2"] },
            { id: "oleo", name: "Oleochemicals & Castor Oil", url: "Oleochemicals-Castoroil.html", keywords: ["castor", "stearic", "soap", "glycerine", "12-hsa", "labsa"] },
            { id: "solvents", name: "Industrial Solvents", url: "Petrochemicals-IndustrialSolvents.html", keywords: ["xylene", "toluene", "benzene", "hexane", "mto", "glycol"] },
            { id: "oilgas", name: "Oil & Gas Drilling Chemicals", url: "Oil-GasDrilling-Chemicals.html", keywords: ["xanthan", "barite", "phpa", "pac-r", "drilling", "calcium bromide"] }
        ],
        corporate: {
            "profile": "<b>Ruvon International Pvt. Ltd.</b> is a premier Merchant Exporter & Importer based in Vadodara, Gujarat. We specialize in global chemical sourcing and supply chain solutions.",
            "how_we_work": "We work as a <b>Strategic Bridge</b> between global manufacturers and local industries, ensuring technical alignment and smooth procurement.",
            "vision": "<b>Our Vision:</b> To become a global leader in chemical trade by providing reliable, compliant, and high-quality raw materials.",
            "logistics": "We offer <b>End-to-End Logistics</b> including sea freight, road transport, and multimodal solutions to ensure timely delivery.",
            "packaging": "We provide <b>Custom Packaging</b> (25kg, 50kg, 1MT Jumbo Bags) and <b>Private Labeling</b> services to meet your brand requirements.",
            "moq": "Our standard <b>MOQ</b> is 1 FCL for exports and 1-5 Tons for domestic supplies.",
            "payment": "We accept <b>Letter of Credit (LC)</b>, <b>TT</b>, and standard bank transfers.",
            "location": "Headquarters: A/6, Parimal Soc-2, Ajwa Road, <b>Vadodara, Gujarat, India (390019)</b>.",
            "contact": "Sales: <b>+91 9773071752</b> | Email: <b>info@ruvonchemicals.com</b>"
        }
    };

    const msgSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3'); 
    let firstOpen = true;

    function toggleChat() {
        const chatBox = document.getElementById('chatBox');
        if (chatBox.style.display === 'none' || chatBox.style.display === '') {
            chatBox.style.display = 'flex';
            if (firstOpen) { welcomeFlow(); firstOpen = false; }
        } else { chatBox.style.display = 'none'; }
    }

    async function welcomeFlow() {
        showTyping(); await sleep(800); hideTyping();
        addBotMessage(getGreeting() + " Welcome to <b>Ruvon International</b>. 👋");
        showTyping(); await sleep(600); hideTyping();
        addBotMessage("Explore our chemicals or know more about our services:");
        showOptions(['Find Chemicals', 'Get Quotation', 'Company Profile', 'Contact Sales']);
    }

    /* =========================================
       2. INTELLIGENT LOGIC ENGINE
       ========================================= */

    function processUserMessage(msg) {
        msg = msg.toLowerCase();
        showTyping();

        setTimeout(() => {
            hideTyping();

            // A. Check Category Keywords
            const catMatch = siteDB.categories.find(c => msg.includes(c.id) || msg.includes(c.name.toLowerCase()));
            if (catMatch) {
                addBotMessage(`Explore our <b>${catMatch.name}</b> division here:`);
                addBotMessage(`<a href="${catMatch.url}" class="btn btn-sm btn-primary text-black fw-bold mt-2">Open ${catMatch.name} Page</a>`);
                return;
            }

            // B. Specific Corporate Q&A matching
            if (msg.includes("vision") || msg.includes("mission")) { addBotMessage(siteDB.corporate.vision); return; }
            if (msg.includes("work") || msg.includes("how you work")) { addBotMessage(siteDB.corporate.how_we_work); return; }
            if (msg.includes("logistics") || msg.includes("delivery") || msg.includes("shipping")) { addBotMessage(siteDB.corporate.logistics); return; }
            if (msg.includes("packing") || msg.includes("labeling") || msg.includes("label")) { addBotMessage(siteDB.corporate.packaging); return; }
            if (msg.includes("moq") || msg.includes("quantity")) { addBotMessage(siteDB.corporate.moq); return; }
            if (msg.includes("payment") || msg.includes("terms")) { addBotMessage(siteDB.corporate.payment); return; }
            if (msg.includes("location") || msg.includes("where")) { addBotMessage(siteDB.corporate.location); return; }
            if (msg.includes("contact") || msg.includes("number")) { addBotMessage(siteDB.corporate.contact); return; }

            // C. Keyword Search for Specific Chemicals
            let found = false;
            siteDB.categories.forEach(cat => {
                cat.keywords.forEach(key => {
                    if (msg.includes(key)) {
                        addBotMessage(`We supply <b>${key.toUpperCase()}</b> under ${cat.name}.`);
                        addBotMessage(`<a href="${cat.url}" style="color:var(--primary); font-weight:bold;">Check Specifications</a>`);
                        found = true;
                    }
                });
            });
            if (found) return;

            // D. Quotation Match
            if (msg.includes("quote") || msg.includes("price") || msg.includes("rate")) {
                addBotMessage("Please fill our formal request form for spot pricing:");
                addBotMessage("<a href='Quote-Now.html' class='btn btn-sm btn-dark w-100 mt-2'>Request Official Quote</a>");
                return;
            }

            // E. Greetings
            if (msg.match(/hi|hello|hey|morning|evening/)) {
                addBotMessage("Hello! Ready to assist you. What can I do for you?");
                showOptions(['Find Chemicals', 'Company Profile']);
                return;
            }

            // Fallback
            addBotMessage("I didn't quite get that. Can you please select an option?");
            showOptions(['Find Chemicals', 'Company Profile', 'Contact Sales']);
        }, 800);
    }

    /* =========================================
       3. INTERACTIVE OPTION HANDLER
       ========================================= */

    function handleOptionClick(opt) {
        addUserMessage(opt);
        showTyping();
        setTimeout(() => {
            hideTyping();
            
            if (opt === 'Find Chemicals') {
                addBotMessage("Select a business division:");
                showOptions(['Inorganic', 'Organic', 'Agro Chemicals', 'Dyes & Pigments', 'Oleochemicals', 'Solvents', 'Oil & Gas']);
            } 
            else if (opt === 'Company Profile') {
                addBotMessage(siteDB.corporate.profile);
                addBotMessage("What would you like to know about our operations?");
                showOptions(['Vision & Mission', 'How We Work', 'Logistics', 'Packaging']);
            }
            else if (opt === 'Vision & Mission') { addBotMessage(siteDB.corporate.vision); showOptions(['Logistics', 'Main Menu']); }
            else if (opt === 'How We Work') { addBotMessage(siteDB.corporate.how_we_work); showOptions(['Packaging', 'Main Menu']); }
            else if (opt === 'Logistics') { addBotMessage(siteDB.corporate.logistics); showOptions(['Company Profile', 'Main Menu']); }
            else if (opt === 'Packaging') { addBotMessage(siteDB.corporate.packaging); showOptions(['Get Quotation', 'Main Menu']); }
            else if (opt === 'Contact Sales') { addBotMessage(siteDB.corporate.contact); }
            else if (opt === 'Get Quotation') { processUserMessage('quote'); }
            else if (opt === 'Main Menu') { welcomeFlow(); }
            else { processUserMessage(opt); }
        }, 600);
    }

    /* =========================================
       4. UI HELPERS
       ========================================= */

    function addBotMessage(text) {
        const chatBody = document.getElementById('chatBody');
        const div = document.createElement('div');
        div.className = 'message bot-message';
        div.innerHTML = text;
        chatBody.appendChild(div);
        msgSound.play().catch(e => {}); 
        scrollToBottom();
    }

    function addUserMessage(text) {
        const chatBody = document.getElementById('chatBody');
        const div = document.createElement('div');
        div.className = 'message user-message';
        div.textContent = text;
        chatBody.appendChild(div);
        scrollToBottom();
    }

    function showOptions(options) {
        const chatBody = document.getElementById('chatBody');
        const div = document.createElement('div');
        div.className = "mt-2 mb-3";
        options.forEach(opt => {
            const span = document.createElement('span');
            span.className = 'option-btn';
            span.textContent = opt;
            span.onclick = () => handleOptionClick(opt);
            div.appendChild(span);
        });
        chatBody.appendChild(div);
        scrollToBottom();
    }

    function sendMessage() {
        const input = document.getElementById('userInput');
        const val = input.value.trim();
        if (val) { addUserMessage(val); processUserMessage(val); input.value = ""; }
    }

    function handleKeyPress(e) { if (e.key === "Enter") sendMessage(); }

    function showTyping() {
        if(document.getElementById('typingInd')) return;
        const div = document.createElement('div');
        div.id = 'typingInd'; div.className = 'typing-indicator'; div.style.display = 'block';
        div.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        document.getElementById('chatBody').appendChild(div);
        scrollToBottom();
    }

    function hideTyping() { const el = document.getElementById('typingInd'); if(el) el.remove(); }
    function getGreeting() {
        const h = new Date().getHours();
        return h < 12 ? "Good Morning! ☀️" : h < 17 ? "Good Afternoon! 🌤️" : "Good Evening! 🌙";
    }
    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
    function scrollToBottom() { const b = document.getElementById('chatBody'); b.scrollTop = b.scrollHeight; }
