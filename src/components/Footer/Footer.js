import React from "react";
import "../../css/Footer.css";

const Footer = () => {
	return (
		<footer className="footer-section p-4">
			<div className="footer-links text-left">
				<div className="footer-section-div">
					<h4 className="py-3 reel-warz-footer text-left">
						<span className="footer-icon mr-2">
							<i class="fa fa-play px-1" aria-hidden="true"></i>
						</span>
						ReelWarz
					</h4>
					<p>
						Compete with your creativity. Win real money through
						reel competitions.
					</p>
				</div>
				<div className="footer-section-div">
					<h4 className="py-3">Quick Links</h4>
					<p>Competitions</p>
					<p>Upload Reel</p>
					<p>Leaderboard</p>
				</div>
				<div className="footer-section-div">
					<h4 className="py-3">Support</h4>
					<p>How it Works</p>
					<p>Rules</p>
					<p>Contact Us</p>
				</div>
				<div className="footer-section-div">
					<h4 className="py-3">Legal</h4>
					<p>Terms of Service</p>
					<p>Privacy Policy</p>
					<p>Responsible Gaming</p>
				</div>
			</div>
			<p className="mb-0 text-secondary pt-4">
				&copy; 2025 Reel Competition. All rights reserved.
			</p>
		</footer>
	);
};
export default Footer;
