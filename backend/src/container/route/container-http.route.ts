import { Router } from 'express';
import { ContainerController } from '../controller/container-http.controller';
import { asyncHandler } from '../../common/middleware/async-handler';

const containerRouter: Router = Router();
const containerController: ContainerController = new ContainerController();

// GET /api/container/list
containerRouter.get('/list', asyncHandler(containerController.getContainerList));

// GET /api/container/info?containerId=xxxxx
containerRouter.get('/info', asyncHandler(containerController.getContainerInfo));

// GET /api/container/status?containerId=xxxxx
containerRouter.get('/status', asyncHandler(containerController.getContainerStatus));

/** 제어 API 보안코드 인증 필요 */
// POST /api/container/start
// containerRouter.post('/start', verifyControlKey, asyncHandler(containerController.startContainer));

// // POST /api/container/stop
// containerRouter.post('/stop', verifyControlKey, asyncHandler(containerController.startContainer));

// // POST /api/container/restart
// containerRouter.post(
//     '/restart',
//     verifyControlKey,
//     asyncHandler(containerController.reStartContainer),
// );

export { containerRouter };
