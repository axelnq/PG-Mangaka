import { Router } from "express";
import Chapter from "../classes/Chapter";
import User from "../classes/User";
import { db } from "../app";

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


commentsRouter.post("/addComent", async (req, res) => {

    const { idChapter, username, comment } = req.body;

    const commentUser = `${username}/@/${comment}`

    if (!(idChapter && username && comment)) return res.send({ message: "Some necessary information is missing" })

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
});


commentsRouter.put("/admin/deleteComment", async (req, res) => {

    const { idChapter, username, comment } = req.body;

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

})