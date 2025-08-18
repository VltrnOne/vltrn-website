<?php
/**
 * Template Name: Enhanced Login
 * 
 * @package HelloElementor
 */

// Redirect if user is already logged in
if (is_user_logged_in()) {
    wp_redirect(home_url());
    exit;
}

get_header(); ?>

<main id="content" class="site-main" role="main">
    
    <div class="login-container" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
        
        <div class="login-card" style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); max-width: 400px; width: 100%;">
            
            <div class="login-header" style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #333; font-size: 2rem; margin-bottom: 10px;">Welcome Back</h1>
                <p style="color: #666;">Sign in to your Vltrn World account</p>
            </div>
            
            <?php if (isset($_GET['login']) && $_GET['login'] == 'failed'): ?>
                <div class="error-message" style="background: #fee; color: #c33; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fcc;">
                    Invalid username or password. Please try again.
                </div>
            <?php endif; ?>
            
            <form class="login-form" method="post" action="<?php echo esc_url(wp_login_url()); ?>" style="margin-bottom: 20px;">
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label for="user_login" style="display: block; margin-bottom: 8px; color: #333; font-weight: 600;">Username or Email</label>
                    <input type="text" name="log" id="user_login" required style="width: 100%; padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 16px; transition: border-color 0.3s ease;">
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label for="user_pass" style="display: block; margin-bottom: 8px; color: #333; font-weight: 600;">Password</label>
                    <input type="password" name="pwd" id="user_pass" required style="width: 100%; padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 16px; transition: border-color 0.3s ease;">
                </div>
                
                <div class="form-options" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" name="rememberme" style="margin-right: 8px;">
                        <span style="color: #666;">Remember me</span>
                    </label>
                    <a href="<?php echo wp_lostpassword_url(); ?>" style="color: #667eea; text-decoration: none; font-size: 14px;">Forgot password?</a>
                </div>
                
                <button type="submit" class="login-btn" style="width: 100%; background: #667eea; color: white; padding: 15px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.3s ease;">Sign In</button>
                
            </form>
            
            <div class="login-footer" style="text-align: center; padding-top: 20px; border-top: 1px solid #e1e5e9;">
                <p style="color: #666; margin-bottom: 15px;">Don't have an account?</p>
                <a href="<?php echo wp_registration_url(); ?>" class="register-link" style="background: transparent; color: #667eea; padding: 12px 25px; text-decoration: none; border: 2px solid #667eea; border-radius: 8px; font-weight: 600; transition: all 0.3s ease; display: inline-block;">Create Account</a>
            </div>
            
        </div>
        
    </div>
    
</main>

<style>
.login-form input:focus {
    outline: none;
    border-color: #667eea;
}

.login-btn:hover {
    background: #5a6fd8;
}

.register-link:hover {
    background: #667eea;
    color: white;
}

@media (max-width: 480px) {
    .login-card {
        padding: 30px 20px;
    }
    
    .login-header h1 {
        font-size: 1.5rem;
    }
}
</style>

<?php get_footer(); ?>
