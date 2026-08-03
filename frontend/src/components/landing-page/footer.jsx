import React from 'react';
import '../../styles/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div>
                    <p className="footer-brand">ExploreX</p>
                    <p className="footer-text">Discover places, categories, and local spots with a clean map-first experience.</p>
                </div>

                <div className="footer-links">
                    <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
                    <a href="#" onClick={(e) => e.preventDefault()}>Discover</a>
                    <a href="#" onClick={(e) => e.preventDefault()}>Favourites</a>
                </div>

                <p className="footer-copy">© 2026 ExploreX. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;