import { readFileSync, writeFileSync } from 'fs';

class ControllerDB {

    db = []
    path = './content/db.txt'

    constructor() {
        this.readDB()
    }

    getDB() {
        return this.db
    }

    readDB() {
        try {
            let tmp = readFileSync(this.path, 'utf8')
            if (tmp.length != 0) {
                this.db = JSON.parse(tmp)
            }
            
        }
        catch (error) {
            console.warn(error)
        }
    }

    setDB(user) {

        try {
            this.db.push(user)
            writeFileSync(
                this.path,
                JSON.stringify(this.db))
        }
        catch (error) {
            console.warn(error)
        }
    }

    findUser(userName) {
        let result = this.db.filter((e) => e.user == userName)
        if (result != '')
            console.log(`User ${userName} was found \n`, result);
        else {
            console.log('No results');
        }
    }
}

export default ControllerDB;