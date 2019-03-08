import sqlite3
from sqlite3 import Error

### front end will take a lobby creation name OR join lobby. If create lobby
### is pressed, call "create_lobby", else if join button is clicked,
### run "join_game"
playernum = 0

### username = name of user
### x is x coord location
### y is y coord location
### db is name of database
def join_game(username, x, y, db):
    lobby = sqlite3.connect(db)
    cursor = lobby.cursor()
    playernum + 1
    in = "INSERT INTO game (id, username, location_x, location_y) VALUES (%s, %s, %s, %s)"
    vals = (playernum, username, x, y)
    cursor.execute(in, vals)
    db.commit()
    print(cursor.rowcount, username + "'s record has been updated")

def update_location(username, x, y, db):
    lobby = sqlite3.connect(db)
    cursor = lobby.cursor()
    update_x = "UPDATE game SET location_x = " + x + " WHERE username = " + username
    update_y = "UPDATE game SET location_y = " + y + " WHERE username = " + username
    mycursor.execute(update_x, update_y)
    db.commit()
    print(mycursor.rowcount, " location(s) updated")




def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return None


def main():
    database = "C:\\sqlite\\db\\MarioFrenzy.db"

    sql_create_lobby = """ CREATE TABLE IF NOT EXISTS game (
                                        id integer PRIMARY KEY,
                                        username TEXT NOT NULL,
                                        location_x REAL NOT NULL,
                                        location_y REAL NOT NULL
                                    ); """

    # create a database connection
    conn = create_connection(database)
    if conn is not None:
        # create projects table
        create_table(conn, sql_create_lobby)

    else:
        print("Error! cannot create the database connection.")
