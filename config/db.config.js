module.exports = {
       
       HOST: "srv971.hstgr.io",
     USER: "u405557378_tiko",
       PASSWORD: "Adm3Pl2*",
     DB: "u405557378_tiko",
       
     //   HOST: "localhost",
     //   USER: "root",
     //   PASSWORD: " ",
    //    DB: "tiko",

        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      };


//bootconst mysql = require('mysql');

// connection configurations
//const dbConn = mysql.createConnection({
    //host: 'localhost',
    //user: 'root',
    //password: ' ',
    //database: 'moncar'
    //});
    // connect to database
    //dbConn.connect(function(error){
     //   if(error) throw error;
       // console.log("Connexion a la base de donnée reussite!")
   // })

    