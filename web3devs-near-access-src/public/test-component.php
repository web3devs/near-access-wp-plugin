<?php
    $prefix = '/wp-content/plugins/web3devs-near-access/public/js/component/build';
    $manifest = json_decode(file_get_contents(dirname(__FILE__).'/js/component/build/asset-manifest.json'), true);
    // var_dump($manifest);
?>
<!doctype html>
<html lang="en">
    <head>
        <script src="https://unpkg.com/@webcomponents/custom-elements"></script>
        <meta charset="utf-8"/>
        <link rel="icon" href="<?php echo $prefix; ?>/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="description" content="Web site created using create-react-app"/>
        <link rel="apple-touch-icon" href="<?php echo $prefix; ?>/logo192.png"/>
        <link rel="manifest" href="<?php echo $prefix; ?>/manifest.json"/>
        <title>React App</title>
        <script defer="defer" src="<?php echo $prefix; ?><?php echo $manifest['files']['main.js']; ?>"></script>
        <?php /*<link href="<?php echo $prefix; ?><?php echo $manifest['files']['main.css']; ?>" rel="stylesheet"> */ ?>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container text-center">
            <div class="row">
                <div class="col">
                <web-greeting
                    name="tofik"
                    tokenName="BAZINGA"
                    tokenAddress="latium.mintspace2.testnet:0"
                    network="testnet"
                ></web-greeting>
                </div>

                <div class="col">
                    <web-greeting
                        name="roman"
                        tokenName="ROMAN"
                        tokenAddress="latium.mintspace2.testnet:6"
                        network="testnet"
                    ></web-greeting>
                </div>

                <div class="col">
                    <web-greeting
                        tokenName="ZYGMUNT"
                        tokenAddress="latium.mintspace2.testnet"
                        network="testnet"
                    ></web-greeting>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK" crossorigin="anonymous"></script>
    </body>
</html>