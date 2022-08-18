import { Router } from "express";
import Chapter from "../classes/Chapter";
import User from "../classes/User";
import { db } from "../app";
import { isAuthenticated } from "./auth";

export const commentsRouter = Router();


commentsRouter.get("/getComments/:idChapter", async (req, res) => {

    const { idChapter } = req.params;
    let usernameAndComments: any = [];

    const comments = await db.chapter.findUnique({
        where: { id: Number(idChapter) },
        select: { comments: true }
    });

    if (!comments) return res.send({ message: 'Chapter without comments' })

    for (const userAndComent of comments.comments) {

        let [username, commentUser] = userAndComent.split('/@/')

        let userAvatar = await db.user.findUnique({
            where: { username: username },
            select: { avatar: true }
        })

        if (!userAvatar) return res.send({ message: 'User not found' })

        let userInfoAndComment = { username, commentUser, userAvatar }

        usernameAndComments.push(userInfoAndComment);

    }

    res.send(usernameAndComments);
});


commentsRouter.post("/addComent",isAuthenticated, async (req, res) => {

    const { idChapter,comment } = req.body;
    //@ts-ignore
    const username = req.user.username
    const commentUser = `${username}/@/${comment}`

    if (!(idChapter && username && comment)) return res.send({ message: "Some necessary information is missing" })
    
    try {
        const chapter2 = await db.chapter.findUnique({where: {
            id: Number(idChapter),
        }})
        if (!chapter2) return res.send({ message: "Chapter not found" })

        const chapter = await db.chapter.update({
            where: {
                id: Number(idChapter),
            },
            data: {
                comments: {
                    push: commentUser,
                },
            },
        })

        res.send({message:"Comment added"});
    } catch (error: any) {
        console.log(error)
        return res.status(400).send({ error: error.message })
    }

});


commentsRouter.put("/admin/deleteComment", isAuthenticated, async (req, res) => {

    const { idChapter, username, comment } = req.body;

    //@ts-ignore
    const admin = req.user
    //@ts-ignore
    if (!(admin.role === "ADMIN" || admin.role === "SUPERADMIN")) {
      return res.status(403).send({ message: "You don't have permission to do this, Are you trying to hack us?" });
    }
    try {
        const comments = await db.chapter.findUnique({
            where: { id: Number(idChapter) },
            select: { comments: true }
        });
    
        if (!comments) return res.send({ message: 'Comments not found' })
        let resComments = []
    
        let deleteComment = `${username}/@/${comment}`
    
        resComments = comments.comments.filter((comment:any) => comment !== deleteComment)
    
        await db.chapter.update({
            where: {
                id: Number(idChapter),
            },
            data: {
                comments: resComments,
            },
        })
    
        res.send({ message: "Comment deleted" })
    } catch (error) {
        return res.sendStatus(404).json({ message: error });
    }
    

})