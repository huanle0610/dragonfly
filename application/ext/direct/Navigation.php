<?php
/**
 * Navigation Api
 */
class Navigation Extends DirectBase
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
     * demo tree
     * @remotable
     */
    public function getDemoTree()
    {
        $data = '[{"checked": true, "id": 1, "text":"To Do","cls":"folder","expanded":true,"children":[{"text":"Go jogging","leaf":true,"checked":true},{"text":"Take a nap","leaf":true,"checked":false},{"text":"Climb Everest","leaf":true,"checked":false}]},{"text":"Grocery List","cls":"folder","children":[{"text":"Bananas","leaf":true,"checked":false},{"text":"Milk","leaf":true,"checked":false},{"text":"Cereal","leaf":true,"checked":false},{"text":"Energy foods","cls":"folder","children":[{"text":"Coffee","leaf":true,"checked":false},{"text":"Red Bull","leaf":true,"checked":false}]}]},{"text":"Remodel Project","cls":"folder","children":[{"text":"Finish the budget","leaf":true,"checked":false},{"text":"Call contractors","leaf":true,"checked":false},{"text":"Choose design","leaf":true,"checked":false}]}]';
        $data = json_decode($data, 1);
        return array(
            'suc' => true,
            'children' => $data
        );
    }
}