





export interface TimeRange {
	from: string;
	to: string;
}

export interface MetricValue {
	timestamp: number;
	value: number;
}

export interface MetricSeries {
	name: string;
	values: MetricValue[];
	labels?: Record<string, string>;
}

export interface GrafanaDashboard {
	id: string;
	uid: string;
	title: string;
	url: string;
	tags: string[];
}

export interface GrafanaPanel {
	id: number;
	title: string;
	type: string;
	targets: any[];
	gridPos: {
		h: number;
		w: number;
		x: number;
		y: number;
	};
}

export interface GrafanaPanelData {
	series: MetricSeries[];
	timeRange: TimeRange;
}

export interface PrometheusQueryResult {
	status: 'success' | 'error';
	data: {
		resultType: 'matrix' | 'vector' | 'scalar' | 'string';
		result: any[];
	};
}

export interface TempoSearchResult {
	traces: TempoTrace[];
	total: number;
	limit: number;
	offset: number;
}

export interface TempoTrace {
	traceID: string;
	spans: TempoSpan[];
	duration: number;
	startTime: number;
	rootSpanName: string;
}

export interface TempoSpan {
	traceID: string;
	spanID: string;
	parentSpanID?: string;
	operationName: string;
	startTime: number;
	duration: number;
	tags: Record<string, any>;
	status: string;
}

export interface MetricQuery {
	query: string;
	range: TimeRange;
	step?: number;
}

export interface LokiQueryResult {
	status: 'success' | 'error';
	data: {
		resultType: 'streams' | 'matrix';
		result: any[];
	};
}

export interface LogEntry {
	timestamp: string;
	level: string;
	message: string;
	labels: Record<string, string>;
}


export interface EnhancedMetricsResponse {
	metrics: {
		performance: MetricSeries[];
		availability: MetricSeries[];
		errors: MetricSeries[];
		usage: MetricSeries[];
	};
	timeRange: TimeRange;
	lastUpdated: string;
}

export interface RealtimeMetrics {
	activeUsers: number;
	requestsPerSecond: number;
	errorRate: number;
	averageResponseTime: number;
	timestamp: number;
}


export interface SystemHealth {
	cpuUsage: number;
	memoryUsage: number;
	diskUsage: number;
	uptime: number;
	loadAverage: number[];
	networkIO?: {
		bytesIn: number;
		bytesOut: number;
	};
	networkLatency?: number;
	timestamp?: number;
}


export interface ClientMetrics {
	pageLoadTime: number;
	domContentLoaded?: number;
	firstContentfulPaint: number;
	largestContentfulPaint: number;
	firstInputDelay: number;
	cumulativeLayoutShift: number;
	timeToInteractive?: number;
	performanceScore?: number;
	timestamp?: number;
}


export interface AccessibilityMetrics {
	violationsCount?: number;
	passesCount?: number;
	incompleteCount?: number;
	contrastRatio?: number;
	keyboardNavigable?: boolean;
	screenReaderCompatible?: boolean;
	criticalIssues?: number;
	warningCount?: number;
	infoCount?: number;
	wcagCompliance?: {
		levelA: number;
		levelAA: number;
		levelAAA: number;
		overall: number;
		criteriaMet: string[];
		criteriaFailed: string[];
	};
	timestamp?: number;
}


export interface PerformanceMetrics {
	responseTime: number;
	throughput: number;
	errorRate: number;
	availability?: number;
	latency?: {
		p50: number;
		p95: number;
		p99: number;
	};
	activeConnections?: number;
	queueDepth?: number;
	timestamp?: number;
}


export interface EnhancedMetricsData {
	system: SystemHealth;
	client: ClientMetrics;
	accessibility: AccessibilityMetrics;
	performance: PerformanceMetrics;
	timestamp: number;
}
