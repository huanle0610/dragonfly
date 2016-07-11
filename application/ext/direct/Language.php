<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Language Api
 */
class Language Extends DirectBase
{
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
     * @remotable
     */
    function getList($params)
    {
        $list = array();
        $count = 0;
        $table = 'language';

        $this->doQueryList($params, $table, $list, $count);
        return array(
            'totalCount' => $count,
            'items' => $list
        );
    }

    /**
     * @remotable
     */
    function addLanguage($data)
    {
        $table = 'language';

        if (!is_array($data))
        {
            $data = array($data);
        }

        foreach ($data as $row)
        {
            $this->db->set(array(
                'name' => $row->name,
                'last_update' => $row->last_update
            ))->insert($table);
        }
        return array(
            'suc' => true
        );
    }

    /**
     * @remotable
     */
    function updateLanguage($data)
    {
        $table = 'language';

        if (!is_array($data))
        {
            $data = array($data);
        }

        foreach ($data as $row) {
            $this->db->set(array(
                'name' => $row->name,
                'last_update' => $row->last_update
            ))
                ->where(array(
                    'language_id' => $row->language_id
                ))->update($table);
        }

        return array(
            'suc' => true
        );
    }

    /**
     * @remotable
     * @param $data
     * @return array
     */
    function deleteLanguage($data)
    {
        $table = 'language';

        if (!is_array($data))
        {
            $data = array($data);
        }

        foreach ($data as $row)
        {
            $ret = $this->db->where(array(
                'language_id' => $row->language_id
            ))->delete($table);

            if(!$ret)
            {
                return array(
                    'suc' => false,
                    'msg' => get_db_error()
                );
            }
        }

        return array(
            'suc' => true
        );
    }


}
/* End of file */