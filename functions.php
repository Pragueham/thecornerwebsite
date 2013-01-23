<?

include ( 'functions/cleanup.php' );
include ( 'functions/gallery.php' );
include ( 'functions/custom-post-types.php' );
include ( 'functions/custom-post-fields.php' );
include ( 'functions/custom-taxonomies.php' );
include ( 'functions/custom-taxonomy-fields.php' );
include ( 'functions/settings-api/settings-api.php' );

add_theme_support( 'post-thumbnails' );

add_image_size( 'news', 250, 500, false );
add_image_size( 'people-portrait', 250, 250, false );
add_image_size( 'work-feature', 500, 280, true );
add_image_size( 'work-feature-large', 1250, 700, false );
add_image_size( 'client-logo-small', 200, 400, false );
add_image_size( 'client-logo-slideshow', 250, 250, true );

?>