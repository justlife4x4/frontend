import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return ( 
    	<footer className="footer">
			<div className="container-fluid">
			<div className="row text-muted">
				<div className="col-6 text-left">
					<ul className="list-inline">
						<li className="list-inline-item mx-3">
							<NavLink to="/support" className="text-muted">Support</NavLink>
						</li>
						<li className="list-inline-item mx-3">
							<NavLink to="/help" className="text-muted">Help Center</NavLink>
						</li>
						<li className="list-inline-item mx-3">
							<NavLink to="/privacy" className="text-muted">Privacy</NavLink>
						</li>
						<li className="list-inline-item mx-3">
							<NavLink to="/terms" className="text-muted">Terms of Service</NavLink>
						</li>
					</ul>
				</div>
				<div className="col-6 text-right">
					<p className="mb-0">
						&copy; 2023 - <a href="index.html" className="text-muted">Pixel Informatics</a>
					</p>
				</div>
			</div>
			</div>
		</footer>      
    );
}
 
export default Footer;