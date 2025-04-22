// 공통 리소스 정보 라벨 (예: 속도, 코어 수, IP 주소 등)
export interface ResourceInfo {
    label: string;
    value: string;
}

// 일반 리소스 차트 데이터 (CPU/메모리/디스크 등)
export interface ChartData {
    index: number;
    value: number;
}

// 네트워크 전용 차트 데이터 (TX/RX 분리)
export interface NetworkChartData {
    index: number;
    tx: number;
    rx: number;
}

// 테이블 컬럼 정보
export interface TableColumn {
    key: string;
    label: string;
}

// 테이블 데이터 구조
export interface TableData {
    columns: TableColumn[];
    rows: Record<string, string>[];
}

// CPU/메모리/디스크 등 일반 리소스 데이터 구조
export interface ResourceFullData {
    chart: ChartData[];
    info: ResourceInfo[];
    table: TableData;
}

// 네트워크 리소스 전용 데이터 구조
export interface NetworkResourceData {
    chart: NetworkChartData[];
    info: ResourceInfo[];
    table: TableData;
}

export interface DiskOverview {
    total: string; // 총 용량 (ex. "512 GB")
    used: string; // 사용량 (ex. "340 GB")
    available: string; // 남은 용량
    usagePercent: number;
}

export interface ContainerDiskUsage {
    containerName: string;
    used: string; // "12.3 GB"
    mountPath: string;
}

export interface MountDiskStatus {
    mount: string; // "/var"
    total: string;
    used: string;
    percent: string; // "66%"
    type: string; // "SSD" or "HDD"
}

export interface DiskBarData {
    mount: string;
    total: string;
    used: string;
    percent: string; // 예: '66%'
    type: string; // 예: 'SSD'
}
