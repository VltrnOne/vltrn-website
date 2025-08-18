<?php
/**
 * The template for displaying the footer.
 *
 * Contains the body & html closing tags.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'footer' ) ) {
	if ( hello_elementor_display_header_footer() ) {
		if ( did_action( 'elementor/loaded' ) && hello_header_footer_experiment_active() ) {
			get_template_part( 'template-parts/dynamic-footer' );
		} else {
			get_template_part( 'template-parts/footer' );
		}
	}
}
?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" style="background: #2c3e50; color: white; padding: 50px 0 20px; margin-top: 50px;">
		<div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			
			<div class="footer-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 40px;">
				
				<!-- Company Info -->
				<div class="footer-section">
					<h3 style="color: #667eea; margin-bottom: 20px; font-size: 1.3rem;">🚀 Vltrn World</h3>
					<p style="line-height: 1.6; color: #bdc3c7; margin-bottom: 20px;">Your AI-Powered Digital Innovation Platform. Building the future, one innovation at a time.</p>
					<div class="social-links" style="display: flex; gap: 15px;">
						<a href="#" style="color: #667eea; font-size: 1.5rem; text-decoration: none;">📱</a>
						<a href="#" style="color: #667eea; font-size: 1.5rem; text-decoration: none;">🐦</a>
						<a href="#" style="color: #667eea; font-size: 1.5rem; text-decoration: none;">💼</a>
						<a href="#" style="color: #667eea; font-size: 1.5rem; text-decoration: none;">📧</a>
					</div>
				</div>
				
				<!-- Quick Links -->
				<div class="footer-section">
					<h3 style="color: #667eea; margin-bottom: 20px; font-size: 1.3rem;">🔗 Quick Links</h3>
					<ul style="list-style: none; padding: 0; margin: 0;">
						<li style="margin-bottom: 10px;"><a href="<?php echo home_url('/'); ?>" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">🏠 Home</a></li>
						<li style="margin-bottom: 10px;"><a href="<?php echo home_url('/ai-dashboard'); ?>" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">🤖 AI Dashboard</a></li>
						<li style="margin-bottom: 10px;"><a href="<?php echo home_url('/shop'); ?>" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">🛒 Shop</a></li>
						<li style="margin-bottom: 10px;"><a href="<?php echo home_url('/blog'); ?>" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">📝 Blog</a></li>
					</ul>
				</div>
				
				<!-- AI Tools -->
				<div class="footer-section">
					<h3 style="color: #667eea; margin-bottom: 20px; font-size: 1.3rem;">🤖 AI Tools</h3>
					<ul style="list-style: none; padding: 0; margin: 0;">
						<li style="margin-bottom: 10px;"><a href="#" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">💬 AI Chatbot</a></li>
						<li style="margin-bottom: 10px;"><a href="#" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">📋 Smart Contracts</a></li>
						<li style="margin-bottom: 10px;"><a href="#" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">✍️ Content AI</a></li>
						<li style="margin-bottom: 10px;"><a href="#" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">📊 AI Analytics</a></li>
					</ul>
				</div>
				
				<!-- Support -->
				<div class="footer-section">
					<h3 style="color: #667eea; margin-bottom: 20px; font-size: 1.3rem;">🆘 Support</h3>
					<ul style="list-style: none; padding: 0; margin: 0;">
						<li style="margin-bottom: 10px;"><a href="#" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">📚 Documentation</a></li>
						<li style="margin-bottom: 10px;"><a href="#" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">🎥 Tutorials</a></li>
						<li style="margin-bottom: 10px;"><a href="#" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">💬 Community</a></li>
						<li style="margin-bottom: 10px;"><a href="#" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s ease;">📞 Contact Us</a></li>
					</ul>
				</div>
				
			</div>
			
			<!-- Footer Bottom -->
			<div class="footer-bottom" style="border-top: 1px solid #34495e; padding-top: 20px; text-align: center; color: #bdc3c7;">
				<p style="margin: 0;">© <?php echo date('Y'); ?> Vltrn World. All rights reserved. | Built with ❤️ and AI</p>
			</div>
			
		</div>
	</footer>

</div><!-- #page -->

<style>
.footer-section a:hover {
    color: #667eea !important;
}

.social-links a:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .social-links {
        justify-content: center;
    }
}
</style>

<?php wp_footer(); ?>

</body>
</html>
