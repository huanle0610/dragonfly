<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Database Api
 */
class Database Extends DirectBase{
    /**
	 * Constructor method
	 * @access public
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
        $this->ci->load->helper('database');
	}

    /**
     * table list
     * @remotable
     */
    function getList($params)
    {
        $list = array();
        $count = 0;
        $table = 'actor';

        $tables = $this->db->list_tables();
        foreach($tables as $row)
        {
            $list[] = array(
                'table_name' => $row,
                'table_description' => fineTableName($row)
            );
        }
        $count = count($list);

        return array(
            'sql' => $this->_sql,
            'totalCount' => $count,
            'items' => $list
        );
    }
    /**
     * data list
     * @remotable
     */
    function getTableData($params)
    {
        $list = array();
        $count = 0;
        $table = $params->table;

        $this->doQueryList($params, $table, $list, $count);

        $fields = $this->getListFields($table);
        $columns = $this->getColumns($fields);

        return array(
            'sql' => $this->_sql,
            'metaData' => array(
                'table' => fineTableName($table),
                'columns' => $columns,
                'fields' => $fields,
            ),
            'totalCount' => $count,
            'items' => $list
        );
    }

    function getListFields($list_fields)
    {
        $fields = $this->db->list_fields($list_fields);

        return $fields;
    }

    function getColumns($fields)
    {
        $columns = array();
        foreach($fields as $row)
        {
            $columns[] = array(
                'dataIndex'  => $row,
                'text' => fineTableName($row)
            );
        }

        return $columns;
    }
}
/* End of file */