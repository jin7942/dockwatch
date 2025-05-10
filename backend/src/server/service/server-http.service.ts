// interface 정의
import { SysInfoVo, SysNetworkInfoVo, DiskUsageByMountVo } from '../dto/server-http.vo';
import { ResponseVo, AgentRes } from '../../common/types/response.vo';
import { agent } from '../../common/middleware/agent-api';

/**
 * 서버 서비스 클래스
 */
export class ServerService {
    /**
     * 서버 기본 정보 조회 함수
     * @returns 서버 기본 정보(cpu, memory, disk)를 담은 SysInfoVo 객체
     */
    public getSysInfo = async (): Promise<AgentRes<SysInfoVo>> => {
        const res = await agent.get<ResponseVo<SysInfoVo>>('/api/server/info');
        return {
            status: res.status,
            data: res.data,
        };
    };

    /**
     * 서버 네트워크 인터페이스 정보
     * @returns  네트워크 정보가 담긴 배열
     */
    public getSysNetworkInfo = async (): Promise<AgentRes<SysNetworkInfoVo[]>> => {
        const res = await agent.get<ResponseVo<SysNetworkInfoVo[]>>(
            '/api/server/network-interfaces',
        );
        return {
            status: res.status,
            data: res.data,
        };
    };

    /**
     * 마운트별 디스크 사용량
     * @returns  마운트별 디스크 사용량 배열
     */
    public getDiskUsageByMount = async (): Promise<AgentRes<DiskUsageByMountVo[]>> => {
        const res = await agent.get<ResponseVo<DiskUsageByMountVo[]>>('/api/server/mount-disk');
        return {
            status: res.status,
            data: res.data,
        };
    };

    /**
     * 컨테이너별 디스크 사용량 조회
     * @returns  컨테이너별 디스크 사용량 배열
     */
    public getDiskUsageByContainer = async (): Promise<AgentRes<DiskUsageByMountVo[]>> => {
        const res = await agent.get<ResponseVo<DiskUsageByMountVo[]>>('/api/server/container-disk');
        return {
            status: res.status,
            data: res.data,
        };
    };
}
