import pg from "pg";

const db = new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:"todo",
    password:"1234",
    port:5432
});





// db.query("ALTER TABLE TODO ADD title varchar(255);",(err,res)=>{
//     if (err){
//         console.log(err);
//     }else{
//         console.log(res);
//     }
// })
export default db;
// db.query("update todo set content='hello world' where id=8",(err,res)=>{
//     if (err){
//         console.log(err)
//     }else{
//         console.log(res)
//     }
// } )
// db.query("delete from todo where id =5 ",(err,res)=>{
//     if(err){
//         console.log(err);

//     }else{
//         console.log(err)
//     }
// })

// db.query(
//     "INSERT INTO todo (title) VALUES ($1) RETURNING *",
//     ["drink water"], // ✅ Use parameterized queries to prevent SQL injection
//     (err, res) => {
//         if (err) {
//             console.error("Error inserting data:", err);
//         } else {
//             console.log("Inserted row:", res.rows[0]); // ✅ Print inserted row
//         }
//         db.end();
//     }
// );


// db.query("DELETE FROM todo WHERE id = 9",(err,res)=>{
//     if (err){
//         console.log(err); }
//         else{
//             console.log(res.rows)
//         }
//         db.end()
//     })

    
// db.query("update todo set title='driking water' where id= 4" ,(err,res)=>{
//     if (err){
//         console.log(err); }
//         else{
//             console.log(res.rows)
//         }
//         db.end()
//     })
// db.query("Select * from todo",(err,res)=>{
//     if (err){
//         console.log(err); }
//         else{
//             console.log(res.rows)
//         }
//         db.end()
//     })
// db.query("insert into todo (content,title) values('healthy foods only','cook food')",(err,res)=>{
//     if (err){
//         console.log(err); }
//         else{
//             console.log(res.rows)
//         }
//         db.end()
//     })