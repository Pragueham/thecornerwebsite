<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<title><?php bloginfo('name'); ?>&nbsp;<?php bloginfo('description'); ?></title>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0" />
   	<meta name="description" content="The Corner is a collaboration of advertising, technology and culture." />
	<script src="<?=get_template_directory_uri()?>/js/modernizr.custom.min.js"></script>
	<link rel="stylesheet" href="<?=get_template_directory_uri()?>/js/shadowbox/shadowbox.css">
	<link rel="stylesheet" href="<?=get_template_directory_uri()?>/js/isotope.css" />
	<link rel="stylesheet" href="<?=get_template_directory_uri()?>/js/royalslider.css" />
	<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>?v=2" />
	<? wp_head(); ?>
	<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-33144169-1']);
	_gaq.push(['_trackPageview']);
	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	</script>
</head>

<body class="without-mastheader-slider">

<?

/****************************************
 *
 *	Meet us
 *
 ****************************************/

$meet_us = get_option('meet_us');
$new_business = get_option('new_business');
$enquiries = get_option('enquiries');
$placements = get_option('placements');

$thecorner_twitter_clean = str_replace("@", "", $meet_us['twitter']); // remove "@"

?>

<div class="blind"></div>

<header>

	<div id="contact-overlay">

		<div id="map">
			<div id="map_canvas"></div>
		</div>

		<div id="contact-details">

			<div id="col1" class="desktop-only">
				<img src="http://www.thecornerlondon.com/site2.0/wordpress/wp-content/themes/thecorner/images/thecornerbuilding.jpg" alt="The Corner London Building"/>
			</div>

			<div id="col2" class="desktop-only">
				<h2 class="title">Contact Us</h2>
				<div id="contacts" class="desktop-only">
					<p>
					<em>New Business</em>
					<a class="email" href="mailto:<?=$new_business['email']?>"><?=$new_business['name']?></a><br/>
					<?=$new_business['phone']?>
					</p>
					<p>
					<em>Enquiries</em>
					<a class="email" href="mailto:<?=$enquiries['email']?>"><?=$enquiries['name']?></a><br/>
					<?=$enquiries['phone']?>
					</p>
					<p>
					<em>Placements</em>
					<a class="email" href="mailto:<?=$placements['email']?>"><?=$placements['name']?></a><br/>
					<?=$placements['phone']?>
					</p>
				</div>
			</div>


			<div id="col3">
				<div class="desktop-only">
					<h2 class="title" >Address</h2>

					<div id="address">
						<p>
						<?=nl2br($meet_us['address'])?>
						</p>
					</div>
				</div>

				<div class="mobile-only contact_block">

					<div id="address" >
						<p>
						<?=$meet_us['address']?>
						</p>
					</div>
				</div>

				<div class="contact_block">
					<h2 class="title desktop-only">Follow Us</h2>

					<div id="social-media-links">
						<a class="social-media phone mobile-only" href="tel://<?=$enquiries['phone']?>">Phone</a>
						<a class="social-media email mobile-only" href="mailto:<?=$enquiries['email']?>">@</a>
						<a class="social-media twitter" target="_blank" href="http://twitter.com/<?=$thecorner_twitter_clean?>">Twitter</a>
						<a class="social-media facebook" target="_blank" href="<?=$meet_us['facebook']?>">Facebook</a>
						<a class="social-media linkedin" target="_blank" href="<?=$meet_us['linkedin']?>">LinkedIn</a>
					</div>
				</div>


			</div>

		</div>

	</div>



<!--
*******************************************************************************

	PERMA BAR

*******************************************************************************
-->

	<div id="perma-bar">
		<h1><a id="scroll-to-top" href="#top"><? bloginfo('name') ?></a></h1>
		<h2><? bloginfo('description') ?></h2>
		<a id="toggle-contact-pulldown" href="#toggle-contact-pulldown">Contact<div class="arrow-up"></div></a>
		<a id="toggle-hashtags" href="#toggle-hashtags">Discover<div class="arrow-up"></div></a>
	</div>

	<nav id="hashtags" class="scrollable">
		<div>
		<div class='find-title'>What are you looking for?</div>
		<div class="remove-filter"><a href="#"  data-filter-value="">Show all</a></div>
		</div>
		<ul>
			<? foreach ( get_tags('hide_empty=0') as $tag ) : ?>
			<li><a href="#" data-filter-value=".<?=$tag->name?>"><?=$tag->name?></a></li>
			<? endforeach; ?>
		</ul>
	</nav>

</header>

<div class="logo-overlay"></div>

<!--
*******************************************************************************

	MASTHEAD SLIDER

*******************************************************************************
-->


<section id="masthead-slider" class="royalSlider rsDefault">
	<a class="rsImg desktop" href="images/masthead-slider/slide1.jpg"></a>
	<a class="rsImg desktop" href="images/masthead-slider/slide2.jpg"></a>
	<a class="rsImg desktop" href="images/masthead-slider/slide3.jpg"></a>
	<a class="rsImg mobile" href="images/masthead-slider/slide1-mobile.jpg"></a>
	<a class="rsImg mobile" href="images/masthead-slider/slide2-mobile.jpg"></a>
	<a class="rsImg mobile" href="images/masthead-slider/slide3-mobile.jpg"></a>
</section>

<section id="grid">

<!--
*******************************************************************************

	INTRODUCTION SECTION

*******************************************************************************
-->

	<?
	// WHO WE ARE
	$who_we_are = get_page_by_path('who-we-are');
	?>
	<article class="intro-slideshow aboutus">
		<div class="title-area">
			<p class="title"><?=apply_filters('the_title', $who_we_are->post_title)?></p>
		</div>
		<div class="royalSlider rsDefault">

			<?
			$attachments = get_posts( array(
				'order'          => 'ASC',
				'orderby'		 => 'menu_order',
				'numberposts'    => -1,
				'post_type'      => 'attachment',
				'post_parent'    => $who_we_are->ID,
				'post_mime_type' => 'image',
				'post_status'    => null
			) );
			if ($attachments) {
				foreach ($attachments as $attachment) {
					$img = wp_get_attachment_image_src($attachment->ID, 'work-feature', false, false);
					echo '<a class="rsImg" href="'.$img[0].'"></a>';
				}
			}
			?>

		</div>
	</article>


	<?
	// CLIENT SLIDESHOW
	?>
	<article class="clients_slideshow">
		<div class="title-area">
			<p class="title">Clients</p>
		</div>
		<div class="royalSlider rsDefault">
			<?
			$clients = get_terms( 'clients', 'orderby=name&hide_empty=0' );
			$clients_meta = get_option('client-meta');
			foreach ($clients as $client) :
				$client_logo_image_id = $clients_meta[$client->term_id][logo][0];
				$client_logo_image_url = wp_get_attachment_url($client_logo_image_id, 'client-logo-slideshow', false, false);
				echo '<a class="rsImg" href="' . $client_logo_image_url . '"></a>';
			endforeach;
			?>
		</div>
	</article>





<?
$latest_project = get_posts( array(
    'numberposts'     => 1,
    'orderby'         => 'post_date',
    'order'           => 'DESC',
    'post_type'       => 'project',
    'post_status'     => 'publish',
));
foreach( $latest_project as $post ) :

	setup_postdata($post);
	$tags = get_the_tags();

	?>

	<article class="feature<? if ($tags) foreach($tags as $tag) echo ' '.$tag->name; ?>" data-hash="<?=$post->post_name?>">

		<div class="title-area">
			<p class="title"><? the_title(); ?></p>
		</div>

		<div class="content">
			<? the_content(); ?>
			</div> <!-- /.revealable -->
		</div>

	</article>

	<?
endforeach;
?>





	<?
	// ABOUT US
	$about_us = get_page_by_path('about-us');
	?>
	<article class="about aboutus">
		<div class="title-area">
			<p class="title">
				<?=apply_filters('the_title', $about_us->post_title)?>
			</p>
		</div>
		<div class="description">
			<?=apply_filters('the_content', $about_us->post_content)?>
		</div>
	</article>


		<?
	// Street photos
	$street_photos = get_page_by_path('the-corner');
	?>
	<article class="intro-slideshow">
		<div class="title-area">
			<p class="title"><?=apply_filters('the_title', $street_photos->post_title)?></p>
		</div>
		<div class="royalSlider rsDefault">

			<?
			$attachments = get_posts( array(
				'order'          => 'ASC',
				'numberposts'    => -1,
				'post_type'      => 'attachment',
				'post_parent'    => $street_photos->ID,
				'post_mime_type' => 'image',
				'post_status'    => null
			) );
			if ($attachments) {
				foreach ($attachments as $attachment) {
					$img = wp_get_attachment_image_src($attachment->ID, 'work-feature', false, false);
					echo '<a class="rsImg" href="'.$img[0].'"></a>';
				}
			}
			?>

		</div>
	</article>








<?

// People, News, Work, sorted by post-date
$cards = get_posts( array(
	'numberposts'	=> 80,
	'exclude'		=> $latest_project[0]->ID,
	'post_type'		=> array('person', 'post', 'project'),
	'post_status'	=> array('publish', 'future'),
	'orderby'		=> 'post_date',
    'order'			=> 'DESC'
) );
$i = 0;

foreach( $cards as $post ) :

	setup_postdata($post);

	$tags = wp_get_post_tags($post->ID, array( 'fields' => 'slugs' ));
	$tags = implode(" ", $tags);

	if ( $post->post_type === 'person' ) : ?>

		<article class="people people-slidedown <?=$tags?>">

			<div class="title-area">
				<p class="title"><? the_title(); ?></p>
				<p class="sub-title"><?=slt_cf_field_value('job-title')?></p>
			</div>

			<div class="toggle">
				 More
			</div>

			<div class="bio">
				<div class="content">
					<? the_content(); ?>
				</div>
			</div>

			<? the_post_thumbnail('people-portrait'); ?>

			<ul class="social-media">
				<? if (slt_cf_field_exists('twitter')) : ?>
					<li><a class="twitter" target="_blank" href="http://twitter.com/<?=slt_cf_field_value('twitter')?>">Twitter</a></li>
				<? endif; ?>
				<? if (slt_cf_field_exists('facebook')) : ?>
					<li><a class="facebook" target="_blank" href="<?=slt_cf_field_value('facebook')?>">Facebook</a></li>
				<? endif; ?>
				<? if (slt_cf_field_exists('linkedin')) : ?>
					<li><a class="linkedin" target="_blank" href="<?=slt_cf_field_value('linkedin')?>">LinkedIn</a></li>
				<? endif; ?>
			</ul>

			<p class="email"><a href="mailto:<?=slt_cf_field_value('email')?>"><?=slt_cf_field_value('email')?></a></p>

			<? if (slt_cf_field_value('phone')) : ?>
			<p class="phone"><a href="tel://<?=slt_cf_field_value('phone')?>"><?=slt_cf_field_value('phone')?></a></p>
			<? else : ?>
			<p class="phone no-phone">&nbsp;</p>
			<? endif; ?>

		</article>

	<? elseif ( $post->post_type === 'post' ) : ?>

		<article class="news <?=$tags?> <?
		$tag_names = wp_get_post_tags($post->ID);
		foreach ( $tag_names as $tag )
			echo ' '.$tag->name;
		?>">

			<div class="title-area">
				<p class="title">News</p>
			</div>
			<? the_post_thumbnail('news'); ?>
			<div class="description">
				<p class="news-date">
					<?
					$date_output_format = 'jS F Y';
					if ( slt_cf_field_value('display-date') ) {
						$time = strtotime( slt_cf_field_value('display-date') );
						echo date( $date_output_format, $time );
					} else {
						the_time($date_output_format);
					}
					?>
				</p>
				<h2><?php the_title(); ?></h2>
				<? the_content(); ?>
			</div>
		</article>


	<? elseif ( $post->post_type === 'project' ) : ?>

		<? $tags = get_the_tags(); ?>

		<article class="feature<? if ($tags) foreach($tags as $tag) echo ' '.$tag->slug; ?>" data-hash="<?=$post->post_name?>">

			<div class="title-area">
				<p class="title"><? the_title(); ?></p>
			</div>

			<div class="content">
				<? the_content(); ?>
				</div> <!-- /.revealable -->
			</div>

		</article>

	<?
	endif;

	// add a twitter card every 5 posts


	if ( $i % 5 == 0 ) :
		?>

		<article class="twitter tweets">
			<div class="title-area">
				<p class="title">Tweets</p>
			</div>
			<blockquote class="twitter-tweet"><!-- Populated via JS --></blockquote>
		</article>

		<?
	endif;

	$i++;


endforeach;
?>

</section>


<script src="<?=get_template_directory_uri()?>/js/jquery-1.7.1.min.js"></script>
<script src="<?=get_template_directory_uri()?>/js/jquery.isotope.min.js"></script>
<script src="<?=get_template_directory_uri()?>/js/jquery.royalslider.min.js"></script>
<script src="<?=get_template_directory_uri()?>/js/jquery.event.drag-2.2.js"></script>
<script src="<?=get_template_directory_uri()?>/js/shadowbox/shadowbox.js"></script>
<script src="<?=get_template_directory_uri()?>/js/thecorner.js?v=1"></script>

<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>

<style type="text/css">
.twitter-tweet-rendered {margin: 0 !important;}
.twt-border {border: 0 !important;box-shadow: none !important;}
/* .twt-border .twt-tweet {margin:0!important; padding:15px 0!important} */
.twt-tweet .avatar img,.twt-border{-webkit-border-radius:0!important;-moz-border-radius:0!important;border-radius:0!important}.twt-border .twt-reply{-moz-border-radius:0!important;border-radius:0!important;-webkit-border-top-right-radius:0!important;-webkit-border-top-left-radius:0!important; }
.twt-tweet .entry-title,.twt-o .entry-title a,.twt-o .entry-title b {font-family:"Baskerville", Georgia, serif!important;}
@media screen and (max-width: 500px) {
	#grid article.twitter,
	#grid article.twitter .twitter-tweet-rendered { width: 290px !important;}
}
</style>

<?php wp_footer(); ?>

</body>
</html>