import React from 'react';
import '../../styles/footer.css';

function Footer({onHome, onDiscover}) {
    const handleHome = () => {
        if (typeof onHome === 'function') {
            onHome();
        } else {
            window.location.assign('/');
        }
    };

    const handleDiscover = () => {
        if (typeof onDiscover === 'function') {
            onDiscover();
        } else {
            window.location.assign('/recents');
        }
    };

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div>
                    <p className="footer-brand">ExploreX</p>
                    <p className="footer-text">Discover places, categories, and local spots with a clean map-first experience.</p>
                </div>
                
                <p className="footer-copy">© 2026 ExploreX. All rights reserved.</p>

                <div className="links">
                    <button type="button" className="link-button" onClick={handleHome}>Home</button>
                    <button type="button" className="link-button" onClick={handleDiscover}>Recent</button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;