

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const mainMenu = document.querySelector('.main-menu');
    const navLinks = document.querySelectorAll('.main-menu a');

    /**
     * Toggles the menu active state
     */
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mainMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (mainMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    /**
     * Closes the menu
     */
    const closeMenu = () => {
        hamburger.classList.remove('active');
        mainMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking outside (on the overlay)
    document.addEventListener('click', (e) => {
        if (mainMenu.classList.contains('active') && !mainMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Bonus Requirement: Close menu automatically when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    });

    // Ensure menu is closed when resizing to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
});

// QUICK VIEW LOGIC
window.openQuickView = async function(productId, imagePath) {
    const modal = document.getElementById('quickViewModal');
    if(!modal) return;
    
    // Set loading state (optional)
    document.getElementById('qv-title').textContent = "Loading...";
    document.getElementById('qv-price').textContent = "";
    document.getElementById('qv-desc').textContent = "";
    document.getElementById('qv-image').style.backgroundImage = `url('${imagePath}')`;
    
    // Open modal
    modal.classList.add('active');
    
    try {
        const res = await fetch(`/api/v1/products/${productId}`);
        const data = await res.json();
        
        if(data.success) {
            document.getElementById('qv-title').textContent = data.product.name;
            document.getElementById('qv-price').textContent = `Rs. ${data.product.price}`;
            document.getElementById('qv-desc').innerHTML = `
                <strong>Category:</strong> ${data.product.category}<br>
                <strong>Rating:</strong> ${data.product.rating} / 5<br>
                <strong>Stock:</strong> ${data.product.stock}
            `;
            // Update form action to submit correctly
            document.getElementById('qv-form').action = `/cart/add/${productId}`;
        }
    } catch(e) {
        console.error("Failed to load product details", e);
        document.getElementById('qv-title').textContent = "Error loading product.";
    }
}

window.closeQuickView = function() {
    const modal = document.getElementById('quickViewModal');
    if(modal) modal.classList.remove('active');
}

