import React from 'react';
import GdprPdf from '../documents/WIMMAGDPR.pdf';

const Footer = props => {

    return (
<footer>
<div className="footer-link">
<a href={GdprPdf} target="_blank">GDPR info</a>
</div>
<div className="footer-conent">
<img src="./logo/logo_square.png" alt = "logo" width="250" height="250"/>



</div>
</footer>
    )
}










export default Footer;