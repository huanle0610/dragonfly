<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Actor Api
 */
class Actor Extends DirectBase{
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
        $table = 'actorf';

        $this->db->join('film_actor fa', 'fa.`actor_id` = t.`actor_id`');
        $this->db->where('fa.film_id', 12);

        $this->setSelect('first_name, last_name, t.last_update');
        $this->doQueryList($params, $table, $list, $count);
        return array(
            'totalCount' => $count,
            'items' => $list
        );
    }
}
/* End of file */