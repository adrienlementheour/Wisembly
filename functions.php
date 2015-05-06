<?php define( 'WISEMBLY_VERSION', 1.0 );

show_admin_bar(false);

/*-----------------------------------------------------------------------------------*/
/* Theme support
/*-----------------------------------------------------------------------------------*/
// Feed
add_theme_support( 'automatic-feed-links' );
function remove_comments_rss( $for_comments ){ return; }
add_filter('post_comments_feed_link', 'remove_comments_rss');

add_theme_support( 'html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'widgets') );
add_theme_support( 'post-thumbnails' , 
    array('itemsfooter', 'post', 'slidesfooter', 'ref', 'presse', 'rdv', 'livres', 'team', 'temoignages', 'communiques', 'photo-recrutement', 'invitation', 'rh-presse') 
); 

/*-----------------------------------------------------------------------------------*/
/* Hide Wordpress version and stuff for security, hide login errors
/*-----------------------------------------------------------------------------------*/
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');

add_filter('login_errors', create_function('$a', "return null;"));

function remove_comment_author_class( $classes ) {
    foreach( $classes as $key => $class ) {
        if(strstr($class, "comment-author-")) {
            unset( $classes[$key]
 );
        }
    }
    return $classes;
}
add_filter( 'comment_class' , 'remove_comment_author_class' );

/*-----------------------------------------------------------------------------------*/
/* Menus
/*-----------------------------------------------------------------------------------*/
register_nav_menus( 
    array(
        'primary'   =>  'Menu Principal', 
        'secondary' =>  'Menu Footer'
    )
);

// Cleanup WP Menu html
function css_attributes_filter($var, $item, $args) {
    if ( 'primary' === $args->theme_location ){
        return is_array($var) ? array_intersect($var, array('current-menu-item', 'current_page_parent', 'hasSubMenu')) : '';
   }else{
        return is_array($var) ? array_intersect($var, array()) : '';
   }
}
add_filter('nav_menu_css_class', 'css_attributes_filter', 10, 3);

// Add a class to li if has subMenu
function sub_menu( $sorted_menu_items, $args ) {
    if ( 'primary' === $args->theme_location ){
        $last_top = 0;
        foreach( $sorted_menu_items as $key => $obj ){
            if ( 0 == $obj->menu_item_parent ) {
                $last_top = $key;
            } else {
                $sorted_menu_items[$last_top]->classes['dropdown'] = 'hasSubMenu';
            }
        }
        return $sorted_menu_items;
    } else {
      return $sorted_menu_items;
    }
}
add_filter( 'wp_nav_menu_objects', 'sub_menu', 10, 2 );

/*-----------------------------------------------------------------------------------*/
/* Page d'options
/*-----------------------------------------------------------------------------------*/
function custom_menu_order( $menu_ord ){  
    if (!$menu_ord) return true;  
    $menu = 'acf-options';
    $menu_ord = array_diff($menu_ord, array( $menu ));
    array_splice( $menu_ord, 1, 0, array( $menu ) );
    return $menu_ord;
}  
add_filter('custom_menu_order', 'custom_menu_order');
add_filter('menu_order', 'custom_menu_order');

/*-----------------------------------------------------------------------------------*/
/* Sidebars et widgets
/*-----------------------------------------------------------------------------------*/
/*function wisembly_register_sidebars() {
    register_sidebar(array(             
        'id' => 'webinar',                  
        'name' => 'Footer Webinar',             
        'description' => 'Zone basse grise du footer (webinar)', 
        'before_widget' => '',  
        'after_widget' => '',   
        'before_title' => '',   
        'after_title' => '',        
        'empty_title'=> ''
    ));
} 
add_action( 'widgets_init', 'wisembly_register_sidebars' );*/

// widget webinar
/*class Webinar_Widget extends WP_Widget{
    function Webinar_Widget() {
        parent::WP_Widget(false, 'Wisembly - Webinar');
    }
    function form($instance){
        $titre = esc_attr($instance['titre']);  
        $date = esc_attr($instance['date']);
        $lien = esc_attr($instance['lien']);
        $txtLien = esc_attr($instance['txtLien']);
        ?>      <h4>Date du prochain Webinar</h4>
                <p><label for="<?php echo $this->get_field_id('titre'); ?>">Titre :</label> <input class="widefat" id="<?php echo $this->get_field_id('titre'); ?>" name="<?php echo $this->get_field_name('titre'); ?>" type="text" value="<?php echo $titre; ?>" /></p> 
                <p><label for="<?php echo $this->get_field_id('date'); ?>">Date :</label> <input class="widefat" id="<?php echo $this->get_field_id('date'); ?>" name="<?php echo $this->get_field_name('date'); ?>" type="text" value="<?php echo $date; ?>" /></p>
                <p><label for="<?php echo $this->get_field_id('lien'); ?>">Lien :</label> <input class="widefat" id="<?php echo $this->get_field_id('lien'); ?>" name="<?php echo $this->get_field_name('lien'); ?>" type="text" value="<?php echo $lien; ?>" /></p>
                <p><label for="<?php echo $this->get_field_id('txtLien'); ?>">Texte du lien :</label> <input class="widefat" id="<?php echo $this->get_field_id('txtLien'); ?>" name="<?php echo $this->get_field_name('txtLien'); ?>" type="text" value="<?php echo $txtLien; ?>" /></p>           
        <?php  
    }
    function update($new_instance, $old_instance){
        return $new_instance;
    }
    function widget($args, $instance){ ?>
        
        <?php if ($instance['titre'] != '' && $instance['date'] != '' && $instance['lien'] != '' && $instance['txtLien'] != '') { ?>
            <div class='webinar'>
                <p><strong><?php echo $instance['titre']; ?></strong> <?php echo $instance['date']; ?>. <a href='<?php echo $instance['lien']; ?>' title='<?php _e('Inscrivez-vous au prochain Webinar', 'wisembly'); ?>'><?php echo $instance['txtLien']; ?></a></p>
            </div>
        <?php } ?>
        
    <?php }
}
register_widget('Webinar_Widget');*/

/*-----------------------------------------------------------------------------------*/
/* Custom Post Types
/*-----------------------------------------------------------------------------------*/
function create_post_type(){
  register_post_type('slidesfooter', array(
    'label' => 'Contacts Footer',
    'singular_label' => 'Contact Footer',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-businessman',
    'supports' => array( 'title', 'thumbnail')
  ));
  register_post_type('itemsfooter', array(
    'label' => 'Items Footer',
    'singular_label' => 'Item Footer',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-admin-links',
    'supports' => array( 'title', 'thumbnail')
  ));
  register_post_type('ref', array(
    'label' => 'Références',
    'singular_label' => 'Référence',
    'public' => true,
    'rewrite' => array('slug' => __('clients', 'wisembly')),
    'menu_icon' => 'dashicons-format-quote',
    'supports' => array( 'title', 'thumbnail', 'editor' )
  ));
  register_post_type('temoignages', array(
    'label' => 'Témoignages',
    'singular_label' => 'Témoignage',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-testimonial',
    'supports' => array( 'title', 'thumbnail')
  ));
  register_post_type('presse', array(
    'label' => 'Logos Presse',
    'singular_label' => 'Logo Presse',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-format-status',
    'supports' => array( 'title', 'thumbnail')
  ));
  register_post_type('team', array(
    'label' => 'Team members',
    'singular_label' => 'Team member',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-groups',
    'supports' => array( 'title', 'thumbnail', 'editor')
  ));
  register_post_type('rdv', array(
    'label' => 'Rendez-Vous',
    'singular_label' => 'Rendez-Vous',
    'public' => true,
    'has_archive' => true,
    'query_var' => false,
    'rewrite' => array('slug' => __('ressources/evenements-passes.html', 'wisembly')),
    'menu_icon' => 'dashicons-calendar-alt',
    'supports' => array( 'title', 'thumbnail', 'editor')
  ));
  register_post_type('livres', array(
    'label' => 'Livres Blancs',
    'singular_label' => 'Livre Blanc',
    'public' => true,
    'rewrite' => array('slug' => __('ressources/livres-blancs', 'wisembly')),
    'menu_icon' => 'dashicons-book',
    'supports' => array( 'title', 'thumbnail', 'editor')
  ));
  register_post_type('communiques', array(
    'label' => 'Communiqués',
    'singular_label' => 'Communiqué de presse',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-format-chat',
    'supports' => array( 'title', 'thumbnail', 'editor')
  ));
  register_post_type('photo-recrutement', array(
    'label' => 'Photos recrutement',
    'singular_label' => 'Photo recrutement',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-format-gallery',
    'supports' => array( 'title', 'thumbnail' )
  ));
  register_post_type('invitation', array(
    'label' => 'Invitations',
    'singular_label' => 'Invitations',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-tickets-alt',
    'supports' => array( 'title', 'thumbnail', 'editor' )
  ));
  register_post_type('rh-presse', array(
    'label' => 'RH Presse',
    'singular_label' => 'RH Presse',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-microphone',
    'supports' => array( 'title', 'thumbnail', 'editor' )
  ));
   register_post_type('histoire', array(
    'label' => 'Histoire',
    'singular_label' => 'Histoire',
    'public' => true,
    'publicly_queryable' => false,
    'query_var' => false,
    'menu_icon' => 'dashicons-welcome-learn-more',
    'supports' => array( 'title', 'thumbnail', 'editor' )
  ));
}
add_action( 'init', 'create_post_type' );

function create_taxonomy(){
  register_taxonomy('profils', array('slidesfooter'), array(
    'hierarchical' => true,
    'label' => 'Profils',
    'singular_label' => 'Profil',
    'rewrite' => true
  ));
  register_taxonomy('usages', array('ref'), array(
    'hierarchical' => true,
    'label' => 'Usages',
    'singular_label' => 'Usage',
    'rewrite' => true
  ));
  register_taxonomy('domains', array('team'), array(
    'hierarchical' => true,
    'label' => 'Domaines',
    'singular_label' => 'Domaine',
    'rewrite' => true
  ));
  register_taxonomy('catRdv', array('rdv'), array(
    'hierarchical' => true,
    'label' => "Types d'événement",
    'singular_label' => "Type d'événement",
    'rewrite' => true
  ));
}
add_action( 'init', 'create_taxonomy' );

function set_archive_number_posts( $query ){
    if( is_post_type_archive( 'rdv' ) && !is_admin() ){
        $query->set( 'posts_per_page', 5 );
        return;
    }
}
add_action( 'pre_get_posts', 'set_archive_number_posts', 1 );

/*add_action('admin_menu', function() { remove_meta_box('pageparentdiv', 'ref', 'normal');});
add_action('add_meta_boxes', function() { add_meta_box('chapter-parent', 'Part', 'chapter_attributes_meta_box', 'ref', 'side', 'high');});
  function chapter_attributes_meta_box($post) {
    $post_type_object = get_post_type_object($post->post_type);
    if ( $post_type_object->hierarchical ) {
      $pages = wp_dropdown_pages(array('post_type' => 'page', 'selected' => $post->post_parent, 'name' => 'parent_id', 'show_option_none' => __('(no parent)'), 'sort_column'=> 'menu_order, post_title', 'echo' => 0));
      if ( ! empty($pages) ) {
        echo $pages;
      } // end empty pages check
    } // end hierarchical check.
  }*/

/*-----------------------------------------------------------------------------------*/
/* Add thumbnail sizes
/*-----------------------------------------------------------------------------------*/
function wisembly_theme_setup() {
    add_image_size( 'itemsfooter-thumb', 155, 96, true );
    add_image_size( 'slidesfooter-thumb', 321, 460, true );
    add_image_size( 'slidesref-cite', 51, 51, true );
    add_image_size( 'slidesref-logo', 140, 100 );
    add_image_size( 'presse-logo', 135, 50 );
    add_image_size( 'livres-thumb', 350, 600 );
    add_image_size( 'couv-thumb', 160, 220 );
    add_image_size( 'picto-thumb', 95, 105 );
    add_image_size( 'recrutement-thumb', 900, 500 );
}
add_action( 'after_setup_theme', 'wisembly_theme_setup' );

/*-----------------------------------------------------------------------------------*/
/* Enlever le lien par défaut autour des images
/*-----------------------------------------------------------------------------------*/
function wpb_imagelink_setup() {
    $image_set = get_option( 'image_default_link_type' );
    if ($image_set !== 'none') {
        update_option('image_default_link_type', 'none');
    }
}
add_action('admin_init', 'wpb_imagelink_setup', 10);

/*-----------------------------------------------------------------------------------*/
/* Markup gallery
/*-----------------------------------------------------------------------------------*/
function my_post_gallery( $output, $attr) {
    global $post, $wp_locale;
    static $instance = 0;
    $instance++;

    if( isset($attr['orderby']) ){
        $attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
        if( !$attr['orderby'] ) unset( $attr['orderby'] );
    }

    extract(shortcode_atts(array(
        'order'      => 'ASC',
        'orderby'    => 'menu_order ID',
        'id'         => $post->ID,
        'itemtag'    => '',
        'icontag'    => '',
        'captiontag' => '',
        'columns'    => 3,
        'size'       => 'presse-logo',
        'include'    => '',
        'exclude'    => ''
    ), $attr));

    $id = intval($id);
    if( 'RAND' == $order ) $orderby = 'none';

    if( !empty($include) ){
        $include = preg_replace( '/[^0-9,]+/', '', $include );
        $_attachments = get_posts( array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );

        $attachments = array();
        foreach( $_attachments as $key => $val ){
            $attachments[$val->ID] = $_attachments[$key];
        }
    }elseif ( !empty($exclude) ){
        $exclude = preg_replace( '/[^0-9,]+/', '', $exclude );
        $attachments = get_children( array('post_parent' => $id, 'exclude' => $exclude, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
    }else{
        $attachments = get_children( array('post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
    }

    if( empty($attachments) ) return '';

    $selector = "gallery-{$instance}";
    $output = "<li id='$selector'>";

    foreach( $attachments as $id => $attachment ){
        $output .= '<div>' . wp_get_attachment_image($id, $size) . '</div>';
    }

    $output .= "</li>";
    return $output;
}
add_filter( 'post_gallery', 'my_post_gallery', 10, 2 );

/*-----------------------------------------------------------------------------------*/
/* WPML
/*-----------------------------------------------------------------------------------*/
// Languages Switcher
function lang_switcher(){
    if (!class_exists('SitePress')) return '';
    $languages = icl_get_languages('skip_missing=0&orderby=code&order=desc');
    $actives = '';
    if (!empty($languages)) {
        echo '<ul class="lang">';
        foreach ($languages as $l){
            $actives .= '<li'.($l['active']?' class="actif"':'').'><a href="' . $l['url'] . '" data-lang="' . $l['language_code'] . '" title="' . $l['native_name'] . '">' . $l['language_code'] . '</a></li>';
        }
        echo $actives . '</ul>';
    }
}

// Clean WPML head
remove_action( 'wp_head', array($sitepress, 'meta_generator_tag' ) );
define('ICL_DONT_LOAD_NAVIGATION_CSS', true);
define('ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true);
define('ICL_DONT_LOAD_LANGUAGES_JS', true);

/*-----------------------------------------------------------------------------------*/
/* Enqueue Styles and Scripts
/*-----------------------------------------------------------------------------------*/

function wisembly_scripts()  { 
        // header
        wp_enqueue_style( 'wisembly-style', get_template_directory_uri() . '/css/style.css', '10000', 'all' );
        wp_enqueue_script( 'wisembly-modernizr', get_template_directory_uri() . '/js/modernizr-min.js', array(), WISEMBLY_VERSION);
        wp_enqueue_script( 'wisembly-ismobile', get_template_directory_uri() . '/js/isMobile.min.js', array(), WISEMBLY_VERSION);
        
        // footer
        wp_deregister_script('jquery');
        wp_enqueue_script( 'wisembly-jquery', get_template_directory_uri() . '/js/jquery-1.11.2.min.js', array(), WISEMBLY_VERSION, true );

        wp_enqueue_script( 'wisembly-tweenmax', get_template_directory_uri() . '/js/greensock/TweenMax.min.js', array(), WISEMBLY_VERSION, true );
        //wp_enqueue_script( 'wisembly-timeline', get_template_directory_uri() . '/js/greensock/TimelineMax.min.js', array(), WISEMBLY_VERSION, true );
        //wp_enqueue_script( 'wisembly-bezier', get_template_directory_uri() . '/js/greensock/plugins/BezierPlugin.min.js', array(), WISEMBLY_VERSION, true );
        //wp_enqueue_script( 'wisembly-cssrule', get_template_directory_uri() . '/js/greensock/plugins/CSSRulePlugin.min.js', array(), WISEMBLY_VERSION, true );
        //wp_enqueue_script( 'wisembly-scrollto', get_template_directory_uri() . '/js/greensock/plugins/ScrollToPlugin.min.js', array(), WISEMBLY_VERSION, true );
        wp_enqueue_script( 'wisembly-draggable', get_template_directory_uri() . '/js/greensock/utils/Draggable.min.js', array(), WISEMBLY_VERSION, true );
        wp_enqueue_script( 'wisembly-throw', get_template_directory_uri() . '/js/greensock/plugins/ThrowPropsPlugin.min.js', array(), WISEMBLY_VERSION, true );

        wp_enqueue_script( 'wisembly-scrollmagic', get_template_directory_uri() . '/js/jquery.scrollmagic.min.js', array(), WISEMBLY_VERSION, true );
        wp_enqueue_script( 'wisembly-easing', get_template_directory_uri() . '/js/jquery.easing.min.js', array(), WISEMBLY_VERSION, true );
        wp_enqueue_script( 'wisembly-swipe', get_template_directory_uri() . '/js/jquery.swipe.min.js', array(), WISEMBLY_VERSION, true );

        wp_enqueue_script( 'wisembly-carousel', get_template_directory_uri() . '/js/carousel.min.js', array(), WISEMBLY_VERSION, true );

        wp_enqueue_script( 'wisembly-autogrow', get_template_directory_uri() . '/js/jquery.autogrow.min.js', array(), WISEMBLY_VERSION, true );

        wp_enqueue_script( 'wisembly-scripts', get_template_directory_uri() . '/js/script.min.js', array(), WISEMBLY_VERSION, true );
  
}
add_action( 'wp_enqueue_scripts', 'wisembly_scripts' );