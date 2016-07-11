<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

// Version 17-09-2010

/**
 * Based on http://www.sencha.com/forum/showthread.php?79211-Ext.Direct-for-CodeIgniter/
 */

/**
 * File Class
 */
class File extends DirectBase
{
    /**
     * List Files
     * @remotable
     * @remoteName list
     * @param ??? $folder
     * @return mixed
     */
    public function listFiles($folder)
    {
        if (substr($folder, 0, 3) === '../') {
            return 'Nice try buddy';
        }

        return array_slice(scandir($folder), 2);
    }

    /**
     * Add
     * @remotable
     * @formHandler
     * @param ??? $post
     * @param ??? $files
     * @return mixed
     */
    public function add($post)
    {
        $msg = '';
        foreach ($_FILES as $name => $file) {
            $ret = $this->do_upload($name);
            if (isset($ret['error'])) {
                $errors[$name] = $ret['error'];
            } else {
                $msg .= sprintf('File %s has uploaded to %s<br/>', $name, $ret['full_path']);
            }
        }

        return array(
            'success' => false,
            'msg' => $msg,
            'errors' => $errors
        );
    }

    function do_upload($file_name)
    {
        $config['upload_path'] = './upload/';
        $config['allowed_types'] = 'txt';
        $config['encrypt_name'] = true;
        $config['max_size'] = '10000';

        $this->ci->load->library('upload', $config);
        $uploadLib = $this->ci->upload;

        if (!$uploadLib->do_upload($file_name)) {
            $data = array('error' => $uploadLib->display_errors() . ' Error From Backend!');
        } else {
            $data = $uploadLib->data();
        }

        return $data;
    }
}

/* End of file File.php */
/* Location: ./application/ext/direct/File.php */