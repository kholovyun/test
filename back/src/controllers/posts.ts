import express, {Router, Request, Response} from "express";
import { postsService } from "../services/postsService";

const router: Router = express.Router()

router.get('/', async (req: Request, resp: Response) => {
        const response = await postsService.getPosts()
        resp.send(response)

})
router.post('/', async (req: Request, resp: Response) => {
    const response = await postsService.addPost(req.body)
    resp.send(response)

})

export const postsRouter = router