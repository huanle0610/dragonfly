<?php
function get_db_error()
{
    $ci =& get_instance();

    $error = $ci->db->error();
    return sprintf("Dabase Error(%s): %s",
        $error['code'],
        $error['message']
    );
}