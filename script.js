/* ==================== SHOW MENU ==================== */
const navMenu = document.getElementById('navMenu'),
      navToggle = document.getElementById('navToggle'),
      navClose = document.getElementById('navClose')

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* ==================== REMOVE MENU ON LINK CLICK ==================== */
const navLink = document.querySelectorAll('.nav-link')

const linkAction = () => {
    const navMenu = document.getElementById('navMenu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ==================== SCROLL HEADER EFFECT ==================== */
const scrollHeader = () => {
    const header = document.getElementById('header')
    if(window.scrollY >= 50) {
        document.querySelector('.header').classList.add('scroll-header');
    } else {
        document.querySelector('.header').classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader)

/* ==================== SCROLL PROGRESS BAR ==================== */
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progressBar');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }
});

/* ==================== ACTIVE LINK STATE ON SCROLL ==================== */
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* ==================== DARK LIGHT THEME ==================== */
const themeButton = document.getElementById('themeToggle')
const darkTheme = 'dark-theme'
const lightTheme = 'light-theme'

// Read selected theme from localStorage
const selectedTheme = localStorage.getItem('selected-theme')

// Check if user has selected a theme previously
if (selectedTheme) {
  document.body.className = selectedTheme
} else {
  // Default is dark-theme
  document.body.className = darkTheme
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    if (document.body.classList.contains(darkTheme)) {
        document.body.classList.replace(darkTheme, lightTheme)
        localStorage.setItem('selected-theme', lightTheme)
    } else {
        document.body.classList.replace(lightTheme, darkTheme)
        localStorage.setItem('selected-theme', darkTheme)
    }
})

/* ==================== PROJECT CATEGORY FILTER ==================== */
const filterButtons = document.querySelectorAll('.filter-btn')
const projectCards = document.querySelectorAll('.project-card')

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from other buttons
        filterButtons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')

        const filterValue = button.getAttribute('data-filter')

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex'
                setTimeout(() => {
                    card.style.opacity = '1'
                    card.style.transform = 'scale(1)'
                }, 10)
            } else {
                card.style.opacity = '0'
                card.style.transform = 'scale(0.85)'
                setTimeout(() => {
                    card.style.display = 'none'
                }, 300) // matches transition
            }
        })
    })
})

/* ==================== CUSTOM CURSOR LOGIC ==================== */
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');
const hoverElements = document.querySelectorAll('a, button, .filter-btn, .skill-tag, .project-card, .contact-card');

document.addEventListener('mousemove', (e) => {
    // Custom cursor lag follow effect
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
    });
    elem.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
    });
});

/* ==================== CONTACT FORM HANDLER ==================== */
const contactForm = document.getElementById('contactForm')
const formFeedback = document.getElementById('formFeedback')

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const submitBtn = contactForm.querySelector('.btn-submit')
        const originalBtnHTML = submitBtn.innerHTML
        
        // Disable button and show loading state
        submitBtn.disabled = true
        submitBtn.innerHTML = 'Mengirim... <i class="fa-solid fa-circle-notch fa-spin"></i>'

        // Simulate API post
        setTimeout(() => {
            formFeedback.innerText = 'Terima kasih! Pesan Anda telah berhasil dikirim.'
            formFeedback.className = 'form-feedback success'
            
            // Reset form
            contactForm.reset()
            
            // Restore button
            submitBtn.disabled = false
            submitBtn.innerHTML = originalBtnHTML

            // Hide success message after 5 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none'
            }, 5000)
        }, 1500)
    })
}
