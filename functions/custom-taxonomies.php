<?

function register_taxonomy_clients() {

    $labels = array( 
        'name' 						=> _x( 'Clients', 'clients' ),
        'singular_name' 			=> _x( 'Client', 'clients' ),
        'search_items' 				=> _x( 'Search Clients', 'clients' ),
        'popular_items' 			=> _x( 'Popular Clients', 'clients' ),
        'all_items' 				=> _x( 'All Clients', 'clients' ),
        'parent_item' 				=> _x( 'Parent Client', 'clients' ),
        'parent_item_colon' 		=> _x( 'Parent Client:', 'clients' ),
        'edit_item' 				=> _x( 'Edit Client', 'clients' ),
        'update_item' 				=> _x( 'Update Client', 'clients' ),
        'add_new_item' 				=> _x( 'Add New Client', 'clients' ),
        'new_item_name' 			=> _x( 'New Client', 'clients' ),
        'separate_items_with_commas'=> _x( 'Separate clients with commas', 'clients' ),
        'add_or_remove_items' 		=> _x( 'Add or remove Clients', 'clients' ),
        'choose_from_most_used' 	=> _x( 'Choose from most used Clients', 'clients' ),
        'menu_name' 				=> _x( 'Clients', 'clients' ),
    );

    $args = array( 
        'labels' 					=> $labels,
        'public' 					=> true,
        'show_in_nav_menus' 		=> false,
        'show_ui' 					=> true,
        'show_tagcloud' 			=> false,
        'hierarchical' 				=> true,
        'rewrite' 					=> false,
        'query_var' 				=> true
    );

    register_taxonomy( 'clients', array('project'), $args );
}

add_action( 'init', 'register_taxonomy_clients' );

?>