<?
// replace [gallery] output format
remove_shortcode('gallery', 'gallery_shortcode');
add_shortcode('gallery', 'corner_gallery_shortcode');
function corner_gallery_shortcode($attr) {
	
	global $post;
	global $clients_meta;

	extract(shortcode_atts(array( 'ids' => $attr['ids'] ), $attr));
	$ids = explode(',', $ids);
		
	$output .= '<div class="visual-area">';
	$output .= '<div class="no-royalSlider">';	
	
		
	$image = wp_get_attachment_image_src($ids[0], 'work-feature');
	$image_large = wp_get_attachment_image_src($ids[0], 'work-feature-large');	
	$href = $image_large[0];
	
	// if the image is a GIF, show the full-size version to allow animation
	$filetype = wp_check_filetype($image[0]);
	if ($filetype['ext'] === 'gif') {
		$image[0] = $image_large[0] = wp_get_attachment_url($ids[0]);
	}

	// if an excerpt is provided (normally a youtube/vimeo URL), then override the zoom-view with this URL
	$excerpt = get_post($ids[0])->post_excerpt;
	if ($excerpt)
		$image_large[0] = $excerpt;
		
	
	if ( slt_cf_field_value('disable-zoom') ) {
			
		$output .= '
		<div class="rsContent">
			<img src="'.$image[0].'" alt="" />
		</div>';
		
	} else {

		
		if ( slt_cf_field_value('exclude-first-img-from-zoom') ) {
			$output .= '<img class="zoom-excluded" src="'.$image[0].'" alt="" />';						
		} else {
			$output .= '
			<div class="rsContent">
				<a class="zoom-img" href="'.$image_large[0].'" rel="shadowbox['.$post->post_name.'-alt]" title="'.get_the_title($post->ID).'">
					<img src="'.$image[0].'" alt="" />
				</a>
			</div>';						
		}
		

		
		$i = 0;
		foreach ( $ids as $id ) {
			
			//slt_cf_field_value('exclude-first-img-from-zoom')
			
			if ($i !== 0) {
				$image_large = wp_get_attachment_image_src($id, 'work-feature-large');	
				$output .= '<a class="zoom match-1" href="'.$image_large[0].'" rel="shadowbox['.$post->post_name.'-alt]" title="'.get_the_title($post->ID).'"></a>';
			}			
			
			$i++;
		}
		
	}		
		

	$output .= "</div></div>";
	
	if ( !slt_cf_field_value('disable-zoom') ) {
	
		// zoom-buttons
		$i = 0;
		foreach ( $ids as $id ) {
			
			$image_large = wp_get_attachment_image_src($id, 'work-feature-large');
			$additional_classes = '';
			$zoom_button_url = get_stylesheet_directory_uri().'/images/zoom.png';
			
			if ($i == 0) {
				
				$href = $image_large[0];
				$rel = 'rel="shadowbox['.$post->post_name.'];"';
				
				// if an excerpt is provided (normally a youtube/vimeo URL), then override the zoom-view with this URL
				$excerpt = get_post($id)->post_excerpt;
				if ($excerpt) {
					$href = $excerpt;
					$additional_classes .= 'video';
					$zoom_button_url = get_stylesheet_directory_uri().'/images/play.png';
					$rel = 'rel="shadowbox['.$post->post_name.'];'.get_post($id)->post_content;
					//$rel = 'rel="shadowbox['.$post->post_name.'];width=520;height=390';
				}
	
				if ( !slt_cf_field_value('exclude-first-img-from-zoom') ) {
					$output .= '<a class="zoom match-2 '.$additional_classes.'" href="'.$href.'" '.$rel.' title="'.get_the_title($post->ID).'"><img src="'.$zoom_button_url.'" alt="Zoom" height="25" width="25"></a>';
				}
	
			} else {
				
				if ($i == 1 && slt_cf_field_value('exclude-first-img-from-zoom')) {
					$output .= '<a class="zoom match-3" href="'.$image_large[0].'" rel="shadowbox['.$post->post_name.']" title="'.get_the_title($post->ID).'"><img src="http://thecornerlondon.com/site2.0/images/zoom.png" alt="Zoom" height="25" width="25"></a>';
					
				} else {
					$output .= '<a style="display:none" class="zoom match-4" href="'.$image_large[0].'" rel="shadowbox['.$post->post_name.']" title="'.get_the_title($post->ID).'"><img src="http://thecornerlondon.com/site2.0/images/zoom.png" alt="Zoom" height="25" width="25"></a>';
				}
				
	
			}
			
			$i++;
		}
		
	}	

	
	// show the "toggle" control
	$output .= '<div class="toggle">More</div>';
	$output .= '<div class="revealable">';
	
	// append the "sidebar"
	$output .= "<div class='sidebar'>";
		
		$clients = get_the_terms($post->ID, 'clients');
		
		if ( $clients ) :
			foreach ( $clients as $client ) :
				$client_logo_image_id = $clients_meta[$client->term_id][logo][0];
				$client_logo_image = wp_get_attachment_image_src($client_logo_image_id, 'client-logo-small');
				if ( $client_logo_image_id ) :
					$output .= '<h2>Client</h2>';
					$output .= '<img class="client-logo-small" src="'.$client_logo_image[0].'" alt="'.$client->name.'" />';
				endif;
			endforeach;
		endif;

		$output .= '<h2>Share</h2>
		<div class="share">
			<ul>				
				<li><a class="facebook" target="_blank" href="http://www.facebook.com/sharer.php?s=100&p[title]='.urlencode('The Corner London - '.$post->post_title).'&p[summary]='.urlencode($post->content).'&p[url]='.urlencode('http://thecornerlondon.com/#'.$post->post_name).'&p[images][0]='.urlencode($image[0]).'"></a></li>
				<li><a class="twitter" target="_blank" href="https://twitter.com/intent/tweet?text='.urlencode($post->post_title).'&amp;url=http%3A%2F%2Fthecornerlondon.com%2F%23'.urlencode($post->post_name).'&amp;via=thecornerLDN"> </a></li>
				<!--<li><a class="gplus" href="#'.$post->post_name.'"> </a></li>-->
			</ul>
		</div>';

		$tags = get_the_tags();
		if ($tags) :
		$output .= '<h2>Tags</h2>
		<ul class="tags">';
		
		foreach($tags as $tag) :
			$output .= '<li><a href="#'.$tag->slug.'">'.$tag->name.'</a></li>';
		endforeach;
		$output .= '</ul>';
		endif;
		
	$output .= '</div>';
	
	return $output;
}





add_shortcode('gallery2', 'corner_gallery2_shortcode');
function corner_gallery2_shortcode($attr) {
	
	global $post;
	global $clients_meta;

	extract(shortcode_atts(array( 'ids' => $attr['ids'] ), $attr));
	$ids = explode(',', $ids);

	$output .= '<div class="visual-area no-slider">';
	
	$i = 0;
	
	foreach ( $ids as $id ) {
		
		$attachment_meta = wp_get_attachment_metadata($id);
		$image = wp_get_attachment_image_src($id, 'work-feature');
		$image_large = wp_get_attachment_image_src($id, 'work-feature-large');	

		$rel = 'rel="shadowbox['.$post->post_name.'];"';
		
/*
		// if an excerpt is provided (normally a youtube/vimeo URL), then override the zoom-view with this URL
		$excerpt = get_post($id)->post_excerpt;
		if ($excerpt) {
			$image_large[0] = $excerpt;
			//$rel = 'rel="shadowbox['.$post->post_name.'];'.get_post($id)->post_content;
			$rel = 'rel="shadowbox['.$post->post_name.'];width=520;height=390';
		}
*/

		if ($i == 0) {
			
			$output .= '
				<a class="zoom" href="'.$image_large[0].'" '.$rel.' title="'.get_the_title($post->ID).'"><img src="http://thecornerlondon.com/site2.0/images/play.png" alt="Play" height="25" width="25"></a>
				<img src="'.$image[0].'" alt="" />';
		} else {
			$output .= '
				<a style="display:none" class="zoom" href="'.$image_large[0].'" rel="shadowbox['.$post->post_name.']" title="'.get_the_title($post->ID).'"><img src="http://thecornerlondon.com/site2.0/images/play.png" alt="Play" height="25" width="25"></a>
				<img style="display:none" src="'.$image[0].'" alt="" />';
		}
		

		
		
		$i++;

	}	

	$output .= "</div>";
	
	// show the "toggle" control
	$output .= '<div class="toggle">Info</div>';
	$output .= '<div class="revealable">';
	
	// append the "sidebar"
	$output .= "<div class='sidebar'>";
		
		$clients = get_the_terms($post->ID, 'clients');
		
		if ( $clients ) :
			foreach ( $clients as $client ) :
				$client_logo_image_id = $clients_meta[$client->term_id][logo][0];
				$client_logo_image = wp_get_attachment_image_src($client_logo_image_id, 'client-logo-small');
				if ( $client_logo_image_id ) :
					$output .= '<h2>Client</h2>';
					$output .= '<img class="client-logo-small" src="'.$client_logo_image[0].'" alt="'.$client->name.'" />';
				endif;
			endforeach;
		endif;

		$output .= '<h2>Share</h2>
		<div class="share">
			<ul>
				<li><a class="facebook" href="#'.$post->post_name.'"> </a></li>
				<li><a class="twitter" href="https://twitter.com/intent/tweet?text='.urlencode($post->post_title).'&amp;url=http%3A%2F%2Fthecornerlondon.com%2F%23'.urlencode($post->post_name).'&amp;via=thecornerLDN"> </a></li>
				<li><a class="gplus" href="#'.$post->post_name.'"> </a></li>
			</ul>
		</div>';

		$tags = get_the_tags();
		if ($tags) :
		$output .= '<h2>Tags</h2>
		<ul class="tags">';
		
		foreach($tags as $tag) :
			$output .= '<li>'.$tag->name.'</li>';
		endforeach;
		$output .= '</ul>';
		endif;
		
	$output .= '</div>';
	
	return $output;
}
?>