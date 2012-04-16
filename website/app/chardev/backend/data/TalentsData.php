<?php
namespace chardev\backend\data;

use chardev\backend\DatabaseHelper;

use chardev\backend\Database;

use chardev\backend\DoubleCache;

use chardev\backend\Identifiable;

use chardev\backend\JSONSerializable;

class TalentsData extends Data
{
	protected static $instance = null;
	
	/**
	 * @return TalentsData		
	 */
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new TalentsData( /*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct( /*args*/) {}
	
	protected function getData($id) {
		
		$db = Database::getConnection();
		$records = DatabaseHelper::fetchMany( $db, "SELECT * FROM `talent` WHERE `CharacterClassID` = ? ORDER BY `ID` ASC", array($id));
		$sd = SpellData::getInstance();
		
		$talents = array();
		for( $i=0; $i<6; $i++ ) {
			$talents[$i] = array( null, null, null);
		}
		
		foreach( $records as $record ) {
			$talents[(int)$record["Row"]][(int)$record["Column"]] = array(
					(int)$record["ID"], 
					$sd->fromId($record["SpellID"])
			); 	
		}
		
		return array( $id, $talents );
	}
}

?>