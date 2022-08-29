NEAR Access WordPress plugin
============================

The development repository of the NEAR Access WordPress plugin.

**NOTE** This is not the Wordpress plugin repository - notes on publishing it to WP Plugins below!

The plugin consists of two main parts:

- [wordpress plugin](web3devs-near-access-src/) itself
- [web component](web3devs-near-access-src/public/js/component/) (React App) embedded to the website in place of the actual content

The WP plugin controls access to `posts` and `pages`. If access is not granted, displays appropriate content (if it's post excerpt - a text identical to the one WP uses for it's built in password protection mechanism, otherwise [our component](web3devs-near-access-src/public/js/component/)).

The component facilitates wallet connection process and access state management (access granted, not granted, errors, redirects etc).

# Prerequisites

- Docker (and Compose)
- node (v16+)

# Local development

1. Clone this repo (obviously)
2. Run the docker container

    ```bash
    docker-compose up -d
    ```
3. Link the plugin source to WP plugins dir

    ```bash
    cd wp-data/wp-content/plugins
    ln -s ../../../web3devs-near-access-src web3devs-near-access
    ```

4. Go to http://localhost:8001 and finish WP setup

5. (Optional) applying web component changes

    Remember to **BUILD** the component when you're done applying changes to it

    ```bash
    yarn build
    ```

    This will generate a `build` directory containing `asset-manifest.json` file used by the WP plugin!

# Publishing to WordPress

Wordpress uses SVN for it's plugin version control and ZIP files for plugin distribution.

Which means we need to clean things up a little before submitting or using, here's the tool:

```bash
make build
```

This will produce:

- `web3devs-near-access` directory with cleaned up codebase ready to be submitted to WP's SVN repository
- `web3devs-near-access.zip` installable plugin file

You can now use the ZIP file and install/distribute it yourself and publish the `web3devs-near-access` (**NOT** the one with `-src`) to Wordpress Plugins!

In case you need [GIT-SVN](https://git-scm.com/docs/git-svn) hints: [https://gist.github.com/moiristo/5899909](https://gist.github.com/moiristo/5899909).