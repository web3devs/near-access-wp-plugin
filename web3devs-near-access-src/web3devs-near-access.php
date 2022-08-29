<?php

/**
 *
 * @link              https://accessbynft.com
 * @since             1.0.0
 * @package           Web3devs_NEAR_Access
 *
 * @wordpress-plugin
 * Plugin Name:       NEAR Access
 * Plugin URI:        https://accessbynft.com/
 * Description:       Restrict accesss to pages for users holding specified NEAR-based tokens (NFTs)
 * Version:           1.0.0
 * Author:            Web3devs
 * Author URI:        https://web3devs.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       web3devs-near-access
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 */
define( 'WEB3DEVS_NEAR_ACCESS_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-web3devs-near-access-activator.php
 */
function activate_web3devs_near_access() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-web3devs-near-access-activator.php';
	Web3devs_NEAR_Access_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-web3devs-near-access-deactivator.php
 */
function deactivate_web3devs_near_access() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-web3devs-near-access-deactivator.php';
	Web3devs_NEAR_Access_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_web3devs_near_access' );
register_deactivation_hook( __FILE__, 'deactivate_web3devs_near_access' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-web3devs-near-access.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_web3devs_near_access() {

	$plugin = new Web3devs_NEAR_Access();
	$plugin->run();

}
run_web3devs_near_access();
