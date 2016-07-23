<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>
    <base href="<?php echo base_url();?>" />

    <link rel="stylesheet" type="text/css" href="resources/css/main.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $extjs['css'];?>">
    <link rel="stylesheet" type="text/css" href="<?php echo $extjs['font-awesome'];?>">
    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="resources/zeroclipboard/jquery.zeroclipboard.min.js"></script>
    <script src="<?php echo $extjs['js'];?>"></script>
    <script src="<?php echo site_url('direct/api');?>"></script>

    <script>
        Ext.define("Myapp.Const", {
            singleton  : true,
            ajaxShow: false,
            loginSec: false,

            site: {
                name: 'Dragonfly'
            }
        });
    </script>
    <script src="app.js"></script>
</head>
<body>
<div id="loading">
    <div class="cmsg">
        <div class="msg">
            Loading…
        </div>
        <div class="lpb">
            <div id="lpt" style="width: 10%;"></div>
        </div>
    </div>
</div>
<div class="flaeQ"></div>

<script>
    $(function(){
        $("body")
            .on("copy", ".zclip", function(/* ClipboardEvent */ e) {
                e.clipboardData.clearData();
                e.clipboardData.setData("text/plain", Ext.getCmp(this.id).getCopyText());
                e.preventDefault();
            }).on("aftercopy", ".zclip", function(/* ClipboardEvent */ e) {
                Ext.getCmp(this.id).afterCopy();
            });
    })
</script>

<script src="resources/js/LAB.min.js"></script>
</body>
</html>