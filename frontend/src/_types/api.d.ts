// ====================
// 공통 타입
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
