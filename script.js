// 전역 변수
let statusData = null;
let summaryData = null;
let hiddenGemsData = null;
let contentGapsData = null;
let broadcastData = null;

// 현재 활성 페이지
let currentPage = 'dashboard';

// 테마 및 언어 상태
let currentTheme = 'light';
let currentLanguage = 'ko';

// 다국어 지원 객체
const translations = {
    ko: {
        'status-connected': '실시간 연결',
        'nav-dashboard': '대시보드',
        'nav-hidden-gems': 'Hidden Gems',
        'nav-content-gap': 'Content Gap',
        'nav-data-viewer': '데이터 뷰어',
        'nav-about': 'About',
        'title-main': 'Media Compass',
        'subtitle-main': '미디어 생태계 블라인드스팟 탐지',
        'competition-text': '2025년 제1회 방송통신위원회 공공데이터 분석·활용 공모전 출품작'
    },
    en: {
        'status-connected': 'Live Connected',
        'nav-dashboard': 'Dashboard',
        'nav-hidden-gems': 'Hidden Gems',
        'nav-content-gap': 'Content Gap',
        'nav-data-viewer': 'Data Viewer',
        'nav-about': 'About',
        'title-main': 'Media Compass',
        'subtitle-main': 'Media Ecosystem Blind Spot Detection',
        'competition-text': '2025 1st Korea Communications Commission Public Data Analysis Contest Entry'
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
async function initializeApp() {
    console.log('Media Compass 프로토타입 초기화 중...');
    
    // 테마 초기화 (시스템 설정 감지)
    initializeTheme();
    
    // 언어 초기화
    initializeLanguage();
    
    // 접근성 초기화
    initializeAccessibility();
    
    // 슬라이더 이벤트 리스너 추가
    setupSliderListeners();
    
    // 데이터 로드 (동기 방식으로 변경)
    loadAllData();
    
    // 대시보드 데이터 로드
    loadDashboardData();
    
    // AI 추천 시스템 초기화
    initializeAIRecommendationEngine();
    
    // 고급 Hidden Gems 분석기 초기화
    initializeAdvancedHiddenGems();
    
    // 예측 분석 엔진 초기화
    initializePredictiveAnalysis();
    
    // 사용자 맞춤 대시보드 시스템 초기화
    initializeCustomDashboard();
    
    // 플랫폼 소개 패널 상태 복원
    restorePlatformIntroState();
    
    console.log('초기화 완료!');
}

// 접근성 초기화
function initializeAccessibility() {
    // 키보드 네비게이션 설정
    setupKeyboardNavigation();
    
    // 포커스 트랩 설정
    setupFocusTrap();
    
    // 스크린 리더 지원
    setupScreenReaderSupport();
}

// 키보드 네비게이션 설정
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Tab navigation for main navigation
        if (e.target.classList.contains('nav-btn')) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                navigateWithArrows(e.key === 'ArrowRight');
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
        
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-nav-menu');
            if (mobileMenu.classList.contains('active')) {
                closeMobileNav();
            }
        }
        
        // Alt + 숫자로 페이지 이동
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('[aria-controls="dashboard-page"]').click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('[aria-controls="hidden-gems-page"]').click();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('[aria-controls="content-gaps-page"]').click();
                    break;
                case '4':
                    e.preventDefault();
                    document.querySelector('[aria-controls="data-viewer-page"]').click();
                    break;
                case '5':
                    e.preventDefault();
                    document.querySelector('[aria-controls="about-page"]').click();
                    break;
            }
        }
    });
}

// 화살표 키로 네비게이션 이동
function navigateWithArrows(forward) {
    const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
    const currentIndex = navButtons.findIndex(btn => btn.getAttribute('aria-selected') === 'true');
    
    let nextIndex;
    if (forward) {
        nextIndex = currentIndex + 1 >= navButtons.length ? 0 : currentIndex + 1;
    } else {
        nextIndex = currentIndex - 1 < 0 ? navButtons.length - 1 : currentIndex - 1;
    }
    
    navButtons[nextIndex].focus();
}

// 포커스 트랩 설정 (모바일 메뉴용)
function setupFocusTrap() {
    const mobileMenu = document.getElementById('mobile-nav-menu');
    const mobileMenuButtons = mobileMenu.querySelectorAll('button, [tabindex="0"]');
    
    if (mobileMenuButtons.length === 0) return;
    
    const firstFocusableElement = mobileMenuButtons[0];
    const lastFocusableElement = mobileMenuButtons[mobileMenuButtons.length - 1];
    
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    });
}

// 스크린 리더 지원
function setupScreenReaderSupport() {
    // ARIA live region 생성
    const liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    // 페이지 변경 시 스크린 리더에 알림
    const announcePageChange = (pageName) => {
        const liveRegion = document.getElementById('aria-live-region');
        liveRegion.textContent = `${pageName} 페이지로 이동했습니다.`;
        
        // 내용 지우기
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
    
    // 로딩 상태 알림
    const announceLoadingState = (isLoading, message = '') => {
        const liveRegion = document.getElementById('aria-live-region');
        if (isLoading) {
            liveRegion.textContent = '데이터를 불러오는 중입니다...';
        } else {
            liveRegion.textContent = message || '데이터 로딩이 완료되었습니다.';
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    };
    
    // 전역으로 사용할 수 있도록 저장
    window.announcePageChange = announcePageChange;
    window.announceLoadingState = announceLoadingState;
}

// 테마 초기화
function initializeTheme() {
    // 저장된 테마 확인 또는 시스템 설정 감지
    const savedTheme = localStorage.getItem('theme');
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    currentTheme = savedTheme || (systemDarkMode ? 'dark' : 'light');
    applyTheme(currentTheme);
    
    // 시스템 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
        }
    });
}

// 언어 초기화
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language.startsWith('ko') ? 'ko' : 'en';
    
    currentLanguage = savedLanguage || browserLanguage;
    applyLanguage(currentLanguage);
}

// 테마 토글
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// 테마 적용
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');
    
    if (theme === 'dark') {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    } else {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    }
}

// 언어 토글
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
    applyLanguage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
}

// 언어 적용
function applyLanguage(language) {
    const langText = document.getElementById('lang-text');
    langText.textContent = language === 'ko' ? '한국어' : 'English';
    
    // 모든 다국어 요소 업데이트
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
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

// 페이지 전환 (애니메이션 강화)
function showPage(pageId) {
    const currentPageElement = document.querySelector('.page:not(.hidden)');
    const targetPage = document.getElementById(pageId + '-page');
    
    if (!targetPage) return;
    
    // 현재 페이지 페이드아웃
    if (currentPageElement) {
        currentPageElement.style.opacity = '0';
        currentPageElement.style.transform = 'translateY(-20px) scale(0.98)';
        
        setTimeout(() => {
            currentPageElement.classList.add('hidden');
            currentPageElement.style.opacity = '';
            currentPageElement.style.transform = '';
        }, 150);
    }
    
    // 새 페이지 페이드인
    setTimeout(() => {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('page-transition');
        
        // 카드들에 스태거 애니메이션 적용
        const cards = targetPage.querySelectorAll('.card-hover, .bg-white');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('stagger-item');
        });
        
        // 차트 컨테이너에 애니메이션 적용
        const charts = targetPage.querySelectorAll('.chart-container');
        charts.forEach((chart, index) => {
            setTimeout(() => {
                chart.classList.add('chart-animate');
            }, 300 + index * 200);
        });
        
    }, 150);
    
    // 네비게이션 버튼 상태 업데이트 (애니메이션 포함)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.style.transform = 'scale(1)';
        btn.classList.remove('nav-active', 'bg-blue-600', 'text-white');
        btn.classList.add('text-gray-600', 'hover:bg-gray-100');
    });
    
    const activeBtn = event.target.closest('.nav-btn');
    if (activeBtn) {
        activeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            activeBtn.style.transform = 'scale(1)';
            activeBtn.classList.add('nav-active', 'bg-blue-600', 'text-white');
            activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
        }, 100);
    }
    
    currentPage = pageId;
    
    // 네비게이션 버튼 ARIA 상태 업데이트
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
    });
    
    const currentActiveBtn = document.querySelector(`[aria-controls="${pageId}-page"]`);
    if (currentActiveBtn) {
        currentActiveBtn.setAttribute('aria-selected', 'true');
        currentActiveBtn.setAttribute('tabindex', '0');
    }
    
    // 페이지 이름 가져오기 및 스크린 리더 알림
    const pageNames = {
        'dashboard': '대시보드',
        'hidden-gems': 'Hidden Gems',
        'content-gaps': 'Content Gap',
        'data-viewer': '데이터 뷰어',
        'about': 'About'
    };
    
    const pageName = pageNames[pageId] || pageId;
    if (window.announcePageChange) {
        window.announcePageChange(pageName);
    }
    
    // 페이지별 데이터 로드 (지연 실행으로 애니메이션과 조화)
    setTimeout(() => {
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
    }, 300);
}

// 대시보드 데이터 로드
function loadDashboardData() {
    if (!statusData || !summaryData) {
        console.log('데이터가 아직 로드되지 않았습니다.');
        return;
    }
    
    // 시스템 상태 카드 생성 (플랫폼 소개로 교체됨)
    // createStatusCards();
    
    // 데이터 현황 업데이트
    updateDataSummary();
    
    // 맞춤 대시보드 버튼 추가
    setTimeout(enhanceDashboardWithCustomButton, 100);
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

// 데이터 현황 업데이트 (카운팅 애니메이션 포함)
function updateDataSummary() {
    document.getElementById('data-summary').classList.remove('hidden');
    
    // 숫자 카운팅 애니메이션
    animateCounter('broadcast-count', summaryData.data_counts.broadcast_industry);
    animateCounter('ki-count', summaryData.data_counts.ki_viewer_index);
    animateCounter('usage-count', summaryData.data_counts.media_usage_behavior);
    animateCounter('high-quality', summaryData.ki_statistics.high_quality_programs);
    
    // KI 통계 업데이트 (소수점 있는 값들)
    animateFloatCounter('avg-score', parseFloat(summaryData.ki_statistics.average_score));
    animateFloatCounter('max-score', parseFloat(summaryData.ki_statistics.max_score));
    animateFloatCounter('min-score', parseFloat(summaryData.ki_statistics.min_score));
    
    // 마지막 업데이트 시간
    document.getElementById('last-updated').textContent = new Date(summaryData.last_updated).toLocaleString('ko-KR');
}

// 숫자 카운팅 애니메이션
function animateCounter(elementId, targetValue, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.classList.add('counter-animation');
    
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
            element.classList.remove('counter-animation');
        }
        element.textContent = Math.floor(currentValue).toLocaleString();
    }, 16);
}

// 소수점 있는 숫자 카운팅 애니메이션
function animateFloatCounter(elementId, targetValue, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.classList.add('counter-animation');
    
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
            element.classList.remove('counter-animation');
        }
        element.textContent = currentValue.toFixed(1);
    }, 16);
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
window.toggleTheme = toggleTheme;
window.toggleLanguage = toggleLanguage;

// ==========================================
// 고급 차트 시스템
// ==========================================

// Chart.js 플러그인 등록
if (typeof Chart !== 'undefined') {
    // Chart.js가 로드된 경우에만 등록
    try {
        Chart.register(
            Chart.CategoryScale,
            Chart.LinearScale,
            Chart.PointElement,
            Chart.LineElement,
            Chart.BarElement,
            Chart.Title,
            Chart.Tooltip,
            Chart.Legend
        );
    } catch (e) {
        console.log('Chart.js 플러그인 등록 중 오류:', e);
    }
}

// 차트 전역 설정
if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
    Chart.defaults.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
}

// 고급 차트 클래스
class AdvancedChart {
    constructor(canvasId, config) {
        this.canvasId = canvasId;
        this.config = config;
        this.chart = null;
        this.animationId = null;
        this.isInteractive = config.interactive || false;
        
        this.init();
    }
    
    init() {
        const canvas = document.getElementById(this.canvasId);
        if (!canvas) {
            console.error(`Canvas with ID ${this.canvasId} not found`);
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // 기본 차트 옵션 설정
        const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // 커스텀 범례 사용
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'var(--bg-card)',
                    titleColor: 'var(--text-primary)',
                    bodyColor: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutCubic'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        };
        
        // 인터랙티브 기능 추가
        if (this.isInteractive) {
            defaultOptions.plugins.zoom = {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x'
                }
            };
        }
        
        // 옵션 병합
        this.config.options = this.mergeDeep(defaultOptions, this.config.options || {});
        
        this.chart = new Chart(ctx, this.config);
        
        // 커스텀 범례 생성
        if (this.config.customLegend) {
            this.createCustomLegend();
        }
        
        // 차트 컨트롤 버튼 추가
        if (this.isInteractive) {
            this.addChartControls();
        }
    }
    
    // 딥 머지 유틸리티
    mergeDeep(target, source) {
        const result = { ...target };
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.mergeDeep(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    }
    
    // 커스텀 범례 생성
    createCustomLegend() {
        const container = document.getElementById(this.canvasId).parentElement;
        const legendContainer = document.createElement('div');
        legendContainer.className = 'chart-legend';
        
        this.chart.data.datasets.forEach((dataset, index) => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
                <div class="legend-color" style="background-color: ${dataset.backgroundColor || dataset.borderColor}"></div>
                <span>${dataset.label}</span>
            `;
            
            legendItem.addEventListener('click', () => {
                this.toggleDataset(index);
            });
            
            legendContainer.appendChild(legendItem);
        });
        
        container.appendChild(legendContainer);
    }
    
    // 데이터셋 토글
    toggleDataset(index) {
        const meta = this.chart.getDatasetMeta(index);
        meta.hidden = !meta.hidden;
        this.chart.update();
    }
    
    // 차트 컨트롤 추가
    addChartControls() {
        const container = document.getElementById(this.canvasId).parentElement;
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'zoom-controls';
        controlsContainer.innerHTML = `
            <button class="zoom-btn" onclick="advancedCharts['${this.canvasId}'].resetZoom()" title="확대/축소 리셋">
                ⌂
            </button>
            <button class="zoom-btn" onclick="advancedCharts['${this.canvasId}'].exportChart()" title="차트 내보내기">
                ↓
            </button>
        `;
        
        container.appendChild(controlsContainer);
    }
    
    // 확대/축소 리셋
    resetZoom() {
        if (this.chart.resetZoom) {
            this.chart.resetZoom();
        }
    }
    
    // 차트 내보내기
    exportChart() {
        const link = document.createElement('a');
        link.download = `${this.canvasId}-chart.png`;
        link.href = this.chart.toBase64Image();
        link.click();
    }
    
    // 데이터 업데이트 (애니메이션 포함)
    updateData(newData, animated = true) {
        this.chart.data = newData;
        this.chart.update(animated ? 'active' : 'none');
    }
    
    // 차트 파괴
    destroy() {
        if (this.chart) {
            this.chart.destroy();
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// 차트 인스턴스 저장소
window.advancedCharts = {};

// 실시간 차트 클래스
class RealtimeChart extends AdvancedChart {
    constructor(canvasId, config) {
        super(canvasId, config);
        this.isRealtime = true;
        this.updateInterval = config.updateInterval || 3000;
        this.maxDataPoints = config.maxDataPoints || 20;
        this.startRealtime();
    }
    
    startRealtime() {
        this.realtimeInterval = setInterval(() => {
            this.addRealtimeData();
        }, this.updateInterval);
    }
    
    addRealtimeData() {
        const now = new Date();
        const value = Math.random() * 100;
        
        // 데이터 추가
        this.chart.data.labels.push(now.toLocaleTimeString());
        this.chart.data.datasets[0].data.push(value);
        
        // 최대 데이터 포인트 수 제한
        if (this.chart.data.labels.length > this.maxDataPoints) {
            this.chart.data.labels.shift();
            this.chart.data.datasets[0].data.shift();
        }
        
        this.chart.update('none');
    }
    
    destroy() {
        super.destroy();
        if (this.realtimeInterval) {
            clearInterval(this.realtimeInterval);
        }
    }
}

// 고급 차트 생성 함수들
function createInteractiveLineChart(canvasId, data, options = {}) {
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    display: true,
                    grid: {
                        color: 'var(--border-color)',
                        lineWidth: 0.5
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'var(--border-color)',
                        lineWidth: 0.5
                    }
                }
            },
            ...options
        },
        interactive: true,
        customLegend: true
    };
    
    const chart = new AdvancedChart(canvasId, config);
    window.advancedCharts[canvasId] = chart;
    return chart;
}

function createAnimatedBarChart(canvasId, data, options = {}) {
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'var(--border-color)',
                        lineWidth: 0.5
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            },
            ...options
        },
        customLegend: true
    };
    
    const chart = new AdvancedChart(canvasId, config);
    window.advancedCharts[canvasId] = chart;
    return chart;
}

function createDoughnutChart(canvasId, data, options = {}) {
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            cutout: '60%',
            animation: {
                animateRotate: true,
                duration: 2000
            },
            ...options
        },
        customLegend: true
    };
    
    const chart = new AdvancedChart(canvasId, config);
    window.advancedCharts[canvasId] = chart;
    return chart;
}

function createPolarAreaChart(canvasId, data, options = {}) {
    const config = {
        type: 'polarArea',
        data: data,
        options: {
            animation: {
                duration: 2000,
                easing: 'easeInOutElastic'
            },
            ...options
        },
        customLegend: true
    };
    
    const chart = new AdvancedChart(canvasId, config);
    window.advancedCharts[canvasId] = chart;
    return chart;
}

function createRealtimeChart(canvasId, options = {}) {
    const data = {
        labels: [],
        datasets: [{
            label: '실시간 데이터',
            data: [],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'category',
                    display: true
                },
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            ...options
        },
        updateInterval: 2000,
        maxDataPoints: 15
    };
    
    const chart = new RealtimeChart(canvasId, config);
    window.advancedCharts[canvasId] = chart;
    return chart;
}

// 차트 색상 팔레트
const chartColorPalette = {
    primary: ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#ec4899'],
    gradient: [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ],
    dark: ['#1e293b', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6']
};

// 차트 데이터 생성 유틸리티
function generateChartData(labels, datasets) {
    return {
        labels: labels,
        datasets: datasets.map((dataset, index) => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor || chartColorPalette.primary[index % chartColorPalette.primary.length],
            borderColor: dataset.borderColor || chartColorPalette.primary[index % chartColorPalette.primary.length],
            borderWidth: dataset.borderWidth || 2
        }))
    };
}

// ==========================================
// AI 기반 추천 시스템
// ==========================================

class AIRecommendationEngine {
    constructor() {
        this.userPreferences = this.loadUserPreferences();
        this.viewingHistory = this.loadViewingHistory();
        this.programData = null;
        this.recommendations = [];
        this.similarityMatrix = new Map();
        
        // AI 모델 시뮬레이션을 위한 가중치
        this.featureWeights = {
            genre: 0.25,
            ki_score: 0.20,
            viewership: 0.15,
            time_slot: 0.15,
            channel: 0.10,
            recency: 0.10,
            user_rating: 0.05
        };
        
        this.init();
    }
    
    init() {
        console.log('AI 추천 엔진 초기화 중...');
        this.buildSimilarityMatrix();
        this.generateRecommendations();
    }
    
    // 사용자 선호도 로드
    loadUserPreferences() {
        const saved = localStorage.getItem('user_preferences');
        return saved ? JSON.parse(saved) : {
            preferredGenres: ['드라마', '다큐멘터리'],
            preferredTimeSlots: ['저녁 8시', '밤 10시'],
            preferredChannels: ['KBS1', 'EBS'],
            qualityThreshold: 70,
            viewershipPreference: 'low', // 'low', 'medium', 'high'
            discoveryMode: 'balanced' // 'conservative', 'balanced', 'adventurous'
        };
    }
    
    // 시청 기록 로드
    loadViewingHistory() {
        const saved = localStorage.getItem('viewing_history');
        return saved ? JSON.parse(saved) : [];
    }
    
    // 사용자 선호도 저장
    saveUserPreferences(preferences) {
        this.userPreferences = { ...this.userPreferences, ...preferences };
        localStorage.setItem('user_preferences', JSON.stringify(this.userPreferences));
        this.generateRecommendations();
    }
    
    // 시청 기록 추가
    addToViewingHistory(programId, rating = null) {
        const timestamp = new Date().toISOString();
        const entry = { programId, timestamp, rating };
        
        this.viewingHistory.unshift(entry);
        
        // 최근 100개만 유지
        if (this.viewingHistory.length > 100) {
            this.viewingHistory = this.viewingHistory.slice(0, 100);
        }
        
        localStorage.setItem('viewing_history', JSON.stringify(this.viewingHistory));
        this.generateRecommendations();
    }
    
    // 유사도 매트릭스 구축
    buildSimilarityMatrix() {
        if (!broadcastData || !broadcastData.programs) return;
        
        const programs = broadcastData.programs;
        
        programs.forEach((program1, i) => {
            programs.forEach((program2, j) => {
                if (i !== j) {
                    const similarity = this.calculateSimilarity(program1, program2);
                    const key = `${program1.id}-${program2.id}`;
                    this.similarityMatrix.set(key, similarity);
                }
            });
        });
    }
    
    // 두 프로그램 간 유사도 계산
    calculateSimilarity(prog1, prog2) {
        let similarity = 0;
        
        // 장르 유사도
        const genreSim = prog1.genre === prog2.genre ? 1 : 0;
        similarity += genreSim * this.featureWeights.genre;
        
        // KI 점수 유사도
        const kiDiff = Math.abs(prog1.ki_score - prog2.ki_score);
        const kiSim = Math.max(0, 1 - kiDiff / 50); // 50점 차이를 최대로 설정
        similarity += kiSim * this.featureWeights.ki_score;
        
        // 시청률 유사도
        const viewershipDiff = Math.abs(prog1.viewership_rating - prog2.viewership_rating);
        const viewershipSim = Math.max(0, 1 - viewershipDiff / 10); // 10% 차이를 최대로 설정
        similarity += viewershipSim * this.featureWeights.viewership;
        
        // 방송 시간대 유사도
        const timeSim = prog1.air_time === prog2.air_time ? 1 : 0;
        similarity += timeSim * this.featureWeights.time_slot;
        
        // 채널 유사도
        const channelSim = prog1.channel === prog2.channel ? 1 : 0.3;
        similarity += channelSim * this.featureWeights.channel;
        
        return similarity;
    }
    
    // 추천 생성
    generateRecommendations() {
        if (!broadcastData || !broadcastData.programs) {
            console.log('프로그램 데이터가 없어 추천을 생성할 수 없습니다.');
            return;
        }
        
        const programs = broadcastData.programs;
        const scores = new Map();
        
        programs.forEach(program => {
            let score = this.calculateRecommendationScore(program);
            scores.set(program.id, { program, score });
        });
        
        // 점수순으로 정렬하여 상위 10개 추천
        this.recommendations = Array.from(scores.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map(item => ({
                ...item.program,
                recommendationScore: item.score,
                recommendationReason: this.generateRecommendationReason(item.program, item.score)
            }));
        
        console.log('AI 추천 시스템이 새로운 추천을 생성했습니다:', this.recommendations.length);
    }
    
    // 추천 점수 계산
    calculateRecommendationScore(program) {
        let score = 0;
        
        // 기본 품질 점수 (KI 점수 기반)
        score += (program.ki_score / 100) * 40;
        
        // 사용자 선호 장르 보너스
        if (this.userPreferences.preferredGenres.includes(program.genre)) {
            score += 20;
        }
        
        // 사용자 선호 채널 보너스
        if (this.userPreferences.preferredChannels.includes(program.channel)) {
            score += 15;
        }
        
        // 사용자 선호 시간대 보너스
        if (this.userPreferences.preferredTimeSlots.includes(program.air_time)) {
            score += 10;
        }
        
        // 시청률 기반 점수 (사용자 선호도에 따라)
        const viewershipScore = this.calculateViewershipScore(program.viewership_rating);
        score += viewershipScore;
        
        // 다양성 보너스 (Hidden Gems 발굴)
        if (program.viewership_rating < 3 && program.ki_score > 80) {
            score += 15; // Hidden Gems 보너스
        }
        
        // 시청 이력 기반 점수
        const historyScore = this.calculateHistoryBasedScore(program);
        score += historyScore;
        
        // 발견 모드에 따른 조정
        if (this.userPreferences.discoveryMode === 'adventurous') {
            // 모험적 모드: 낮은 시청률 프로그램에 보너스
            if (program.viewership_rating < 2) score += 10;
        } else if (this.userPreferences.discoveryMode === 'conservative') {
            // 보수적 모드: 높은 시청률 프로그램에 보너스
            if (program.viewership_rating > 5) score += 10;
        }
        
        return Math.max(0, Math.min(100, score)); // 0-100 범위로 제한
    }
    
    // 시청률 점수 계산
    calculateViewershipScore(viewership) {
        switch (this.userPreferences.viewershipPreference) {
            case 'low': // Hidden Gems 선호
                return Math.max(0, 10 - viewership * 2);
            case 'high': // 인기 프로그램 선호
                return Math.min(10, viewership);
            default: // 균형
                return 5;
        }
    }
    
    // 시청 이력 기반 점수
    calculateHistoryBasedScore(program) {
        let score = 0;
        const recentHistory = this.viewingHistory.slice(0, 20); // 최근 20개
        
        recentHistory.forEach(entry => {
            // 시청한 프로그램과의 유사도 계산
            const watchedProgram = broadcastData.programs.find(p => p.id === entry.programId);
            if (watchedProgram) {
                const similarity = this.calculateSimilarity(program, watchedProgram);
                score += similarity * 5;
                
                // 사용자가 높은 평점을 준 프로그램과 유사하면 추가 보너스
                if (entry.rating && entry.rating >= 4) {
                    score += similarity * 3;
                }
            }
        });
        
        return Math.min(15, score); // 최대 15점
    }
    
    // 추천 이유 생성
    generateRecommendationReason(program, score) {
        const reasons = [];
        
        if (this.userPreferences.preferredGenres.includes(program.genre)) {
            reasons.push(`선호하시는 ${program.genre} 장르`);
        }
        
        if (this.userPreferences.preferredChannels.includes(program.channel)) {
            reasons.push(`자주 시청하시는 ${program.channel} 채널`);
        }
        
        if (program.ki_score > 85) {
            reasons.push('높은 품질 지수 (KI Score)');
        }
        
        if (program.viewership_rating < 3 && program.ki_score > 80) {
            reasons.push('숨겨진 보석 프로그램');
        }
        
        if (this.hasRecentSimilarViewing(program)) {
            reasons.push('최근 시청 패턴과 유사');
        }
        
        return reasons.length > 0 ? reasons.join(', ') : '다양한 컨텐츠 발견을 위한 추천';
    }
    
    // 최근 시청 패턴과 유사한지 확인
    hasRecentSimilarViewing(program) {
        const recentHistory = this.viewingHistory.slice(0, 5);
        return recentHistory.some(entry => {
            const watchedProgram = broadcastData.programs.find(p => p.id === entry.programId);
            if (watchedProgram) {
                return this.calculateSimilarity(program, watchedProgram) > 0.7;
            }
            return false;
        });
    }
    
    // 추천 목록 반환
    getRecommendations(count = 10) {
        return this.recommendations.slice(0, count);
    }
    
    // 특정 프로그램과 유사한 프로그램 추천
    getSimilarPrograms(programId, count = 5) {
        if (!broadcastData || !broadcastData.programs) return [];
        
        const targetProgram = broadcastData.programs.find(p => p.id === programId);
        if (!targetProgram) return [];
        
        const similarities = [];
        
        broadcastData.programs.forEach(program => {
            if (program.id !== programId) {
                const similarity = this.calculateSimilarity(targetProgram, program);
                similarities.push({ program, similarity });
            }
        });
        
        return similarities
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, count)
            .map(item => ({
                ...item.program,
                similarityScore: item.similarity
            }));
    }
    
    // 학습 데이터 업데이트 (사용자 피드백 기반)
    updateMLModel(feedback) {
        // 실제 ML 모델의 경우 여기서 모델을 재훈련하거나 가중치를 업데이트
        // 현재는 가중치 미세 조정으로 시뮬레이션
        
        if (feedback.type === 'like') {
            // 선호도 증가
            const program = feedback.program;
            if (!this.userPreferences.preferredGenres.includes(program.genre)) {
                this.userPreferences.preferredGenres.push(program.genre);
            }
        } else if (feedback.type === 'dislike') {
            // 선호도 감소
            const program = feedback.program;
            const index = this.userPreferences.preferredGenres.indexOf(program.genre);
            if (index > -1 && this.userPreferences.preferredGenres.length > 1) {
                this.userPreferences.preferredGenres.splice(index, 1);
            }
        }
        
        this.saveUserPreferences(this.userPreferences);
        console.log('AI 모델이 사용자 피드백을 학습했습니다.');
    }
}

// AI 추천 엔진 인스턴스
let aiRecommendationEngine = null;

// AI 추천 엔진 초기화
function initializeAIRecommendation() {
    aiRecommendationEngine = new AIRecommendationEngine();
    console.log('AI 추천 시스템이 초기화되었습니다.');
}

// 추천 표시 함수
function displayAIRecommendations() {
    if (!aiRecommendationEngine) {
        initializeAIRecommendation();
    }
    
    const recommendations = aiRecommendationEngine.getRecommendations(6);
    const container = document.getElementById('ai-recommendations');
    
    if (!container) return;
    
    container.innerHTML = recommendations.map(program => `
        <div class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer" 
             onclick="viewProgramDetails('${program.id}')">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-gray-800 text-sm">${program.program_name}</h4>
                <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    ${Math.round(program.recommendationScore)}점
                </span>
            </div>
            <p class="text-xs text-gray-600 mb-2">${program.channel} • ${program.genre}</p>
            <p class="text-xs text-blue-600 mb-2">💡 ${program.recommendationReason}</p>
            <div class="flex justify-between text-xs text-gray-500">
                <span>KI: ${program.ki_score}</span>
                <span>시청률: ${program.viewership_rating}%</span>
            </div>
            <div class="mt-2 flex gap-1">
                <button onclick="event.stopPropagation(); likeProgramRecommendation('${program.id}')" 
                        class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100">
                    👍 좋아요
                </button>
                <button onclick="event.stopPropagation(); dislikeProgramRecommendation('${program.id}')" 
                        class="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">
                    👎 관심없음
                </button>
            </div>
        </div>
    `).join('');
}

// 프로그램 추천 피드백
function likeProgramRecommendation(programId) {
    const program = broadcastData.programs.find(p => p.id === programId);
    if (program && aiRecommendationEngine) {
        aiRecommendationEngine.updateMLModel({ type: 'like', program });
        aiRecommendationEngine.addToViewingHistory(programId, 5);
        displayAIRecommendations(); // 재표시
        
        if (window.announceLoadingState) {
            window.announceLoadingState(false, '추천이 업데이트되었습니다.');
        }
    }
}

function dislikeProgramRecommendation(programId) {
    const program = broadcastData.programs.find(p => p.id === programId);
    if (program && aiRecommendationEngine) {
        aiRecommendationEngine.updateMLModel({ type: 'dislike', program });
        displayAIRecommendations(); // 재표시
        
        if (window.announceLoadingState) {
            window.announceLoadingState(false, '추천이 업데이트되었습니다.');
        }
    }
}

// 프로그램 상세 보기
function viewProgramDetails(programId) {
    const program = broadcastData.programs.find(p => p.id === programId);
    if (program && aiRecommendationEngine) {
        aiRecommendationEngine.addToViewingHistory(programId);
        // 여기에 상세 정보 모달 표시 로직 추가 가능
        console.log('프로그램 상세 정보:', program);
    }
}

// ==========================================
// 고급 Hidden Gems 알고리즘
// ==========================================

class AdvancedHiddenGemsAnalyzer {
    constructor() {
        this.algorithms = {
            'quality_vs_popularity': this.qualityVsPopularityAlgorithm.bind(this),
            'trend_analysis': this.trendAnalysisAlgorithm.bind(this),
            'genre_based_discovery': this.genreBasedDiscoveryAlgorithm.bind(this),
            'time_slot_analysis': this.timeSlotAnalysisAlgorithm.bind(this),
            'multi_factor_scoring': this.multiFactorScoringAlgorithm.bind(this),
            'emerging_content': this.emergingContentAlgorithm.bind(this)
        };
        
        this.algorithmWeights = {
            'quality_vs_popularity': 0.25,
            'trend_analysis': 0.20,
            'genre_based_discovery': 0.15,
            'time_slot_analysis': 0.15,
            'multi_factor_scoring': 0.15,
            'emerging_content': 0.10
        };
        
        this.discoverySettings = {
            minKiScore: 70,
            maxViewership: 5.0,
            qualityWeight: 0.7,
            diversityBonus: 0.2,
            recencyBonus: 0.1,
            underexposureThreshold: 3.0,
            emergingContentMinScore: 75
        };
    }
    
    // 메인 Hidden Gems 분석 함수
    analyzeHiddenGems(filters = {}) {
        if (!broadcastData || !broadcastData.programs) {
            console.error('프로그램 데이터가 없습니다.');
            return [];
        }
        
        const programs = broadcastData.programs;
        const results = new Map();
        
        // 각 알고리즘별 분석 실행
        Object.entries(this.algorithms).forEach(([algorithmName, algorithmFunc]) => {
            const algorithmResults = algorithmFunc(programs, filters);
            const weight = this.algorithmWeights[algorithmName];
            
            algorithmResults.forEach(result => {
                const programId = result.program.id;
                
                if (!results.has(programId)) {
                    results.set(programId, {
                        program: result.program,
                        totalScore: 0,
                        algorithmScores: {},
                        reasons: new Set(),
                        confidence: 0
                    });
                }
                
                const existing = results.get(programId);
                existing.totalScore += result.score * weight;
                existing.algorithmScores[algorithmName] = result.score;
                existing.reasons.add(result.reason);
                existing.confidence += weight;
            });
        });
        
        // 최종 결과 정리 및 정렬
        const finalResults = Array.from(results.values())
            .map(item => ({
                ...item.program,
                hidden_gem_score: Math.round(item.totalScore * 10) / 10,
                confidence_level: Math.round(item.confidence * 100),
                discovery_reasons: Array.from(item.reasons),
                algorithm_breakdown: item.algorithmScores,
                discovery_category: this.categorizeHiddenGem(item)
            }))
            .filter(item => item.hidden_gem_score >= 60) // 최소 점수 필터
            .sort((a, b) => b.hidden_gem_score - a.hidden_gem_score)
            .slice(0, 20); // 상위 20개
        
        console.log(`고급 Hidden Gems 분석 완료: ${finalResults.length}개 발견`);
        return finalResults;
    }
    
    // 1. 품질 대비 인기도 알고리즘
    qualityVsPopularityAlgorithm(programs, filters) {
        return programs
            .filter(p => p.ki_score >= (filters.minKiScore || this.discoverySettings.minKiScore))
            .filter(p => p.viewership_rating <= (filters.maxViewership || this.discoverySettings.maxViewership))
            .map(program => {
                // 품질 대비 인기도 불균형 점수 계산
                const qualityIndex = program.ki_score / 100;
                const popularityIndex = program.viewership_rating / 20; // 20%를 최대로 정규화
                const imbalanceScore = qualityIndex - popularityIndex;
                
                // 점수 계산 (0-100)
                const score = Math.max(0, Math.min(100, imbalanceScore * 100 + 20));
                
                return {
                    program,
                    score,
                    reason: `높은 품질(KI ${program.ki_score}) 대비 낮은 인기도(${program.viewership_rating}%)`
                };
            })
            .filter(item => item.score >= 50);
    }
    
    // 2. 트렌드 분석 알고리즘
    trendAnalysisAlgorithm(programs, filters) {
        // 시뮬레이션: 시간대별 경쟁 분석
        const timeSlotCompetition = this.analyzeTimeSlotCompetition(programs);
        
        return programs
            .filter(p => p.viewership_rating <= 4.0)
            .map(program => {
                const timeSlot = program.air_time;
                const competition = timeSlotCompetition[timeSlot] || { avgViewership: 3, programCount: 1 };
                
                // 경쟁이 치열한 시간대에서의 저인지도 프로그램 발굴
                const competitionFactor = competition.avgViewership > 5 ? 1.5 : 1.0;
                const relativePerformance = program.ki_score / competition.avgKiScore;
                
                const score = Math.min(100, relativePerformance * 60 * competitionFactor);
                
                return {
                    program,
                    score,
                    reason: `경쟁 시간대(${timeSlot})에서의 숨겨진 우수작`
                };
            })
            .filter(item => item.score >= 40);
    }
    
    // 3. 장르 기반 발굴 알고리즘
    genreBasedDiscoveryAlgorithm(programs, filters) {
        const genreStats = this.calculateGenreStatistics(programs);
        
        return programs.map(program => {
            const genreStat = genreStats[program.genre];
            if (!genreStat) return null;
            
            // 장르 내에서의 상대적 품질 순위
            const relativeQuality = (program.ki_score - genreStat.avgKiScore) / (genreStat.maxKiScore - genreStat.minKiScore || 1);
            const relativePopularity = (program.viewership_rating - genreStat.avgViewership) / (genreStat.maxViewership - genreStat.minViewership || 1);
            
            // 높은 상대적 품질 + 낮은 상대적 인기도
            const hiddenGemPotential = relativeQuality - relativePopularity;
            const score = Math.max(0, Math.min(100, (hiddenGemPotential + 1) * 40));
            
            return {
                program,
                score,
                reason: `${program.genre} 장르 내 상위 품질, 저인지도`
            };
        })
        .filter(item => item && item.score >= 45);
    }
    
    // 4. 시간대 분석 알고리즘
    timeSlotAnalysisAlgorithm(programs, filters) {
        const timeSlotAnalysis = this.analyzeTimeSlotEffectiveness(programs);
        
        return programs.map(program => {
            const timeSlotData = timeSlotAnalysis[program.air_time];
            if (!timeSlotData) return null;
            
            // 비인기 시간대의 우수한 프로그램 발굴
            const timeSlotPenalty = timeSlotData.avgViewership; // 낮을수록 좋음
            const qualityBonus = program.ki_score / 100;
            
            const score = Math.max(0, (qualityBonus * 80) - (timeSlotPenalty * 5));
            
            return {
                program,
                score,
                reason: `비인기 시간대(${program.air_time})의 고품질 컨텐츠`
            };
        })
        .filter(item => item && item.score >= 35);
    }
    
    // 5. 다중 요소 스코어링 알고리즘
    multiFactorScoringAlgorithm(programs, filters) {
        return programs.map(program => {
            let score = 0;
            const reasons = [];
            
            // 품질 점수 (40점 만점)
            const qualityScore = (program.ki_score / 100) * 40;
            score += qualityScore;
            
            // 인기도 역점수 (20점 만점) - 낮을수록 점수 높음
            const popularityScore = Math.max(0, 20 - (program.viewership_rating * 2));
            score += popularityScore;
            
            // 다양성 보너스 (15점 만점)
            if (this.isUnderrepresentedContent(program, programs)) {
                score += 15;
                reasons.push('희소 컨텐츠 유형');
            }
            
            // 채널 다양성 (10점 만점)
            if (this.isNonMainstreamChannel(program.channel)) {
                score += 10;
                reasons.push('비주류 채널');
            }
            
            // 시청자 평가 불일치 (15점 만점)
            const evaluationGap = this.calculateEvaluationGap(program);
            score += evaluationGap;
            if (evaluationGap > 5) {
                reasons.push('시청자-전문가 평가 차이');
            }
            
            const finalScore = Math.min(100, score);
            
            return {
                program,
                score: finalScore,
                reason: reasons.length > 0 ? reasons.join(', ') : '종합적 Hidden Gem 지표'
            };
        })
        .filter(item => item.score >= 50);
    }
    
    // 6. 신흥 컨텐츠 알고리즘
    emergingContentAlgorithm(programs, filters) {
        return programs
            .filter(p => p.ki_score >= this.discoverySettings.emergingContentMinScore)
            .map(program => {
                let score = 0;
                const reasons = [];
                
                // 신규 컨텐츠 보너스 (시뮬레이션)
                if (this.isNewContent(program)) {
                    score += 30;
                    reasons.push('신규 컨텐츠');
                }
                
                // 트렌드 잠재력
                const trendPotential = this.calculateTrendPotential(program);
                score += trendPotential;
                if (trendPotential > 20) {
                    reasons.push('트렌드 잠재력');
                }
                
                // 소셜 미디어 언급도 (시뮬레이션)
                const socialMentions = this.simulateSocialMentions(program);
                score += socialMentions;
                if (socialMentions > 15) {
                    reasons.push('소셜 화제성');
                }
                
                return {
                    program,
                    score: Math.min(100, score),
                    reason: reasons.join(', ') || '신흥 컨텐츠 잠재력'
                };
            })
            .filter(item => item.score >= 30);
    }
    
    // 유틸리티 함수들
    analyzeTimeSlotCompetition(programs) {
        const timeSlots = {};
        
        programs.forEach(program => {
            const timeSlot = program.air_time;
            if (!timeSlots[timeSlot]) {
                timeSlots[timeSlot] = {
                    programs: [],
                    totalViewership: 0,
                    totalKiScore: 0
                };
            }
            
            timeSlots[timeSlot].programs.push(program);
            timeSlots[timeSlot].totalViewership += program.viewership_rating;
            timeSlots[timeSlot].totalKiScore += program.ki_score;
        });
        
        Object.keys(timeSlots).forEach(timeSlot => {
            const data = timeSlots[timeSlot];
            data.avgViewership = data.totalViewership / data.programs.length;
            data.avgKiScore = data.totalKiScore / data.programs.length;
            data.programCount = data.programs.length;
        });
        
        return timeSlots;
    }
    
    calculateGenreStatistics(programs) {
        const genres = {};
        
        programs.forEach(program => {
            const genre = program.genre;
            if (!genres[genre]) {
                genres[genre] = {
                    programs: [],
                    kiScores: [],
                    viewerships: []
                };
            }
            
            genres[genre].programs.push(program);
            genres[genre].kiScores.push(program.ki_score);
            genres[genre].viewerships.push(program.viewership_rating);
        });
        
        Object.keys(genres).forEach(genre => {
            const data = genres[genre];
            data.avgKiScore = data.kiScores.reduce((a, b) => a + b, 0) / data.kiScores.length;
            data.avgViewership = data.viewerships.reduce((a, b) => a + b, 0) / data.viewerships.length;
            data.maxKiScore = Math.max(...data.kiScores);
            data.minKiScore = Math.min(...data.kiScores);
            data.maxViewership = Math.max(...data.viewerships);
            data.minViewership = Math.min(...data.viewerships);
        });
        
        return genres;
    }
    
    analyzeTimeSlotEffectiveness(programs) {
        return this.analyzeTimeSlotCompetition(programs);
    }
    
    isUnderrepresentedContent(program, allPrograms) {
        const genreCount = allPrograms.filter(p => p.genre === program.genre).length;
        const totalPrograms = allPrograms.length;
        const genreRatio = genreCount / totalPrograms;
        
        return genreRatio < 0.1; // 10% 미만인 장르
    }
    
    isNonMainstreamChannel(channel) {
        const mainstreamChannels = ['KBS1', 'KBS2', 'MBC', 'SBS'];
        return !mainstreamChannels.includes(channel);
    }
    
    calculateEvaluationGap(program) {
        // 시뮬레이션: KI 점수와 시청률 간의 괴리도
        const expectedViewership = (program.ki_score / 100) * 10; // 예상 시청률
        const actualViewership = program.viewership_rating;
        const gap = Math.max(0, expectedViewership - actualViewership);
        
        return Math.min(15, gap * 3);
    }
    
    isNewContent(program) {
        // 시뮬레이션: 프로그램명에 특정 키워드가 있으면 신규로 간주
        const newContentKeywords = ['새로운', '신규', '첫', '런칭', '신설'];
        return newContentKeywords.some(keyword => program.program_name.includes(keyword));
    }
    
    calculateTrendPotential(program) {
        // 시뮬레이션: 장르별 트렌드 점수
        const trendingGenres = ['다큐멘터리', '교육', '문화'];
        const baseTrend = trendingGenres.includes(program.genre) ? 25 : 10;
        const qualityBonus = program.ki_score > 80 ? 10 : 0;
        
        return Math.min(30, baseTrend + qualityBonus);
    }
    
    simulateSocialMentions(program) {
        // 시뮬레이션: 낮은 시청률 + 높은 품질 = 잠재적 화제성
        if (program.viewership_rating < 2 && program.ki_score > 85) {
            return 20;
        } else if (program.viewership_rating < 3 && program.ki_score > 80) {
            return 15;
        } else {
            return Math.random() * 10; // 랜덤 요소
        }
    }
    
    categorizeHiddenGem(item) {
        if (item.totalScore >= 80) return 'Premium Hidden Gem';
        if (item.totalScore >= 70) return 'Quality Underrated';
        if (item.totalScore >= 60) return 'Emerging Content';
        return 'Potential Discovery';
    }
    
    // 설정 업데이트
    updateSettings(newSettings) {
        this.discoverySettings = { ...this.discoverySettings, ...newSettings };
    }
    
    // 알고리즘 가중치 업데이트
    updateAlgorithmWeights(newWeights) {
        this.algorithmWeights = { ...this.algorithmWeights, ...newWeights };
    }
}

// 고급 Hidden Gems 분석기 인스턴스
let advancedHiddenGemsAnalyzer = null;

// 고급 Hidden Gems 분석 초기화
function initializeAdvancedHiddenGems() {
    advancedHiddenGemsAnalyzer = new AdvancedHiddenGemsAnalyzer();
    console.log('고급 Hidden Gems 분석기가 초기화되었습니다.');
}

// 고급 Hidden Gems 분석 실행
function runAdvancedHiddenGemsAnalysis() {
    if (!advancedHiddenGemsAnalyzer) {
        initializeAdvancedHiddenGems();
    }
    
    // 현재 슬라이더 값들을 가져와서 필터로 사용
    const filters = {
        minKiScore: document.getElementById('min-ki-score')?.value || 70,
        maxViewership: document.getElementById('max-viewership')?.value || 5,
        qualityWeight: document.getElementById('quality-weight')?.value || 0.7
    };
    
    const results = advancedHiddenGemsAnalyzer.analyzeHiddenGems(filters);
    
    // 기존 결과 표시 함수 업데이트
    displayAdvancedHiddenGems(results);
    
    return results;
}

// 고급 Hidden Gems 결과 표시
function displayAdvancedHiddenGems(gems) {
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
                    <span class="inline-block px-3 py-1 text-sm font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        ${gem.hidden_gem_score}점
                    </span>
                    <p class="text-xs text-gray-500 mt-1">${gem.discovery_category}</p>
                </div>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p class="text-sm font-medium text-blue-800 mb-2">🔍 발견 이유</p>
                <p class="text-sm text-blue-700">${gem.discovery_reasons.join(', ')}</p>
            </div>
            
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
                    <p class="text-sm text-gray-600">신뢰도</p>
                    <p class="text-xl font-bold text-green-600">${gem.confidence_level}%</p>
                </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-3">
                <p class="text-xs font-medium text-gray-800 mb-2">📊 알고리즘 분석</p>
                <div class="flex flex-wrap gap-2">
                    ${Object.entries(gem.algorithm_breakdown || {}).map(([algo, score]) => `
                        <span class="px-2 py-1 bg-white text-xs rounded border">
                            ${this.getAlgorithmDisplayName(algo)}: ${Math.round(score)}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// 알고리즘 표시명 매핑
function getAlgorithmDisplayName(algorithmKey) {
    const names = {
        'quality_vs_popularity': '품질대비인기도',
        'trend_analysis': '트렌드분석',
        'genre_based_discovery': '장르기반발굴',
        'time_slot_analysis': '시간대분석',
        'multi_factor_scoring': '다중요소스코어',
        'emerging_content': '신흥컨텐츠'
    };
    return names[algorithmKey] || algorithmKey;
}

// ==========================================
// 예측 분석 시스템
// ==========================================

class PredictiveAnalysisEngine {
    constructor() {
        this.historicalData = this.generateHistoricalData();
        this.predictionModels = {
            'viewership_trend': this.viewershipTrendModel.bind(this),
            'content_success': this.contentSuccessModel.bind(this),
            'genre_popularity': this.genrePopularityModel.bind(this),
            'time_slot_optimization': this.timeSlotOptimizationModel.bind(this),
            'hidden_gems_prediction': this.hiddenGemsPredictionModel.bind(this),
            'market_trend': this.marketTrendModel.bind(this)
        };
        
        this.predictionSettings = {
            predictionHorizon: 30, // 30일 예측
            confidenceThreshold: 0.7,
            trendSensitivity: 0.8,
            seasonalityWeight: 0.3,
            qualityImpactWeight: 0.4
        };
        
        this.marketIndicators = {
            overallTrend: 1.05, // 5% 성장
            genreTrends: {
                '드라마': 1.02,
                '예능': 0.98,
                '뉴스': 1.01,
                '다큐멘터리': 1.08,
                '교육': 1.12,
                '문화': 1.06,
                '스포츠': 0.95
            },
            seasonalFactors: this.calculateSeasonalFactors()
        };
    }
    
    // 종합 예측 분석 실행
    runPredictiveAnalysis(programId = null, analysisType = 'comprehensive') {
        const results = {
            timestamp: new Date().toISOString(),
            analysisType: analysisType,
            predictions: {},
            marketInsights: {},
            recommendations: [],
            confidence: 0
        };
        
        if (programId) {
            // 특정 프로그램 예측
            results.predictions = this.predictProgramPerformance(programId);
        } else {
            // 종합 시장 예측
            results.predictions.viewershipTrends = this.predictViewershipTrends();
            results.predictions.genreForecasts = this.predictGenrePerformance();
            results.predictions.emergingOpportunities = this.predictEmergingOpportunities();
            results.predictions.timeSlotOptimization = this.predictOptimalTimeSlots();
        }
        
        results.marketInsights = this.generateMarketInsights();
        results.recommendations = this.generatePredictiveRecommendations(results.predictions);
        results.confidence = this.calculateOverallConfidence(results.predictions);
        
        console.log('예측 분석 완료:', results);
        return results;
    }
    
    // 1. 시청률 트렌드 예측 모델
    viewershipTrendModel(data, horizon = 30) {
        const trends = [];
        const baseData = data || this.historicalData.viewership;
        
        for (let i = 0; i < horizon; i++) {
            const trend = this.calculateTrendProjection(baseData, i);
            const seasonal = this.getSeasonalAdjustment(i);
            const noise = (Math.random() - 0.5) * 0.1; // 10% 노이즈
            
            const predictedValue = trend * seasonal * (1 + noise);
            const confidence = Math.max(0.3, 0.9 - (i * 0.02)); // 시간이 지날수록 신뢰도 감소
            
            trends.push({
                day: i + 1,
                predictedViewership: Math.max(0, predictedValue),
                confidence: confidence,
                trendDirection: this.getTrendDirection(baseData, i),
                influencingFactors: this.getInfluencingFactors(i)
            });
        }
        
        return trends;
    }
    
    // 2. 콘텐츠 성공 예측 모델
    contentSuccessModel(program) {
        const features = this.extractProgramFeatures(program);
        let successScore = 0;
        const factors = [];
        
        // 품질 지수 기반 예측 (40% 가중치)
        const qualityFactor = (features.ki_score / 100) * 0.4;
        successScore += qualityFactor;
        factors.push({ factor: 'Quality Index', impact: qualityFactor, weight: 0.4 });
        
        // 장르 트렌드 (25% 가중치)
        const genreTrend = this.marketIndicators.genreTrends[features.genre] || 1.0;
        const genreFactor = (genreTrend - 1) * 0.25;
        successScore += genreFactor;
        factors.push({ factor: 'Genre Trend', impact: genreFactor, weight: 0.25 });
        
        // 시간대 최적화 (20% 가중치)
        const timeSlotScore = this.evaluateTimeSlotPotential(features.air_time);
        const timeSlotFactor = timeSlotScore * 0.2;
        successScore += timeSlotFactor;
        factors.push({ factor: 'Time Slot', impact: timeSlotFactor, weight: 0.2 });
        
        // 채널 영향력 (10% 가중치)
        const channelScore = this.evaluateChannelInfluence(features.channel);
        const channelFactor = channelScore * 0.1;
        successScore += channelFactor;
        factors.push({ factor: 'Channel Influence', impact: channelFactor, weight: 0.1 });
        
        // 시장 포지셔닝 (5% 가중치)
        const positioningScore = this.evaluateMarketPositioning(features);
        const positioningFactor = positioningScore * 0.05;
        successScore += positioningFactor;
        factors.push({ factor: 'Market Positioning', impact: positioningFactor, weight: 0.05 });
        
        const finalScore = Math.max(0, Math.min(1, successScore));
        const confidence = this.calculatePredictionConfidence(factors);
        
        return {
            program: program,
            successProbability: finalScore,
            predictedViewership: this.convertScoreToViewership(finalScore, features),
            confidence: confidence,
            contributingFactors: factors,
            riskFactors: this.identifyRiskFactors(features),
            recommendations: this.generateContentRecommendations(features, factors)
        };
    }
    
    // 3. 장르 인기도 예측 모델
    genrePopularityModel(horizon = 30) {
        const genreForecasts = {};
        
        Object.keys(this.marketIndicators.genreTrends).forEach(genre => {
            const currentTrend = this.marketIndicators.genreTrends[genre];
            const historicalVolatility = this.calculateGenreVolatility(genre);
            const predictions = [];
            
            for (let i = 0; i < horizon; i++) {
                const trendDecay = Math.pow(0.99, i); // 트렌드 감소
                const cyclicalFactor = this.getGenreCyclicalFactor(genre, i);
                const randomWalk = this.generateRandomWalk(historicalVolatility);
                
                const predictedPopularity = currentTrend * trendDecay * cyclicalFactor * (1 + randomWalk);
                const confidence = Math.max(0.4, 0.85 - (i * 0.015));
                
                predictions.push({
                    day: i + 1,
                    popularity: Math.max(0.5, Math.min(2.0, predictedPopularity)),
                    confidence: confidence,
                    marketShare: this.predictMarketShare(genre, predictedPopularity),
                    growthRate: this.calculateGrowthRate(predictions, i)
                });
            }
            
            genreForecasts[genre] = {
                predictions: predictions,
                trendSummary: this.summarizeGenreTrend(predictions),
                opportunities: this.identifyGenreOpportunities(predictions),
                risks: this.identifyGenreRisks(predictions)
            };
        });
        
        return genreForecasts;
    }
    
    // 4. 시간대 최적화 예측 모델
    timeSlotOptimizationModel() {
        const timeSlots = ['아침 7시', '낮 12시', '오후 6시', '저녁 8시', '밤 10시', '밤 12시'];
        const optimizations = {};
        
        timeSlots.forEach(timeSlot => {
            const currentPerformance = this.getCurrentTimeSlotPerformance(timeSlot);
            const competitionLevel = this.analyzeTimeSlotCompetition(timeSlot);
            const audienceAvailability = this.predictAudienceAvailability(timeSlot);
            
            const optimizationScore = this.calculateOptimizationPotential({
                currentPerformance,
                competitionLevel,
                audienceAvailability
            });
            
            optimizations[timeSlot] = {
                currentPerformance: currentPerformance,
                optimizationPotential: optimizationScore,
                recommendedGenres: this.recommendGenresForTimeSlot(timeSlot),
                expectedImprovement: this.calculateExpectedImprovement(optimizationScore),
                competitiveAdvantage: this.assessCompetitiveAdvantage(timeSlot),
                audienceSegments: this.identifyTargetAudience(timeSlot)
            };
        });
        
        return optimizations;
    }
    
    // 5. Hidden Gems 예측 모델
    hiddenGemsPredictionModel(programs) {
        const predictions = [];
        
        programs.forEach(program => {
            const currentMetrics = {
                ki_score: program.ki_score,
                viewership: program.viewership_rating,
                genre: program.genre,
                channel: program.channel
            };
            
            // Hidden Gem 잠재력 예측
            const hiddenGemPotential = this.calculateHiddenGemPotential(currentMetrics);
            const breakoutProbability = this.calculateBreakoutProbability(currentMetrics);
            const timeToRecognition = this.predictTimeToRecognition(currentMetrics);
            
            if (hiddenGemPotential > 0.6) {
                predictions.push({
                    program: program,
                    hiddenGemPotential: hiddenGemPotential,
                    breakoutProbability: breakoutProbability,
                    timeToRecognition: timeToRecognition,
                    projectedViewershipGrowth: this.projectViewershipGrowth(currentMetrics),
                    discoveryTriggers: this.identifyDiscoveryTriggers(currentMetrics),
                    marketingRecommendations: this.generateMarketingRecommendations(currentMetrics)
                });
            }
        });
        
        return predictions.sort((a, b) => b.hiddenGemPotential - a.hiddenGemPotential);
    }
    
    // 6. 시장 트렌드 예측 모델
    marketTrendModel() {
        const marketPredictions = {
            overallMarket: this.predictOverallMarketTrend(),
            emergingGenres: this.predictEmergingGenres(),
            viewerBehaviorShifts: this.predictViewerBehaviorShifts(),
            technologyImpact: this.predictTechnologyImpact(),
            competitiveAnalysis: this.predictCompetitiveLandscape(),
            seasonalPatterns: this.predictSeasonalPatterns()
        };
        
        return marketPredictions;
    }
    
    // 유틸리티 및 헬퍼 함수들
    generateHistoricalData() {
        // 시뮬레이션된 역사적 데이터 생성
        const data = {
            viewership: [],
            genres: {},
            timeSlots: {},
            quality: []
        };
        
        // 30일 역사적 시청률 데이터
        for (let i = 0; i < 30; i++) {
            const base = 5.0;
            const trend = 0.02 * i; // 약간의 상승 트렌드
            const seasonal = Math.sin((i / 30) * 2 * Math.PI) * 0.5; // 계절성
            const noise = (Math.random() - 0.5) * 1.0; // 노이즈
            
            data.viewership.push(Math.max(1.0, base + trend + seasonal + noise));
        }
        
        return data;
    }
    
    calculateSeasonalFactors() {
        // 월별 계절성 팩터 (1.0 = 평균)
        return {
            1: 1.1,  // 1월 - 높은 시청률 (신년)
            2: 1.05, // 2월
            3: 0.95, // 3월 - 야외활동 증가
            4: 0.9,  // 4월
            5: 0.85, // 5월
            6: 0.9,  // 6월
            7: 0.95, // 7월
            8: 0.9,  // 8월
            9: 1.0,  // 9월
            10: 1.05, // 10월
            11: 1.1,  // 11월
            12: 1.15  // 12월 - 최고 시청률 (연말)
        };
    }
    
    calculateTrendProjection(data, days) {
        const recentData = data.slice(-7); // 최근 7일
        const average = recentData.reduce((a, b) => a + b, 0) / recentData.length;
        const trendSlope = this.calculateLinearTrend(recentData);
        
        return average + (trendSlope * days);
    }
    
    calculateLinearTrend(data) {
        const n = data.length;
        const sumX = (n * (n - 1)) / 2;
        const sumY = data.reduce((a, b) => a + b, 0);
        const sumXY = data.reduce((sum, y, x) => sum + x * y, 0);
        const sumX2 = data.reduce((sum, _, x) => sum + x * x, 0);
        
        return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    }
    
    getSeasonalAdjustment(dayOffset) {
        const currentMonth = new Date().getMonth() + 1;
        const targetMonth = Math.ceil((new Date().getDate() + dayOffset) / 30) + currentMonth - 1;
        const adjustedMonth = ((targetMonth - 1) % 12) + 1;
        
        return this.marketIndicators.seasonalFactors[adjustedMonth] || 1.0;
    }
    
    getTrendDirection(data, dayOffset) {
        const slope = this.calculateLinearTrend(data.slice(-5));
        if (slope > 0.05) return 'Strong Upward';
        if (slope > 0.01) return 'Upward';
        if (slope > -0.01) return 'Stable';
        if (slope > -0.05) return 'Downward';
        return 'Strong Downward';
    }
    
    getInfluencingFactors(dayOffset) {
        const factors = ['Market Trend', 'Seasonal Effect'];
        
        if (dayOffset < 7) factors.push('Recent Performance');
        if (dayOffset > 20) factors.push('Long-term Uncertainty');
        
        const weekday = (new Date().getDay() + dayOffset) % 7;
        if (weekday === 0 || weekday === 6) factors.push('Weekend Effect');
        
        return factors;
    }
    
    extractProgramFeatures(program) {
        return {
            ki_score: program.ki_score || 70,
            viewership_rating: program.viewership_rating || 3,
            genre: program.genre || '드라마',
            channel: program.channel || 'KBS1',
            air_time: program.air_time || '저녁 8시'
        };
    }
    
    evaluateTimeSlotPotential(timeSlot) {
        const potentials = {
            '아침 7시': 0.6,
            '낮 12시': 0.5,
            '오후 6시': 0.7,
            '저녁 8시': 0.9,
            '밤 10시': 0.8,
            '밤 12시': 0.4
        };
        return potentials[timeSlot] || 0.5;
    }
    
    evaluateChannelInfluence(channel) {
        const influences = {
            'KBS1': 0.8,
            'KBS2': 0.7,
            'MBC': 0.75,
            'SBS': 0.7,
            'EBS': 0.6,
            'JTBC': 0.65,
            'tvN': 0.6
        };
        return influences[channel] || 0.5;
    }
    
    evaluateMarketPositioning(features) {
        // 시장 내 포지셔닝 평가 (경쟁도, 차별화 등)
        let score = 0.5;
        
        if (features.ki_score > 80) score += 0.2;
        if (features.viewership_rating < 3) score += 0.1; // 블루오션
        if (features.genre === '다큐멘터리' || features.genre === '교육') score += 0.15;
        
        return Math.min(1.0, score);
    }
    
    convertScoreToViewership(score, features) {
        const baseViewership = features.viewership_rating || 3;
        const multiplier = 0.5 + (score * 1.5); // 0.5x ~ 2x 배수
        return Math.round((baseViewership * multiplier) * 10) / 10;
    }
    
    calculatePredictionConfidence(factors) {
        const weights = factors.map(f => f.weight);
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const normalizedWeights = weights.map(w => w / totalWeight);
        
        // 가중 평균 신뢰도
        const baseConfidence = normalizedWeights.reduce((sum, weight, i) => {
            const factorConfidence = Math.abs(factors[i].impact) * 2; // 영향도가 클수록 신뢰도 높음
            return sum + (weight * Math.min(1.0, factorConfidence));
        }, 0);
        
        return Math.max(0.3, Math.min(0.95, baseConfidence));
    }
    
    identifyRiskFactors(features) {
        const risks = [];
        
        if (features.viewership_rating < 2) risks.push('매우 낮은 현재 시청률');
        if (features.ki_score < 60) risks.push('품질 지수 미달');
        if (this.marketIndicators.genreTrends[features.genre] < 0.95) risks.push('장르 인기도 하락');
        
        return risks;
    }
    
    generateContentRecommendations(features, factors) {
        const recommendations = [];
        
        if (features.ki_score > 80 && features.viewership_rating < 3) {
            recommendations.push('마케팅 강화로 인지도 제고 필요');
        }
        
        if (this.evaluateTimeSlotPotential(features.air_time) < 0.7) {
            recommendations.push('더 효과적인 시간대로 이동 고려');
        }
        
        const genreTrend = this.marketIndicators.genreTrends[features.genre];
        if (genreTrend > 1.05) {
            recommendations.push('장르 트렌드 활용한 콘텐츠 확장');
        }
        
        return recommendations;
    }
    
    // 추가 예측 모델 메서드들...
    calculateOverallConfidence(predictions) {
        const confidences = [];
        
        Object.values(predictions).forEach(prediction => {
            if (Array.isArray(prediction)) {
                confidences.push(...prediction.map(p => p.confidence || 0.5));
            } else if (prediction.confidence) {
                confidences.push(prediction.confidence);
            }
        });
        
        if (confidences.length === 0) return 0.5;
        
        return confidences.reduce((a, b) => a + b, 0) / confidences.length;
    }
    
    generateMarketInsights() {
        return {
            currentTrend: '전반적 시청률 상승 추세',
            hotGenres: ['다큐멘터리', '교육', '문화'],
            emergingOpportunities: ['심야 시간대 교육 프로그램', '주말 문화 콘텐츠'],
            marketRisks: ['예능 장르 포화', '경쟁 심화'],
            seasonalFactors: '연말 시즌 접근으로 시청률 상승 예상'
        };
    }
    
    generatePredictiveRecommendations(predictions) {
        const recommendations = [];
        
        recommendations.push({
            type: 'content_strategy',
            priority: 'high',
            title: '고품질 다큐멘터리 제작 확대',
            description: '다큐멘터리 장르의 지속적 성장세와 높은 잠재력 고려',
            expectedImpact: '15-20% 시청률 증가 예상'
        });
        
        recommendations.push({
            type: 'scheduling_optimization',
            priority: 'medium',
            title: '저녁 8시 시간대 활용도 증대',
            description: '프라임 타임 최적화로 전체적 시청률 향상',
            expectedImpact: '10-15% 도달률 증가 예상'
        });
        
        recommendations.push({
            type: 'hidden_gems_focus',
            priority: 'high',
            title: 'Hidden Gems 마케팅 집중',
            description: '높은 품질 대비 저인지도 프로그램의 홍보 강화',
            expectedImpact: '발굴된 프로그램의 30-50% 성장 가능'
        });
        
        return recommendations;
    }
}

// 예측 분석 엔진 인스턴스
let predictiveAnalysisEngine = null;

// 예측 분석 엔진 초기화
function initializePredictiveAnalysis() {
    predictiveAnalysisEngine = new PredictiveAnalysisEngine();
    console.log('예측 분석 시스템이 초기화되었습니다.');
}

// 예측 분석 실행
function runPredictiveAnalysis(type = 'comprehensive') {
    if (!predictiveAnalysisEngine) {
        initializePredictiveAnalysis();
    }
    
    const results = predictiveAnalysisEngine.runPredictiveAnalysis(null, type);
    displayPredictiveResults(results);
    return results;
}

// 예측 결과 표시
function displayPredictiveResults(results) {
    const container = document.getElementById('predictive-analysis-results');
    if (!container) return;
    
    container.innerHTML = `
        <div class="space-y-6">
            <!-- 시장 인사이트 -->
            <div class="bg-white rounded-lg p-6 shadow-md">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">🔮 시장 인사이트</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-medium text-blue-800">현재 트렌드</h4>
                        <p class="text-sm text-blue-700">${results.marketInsights.currentTrend}</p>
                    </div>
                    <div class="p-4 bg-green-50 rounded-lg">
                        <h4 class="font-medium text-green-800">핫 장르</h4>
                        <p class="text-sm text-green-700">${results.marketInsights.hotGenres.join(', ')}</p>
                    </div>
                </div>
            </div>
            
            <!-- 예측 결과 -->
            <div class="bg-white rounded-lg p-6 shadow-md">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">📊 예측 분석 결과</h3>
                <div class="space-y-4">
                    ${results.predictions.viewershipTrends ? `
                        <div class="p-4 border border-gray-200 rounded-lg">
                            <h4 class="font-medium text-gray-800 mb-2">시청률 트렌드 예측</h4>
                            <div class="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p class="text-sm text-gray-600">7일 후 예상</p>
                                    <p class="text-lg font-bold text-blue-600">${Math.round(results.predictions.viewershipTrends[6]?.predictedViewership * 10) / 10}%</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">15일 후 예상</p>
                                    <p class="text-lg font-bold text-purple-600">${Math.round(results.predictions.viewershipTrends[14]?.predictedViewership * 10) / 10}%</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">30일 후 예상</p>
                                    <p class="text-lg font-bold text-green-600">${Math.round(results.predictions.viewershipTrends[29]?.predictedViewership * 10) / 10}%</p>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- 추천사항 -->
            <div class="bg-white rounded-lg p-6 shadow-md">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">💡 예측 기반 추천</h3>
                <div class="space-y-3">
                    ${results.recommendations.map(rec => `
                        <div class="p-4 border-l-4 ${rec.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'} rounded-r-lg">
                            <h4 class="font-medium ${rec.priority === 'high' ? 'text-red-800' : 'text-yellow-800'}">${rec.title}</h4>
                            <p class="text-sm ${rec.priority === 'high' ? 'text-red-700' : 'text-yellow-700'} mt-1">${rec.description}</p>
                            <p class="text-xs ${rec.priority === 'high' ? 'text-red-600' : 'text-yellow-600'} mt-2">예상 효과: ${rec.expectedImpact}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 신뢰도 지표 -->
            <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">예측 신뢰도</span>
                    <span class="text-sm font-bold text-gray-900">${Math.round(results.confidence * 100)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${results.confidence * 100}%"></div>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// 사용자 맞춤 대시보드 시스템
// ==========================================

class CustomDashboardManager {
    constructor() {
        this.widgets = this.getAvailableWidgets();
        this.dashboardLayouts = this.loadDashboardLayouts();
        this.currentLayout = this.loadCurrentLayout();
        this.dragState = {
            isDragging: false,
            draggedWidget: null,
            startPosition: null,
            targetContainer: null
        };
        
        this.widgetInstances = new Map();
        this.refreshIntervals = new Map();
        
        this.init();
    }
    
    init() {
        console.log('사용자 맞춤 대시보드 시스템 초기화 중...');
        this.setupDragAndDrop();
        this.renderDashboard();
        this.startAutoRefresh();
    }
    
    // 사용 가능한 위젯 정의
    getAvailableWidgets() {
        return {
            'ai_recommendations': {
                id: 'ai_recommendations',
                title: 'AI 추천',
                description: '개인화된 프로그램 추천',
                icon: '🤖',
                category: 'intelligence',
                size: 'medium', // small, medium, large
                refreshRate: 300000, // 5분
                configurable: true,
                component: this.renderAIRecommendationsWidget.bind(this)
            },
            'hidden_gems': {
                id: 'hidden_gems',
                title: 'Hidden Gems',
                description: '숨겨진 보석 프로그램',
                icon: '💎',
                category: 'discovery',
                size: 'large',
                refreshRate: 600000, // 10분
                configurable: true,
                component: this.renderHiddenGemsWidget.bind(this)
            },
            'viewership_trends': {
                id: 'viewership_trends',
                title: '시청률 트렌드',
                description: '실시간 시청률 추이',
                icon: '📈',
                category: 'analytics',
                size: 'medium',
                refreshRate: 60000, // 1분
                configurable: false,
                component: this.renderViewershipTrendsWidget.bind(this)
            },
            'predictive_insights': {
                id: 'predictive_insights',
                title: '예측 인사이트',
                description: '미래 트렌드 예측',
                icon: '🔮',
                category: 'prediction',
                size: 'large',
                refreshRate: 1800000, // 30분
                configurable: true,
                component: this.renderPredictiveInsightsWidget.bind(this)
            },
            'quick_stats': {
                id: 'quick_stats',
                title: '퀵 통계',
                description: '주요 지표 요약',
                icon: '📊',
                category: 'overview',
                size: 'small',
                refreshRate: 120000, // 2분
                configurable: false,
                component: this.renderQuickStatsWidget.bind(this)
            },
            'genre_analysis': {
                id: 'genre_analysis',
                title: '장르 분석',
                description: '장르별 성과 분석',
                icon: '🎭',
                category: 'analytics',
                size: 'medium',
                refreshRate: 900000, // 15분
                configurable: true,
                component: this.renderGenreAnalysisWidget.bind(this)
            },
            'time_slot_performance': {
                id: 'time_slot_performance',
                title: '시간대 성과',
                description: '시간대별 프로그램 성과',
                icon: '⏰',
                category: 'analytics',
                size: 'medium',
                refreshRate: 600000, // 10분
                configurable: true,
                component: this.renderTimeSlotPerformanceWidget.bind(this)
            },
            'market_insights': {
                id: 'market_insights',
                title: '시장 인사이트',
                description: '시장 동향 및 기회',
                icon: '💡',
                category: 'intelligence',
                size: 'large',
                refreshRate: 1800000, // 30분
                configurable: false,
                component: this.renderMarketInsightsWidget.bind(this)
            },
            'performance_alerts': {
                id: 'performance_alerts',
                title: '성과 알림',
                description: '성과 이상 징후 알림',
                icon: '🚨',
                category: 'monitoring',
                size: 'small',
                refreshRate: 180000, // 3분
                configurable: true,
                component: this.renderPerformanceAlertsWidget.bind(this)
            },
            'content_calendar': {
                id: 'content_calendar',
                title: '콘텐츠 캘린더',
                description: '편성 및 출시 일정',
                icon: '📅',
                category: 'planning',
                size: 'medium',
                refreshRate: 3600000, // 1시간
                configurable: false,
                component: this.renderContentCalendarWidget.bind(this)
            }
        };
    }
    
    // 대시보드 레이아웃 로드
    loadDashboardLayouts() {
        const defaultLayouts = {
            'default': {
                name: '기본 대시보드',
                description: '일반적인 분석 뷰',
                widgets: ['quick_stats', 'viewership_trends', 'ai_recommendations', 'hidden_gems']
            },
            'analytics_focused': {
                name: '분석 중심',
                description: '데이터 분석에 특화',
                widgets: ['viewership_trends', 'genre_analysis', 'time_slot_performance', 'predictive_insights']
            },
            'discovery_focused': {
                name: '발굴 중심',
                description: 'Hidden Gems 발굴에 특화',
                widgets: ['hidden_gems', 'ai_recommendations', 'market_insights', 'performance_alerts']
            },
            'management_overview': {
                name: '경영진 요약',
                description: '의사결정을 위한 핵심 지표',
                widgets: ['quick_stats', 'market_insights', 'predictive_insights', 'content_calendar']
            }
        };
        
        const saved = localStorage.getItem('dashboard_layouts');
        return saved ? { ...defaultLayouts, ...JSON.parse(saved) } : defaultLayouts;
    }
    
    // 현재 레이아웃 로드
    loadCurrentLayout() {
        const saved = localStorage.getItem('current_dashboard_layout');
        return saved || 'default';
    }
    
    // 대시보드 렌더링
    renderDashboard() {
        const dashboardContainer = document.getElementById('custom-dashboard-container');
        if (!dashboardContainer) return;
        
        const layout = this.dashboardLayouts[this.currentLayout];
        if (!layout) return;
        
        dashboardContainer.innerHTML = `
            <div class="dashboard-header mb-6">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-800">${layout.name}</h2>
                    <div class="flex space-x-2">
                        <button onclick="customDashboard.showLayoutSelector()" 
                                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            레이아웃 변경
                        </button>
                        <button onclick="customDashboard.showWidgetLibrary()" 
                                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            위젯 추가
                        </button>
                        <button onclick="customDashboard.toggleAutoRefresh()" 
                                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                            자동 새로고침
                        </button>
                    </div>
                </div>
                <p class="text-gray-600 mt-2">${layout.description}</p>
            </div>
            
            <div class="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="dashboard-widgets">
                ${layout.widgets.map(widgetId => this.renderWidget(widgetId)).join('')}
            </div>
        `;
        
        // 위젯별 개별 초기화
        layout.widgets.forEach(widgetId => {
            this.initializeWidget(widgetId);
        });
    }
    
    // 개별 위젯 렌더링
    renderWidget(widgetId) {
        const widget = this.widgets[widgetId];
        if (!widget) return '';
        
        const sizeClass = {
            'small': 'col-span-1',
            'medium': 'lg:col-span-2',
            'large': 'md:col-span-2 lg:col-span-3'
        }[widget.size] || 'col-span-1';
        
        return `
            <div class="widget-container ${sizeClass} bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                 data-widget-id="${widgetId}"
                 draggable="true">
                <div class="widget-header bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <span class="text-lg">${widget.icon}</span>
                        <h3 class="font-semibold text-gray-800">${widget.title}</h3>
                    </div>
                    <div class="flex items-center space-x-2">
                        ${widget.configurable ? `
                            <button onclick="customDashboard.configureWidget('${widgetId}')" 
                                    class="text-gray-500 hover:text-gray-700">
                                ⚙️
                            </button>
                        ` : ''}
                        <button onclick="customDashboard.refreshWidget('${widgetId}')" 
                                class="text-gray-500 hover:text-gray-700">
                            🔄
                        </button>
                        <button onclick="customDashboard.removeWidget('${widgetId}')" 
                                class="text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>
                </div>
                <div class="widget-content p-4" id="widget-content-${widgetId}">
                    <div class="flex items-center justify-center py-8">
                        <div class="text-gray-500">로딩 중...</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 위젯 초기화
    initializeWidget(widgetId) {
        const widget = this.widgets[widgetId];
        if (!widget || !widget.component) return;
        
        // 컨텐츠 렌더링
        widget.component(widgetId);
        
        // 자동 새로고침 설정
        if (widget.refreshRate) {
            const intervalId = setInterval(() => {
                if (document.getElementById(`widget-content-${widgetId}`)) {
                    widget.component(widgetId);
                } else {
                    clearInterval(intervalId);
                    this.refreshIntervals.delete(widgetId);
                }
            }, widget.refreshRate);
            
            this.refreshIntervals.set(widgetId, intervalId);
        }
    }
    
    // 드래그 앤 드롭 설정
    setupDragAndDrop() {
        document.addEventListener('dragstart', (e) => {
            if (e.target.closest('.widget-container')) {
                this.dragState.isDragging = true;
                this.dragState.draggedWidget = e.target.closest('.widget-container');
                e.dataTransfer.effectAllowed = 'move';
            }
        });
        
        document.addEventListener('dragover', (e) => {
            if (this.dragState.isDragging) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            }
        });
        
        document.addEventListener('drop', (e) => {
            if (this.dragState.isDragging) {
                e.preventDefault();
                const dropTarget = e.target.closest('.widget-container');
                if (dropTarget && dropTarget !== this.dragState.draggedWidget) {
                    this.reorderWidgets(this.dragState.draggedWidget, dropTarget);
                }
                this.dragState.isDragging = false;
                this.dragState.draggedWidget = null;
            }
        });
    }
    
    // 위젯 순서 변경
    reorderWidgets(draggedWidget, targetWidget) {
        const container = document.getElementById('dashboard-widgets');
        const draggedId = draggedWidget.dataset.widgetId;
        const targetId = targetWidget.dataset.widgetId;
        
        // DOM 순서 변경
        container.insertBefore(draggedWidget, targetWidget);
        
        // 레이아웃 데이터 업데이트
        const layout = this.dashboardLayouts[this.currentLayout];
        const draggedIndex = layout.widgets.indexOf(draggedId);
        const targetIndex = layout.widgets.indexOf(targetId);
        
        layout.widgets.splice(draggedIndex, 1);
        layout.widgets.splice(targetIndex, 0, draggedId);
        
        this.saveDashboardLayouts();
    }
    
    // 레이아웃 선택기 표시
    showLayoutSelector() {
        const layouts = Object.entries(this.dashboardLayouts);
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 class="text-lg font-semibold mb-4">대시보드 레이아웃 선택</h3>
                <div class="space-y-3">
                    ${layouts.map(([id, layout]) => `
                        <button onclick="customDashboard.switchLayout('${id}'); this.closest('.fixed').remove();"
                                class="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 ${id === this.currentLayout ? 'bg-blue-50 border-blue-300' : ''}">
                            <h4 class="font-medium">${layout.name}</h4>
                            <p class="text-sm text-gray-600">${layout.description}</p>
                        </button>
                    `).join('')}
                </div>
                <button onclick="this.closest('.fixed').remove();" 
                        class="mt-4 w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                    취소
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // 위젯 라이브러리 표시
    showWidgetLibrary() {
        const availableWidgets = Object.entries(this.widgets);
        const currentWidgets = this.dashboardLayouts[this.currentLayout].widgets;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                <h3 class="text-lg font-semibold mb-4">위젯 라이브러리</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${availableWidgets.map(([id, widget]) => `
                        <div class="p-3 border border-gray-200 rounded-lg ${currentWidgets.includes(id) ? 'bg-gray-100' : 'hover:bg-gray-50'}">
                            <div class="flex items-center space-x-3">
                                <span class="text-2xl">${widget.icon}</span>
                                <div class="flex-1">
                                    <h4 class="font-medium">${widget.title}</h4>
                                    <p class="text-sm text-gray-600">${widget.description}</p>
                                </div>
                                ${currentWidgets.includes(id) ? 
                                    '<span class="text-green-600">✓</span>' : 
                                    `<button onclick="customDashboard.addWidget('${id}'); this.closest('.fixed').remove();" 
                                             class="px-3 py-1 bg-blue-500 text-white text-sm rounded">추가</button>`
                                }
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="this.closest('.fixed').remove();" 
                        class="mt-4 w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                    닫기
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // 레이아웃 전환
    switchLayout(layoutId) {
        this.currentLayout = layoutId;
        localStorage.setItem('current_dashboard_layout', layoutId);
        this.clearAllRefreshIntervals();
        this.renderDashboard();
    }
    
    // 위젯 추가
    addWidget(widgetId) {
        const layout = this.dashboardLayouts[this.currentLayout];
        if (!layout.widgets.includes(widgetId)) {
            layout.widgets.push(widgetId);
            this.saveDashboardLayouts();
            this.renderDashboard();
        }
    }
    
    // 위젯 제거
    removeWidget(widgetId) {
        const layout = this.dashboardLayouts[this.currentLayout];
        const index = layout.widgets.indexOf(widgetId);
        if (index > -1) {
            layout.widgets.splice(index, 1);
            this.saveDashboardLayouts();
            this.clearWidgetRefresh(widgetId);
            this.renderDashboard();
        }
    }
    
    // 위젯 새로고침
    refreshWidget(widgetId) {
        const widget = this.widgets[widgetId];
        if (widget && widget.component) {
            widget.component(widgetId);
        }
    }
    
    // 위젯 설정
    configureWidget(widgetId) {
        console.log(`위젯 설정: ${widgetId}`);
        // 위젯별 설정 모달 구현 (필요시)
    }
    
    // 자동 새로고침 토글
    toggleAutoRefresh() {
        if (this.refreshIntervals.size > 0) {
            this.clearAllRefreshIntervals();
            console.log('자동 새로고침 비활성화');
        } else {
            this.startAutoRefresh();
            console.log('자동 새로고침 활성화');
        }
    }
    
    // 자동 새로고침 시작
    startAutoRefresh() {
        const layout = this.dashboardLayouts[this.currentLayout];
        layout.widgets.forEach(widgetId => {
            const widget = this.widgets[widgetId];
            if (widget && widget.refreshRate && !this.refreshIntervals.has(widgetId)) {
                const intervalId = setInterval(() => {
                    if (document.getElementById(`widget-content-${widgetId}`)) {
                        widget.component(widgetId);
                    }
                }, widget.refreshRate);
                
                this.refreshIntervals.set(widgetId, intervalId);
            }
        });
    }
    
    // 모든 새로고침 인터벌 정리
    clearAllRefreshIntervals() {
        this.refreshIntervals.forEach(intervalId => clearInterval(intervalId));
        this.refreshIntervals.clear();
    }
    
    // 특정 위젯 새로고침 정리
    clearWidgetRefresh(widgetId) {
        if (this.refreshIntervals.has(widgetId)) {
            clearInterval(this.refreshIntervals.get(widgetId));
            this.refreshIntervals.delete(widgetId);
        }
    }
    
    // 레이아웃 저장
    saveDashboardLayouts() {
        const customLayouts = Object.fromEntries(
            Object.entries(this.dashboardLayouts).filter(([key]) => !['default', 'analytics_focused', 'discovery_focused', 'management_overview'].includes(key))
        );
        localStorage.setItem('dashboard_layouts', JSON.stringify(customLayouts));
    }
    
    // 위젯 컴포넌트 렌더링 함수들
    renderAIRecommendationsWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        // AI 추천 데이터 시뮬레이션
        const recommendations = this.generateAIRecommendations();
        
        content.innerHTML = `
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-800 mb-3">오늘의 AI 추천</h4>
                ${recommendations.map(rec => `
                    <div class="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <h5 class="font-medium text-gray-800">${rec.title}</h5>
                        <p class="text-sm text-gray-600 mt-1">${rec.reason}</p>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-xs text-blue-600 font-medium">신뢰도: ${rec.confidence}%</span>
                            <span class="text-xs text-purple-600 font-medium">${rec.category}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    renderHiddenGemsWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const gems = this.generateHiddenGems();
        
        content.innerHTML = `
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-800 mb-3">최신 Hidden Gems</h4>
                ${gems.map(gem => `
                    <div class="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <div class="flex justify-between items-start">
                            <div>
                                <h5 class="font-medium text-gray-800">${gem.program}</h5>
                                <p class="text-sm text-gray-600">${gem.channel} • ${gem.genre}</p>
                            </div>
                            <span class="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                                ${gem.score}점
                            </span>
                        </div>
                        <p class="text-xs text-purple-700 mt-2">${gem.reason}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    renderViewershipTrendsWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const trends = this.generateViewershipTrends();
        
        content.innerHTML = `
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-800">시청률 트렌드</h4>
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center p-3 bg-green-50 rounded-lg">
                        <p class="text-2xl font-bold text-green-600">${trends.current}%</p>
                        <p class="text-sm text-green-700">현재 평균</p>
                    </div>
                    <div class="text-center p-3 bg-blue-50 rounded-lg">
                        <p class="text-2xl font-bold text-blue-600">${trends.change > 0 ? '+' : ''}${trends.change}%</p>
                        <p class="text-sm text-blue-700">전일 대비</p>
                    </div>
                </div>
                <div class="space-y-2">
                    ${trends.topPrograms.map((program, index) => `
                        <div class="flex justify-between items-center py-2 border-b border-gray-100">
                            <span class="text-sm text-gray-700">${index + 1}. ${program.name}</span>
                            <span class="text-sm font-medium text-gray-900">${program.rating}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderPredictiveInsightsWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const insights = this.generatePredictiveInsights();
        
        content.innerHTML = `
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-800">예측 인사이트</h4>
                ${insights.map(insight => `
                    <div class="p-3 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-lg border border-indigo-200">
                        <div class="flex items-center space-x-2 mb-2">
                            <span class="text-lg">${insight.icon}</span>
                            <h5 class="font-medium text-gray-800">${insight.title}</h5>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">${insight.prediction}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-indigo-600">신뢰도: ${insight.confidence}%</span>
                            <span class="text-xs text-cyan-600">${insight.timeframe}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    renderQuickStatsWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const stats = this.generateQuickStats();
        
        content.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
                ${stats.map(stat => `
                    <div class="text-center p-3 bg-gray-50 rounded-lg">
                        <p class="text-lg font-bold ${stat.color}">${stat.value}</p>
                        <p class="text-xs text-gray-600">${stat.label}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    renderGenreAnalysisWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const analysis = this.generateGenreAnalysis();
        
        content.innerHTML = `
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-800">장르별 성과</h4>
                ${analysis.map(genre => `
                    <div class="flex justify-between items-center py-2">
                        <span class="text-sm text-gray-700">${genre.name}</span>
                        <div class="flex items-center space-x-2">
                            <div class="w-16 bg-gray-200 rounded-full h-2">
                                <div class="h-2 rounded-full ${genre.trend > 0 ? 'bg-green-500' : 'bg-red-500'}" 
                                     style="width: ${Math.abs(genre.trend) * 10}%"></div>
                            </div>
                            <span class="text-xs font-medium ${genre.trend > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${genre.trend > 0 ? '+' : ''}${genre.trend}%
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    renderTimeSlotPerformanceWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const performance = this.generateTimeSlotPerformance();
        
        content.innerHTML = `
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-800">시간대별 성과</h4>
                ${performance.map(slot => `
                    <div class="flex justify-between items-center py-2">
                        <span class="text-sm text-gray-700">${slot.time}</span>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-medium text-gray-900">${slot.avgRating}%</span>
                            <span class="text-xs px-2 py-1 rounded-full ${slot.performance === 'high' ? 'bg-green-100 text-green-800' : slot.performance === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                                ${slot.performance === 'high' ? '우수' : slot.performance === 'medium' ? '보통' : '개선필요'}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    renderMarketInsightsWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const insights = this.generateMarketInsights();
        
        content.innerHTML = `
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-800">시장 인사이트</h4>
                <div class="grid grid-cols-1 gap-3">
                    ${insights.map(insight => `
                        <div class="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                            <div class="flex items-center space-x-2 mb-2">
                                <span class="text-lg">${insight.icon}</span>
                                <h5 class="font-medium text-gray-800">${insight.category}</h5>
                            </div>
                            <p class="text-sm text-gray-600">${insight.insight}</p>
                            <div class="mt-2 flex justify-between items-center">
                                <span class="text-xs text-orange-600">중요도: ${insight.importance}</span>
                                <span class="text-xs text-yellow-600">${insight.impact}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderPerformanceAlertsWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const alerts = this.generatePerformanceAlerts();
        
        content.innerHTML = `
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-800">성과 알림</h4>
                ${alerts.map(alert => `
                    <div class="p-3 rounded-lg border ${alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : alert.type === 'danger' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}">
                        <div class="flex items-center space-x-2">
                            <span class="text-lg">${alert.icon}</span>
                            <h5 class="font-medium text-gray-800">${alert.title}</h5>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${alert.message}</p>
                        <span class="text-xs ${alert.type === 'warning' ? 'text-yellow-600' : alert.type === 'danger' ? 'text-red-600' : 'text-blue-600'}">${alert.time}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    renderContentCalendarWidget(widgetId) {
        const content = document.getElementById(`widget-content-${widgetId}`);
        if (!content) return;
        
        const calendar = this.generateContentCalendar();
        
        content.innerHTML = `
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-800">이번 주 일정</h4>
                ${calendar.map(event => `
                    <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div class="flex justify-between items-start">
                            <div>
                                <h5 class="font-medium text-gray-800">${event.title}</h5>
                                <p class="text-sm text-gray-600">${event.description}</p>
                            </div>
                            <span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                                ${event.date}
                            </span>
                        </div>
                        <span class="text-xs text-gray-500">${event.type}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // 데이터 생성 헬퍼 함수들 (실제 구현에서는 API에서 가져올 데이터)
    generateAIRecommendations() {
        const recommendations = [
            { title: "시골의사의 일기", reason: "높은 품질 지수 대비 낮은 인지도", confidence: 92, category: "Hidden Gem" },
            { title: "청년 농부의 꿈", reason: "트렌드 분석 기반 상승세 예측", confidence: 87, category: "성장 잠재력" },
            { title: "과학자의 실험실", reason: "시간대 최적화 필요", confidence: 78, category: "편성 개선" }
        ];
        return recommendations.slice(0, 3);
    }
    
    generateHiddenGems() {
        const gems = [
            { program: "시골의사의 일기", channel: "EBS", genre: "다큐멘터리", score: 89, reason: "의료진 실상을 다룬 고품질 콘텐츠" },
            { program: "전통시장 이야기", channel: "KBS2", genre: "문화", score: 85, reason: "지역 상권 활성화 메시지" },
            { program: "청년 창업가들", channel: "MBC", genre: "교육", score: 82, reason: "창업 교육 가치가 높음" }
        ];
        return gems;
    }
    
    generateViewershipTrends() {
        return {
            current: (Math.random() * 3 + 4).toFixed(1),
            change: (Math.random() * 2 - 1).toFixed(1),
            topPrograms: [
                { name: "뉴스 9시", rating: (Math.random() * 5 + 8).toFixed(1) },
                { name: "주말 예능쇼", rating: (Math.random() * 3 + 6).toFixed(1) },
                { name: "인기 드라마", rating: (Math.random() * 2 + 5).toFixed(1) }
            ]
        };
    }
    
    generatePredictiveInsights() {
        const insights = [
            { icon: "📈", title: "시청률 상승 예측", prediction: "다음 주 전체 시청률 5% 상승 예상", confidence: 85, timeframe: "7일 후" },
            { icon: "🎭", title: "장르 트렌드", prediction: "다큐멘터리 장르 지속 성장세", confidence: 78, timeframe: "30일 후" },
            { icon: "⏰", title: "시간대 최적화", prediction: "저녁 8시 시간대 경쟁 심화", confidence: 92, timeframe: "현재" }
        ];
        return insights;
    }
    
    generateQuickStats() {
        return [
            { label: "평균 시청률", value: (Math.random() * 2 + 4).toFixed(1) + "%", color: "text-blue-600" },
            { label: "Hidden Gems", value: Math.floor(Math.random() * 10 + 15), color: "text-purple-600" },
            { label: "AI 추천", value: Math.floor(Math.random() * 5 + 8), color: "text-green-600" },
            { label: "예측 신뢰도", value: Math.floor(Math.random() * 15 + 80) + "%", color: "text-orange-600" }
        ];
    }
    
    generateGenreAnalysis() {
        const genres = ['드라마', '예능', '뉴스', '다큐멘터리', '교육'];
        return genres.map(genre => ({
            name: genre,
            trend: Math.random() * 20 - 10 // -10% ~ +10%
        }));
    }
    
    generateTimeSlotPerformance() {
        const slots = ['아침 7시', '낮 12시', '오후 6시', '저녁 8시', '밤 10시'];
        return slots.map(time => {
            const rating = Math.random() * 8 + 2;
            return {
                time,
                avgRating: rating.toFixed(1),
                performance: rating > 7 ? 'high' : rating > 4 ? 'medium' : 'low'
            };
        });
    }
    
    generateMarketInsights() {
        const insights = [
            { icon: "🔥", category: "트렌드", insight: "다큐멘터리 장르 급성장세", importance: "높음", impact: "시장 확대" },
            { icon: "⚠️", category: "리스크", insight: "예능 장르 포화 상태", importance: "중간", impact: "차별화 필요" },
            { icon: "💡", category: "기회", insight: "심야 시간대 블루오션", importance: "높음", impact: "신규 진입" }
        ];
        return insights;
    }
    
    generatePerformanceAlerts() {
        const alerts = [
            { type: "warning", icon: "⚠️", title: "시청률 하락", message: "주요 프로그램 시청률 5% 하락", time: "30분 전" },
            { type: "info", icon: "ℹ️", title: "새로운 Hidden Gem", message: "3개의 새로운 숨겨진 보석 발견", time: "1시간 전" },
            { type: "danger", icon: "🚨", title: "경쟁 프로그램", message: "동시간대 경쟁 프로그램 런칭", time: "2시간 전" }
        ];
        return alerts;
    }
    
    generateContentCalendar() {
        const events = [
            { title: "새 드라마 런칭", description: "월화 드라마 첫 방송", date: "월요일", type: "신규 방송" },
            { title: "특별 다큐멘터리", description: "환경 관련 특집 방송", date: "수요일", type: "특집 프로그램" },
            { title: "예능 개편", description: "주말 예능 시간 변경", date: "금요일", type: "편성 변경" }
        ];
        return events;
    }
}

// 사용자 맞춤 대시보드 매니저 인스턴스
let customDashboard = null;

// 사용자 맞춤 대시보드 초기화
function initializeCustomDashboard() {
    customDashboard = new CustomDashboardManager();
    console.log('사용자 맞춤 대시보드 시스템이 초기화되었습니다.');
}

// 사용자 맞춤 대시보드 표시
function showCustomDashboard() {
    if (!customDashboard) {
        initializeCustomDashboard();
    }
    
    // 메인 콘텐츠 영역에 대시보드 표시
    const dashboardPage = document.getElementById('dashboard-page');
    if (dashboardPage) {
        // 기존 대시보드 내용 백업
        const originalContent = dashboardPage.innerHTML;
        
        // 사용자 맞춤 대시보드 UI 추가
        dashboardPage.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800" data-i18n="dashboard-title">대시보드</h1>
                <div class="flex space-x-2">
                    <button onclick="toggleDashboardMode()" 
                            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        기본 대시보드로 돌아가기
                    </button>
                </div>
            </div>
            
            <div id="custom-dashboard-container" class="space-y-6">
                <!-- 사용자 맞춤 대시보드 위젯들이 여기에 렌더링됩니다 -->
            </div>
        `;
        
        // 대시보드 렌더링
        customDashboard.renderDashboard();
        
        // 원본 내용을 전역 변수에 저장
        window.originalDashboardContent = originalContent;
    }
}

// 대시보드 모드 토글
function toggleDashboardMode() {
    const dashboardPage = document.getElementById('dashboard-page');
    if (dashboardPage && window.originalDashboardContent) {
        // 사용자 맞춤 대시보드의 모든 인터벌 정리
        if (customDashboard) {
            customDashboard.clearAllRefreshIntervals();
        }
        
        // 기본 대시보드로 복원
        dashboardPage.innerHTML = window.originalDashboardContent;
        
        // 기본 대시보드 데이터 다시 로드
        loadDashboardData();
    }
}

// 기존 대시보드 로드 함수 수정 - 커스텀 대시보드 버튼 추가
function enhanceDashboardWithCustomButton() {
    const dashboardPage = document.getElementById('dashboard-page');
    if (dashboardPage && !document.getElementById('custom-dashboard-toggle')) {
        const titleSection = dashboardPage.querySelector('h1').parentElement;
        if (titleSection) {
            const customButton = document.createElement('button');
            customButton.id = 'custom-dashboard-toggle';
            customButton.className = 'px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors';
            customButton.innerHTML = '맞춤 대시보드';
            customButton.onclick = showCustomDashboard;
            
            titleSection.appendChild(customButton);
        }
    }
}

// 사용자 맞춤 대시보드 초기화
function initializeCustomDashboard() {
    if (!customDashboard) {
        customDashboard = new CustomDashboardManager();
        console.log('사용자 맞춤 대시보드 시스템이 초기화되었습니다.');
    }
}

// 플랫폼 소개 패널 토글 함수
function togglePlatformIntro() {
    const introContent = document.getElementById('intro-content');
    const toggleButton = document.getElementById('intro-toggle');
    
    if (introContent && toggleButton) {
        const isHidden = introContent.style.display === 'none';
        
        if (isHidden) {
            introContent.style.display = 'block';
            toggleButton.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            `;
            localStorage.setItem('platform-intro-visible', 'true');
        } else {
            introContent.style.display = 'none';
            toggleButton.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            `;
            localStorage.setItem('platform-intro-visible', 'false');
        }
    }
}

// 플랫폼 소개 패널 상태 복원
function restorePlatformIntroState() {
    const isVisible = localStorage.getItem('platform-intro-visible');
    if (isVisible === 'false') {
        togglePlatformIntro();
    }
}