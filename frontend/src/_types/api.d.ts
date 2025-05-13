// ====================
// 공통 타입
// ====================

/** 대시보드용 시스템 사용 요약 */
export interface SysUsageVo {
    /** 디스크 사용량(%) */
    diskUsage: number;
    /** 서버 가동시간(1시간 단위로 반올림) */
    uptimeHours: number;
}

/** 대시보드용 실시간 서버 사용량 */
export interface SysUsageStreamVo {
    /** CPU 사용률 (%) */
    cpuPercent: number;

    /** 메모리 사용률 (%) */
    memoryPercent: number;

    /** 네트워크 사용량 (수신 + 송신 합산, 단위: bps) */
    networkUsage: number;

    /** 실행중인 컨테이너 */
    runningContainer: RunningContainer[];
}

export interface RunningContainer extends ContainerVo {
    /** 사용율(cpu, mem) */
    usage: ContainerResourceStreamVo;
}
/** 컨테이너 정보 */
export interface ContainerVo {
    /** 컨테이너 ID (ex: '123abcd') */
    id: string;

    /** 컨테이너 이름 (ex: 'ray-server') */
    name: string;

    /** 도커 이미지 (ex: 'mysql:8.0') */
    image: string;

    /** 컨테이너 실행 시간 (ex: Up 12 days) */
    status: string;

    /** 바인딩된 포트 (ex: '0.0.0.0:1234 -> 5678/tcp') */
    ports: string;

    /** 사용중인 네트워크 (ex: 'jin-network') */
    network: string;

    /** 사용중인 디스크 용량(byte) */
    diskUsage?: number;
}

// ====================

export interface ResponseVo<T> {
    success: boolean;
    message: string;
    data: T;
}

// 기본 리소스 타입들
export interface ResourceInfo {
    label: string;
    value: string;
}

export interface ChartData {
    index: number;
    value: number;
}

export interface NetworkChartData {
    index: number;
    tx: number;
    rx: number;
}

export interface TableColumn {
    key: string;
    label: string;
}

export interface TableData {
    columns: TableColumn[];
    rows: Record<string, string>[];
}

export interface ResourceFullData {
    chart: ChartData[];
    info: ResourceInfo[];
    table: TableData;
}

export interface NetworkResourceData {
    chart: NetworkChartData[];
    info: ResourceInfo[];
    table: TableData;
}

export interface DiskOverview {
    total: string;
    used: string;
    available: string;
    usagePercent: number;
}

export interface ContainerDiskUsage {
    containerName: string;
    used: string;
    mountPath: string;
}

export interface MountDiskStatus {
    mount: string;
    total: string;
    used: string;
    percent: number;
    type: string;
}

export interface DiskBarData {
    mount: string;
    total: string;
    used: string;
    percent: number;
    type: string;
}

// ====================
// /api Response 타입
// ====================

// Dashboard
export type DashboardSummaryVo = ResponseVo<ResourceFullData>;

// Server
export type ServerInfoVo = ResponseVo<ResourceInfo[]>;
export type ServerNetInterfaceVo = ResponseVo<ResourceInfo[]>;
export type ContainerDiskVo = ResponseVo<ContainerDiskUsage[]>;
export type MountDiskVo = ResponseVo<MountDiskStatus[]>;

// Container
export type ContainerListVo = ResponseVo<
    {
        name: string;
        status: string;
        image: string;
    }[]
>;

// Proxy
export type ProxySettingListVo = ResponseVo<>;
