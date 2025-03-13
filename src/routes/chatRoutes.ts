import { Router } from 'express';
import { basicPrompt, structuredPrompt, streamResponse, streamStructuredResponse, functionCallingExample, contextualChat } from '../controllers/chatController';

const router = Router();

router.get('/basic', basicPrompt);
router.get('/structured', structuredPrompt);
router.post('/stream', streamResponse);
router.post('/stream-structured', streamStructuredResponse);
router.post('/function-call', functionCallingExample);
router.post('/context-chat', contextualChat);

export default router;