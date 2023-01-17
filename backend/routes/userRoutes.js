import express from "express";
import data from "../data.js";
const userRouter=express.Router();
import expressAsyncHandler from 'express-async-handler';

userRouter.get('/',async(req,res)=>{
    res.send(data.users);
})

userRouter.post('/signin', expressAsyncHandler(async(req,res)=>{
    res.send({
        name:'Raina',
        regNumber:'120',

    });
    return;
}))

userRouter.post('/output/:id',expressAsyncHandler(async(req,res)=>{
    res.send(data.outputPrivateFailed);
    return;
}))


userRouter.get('/quest',async(req,res)=>{
    res.send(data.questions);
})

userRouter.get('/leaderboard',async(req,res)=>{
    res.send(data.leaderboard);
})

userRouter.get('/result',async(req,res)=>{
    res.send(data.results);
})

userRouter.get('/compile/:id',async(req,res)=>{
    //return the question that matches the respective questionId

    if(req.params.id==1)
    {
    res.send(data.questiondescription1);
    }
    if(req.params.id==2)
    {
        res.send(data.questiondescription2);
    }
    if(req.params.id==3)
    {
        res.send(data.questiondescription3);
    }
    
    
    return;
})


export default userRouter;
