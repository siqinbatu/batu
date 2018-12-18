const express=require("express");
const http=express();
const Db=require("./db.js");
const db=new Db("anli");
const bodyParser=require("body-parser");
http.use(bodyParser.urlencoded({extended:false}));

http.listen(8080,()=>{
	console.log("run");
})

http.use(express.static("./public"));

//获取所有数据
http.get("/msg",(req,res)=>{
	db.find("menu",{},(err,data)=>{
		res.send(data);
	})
})

//添加一条数据
http.post("/add",(req,res)=>{
	db.insertOne("menu",req.body,(err,data)=>{
		res.send("添加一条数据");
	})
});

//删除一条数据
http.get("/del/:id",(req,res)=>{
	db.deleteById("menu",req.params.id,(err,data)=>{
		res.send("删除一条数据")
	})
})

//修改一条数据
http.get("/update",(req,res)=>{
	db.findById("menu",req.params.id,(err,data)=>{
		if(err){
			res.send("找不到这条数据")
		}else{
			data.succ=1;
			db.updateById("menu",req.params.id,data,(err,data)=>{
				res.send("已修改");					
			})
			
		}
		
	})
})

