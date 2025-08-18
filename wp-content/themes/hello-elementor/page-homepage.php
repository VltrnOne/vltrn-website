<?php
/**
 * Template Name: Homepage
 * 
 * @package HelloElementor
 */

get_header(); ?>

<main id="content" class="site-main" role="main">
    
    <!-- Hero Section -->
    <section class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; color: white;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
            <h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-weight: 700;">Welcome to Vltrn World</h1>
            <p style="font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.9;">Your AI-Powered Digital Innovation Platform</p>
            
            <div class="hero-buttons" style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                <a href="#features" class="btn btn-primary" style="background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: 600; transition: all 0.3s ease;">Explore Features</a>
                <a href="#get-started" class="btn btn-secondary" style="background: transparent; color: white; padding: 15px 30px; text-decoration: none; border: 2px solid white; border-radius: 50px; font-weight: 600; transition: all 0.3s ease;">Get Started</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section" style="padding: 80px 0; background: #f8f9fa;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">Platform Features</h2>
            
            <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                
                <div class="feature-card" style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">AI Integration</h3>
                    <p style="color: #666; line-height: 1.6;">Advanced AI tools and chatbots for enhanced user experience and automation.</p>
                </div>
                
                <div class="feature-card" style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">E-commerce Ready</h3>
                    <p style="color: #666; line-height: 1.6;">Full WooCommerce integration for selling products and services online.</p>
                </div>
                
                <div class="feature-card" style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div class="feature-icon" style="font-size: 3rem; margin-bottom: 1rem;">🎨</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Custom Design</h3>
                    <p style="color: #666; line-height: 1.6;">Beautiful, responsive design built with Elementor for easy customization.</p>
                </div>
                
            </div>
        </div>
    </section>

    <!-- Get Started Section -->
    <section id="get-started" class="get-started-section" style="padding: 80px 0; background: #667eea;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; color: white;">
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">Ready to Get Started?</h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">Join thousands of users already building amazing things with Vltrn World</p>
            
            <div class="cta-buttons" style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                <a href="<?php echo wp_login_url(); ?>" class="btn btn-primary" style="background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: 600; transition: all 0.3s ease;">Login</a>
                <a href="<?php echo wp_registration_url(); ?>" class="btn btn-secondary" style="background: transparent; color: white; padding: 15px 30px; text-decoration: none; border: 2px solid white; border-radius: 50px; font-weight: 600; transition: all 0.3s ease;">Register</a>
            </div>
        </div>
    </section>

</main>

<style>
.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.feature-card:hover {
    transform: translateY(-5px);
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .hero-section h1 {
        font-size: 2.5rem;
    }
    
    .hero-buttons, .cta-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<?php get_footer(); ?>
