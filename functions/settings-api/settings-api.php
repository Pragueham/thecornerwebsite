<?php

/**
 * Plugin Name: WordPress Settings API
 * Plugin URI: http://tareq.wedevs.com/2012/06/wordpress-settings-api-php-class/
 * Description: WordPress Settings API testing
 * Author: Tareq Hasan
 * Author URI: http://tareq.weDevs.com
 * Version: 0.1
 */
require_once dirname( __FILE__ ) . '/class.settings-api.php';

/**
 * WordPress settings API demo class
 *
 * @author Tareq Hasan
 */
class WeDevs_Settings_API_Test {

    private $settings_api;

    function __construct() {
        $this->settings_api = WeDevs_Settings_API::getInstance();

        add_action( 'admin_init', array($this, 'admin_init') );
        add_action( 'admin_menu', array($this, 'admin_menu') );
    }

    function admin_init() {

        //set the settings
        $this->settings_api->set_sections( $this->get_settings_sections() );
        $this->settings_api->set_fields( $this->get_settings_fields() );

        //initialize settings
        $this->settings_api->admin_init();
    }

    function admin_menu() {
        add_options_page( 'About The Corner', 'About The Corner', 'delete_posts', 'about_the_corner', array($this, 'plugin_page') );
    }

    function get_settings_sections() {
        $sections = array(
            array(
                'id'	=> 'meet_us',
                'title' => 'Meet Us'
            ),
            array(
                'id'	=> 'new_business',
                'title' => 'New Business'
            ),
            array(
                'id'	=> 'enquiries',
                'title' => 'Enquiries'
            ),
            array(
                'id'	=> 'placements',
                'title' => 'Placements'
            )
        );
        return $sections;
    }

    /**
     * Returns all the settings fields
     *
     * @return array settings fields
     */
    function get_settings_fields() {
        $settings_fields = array(
            'meet_us' => array(
                array(
                    'name'	=> 'address',
                    'label'	=> 'Address',
                    'desc'	=> false,
                    'type'	=> 'textarea'
                ),
                array(
                    'name'	=> 'twitter',
                    'label'	=> 'Twitter',
                    'desc'	=> false,
                    'type'	=> 'text',
                ),
                array(
                    'name'	=> 'facebook',
                    'label'	=> 'Facebook',
                    'desc'	=> false,
                    'type'	=> 'text',
                ),
                array(
                    'name'	=> 'linkedin',
                    'label'	=> 'LinkedIn',
                    'desc'	=> false,
                    'type'	=> 'text',
                ),                            

            ),
            'new_business' => array(
                array(
                    'name'	=> 'name',
                    'label'	=> 'Name',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
                array(
                    'name'	=> 'email',
                    'label'	=> 'Email',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
                array(
                    'name'	=> 'phone',
                    'label'	=> 'Phone',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
            ),
            'enquiries' => array(
                array(
                    'name'	=> 'name',
                    'label'	=> 'Name',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
                array(
                    'name'	=> 'email',
                    'label'	=> 'Email',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
                array(
                    'name'	=> 'phone',
                    'label'	=> 'Phone',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
             ),
             'placements' => array(
                array(
                    'name'	=> 'name',
                    'label'	=> 'Name',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
                array(
                    'name'	=> 'email',
                    'label'	=> 'Email',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
                array(
                    'name'	=> 'phone',
                    'label'	=> 'Phone',
                    'desc'	=> false,
                    'type'	=> 'text'
                ),
             )             
        );

        return $settings_fields;
    }

    function plugin_page() {
        echo '<div class="wrap">';
        settings_errors();

        $this->settings_api->show_navigation();
        $this->settings_api->show_forms();

        echo '</div>';
    }

    /**
     * Get all the pages
     *
     * @return array page names with key value pairs
     */
    function get_pages() {
        $pages = get_pages();
        $pages_options = array();
        if ( $pages ) {
            foreach ($pages as $page) {
                $pages_options[$page->ID] = $page->post_title;
            }
        }

        return $pages_options;
    }

}

$settings = new WeDevs_Settings_API_Test();

?>