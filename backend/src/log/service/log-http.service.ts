import { ContainerVo, LogFileContentVo, TreeNodeVo } from '../dto/log-http.vo';
import { ResponseVo, AgentRes } from '../../common/types/response.vo';
import { agent } from '../../common/middleware/agent-api';
import { LogPathDto } from '../dto/log-http.dto';

export class LogService {
    /**
     * 실행 중인 컨테이너 리스트 조회
     * - 중지된 컨테이너 제외
     * - docker ps 명령 사용
     *
     * @returns 실행 중인 컨테이너 배열
     */
    public getRunningContainers = async (): Promise<AgentRes<ContainerVo[]>> => {
        const res = await agent.get<ResponseVo<ContainerVo[]>>('/api/log/active');
        return {
            status: res.status,
            data: res.data,
        };
    };

    /**
     * 컨테이너 내 디렉터리 탐색 함수
     * - 1단계 깊이만 조회함
     * - /var/log 하위 경로만 허용
     * - 심볼릭 링크는 조회 불가
     *
     * @param dirPath 조회할 경로
     * @returns 디렉터리 객체 배열
     */
    public getDirectoryTree = async (dto: LogPathDto): Promise<AgentRes<TreeNodeVo[]>> => {
        const res = await agent.post<ResponseVo<TreeNodeVo[]>>(`/api/log/directory`, dto);
        return {
            status: res.status,
            data: res.data,
        };
    };

    /**
     * 파일 조회 함수
     *
     * @param filePath 파일 경로
     * @returns 전체 파일 내용
     */
    public getLogFile = async (dto: LogPathDto): Promise<AgentRes<LogFileContentVo[]>> => {
        const res = await agent.post<ResponseVo<LogFileContentVo[]>>(`/api/log/file`, dto);
        return {
            status: res.status,
            data: res.data,
        };
    };
}
