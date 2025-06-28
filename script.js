// 전역 변수
let statusData = null;
let summaryData = null;
let hiddenGemsData = null;
let contentGapsData = null;
let broadcastData = null;

// 현재 활성 페이지
let currentPage = 'dashboard';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
async function initializeApp() {
    console.log('Media Compass 프로토타입 초기화 중...');
    
    // 슬라이더 이벤트 리스너 추가
    setupSliderListeners();
    
    // 데이터 로드 (동기 방식으로 변경)
    loadAllData();
    
    // 대시보드 데이터 로드
    loadDashboardData();
    
    console.log('초기화 완료!');
}

// 모든 데이터 로드 (CORS 문제 해결: 직접 변수 사용)
function loadAllData() {
    try {
        // data.js에서 로드된 전역 변수 사용
        statusData = mockStatusData;
        summaryData = mockSummaryData;
        hiddenGemsData = mockHiddenGemsData;
        contentGapsData = mockContentGapsData;
        broadcastData = mockBroadcastData;
        
        console.log('모든 데이터 로드 완료');
        console.log('- 상태 데이터:', statusData ? '✓' : '✗');
        console.log('- 요약 데이터:', summaryData ? '✓' : '✗');
        console.log('- Hidden Gems:', hiddenGemsData ? '✓' : '✗');
        console.log('- Content Gaps:', contentGapsData ? '✓' : '✗');
        console.log('- 방송 데이터:', broadcastData ? '✓' : '✗');
    } catch (error) {
        console.error('데이터 로드 실패:', error);
    }
}

// 페이지 전환
function showPage(pageId) {
    // 모든 페이지 숨기기
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // 선택된 페이지 보이기
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('fade-in');
    }
    
    // 네비게이션 버튼 상태 업데이트
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('nav-active', 'bg-blue-600', 'text-white');
        btn.classList.add('text-gray-600', 'hover:bg-gray-100');
    });
    
    const activeBtn = event.target;
    activeBtn.classList.add('nav-active', 'bg-blue-600', 'text-white');
    activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
    
    currentPage = pageId;
    
    // 페이지별 데이터 로드
    switch(pageId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'hidden-gems':
            loadHiddenGemsPage();
            break;
        case 'content-gaps':
            loadContentGapsPage();
            break;
        case 'data-viewer':
            loadDataViewerPage();
            break;
    }
}

// 대시보드 데이터 로드
function loadDashboardData() {
    if (!statusData || !summaryData) {
        console.log('데이터가 아직 로드되지 않았습니다.');
        return;
    }
    
    // 시스템 상태 카드 생성
    createStatusCards();
    
    // 데이터 현황 업데이트
    updateDataSummary();
}

// 시스템 상태 카드 생성
function createStatusCards() {
    const container = document.getElementById('status-cards');
    
    const cards = [
        {
            title: 'API 서버',
            status: getStatusType(statusData.api_status),
            description: `v${statusData.version} • ${statusData.environment}`,
            value: formatUptime(statusData.uptime_seconds)
        },
        {
            title: '데이터베이스',
            status: getStatusType(statusData.database_status),
            description: 'Neon PostgreSQL',
            value: statusData.services.neon_db === 'connected' ? '연결됨' : '오프라인'
        },
        {
            title: 'KCC API',
            status: getStatusType(statusData.services.kcc_api),
            description: '공공데이터 포털',
            value: statusData.services.kcc_api || '알 수 없음'
        },
        {
            title: '분석 엔진',
            status: getStatusType(statusData.services.analysis_engine),
            description: 'AI 분석 시스템',
            value: statusData.services.analysis_engine || '알 수 없음'
        }
    ];
    
    container.innerHTML = cards.map(card => `
        <div class="border rounded-lg p-4 status-${card.status}">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    ${getStatusIcon(card.status)}
                    <div>
                        <h3 class="font-semibold text-gray-800">${card.title}</h3>
                        <p class="text-sm text-gray-600">${getStatusText(card.status)}</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-lg font-bold text-gray-800">${card.value}</div>
                </div>
            </div>
            <p class="mt-2 text-sm text-gray-600">${card.description}</p>
        </div>
    `).join('');
}

// 데이터 현황 업데이트
function updateDataSummary() {
    document.getElementById('data-summary').classList.remove('hidden');
    
    // 데이터 카운트 업데이트
    document.getElementById('broadcast-count').textContent = summaryData.data_counts.broadcast_industry.toLocaleString();
    document.getElementById('ki-count').textContent = summaryData.data_counts.ki_viewer_index.toLocaleString();
    document.getElementById('usage-count').textContent = summaryData.data_counts.media_usage_behavior.toLocaleString();
    
    // KI 통계 업데이트
    document.getElementById('avg-score').textContent = summaryData.ki_statistics.average_score;
    document.getElementById('max-score').textContent = summaryData.ki_statistics.max_score;
    document.getElementById('min-score').textContent = summaryData.ki_statistics.min_score;
    document.getElementById('high-quality').textContent = summaryData.ki_statistics.high_quality_programs.toLocaleString();
    
    // 마지막 업데이트 시간
    document.getElementById('last-updated').textContent = new Date(summaryData.last_updated).toLocaleString('ko-KR');
}

// Hidden Gems 페이지 로드
function loadHiddenGemsPage() {
    if (!hiddenGemsData) return;
    
    // 분석 결과 표시
    displayHiddenGems(hiddenGemsData.hidden_gems);
}

// Hidden Gems 분석 실행
function analyzeHiddenGems() {
    const minKiScore = document.getElementById('min-ki-score').value;
    const maxViewership = document.getElementById('max-viewership').value;
    const qualityWeight = document.getElementById('quality-weight').value;
    
    // 조건에 맞는 Hidden Gems 필터링
    const filteredGems = hiddenGemsData.hidden_gems.filter(gem => 
        gem.ki_score >= minKiScore && gem.viewership_rating <= maxViewership
    );
    
    // 결과 표시
    displayHiddenGems(filteredGems);
    
    // 분석 결과 스크롤
    document.getElementById('hidden-gems-results').scrollIntoView({ behavior: 'smooth' });
}

// Hidden Gems 결과 표시
function displayHiddenGems(gems) {
    const container = document.getElementById('gems-list');
    
    if (!gems || gems.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">조건에 맞는 Hidden Gems가 없습니다.</p>';
        return;
    }
    
    container.innerHTML = gems.map(gem => `
        <div class="border border-gray-200 rounded-lg p-6 card-hover">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">${gem.program_name}</h3>
                    <p class="text-sm text-gray-600">${gem.channel} • ${gem.genre} • ${gem.air_time}</p>
                </div>
                <div class="text-right">
                    <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full ${getQualityBadgeClass(gem.quality_rank)}">
                        ${gem.quality_rank}급
                    </span>
                </div>
            </div>
            
            <p class="text-gray-700 mb-4">${gem.description}</p>
            
            <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="text-center">
                    <p class="text-sm text-gray-600">KI 점수</p>
                    <p class="text-xl font-bold text-blue-600">${gem.ki_score}</p>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-600">시청률</p>
                    <p class="text-xl font-bold text-purple-600">${gem.viewership_rating}%</p>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-600">Hidden Gem 점수</p>
                    <p class="text-xl font-bold text-green-600">${gem.hidden_gem_score}</p>
                </div>
            </div>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p class="text-sm font-medium text-yellow-800">분석 의견</p>
                <p class="text-sm text-yellow-700">${gem.reason}</p>
            </div>
        </div>
    `).join('');
}

// Content Gap 페이지 로드
function loadContentGapsPage() {
    if (!contentGapsData) return;
    
    // 차트 생성
    createRegionalGapChart();
    createGenreSupplyChart();
    
    // Content Gap 상세 결과 표시
    displayContentGaps(contentGapsData.content_gaps);
}

// 지역별 Content Gap 차트
function createRegionalGapChart() {
    const ctx = document.getElementById('regional-gap-chart').getContext('2d');
    
    const topGaps = contentGapsData.content_gaps.slice(0, 10);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topGaps.map(gap => gap.region),
            datasets: [{
                label: 'Gap Score',
                data: topGaps.map(gap => gap.gap_score),
                backgroundColor: topGaps.map(gap => {
                    if (gap.gap_score > 60) return 'rgba(239, 68, 68, 0.8)';
                    if (gap.gap_score > 50) return 'rgba(245, 158, 11, 0.8)';
                    return 'rgba(34, 197, 94, 0.8)';
                }),
                borderColor: topGaps.map(gap => {
                    if (gap.gap_score > 60) return 'rgba(239, 68, 68, 1)';
                    if (gap.gap_score > 50) return 'rgba(245, 158, 11, 1)';
                    return 'rgba(34, 197, 94, 1)';
                }),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Gap Score (%)'
                    }
                }
            }
        }
    });
}

// 장르별 수요-공급 차트
function createGenreSupplyChart() {
    const ctx = document.getElementById('genre-supply-chart').getContext('2d');
    
    const genreData = {};
    contentGapsData.content_gaps.forEach(gap => {
        if (!genreData[gap.genre]) {
            genreData[gap.genre] = { demand: 0, supply: 0, count: 0 };
        }
        genreData[gap.genre].demand += gap.demand_score;
        genreData[gap.genre].supply += gap.supply_score;
        genreData[gap.genre].count += 1;
    });
    
    const genres = Object.keys(genreData);
    const demandData = genres.map(genre => genreData[genre].demand / genreData[genre].count);
    const supplyData = genres.map(genre => genreData[genre].supply / genreData[genre].count);
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: genres,
            datasets: [{
                label: '수요',
                data: demandData,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
            }, {
                label: '공급',
                data: supplyData,
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Content Gap 상세 결과 표시
function displayContentGaps(gaps) {
    const container = document.getElementById('gaps-list');
    
    container.innerHTML = gaps.slice(0, 10).map(gap => `
        <div class="border border-gray-200 rounded-lg p-6 card-hover">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">${gap.region} - ${gap.genre}</h3>
                    <p class="text-sm text-gray-600">우선순위: ${gap.priority_rank}위 • 긴급도: ${gap.urgency}</p>
                </div>
                <div class="text-right">
                    <span class="text-2xl font-bold ${getGapScoreColor(gap.gap_score)}">${gap.gap_score.toFixed(1)}%</span>
                    <p class="text-sm text-gray-600">Gap Score</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p class="text-sm text-gray-600">수요 점수</p>
                    <div class="flex items-center space-x-2">
                        <div class="flex-1 bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${gap.demand_score}%"></div>
                        </div>
                        <span class="text-sm font-medium">${gap.demand_score.toFixed(1)}</span>
                    </div>
                </div>
                <div>
                    <p class="text-sm text-gray-600">공급 점수</p>
                    <div class="flex items-center space-x-2">
                        <div class="flex-1 bg-gray-200 rounded-full h-2">
                            <div class="bg-green-600 h-2 rounded-full" style="width: ${gap.supply_score}%"></div>
                        </div>
                        <span class="text-sm font-medium">${gap.supply_score.toFixed(1)}</span>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p class="text-sm text-gray-600">잠재 시청자</p>
                    <p class="text-lg font-bold text-purple-600">${gap.potential_audience.toLocaleString()}명</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">현재/권장 프로그램</p>
                    <p class="text-lg font-bold text-orange-600">${gap.current_programs}개 → ${gap.recommended_programs}개</p>
                </div>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p class="text-sm font-medium text-blue-800">기회 요소</p>
                <p class="text-sm text-blue-700">${gap.gap_analysis.opportunity}</p>
            </div>
        </div>
    `).join('');
}

// 데이터 뷰어 페이지 로드
function loadDataViewerPage() {
    if (!broadcastData) return;
    
    // 필터 옵션 설정
    setupFilters();
    
    // 데이터 테이블 표시
    displayDataTable(broadcastData.programs);
}

// 필터 옵션 설정
function setupFilters() {
    const channels = [...new Set(broadcastData.programs.map(p => p.channel))];
    const genres = [...new Set(broadcastData.programs.map(p => p.genre))];
    
    const channelSelect = document.getElementById('filter-channel');
    const genreSelect = document.getElementById('filter-genre');
    
    channelSelect.innerHTML = '<option value="">전체</option>' + 
        channels.map(channel => `<option value="${channel}">${channel}</option>`).join('');
        
    genreSelect.innerHTML = '<option value="">전체</option>' + 
        genres.map(genre => `<option value="${genre}">${genre}</option>`).join('');
}

// 데이터 필터링
function filterData() {
    const searchTerm = document.getElementById('search-program').value.toLowerCase();
    const channelFilter = document.getElementById('filter-channel').value;
    const genreFilter = document.getElementById('filter-genre').value;
    
    let filteredData = broadcastData.programs.filter(program => {
        const matchesSearch = program.program_name.toLowerCase().includes(searchTerm);
        const matchesChannel = !channelFilter || program.channel === channelFilter;
        const matchesGenre = !genreFilter || program.genre === genreFilter;
        
        return matchesSearch && matchesChannel && matchesGenre;
    });
    
    displayDataTable(filteredData);
}

// 데이터 테이블 표시
function displayDataTable(programs) {
    const tbody = document.getElementById('data-table-body');
    
    tbody.innerHTML = programs.map(program => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${program.program_name}</div>
                <div class="text-sm text-gray-500">${program.air_time}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${program.channel}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${program.genre}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-blue-600">${program.ki_score}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-purple-600">${program.viewership_rating}%</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getQualityBadgeClass(program.quality_rating)}">
                    ${program.quality_rating}
                </span>
            </td>
        </tr>
    `).join('');
}

// 슬라이더 이벤트 리스너 설정
function setupSliderListeners() {
    // KI 점수 슬라이더
    const kiSlider = document.getElementById('min-ki-score');
    const kiValue = document.getElementById('ki-score-value');
    if (kiSlider && kiValue) {
        kiSlider.addEventListener('input', function() {
            kiValue.textContent = this.value;
        });
    }
    
    // 시청률 슬라이더
    const viewershipSlider = document.getElementById('max-viewership');
    const viewershipValue = document.getElementById('viewership-value');
    if (viewershipSlider && viewershipValue) {
        viewershipSlider.addEventListener('input', function() {
            viewershipValue.textContent = this.value;
        });
    }
    
    // 품질 가중치 슬라이더
    const weightSlider = document.getElementById('quality-weight');
    const weightValue = document.getElementById('weight-value');
    if (weightSlider && weightValue) {
        weightSlider.addEventListener('input', function() {
            weightValue.textContent = this.value;
        });
    }
}

// 유틸리티 함수들
function getStatusType(status) {
    switch(status?.toLowerCase()) {
        case 'operational':
        case 'connected':
        case 'ready':
            return 'online';
        case 'offline':
        case 'disconnected':
            return 'offline';
        default:
            return 'warning';
    }
}

function getStatusIcon(status) {
    switch(status) {
        case 'online':
            return '<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        case 'offline':
            return '<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        case 'warning':
            return '<svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>';
        default:
            return '<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'online': return '정상';
        case 'offline': return '오프라인';
        case 'warning': return '주의';
        default: return '알 수 없음';
    }
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}일 ${hours}시간`;
    if (hours > 0) return `${hours}시간 ${minutes}분`;
    return `${minutes}분`;
}

function getQualityBadgeClass(quality) {
    switch(quality) {
        case 'S': return 'bg-purple-100 text-purple-800';
        case 'A+': return 'bg-blue-100 text-blue-800';
        case 'A': return 'bg-green-100 text-green-800';
        case 'B': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getGapScoreColor(score) {
    if (score > 60) return 'text-red-600';
    if (score > 50) return 'text-orange-600';
    return 'text-green-600';
}

// 모바일 네비게이션 함수들
function toggleMobileNav() {
    const menu = document.getElementById('mobile-nav-menu');
    const overlay = document.getElementById('mobile-nav-overlay');
    
    menu.classList.add('active');
    overlay.classList.add('active');
}

function closeMobileNav() {
    const menu = document.getElementById('mobile-nav-menu');
    const overlay = document.getElementById('mobile-nav-overlay');
    
    menu.classList.remove('active');
    overlay.classList.remove('active');
}

function showPageMobile(pageId) {
    showPage(pageId);
    closeMobileNav();
}

// 전역 함수로 내보내기 (HTML에서 호출하기 위해)
window.showPage = showPage;
window.loadDashboardData = loadDashboardData;
window.analyzeHiddenGems = analyzeHiddenGems;
window.filterData = filterData;
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
window.showPageMobile = showPageMobile;