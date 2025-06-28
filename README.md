# Media Compass 프로토타입

미디어 생태계 블라인드스팟 탐지 플랫폼의 완전한 프로토타입입니다.

## 🚀 특징

- **API 연동 없음**: 가상 데이터로 완전히 작동하는 데모
- **단일 파일 구조**: HTML, CSS, JavaScript 통합
- **완전한 기능**: 모든 화면과 인터랙션 구현
- **반응형 디자인**: 모든 기기에서 작동
- **실시간 차트**: Chart.js 기반 데이터 시각화

## 📁 파일 구조

```
media_compass_prototype/
├── index.html              # 메인 SPA 파일
├── script.js               # JavaScript 로직
├── README.md               # 이 파일
└── data/
    ├── mock-status.json    # API 상태 가상데이터
    ├── mock-summary.json   # 데이터 요약 가상데이터
    ├── mock-hidden-gems.json  # Hidden Gems 가상데이터
    ├── mock-content-gaps.json # Content Gap 가상데이터
    └── mock-broadcast-data.json # 방송 프로그램 가상데이터
```

## 🔥 실행 방법

⚠️ **중요**: CORS 정책으로 인해 로컬 서버 실행이 필수입니다.

### 방법 1: 로컬 서버 실행 (필수)
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (npx 사용)
npx serve .

# VS Code Live Server 확장 사용
```

브라우저에서 `http://localhost:8080` 접속

### ✅ 해결된 문제들
- **CORS 오류**: JSON 파일을 JavaScript 변수로 임베딩하여 해결
- **CDN 오류**: 외부 CDN 의존성 최소화
- **파일 로드 오류**: 로컬 서버 실행으로 완전 해결

## 📊 주요 기능

### 1. 대시보드
- **시스템 상태**: API 서버, 데이터베이스, KCC API, 분석 엔진 상태
- **데이터 현황**: 방송산업 실태조사, KI 시청자평가지수, 방송매체 이용행태 통계
- **KI 점수 통계**: 평균/최고/최저 점수, 고품질 프로그램 수

### 2. Hidden Gems 분석
- **조건 설정**: 최소 KI 점수, 최대 시청률, 품질 가중치 슬라이더
- **결과 표시**: 15개의 숨겨진 보석 프로그램 발견
- **상세 정보**: 프로그램별 KI 점수, 시청률, Hidden Gem 점수, 분석 의견

### 3. Content Gap 분석
- **지역별 Gap 차트**: 막대 차트로 지역별 콘텐츠 부족 현황
- **장르별 수요-공급 차트**: 레이더 차트로 수요-공급 균형 시각화
- **상세 분석**: 12개 지역의 콘텐츠 갭 우선순위와 개선 방안

### 4. 데이터 뷰어
- **실시간 검색**: 프로그램명으로 검색
- **필터링**: 채널, 장르별 필터
- **데이터 테이블**: 247개 프로그램 정보 표시

### 5. About 페이지
- **프로젝트 정보**: 개요, 기능, 알고리즘 설명
- **기술 스택**: 사용된 기술 상세 설명
- **개발자 정보**: 연락처 및 GitHub 링크

## 🎯 가상 데이터 특징

### 현실적인 데이터
- **실제 KCC API 구조** 기반
- **한국 방송사명**: KBS1, KBS2, MBC, SBS, EBS
- **실제 장르**: 드라마, 예능, 뉴스, 다큐멘터리, 교육 등
- **현실적인 수치**: KI 점수 32.1~94.8, 시청률 1.2%~12.3%

### Hidden Gems 예시
- "시골의사의 일기" (EBS, KI 89.4, 시청률 1.2%)
- "청년 농부의 꿈" (KBS2, KI 85.7, 시청률 2.1%)
- "과학자의 실험실" (EBS, KI 87.3, 시청률 1.4%)

### Content Gap 분석
- **강원도 지역 다큐멘터리**: Gap Score 73.5% (최고)
- **전라북도 전통문화**: Gap Score 65.6%
- **제주도 환경·생태**: Gap Score 61.8%

## 🛠 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS v3 (CDN)
- **Charts**: Chart.js v4 (CDN)
- **Icons**: Heroicons v2 (CDN)
- **Data**: JSON 기반 가상 데이터

## 🔧 브라우저 호환성

- Chrome 90+ ✅
- Firefox 88+ ✅  
- Safari 14+ ✅
- Edge 90+ ✅

## 📈 성능 최적화

- **빠른 로딩**: CDN 사용으로 초기 로딩 최적화
- **메모리 효율**: 가상 데이터 캐싱으로 메모리 사용량 최소화
- **부드러운 애니메이션**: CSS 애니메이션과 전환 효과
- **반응형**: 모바일부터 데스크톱까지 최적화

## 🎨 디자인 특징

- **Modern UI**: 깔끔한 카드 기반 레이아웃
- **색상 시스템**: 직관적인 상태별 색상 구분
- **타이포그래피**: Inter 폰트 기반 가독성 최적화
- **인터랙션**: 호버 효과와 부드러운 전환

## 📝 사용 시나리오

1. **대시보드 확인**: 시스템 상태 및 데이터 현황 파악
2. **Hidden Gems 탐지**: 조건 설정하여 숨겨진 보석 프로그램 발견
3. **Content Gap 분석**: 지역별 콘텐츠 부족 현황 및 기회 탐색
4. **데이터 탐색**: 검색과 필터로 관심 프로그램 찾기

## 🚨 주의사항

- 모든 데이터는 **가상 데이터**입니다
- 실제 KCC API 연동은 포함되지 않음
- 프로토타입 목적으로 제작됨

## 📞 문의

- **개발자**: 박용환
- **이메일**: sanoramyun8@gmail.com
- **GitHub**: https://github.com/yonghwan1106/media-compass-project

---

**Media Compass 프로토타입**은 미디어 생태계의 숨겨진 기회를 발견하는 혁신적인 분석 플랫폼입니다. 🎯✨