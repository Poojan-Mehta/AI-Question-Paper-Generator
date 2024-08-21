import { Router, Request, Response} from 'express'
import { generatPaper } from '../controller/openAI'

const router = Router()

router.post('/generatePaper', generatPaper)

export default router