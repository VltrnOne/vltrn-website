<?php
/**
 * The template for displaying the header
 *
 * This is the template that displays all of the <head> section, opens the <body> tag and adds the site's header.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$viewport_content = apply_filters( 'hello_elementor_viewport_content', 'width=device-width, initial-scale=1' );
$enable_skip_link = apply_filters( 'hello_elementor_enable_skip_link', true );
$skip_link_url = apply_filters( 'hello_elementor_skip_link_url', '#content' );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'hello-elementor' ); ?></a>

	<header id="masthead" class="site-header" style="background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;">
		<div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
			
			<div class="site-branding" style="display: flex; align-items: center; justify-content: space-between; padding: 15px 0;">
				
				<!-- Logo/Brand -->
				<div class="site-brand" style="display: flex; align-items: center;">
					<?php if ( has_custom_logo() ) : ?>
						<?php the_custom_logo(); ?>
					<?php else : ?>
						<h1 class="site-title" style="margin: 0; font-size: 1.8rem; font-weight: 700; color: #333;">
							<a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="text-decoration: none; color: inherit;">
								🚀 Vltrn World
							</a>
						</h1>
					<?php endif; ?>
				</div>

				<!-- Navigation Menu -->
				<nav id="site-navigation" class="main-navigation" style="display: flex; align-items: center;">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
							'container'      => false,
							'menu_class'     => 'nav-menu',
							'fallback_cb'    => 'default_nav_menu',
						)
					);
					?>
				</nav>

				<!-- User Actions -->
				<div class="user-actions" style="display: flex; align-items: center; gap: 15px;">
					<?php if ( is_user_logged_in() ) : ?>
						<a href="<?php echo esc_url( home_url( '/ai-dashboard' ) ); ?>" class="ai-dashboard-btn" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; transition: all 0.3s ease;">🤖 AI Dashboard</a>
						<a href="<?php echo esc_url( admin_url() ); ?>" class="admin-btn" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; transition: all 0.3s ease;">⚙️ Admin</a>
						<a href="<?php echo esc_url( wp_logout_url() ); ?>" class="logout-btn" style="background: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; transition: all 0.3s ease;">🚪 Logout</a>
					<?php else : ?>
						<a href="<?php echo esc_url( wp_login_url() ); ?>" class="login-btn" style="background: transparent; color: #667eea; padding: 10px 20px; text-decoration: none; border: 2px solid #667eea; border-radius: 25px; font-weight: 600; font-size: 14px; transition: all 0.3s ease;">🔑 Login</a>
						<a href="<?php echo esc_url( wp_registration_url() ); ?>" class="register-btn" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; transition: all 0.3s ease;">📝 Register</a>
					<?php endif; ?>
				</div>

			</div>
			
		</div>
	</header>

	<div id="content" class="site-content">

<style>
/* Navigation Styles */
.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 30px;
}

.nav-menu li {
    position: relative;
}

.nav-menu a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    padding: 10px 0;
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: #667eea;
}

/* Button Hover Effects */
.ai-dashboard-btn:hover,
.admin-btn:hover,
.logout-btn:hover,
.register-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.login-btn:hover {
    background: #667eea;
    color: white;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    .site-branding {
        flex-direction: column;
        gap: 15px;
    }
    
    .nav-menu {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .user-actions {
        flex-direction: column;
        gap: 10px;
    }
    
    .user-actions a {
        text-align: center;
        width: 100%;
    }
}
</style>

<?php
// Default navigation menu if no custom menu is set
function default_nav_menu() {
    echo '<ul class="nav-menu">';
    echo '<li><a href="' . esc_url(home_url('/')) . '">🏠 Home</a></li>';
    echo '<li><a href="' . esc_url(home_url('/#features')) . '">✨ Features</a></li>';
    echo '<li><a href="' . esc_url(home_url('/ai-dashboard')) . '">🤖 AI Tools</a></li>';
    echo '<li><a href="' . esc_url(home_url('/shop')) . '">🛒 Shop</a></li>';
    echo '<li><a href="' . esc_url(home_url('/blog')) . '">📝 Blog</a></li>';
    echo '<li><a href="' . esc_url(home_url('/contact')) . '">📞 Contact</a></li>';
    echo '</ul>';
}
?>
