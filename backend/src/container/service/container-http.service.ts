import { ContainerVo } from '../dto/container-http.vo';
import { ContainerDto } from '../dto/container-http.dto';
import { CustomError } from '../../common/error/custom-error';
import { HttpStatus } from '../../common/types/http-status.enum';

import { ResponseVo, AgentRes } from '../../common/types/response.vo';
import { agent } from '../../common/middleware/agent-api';

export class ContainerService {
    /**
     * 컨테이너 리스트 조회
     * @returns  컨테이너 리스트
     */
    public getContainerList = async (): Promise<AgentRes<ContainerVo[]>> => {
        const res = await agent.get<ResponseVo<ContainerVo[]>>('/api/container/list');
        return {
            status: res.status,
            data: res.data,
        };
    };

    /**
     * 컨테이너 상세 정보 조회 함수
     *
     * @param containerId 컨테이너 ID
     * @returns 디스크 사용량이 포함된 컨테이너 객체
     */
    public getContainerInfo = async (containerId: string): Promise<AgentRes<ContainerVo>> => {
        const res = await agent.get<ResponseVo<ContainerVo>>(`/api/container/info`, {
            params: { containerId },
        });
        return {
            status: res.status,
            data: res.data,
        };
    };

    /**
     * 실행 중인 컨테이너 존재 여부 확인
     * @param containerId 확인할 컨테이너 ID
     * @returns 컨테이너가 실행중인지 여부 true / false
     */
    public getContainerStatus = async (containerId: string): Promise<AgentRes<boolean>> => {
        const res = await agent.get<ResponseVo<boolean>>(`/api/container/status`, {
            params: { containerId },
        });
        return {
            status: res.status,
            data: res.data,
        };
    };

    /**
     * 컨테이너 시작 함수
     * - 해당 컨테이너가 실행중인지 확인
     * - 실행중이면 에러 발생, 실행중이 아니면 컨테이너 실행 명령
     *
     * @param dto containerId를 포함한 dto 객체
     */
    public startContainer = async (dto: ContainerDto): Promise<void> => {
        const res: AgentRes<boolean> = await this.getContainerStatus(dto.id);

        if (!res.data) {
            throw new CustomError(HttpStatus.CONFLICT, '이미 실행중인 컨테이너입니다.');
        }

        await agent.post('/api/container/start', dto);
    };

    /**
     * 컨테이너 중지 함수
     * - 해당 컨테이너가 중지된 컨테이너 인지 확인
     * - 중지된 컨테이너면 에러 발생, 실행중이면 정지 명령
     *
     * @param dto containerId를 포함한 dto 객체
     */
    public stopContainer = async (dto: ContainerDto): Promise<void> => {
        const res: AgentRes<boolean> = await this.getContainerStatus(dto.id);

        if (!res.data) {
            throw new CustomError(HttpStatus.CONFLICT, '이미 중지된 컨테이너입니다.');
        }

        await agent.post('/api/container/stop', dto);
    };

    /**
     * 컨테이너 재시작 함수
     * - 해당 컨테이너가 실행중인지 확인
     * - 중지된 컨테이너라면 에러 발생, 실행중이면 재시작 명령
     *
     * @param dto containerId를 포함한 dto 객체
     */
    public reStartContainer = async (dto: ContainerDto): Promise<void> => {
        const res: AgentRes<boolean> = await this.getContainerStatus(dto.id);

        if (!res.data) {
            throw new CustomError(HttpStatus.CONFLICT, '재시작할 컨테이너가 실행 중이 아닙니다.');
        }

        await agent.post('/api/container/restart', dto);
    };
}
