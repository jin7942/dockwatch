import { DashboardService } from '../service/dashboard-http.service';
import { Request, Response } from 'express';

export class DashboardController {
    private dashboardService = new DashboardService();

    /**
     * 대시보드 조회
     * - 서버 디스크 사용율
     * - 서버 가동시간 제공(반올림)
     *
     * @route GET /api/dashboard/info
     * @returns {SysUsageVo} 시스템 정보를 포함한 JSON 객체
     */
    public getSysUsage = async (req: Request, res: Response): Promise<void> => {
        const resData = await this.dashboardService.getSysUsage();
        res.status(resData.status).json(resData.data);
    };
}
