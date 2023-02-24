import { Router } from 'express'
const router = Router();

router.get('/', async (_req, res, _next) => {

    console.log("start healthcheck");
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});
// export router with all routes included
export default router;