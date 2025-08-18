<?php
/**
 * Template Name: AI Dashboard
 * 
 * @package HelloElementor
 */

// Check if user is logged in
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url());
    exit;
}

get_header(); ?>

<main id="content" class="site-main" role="main">
    
    <div class="ai-dashboard" style="min-height: 100vh; background: #f8f9fa; padding: 20px;">
        
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            
            <!-- Dashboard Header -->
            <div class="dashboard-header" style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <h1 style="color: #333; font-size: 2.5rem; margin-bottom: 10px;">🤖 AI Dashboard</h1>
                <p style="color: #666; font-size: 1.1rem;">Welcome to your AI-powered workspace</p>
            </div>
            
            <!-- AI Tools Grid -->
            <div class="ai-tools-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 30px;">
                
                <!-- Chatbot Tool -->
                <div class="ai-tool-card" style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 4px solid #667eea;">
                    <div class="tool-header" style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div class="tool-icon" style="font-size: 2.5rem; margin-right: 15px;">💬</div>
                        <div>
                            <h3 style="color: #333; font-size: 1.3rem; margin-bottom: 5px;">AI Chatbot</h3>
                            <p style="color: #666; font-size: 0.9rem;">Powered by Orimon Chatbot</p>
                        </div>
                    </div>
                    <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">Intelligent chatbot for customer support and user engagement.</p>
                    <button class="tool-btn" onclick="openChatbot()" style="background: #667eea; color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.3s ease;">Launch Chatbot</button>
                </div>
                
                <!-- Smart Contracts -->
                <div class="ai-tool-card" style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 4px solid #28a745;">
                    <div class="tool-header" style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div class="tool-icon" style="font-size: 2.5rem; margin-right: 15px;">📋</div>
                        <div>
                            <h3 style="color: #333; font-size: 1.3rem; margin-bottom: 5px;">Smart Contracts</h3>
                            <p style="color: #666; font-size: 0.9rem;">Powered by WP Smart Contracts</p>
                        </div>
                    </div>
                    <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">Blockchain-powered smart contracts and token management.</p>
                    <button class="tool-btn" onclick="openSmartContracts()" style="background: #28a745; color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.3s ease;">Manage Contracts</button>
                </div>
                
                <!-- Content AI -->
                <div class="ai-tool-card" style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 4px solid #ff6b6b;">
                    <div class="tool-header" style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div class="tool-icon" style="font-size: 2.5rem; margin-right: 15px;">✍️</div>
                        <div>
                            <h3 style="color: #333; font-size: 1.3rem; margin-bottom: 5px;">Content AI</h3>
                            <p style="color: #666; font-size: 0.9rem;">AI-powered content generation</p>
                        </div>
                    </div>
                    <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">Generate engaging content, blog posts, and marketing copy.</p>
                    <button class="tool-btn" onclick="openContentAI()" style="background: #ff6b6b; color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.3s ease;">Generate Content</button>
                </div>
                
                <!-- Analytics Dashboard -->
                <div class="ai-tool-card" style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 4px solid #fd7e14;">
                    <div class="tool-header" style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div class="tool-icon" style="font-size: 2.5rem; margin-right: 15px;">📊</div>
                        <div>
                            <h3 style="color: #333; font-size: 1.3rem; margin-bottom: 5px;">AI Analytics</h3>
                            <p style="color: #666; font-size: 0.9rem;">Intelligent insights & reporting</p>
                        </div>
                    </div>
                    <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">AI-powered analytics and performance insights.</p>
                    <button class="tool-btn" onclick="openAnalytics()" style="background: #fd7e14; color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.3s ease;">View Analytics</button>
                </div>
                
            </div>
            
            <!-- Quick Actions -->
            <div class="quick-actions" style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <h2 style="color: #333; font-size: 1.8rem; margin-bottom: 20px;">Quick Actions</h2>
                <div class="actions-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <a href="<?php echo admin_url('post-new.php'); ?>" class="action-link" style="display: block; padding: 20px; background: #f8f9fa; border-radius: 10px; text-decoration: none; color: #333; text-align: center; transition: all 0.3s ease;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📝</div>
                        <strong>New Post</strong>
                    </a>
                    <a href="<?php echo admin_url('post-new.php?post_type=page'); ?>" class="action-link" style="display: block; padding: 20px; background: #f8f9fa; border-radius: 10px; text-decoration: none; color: #333; text-align: center; transition: all 0.3s ease;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📄</div>
                        <strong>New Page</strong>
                    </a>
                    <a href="<?php echo admin_url('edit.php?post_type=product'); ?>" class="action-link" style="display: block; padding: 20px; background: #f8f9fa; border-radius: 10px; text-decoration: none; color: #333; text-align: center; transition: all 0.3s ease;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">🛒</div>
                        <strong>Products</strong>
                    </a>
                    <a href="<?php echo admin_url('users.php'); ?>" class="action-link" style="display: block; padding: 20px; background: #f8f9fa; border-radius: 10px; text-decoration: none; color: #333; text-align: center; transition: all 0.3s ease;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">👥</div>
                        <strong>Users</strong>
                    </a>
                </div>
            </div>
            
        </div>
        
    </div>
    
</main>

<script>
function openChatbot() {
    // Integrate with Orimon Chatbot
    alert('Opening AI Chatbot...');
    // You can add specific chatbot integration here
}

function openSmartContracts() {
    // Integrate with WP Smart Contracts
    window.open('<?php echo admin_url('admin.php?page=wpsc-dashboard'); ?>', '_blank');
}

function openContentAI() {
    // Content AI functionality
    alert('Opening Content AI...');
    // Add content generation features
}

function openAnalytics() {
    // Analytics dashboard
    alert('Opening Analytics...');
    // Add analytics integration
}

// Add hover effects
document.querySelectorAll('.action-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});
</script>

<style>
.tool-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.action-link:hover {
    background: #667eea !important;
    color: white !important;
}

@media (max-width: 768px) {
    .ai-tools-grid {
        grid-template-columns: 1fr;
    }
    
    .actions-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

<?php get_footer(); ?>
