package org.chardev.cjt.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class Database {

	public static final String CHARDEV_MOP = "jdbc:mysql://localhost:3306/chardev_mop?";
	public static final String CHARDEV_MOP_FR = "jdbc:mysql://localhost:3306/chardev_mop_fr?";
	public static final String CHARDEV_MOP_DE = "jdbc:mysql://localhost:3306/chardev_mop_de?";
	public static final String CHARDEV_MOP_ES = "jdbc:mysql://localhost:3306/chardev_mop_es?";
	public static final String CHARDEV_MOP_RU = "jdbc:mysql://localhost:3306/chardev_mop_ru?";
	public static final String CHARDEV_MOP_STATIC = "jdbc:mysql://localhost:3306/chardev_mop_static?";

	public static Connection connectToDatabase(String url) {
		try {
			String driverClass = "com.mysql.jdbc.Driver";
			Class.forName(driverClass).newInstance();
			return DriverManager.getConnection(url, "root", "");
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		} catch (InstantiationException ie) {
			System.out.println(ie);
		} catch (IllegalAccessException iae) {
			System.out.println(iae);
		} catch (ClassNotFoundException cnfe) {
			cnfe.printStackTrace();
		}
		throw new RuntimeException("Unable to connect to database: " + url);
	}
}
