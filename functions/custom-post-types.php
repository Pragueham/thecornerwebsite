<?

function register_cpt_person() {
	
	$labels = array( 
		'name' 					=> _x( 'People', 'person' ),
		'singular_name'			=> _x( 'Person', 'person' ),
		'add_new' 				=> _x( 'Add New', 'person' ),
		'add_new_item' 			=> _x( 'Add New Person', 'person' ),
		'edit_item' 			=> _x( 'Edit Person', 'person' ),
		'new_item' 				=> _x( 'New Person', 'person' ),
		'view_item'				=> _x( 'View Person', 'person' ),
		'search_items' 			=> _x( 'Search People', 'person' ),
		'not_found' 			=> _x( 'No people found', 'person' ),
		'not_found_in_trash' 	=> _x( 'No people found in Trash', 'person' ),
		'parent_item_colon' 	=> _x( 'Parent Person:', 'person' ),
		'menu_name' 			=> _x( 'People', 'person' ),
	);
	
	$args = array( 
		'labels' 				=> $labels,
		'hierarchical' 			=> false,
		'supports' 				=> array( 'title', 'editor', 'thumbnail' ),        
		'public' 				=> true,
		'show_ui' 				=> true,
		'show_in_menu' 			=> true,
		'menu_position' 		=> 5,
		'show_in_nav_menus' 	=> false,
		'publicly_queryable' 	=> false,
		'exclude_from_search' 	=> true,
		'has_archive' 			=> false,
		'query_var' 			=> true,
		'can_export' 			=> true,
		'rewrite' 				=> false,
		'capability_type' 		=> 'post',
		'taxonomies'			=> array('post_tag')
	);
	
	register_post_type( 'person', $args );
}

function register_cpt_project() {
	
	$labels = array( 
		'name' 					=> _x( 'Projects', 'project' ),
		'singular_name' 		=> _x( 'Project', 'project' ),
		'add_new' 				=> _x( 'Add New', 'project' ),
		'add_new_item' 			=> _x( 'Add New Project', 'project' ),
		'edit_item' 			=> _x( 'Edit Project', 'project' ),
		'new_item' 				=> _x( 'New Project', 'project' ),
		'view_item' 			=> _x( 'View Project', 'project' ),
		'search_items' 			=> _x( 'Search Projects', 'project' ),
		'not_found' 			=> _x( 'No projects found', 'project' ),
		'not_found_in_trash' 	=> _x( 'No projects found in Trash', 'project' ),
		'parent_item_colon' 	=> _x( 'Parent Project:', 'project' ),
		'menu_name' 			=> _x( 'Work', 'project' ),
	);
	
	$args = array( 
		'labels' 				=> $labels,
		'hierarchical' 			=> false,        
		'supports' 				=> array( 'title', 'editor', 'thumbnail' ),
		'taxonomies' 			=> array( 'clients', 'post_tag' ),
		'public' 				=> true,
		'show_ui' 				=> true,
		'show_in_menu' 			=> true,
		'menu_position' 		=> 5,
		'show_in_nav_menus'		=> false,
		'publicly_queryable'	=> true,
		'exclude_from_search' 	=> false,
		'has_archive' 			=> false,
		'query_var' 			=> true,
		'can_export' 			=> true,
		'rewrite' 				=> false,
		'capability_type' 		=> 'post'
	);
	
	register_post_type( 'project', $args );
}

add_action( 'init', 'register_cpt_person' );
add_action( 'init', 'register_cpt_project' );

?>