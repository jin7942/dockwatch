import { SysUsageVo } from '../dto/dashboard-http.vo';

import { ResponseVo, AgentRes } from '../../common/types/response.vo';
import { agent } from '../../common/middleware/agent-api';
export class DashboardService {
    /**
     * 대시보드용 시스템 자원 사용율 조회
     * - 디스크 사용율
     * - 서버 가동시간 제공(반올림)
     *
     * @returns 디스크 사용율과 서버 가동시간이 포함된 Vo 객체
     */
    public getSysUsage = async (): Promise<AgentRes<SysUsageVo>> => {
        const res = await agent.get<ResponseVo<SysUsageVo>>('/api/dashboard/info');
        return {
            status: res.status,
            data: res.data,
        };
    };
}
