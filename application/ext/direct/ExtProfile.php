<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * ExtProfile Api
 */
class ExtProfile Extends DirectBase{
    /**
	 * Constructor method
	 * @access public
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

    /**
     * Actor list
     * @remotable
     */
    function getList($params)
    {
        $list = array();
        $count = 0;
        $table = 'ci_profile';

        $this->doQueryList($params, $table, $list, $count);
        return array(
            'totalCount' => $count,
            'items' => $list
        );
    }

    /**
     * logs list
     * @remotable
     */
    function getLogList($params)
    {
        $this->ci->load->helper('file');
        $logs_info = get_dir_file_info(APPPATH.'logs/');

        $list = array();
        foreach($logs_info as $key => $row)
        {
            $list[] = array(
                'id' => $key,
                'name' => $row['name'],
                'modify_at' => date('Y-m-d H:i:s', $row['date']),
                'size' => $row['size'],
            );
        }

        $list = array_reverse($list);

        return $list;
    }

    /**
     * logs list
     * @remotable
     */
    function getLogDetail($id)
    {
        $this->ci->load->helper('file');
        $file = APPPATH. 'logs/'.$id;

        if(file_exists($file))
        {
            $content = file_get_contents($file);
            return array(
                'suc' => true,
                'content' => iconv("UTF-8", "UTF-8//IGNORE", $content)
            );
        }

        return array(
            'suc' => true,
            'msg' => 'file not found'
        );
    }
}
/* End of file */