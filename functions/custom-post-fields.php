<?php

if ( function_exists( 'slt_cf_register_box') )
	add_action( 'init', 'register_custom_fields' );

function register_custom_fields() {

	slt_cf_setting( 'datepicker_default_format', 'dd-mm-yy' );

	slt_cf_register_box( array(
		'type'		=> 'post',
		'title'		=> 'Details',
		'id'		=> 'person-details',
		'context'	=> 'normal',
		'priority'	=> 'high',
		'fields'	=> array(
			array(
				'name'			=> 'job-title',
				'label'			=> 'Job title',
				'type'			=> 'text',
				'scope'			=> array( 'person' ),
			),
			array(
				'name'			=> 'email',
				'label'			=> 'Email',
				'type'			=> 'text',
				'scope'			=> array( 'person' ),
			),
			array(
				'name'			=> 'phone',
				'label'			=> 'Phone',
				'type'			=> 'text',
				'scope'			=> array( 'person' ),
			),
			array(
				'name'			=> 'twitter',
				'label'			=> 'Twitter',
				'type'			=> 'text',
				'scope'			=> array( 'person' ),
			),
			array(
				'name'			=> 'facebook',
				'label'			=> 'Facebook',
				'type'			=> 'text',
				'scope'			=> array( 'person' ),
			),
			array(
				'name'			=> 'linkedin',
				'label'			=> 'LinkedIn',
				'type'			=> 'text',
				'scope'			=> array( 'person' ),
			)
		)
	));

	slt_cf_register_box( array(
		'type'		=> 'post',
		'title'		=> 'Additional options',
		'id'		=> 'project-additional-options',
		'context'	=> 'side',
		'priority'	=> 'default',
		'fields'	=> array(
			array(
				'name'			=> 'exclude-first-img-from-zoom',
				'label'			=> 'Exclude first gallery image from lightbox',
				'type'			=> 'checkbox',
				'scope'			=> array( 'project' ),
			),
			array(
				'name'			=> 'disable-zoom',
				'label'			=> 'Disable lightbox zoom',
				'type'			=> 'checkbox',
				'scope'			=> array( 'project' ),
			),
		)
	));

	slt_cf_register_box( array(
		'type'		=> 'post',
		'title'		=> 'Display date',
		'id'		=> 'news-display-date',
		'context'	=> 'side',
		'priority'	=> 'default',
		'fields'	=> array(
			array(
				'name'			=> 'display-date',
				'label'			=> 'Display date',
				'hide_label'	=> true,
				'type'			=> 'date',
				'scope'			=> array( 'post' ),
			),
		)
	));

}

?>