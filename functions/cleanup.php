<?

// rename Posts to News
function edit_admin_menus() {
	global $menu;
	$menu[5][0] = 'News';
}
add_action( 'admin_menu', 'edit_admin_menus' );


?>