// Mock Data for Media Compass Prototype
// CORS 문제 해결을 위해 JSON 데이터를 JavaScript 변수로 임베딩

const mockStatusData = {
  "api_status": "operational",
  "timestamp": "2025-06-28T12:45:30.123Z",
  "version": "1.0.0",
  "environment": "production",
  "uptime_seconds": 2847123,
  "memory_usage": {
    "rss": "185.2 MB",
    "heapTotal": "142.8 MB",
    "heapUsed": "98.4 MB"
  },
  "database_status": "connected",
  "services": {
    "kcc_api": "operational",
    "neon_db": "connected",
    "analysis_engine": "ready"
  },
  "last_health_check": "2025-06-28T12:45:25.456Z",
  "response_time_ms": 42
};

const mockSummaryData = {
  "data_counts": {
    "broadcast_industry": 15847,
    "ki_viewer_index": 8932,
    "media_usage_behavior": 12456
  },
  "ki_statistics": {
    "average_score": "76.3",
    "max_score": "94.8",
    "min_score": "32.1",
    "high_quality_programs": 2156
  },
  "last_updated": "2025-06-28T11:30:00.000Z",
  "generated_at": "2025-06-28T12:45:30.123Z",
  "data_quality": {
    "completeness": 98.7,
    "accuracy": 96.2,
    "freshness_hours": 6
  },
  "trending_genres": [
    { "genre": "드라마", "growth_rate": 15.3, "count": 2847 },
    { "genre": "예능", "growth_rate": 12.8, "count": 1923 },
    { "genre": "뉴스", "growth_rate": 8.7, "count": 3156 },
    { "genre": "다큐멘터리", "growth_rate": 22.1, "count": 892 },
    { "genre": "스포츠", "growth_rate": 5.4, "count": 1234 }
  ],
  "regional_distribution": {
    "서울": 35.2,
    "경기": 18.7,
    "부산": 8.9,
    "대구": 6.4,
    "인천": 5.8,
    "광주": 4.3,
    "대전": 4.1,
    "기타": 16.6
  }
};

const mockHiddenGemsData = {
  "analysis_timestamp": "2025-06-28T12:45:30.123Z",
  "algorithm_version": "2.1.0",
  "total_analyzed": 8932,
  "hidden_gems_found": 15,
  "criteria": {
    "min_ki_score": 75.0,
    "max_viewership_rating": 3.0,
    "quality_weight": 0.8
  },
  "hidden_gems": [
    {
      "id": "hg_001",
      "program_name": "시골의사의 일기",
      "channel": "EBS",
      "genre": "다큐멘터리",
      "ki_score": 89.4,
      "viewership_rating": 1.2,
      "hidden_gem_score": 94.7,
      "is_hidden_gem": true,
      "quality_rank": "S",
      "air_time": "매주 화요일 22:00",
      "description": "농촌 지역 의료진의 삶과 헌신을 담은 감동 다큐멘터리",
      "reason": "높은 품질 대비 낮은 시청률로 숨겨진 보석"
    },
    {
      "id": "hg_002", 
      "program_name": "청년 농부의 꿈",
      "channel": "KBS2",
      "genre": "다큐멘터리",
      "ki_score": 85.7,
      "viewership_rating": 2.1,
      "hidden_gem_score": 91.2,
      "is_hidden_gem": true,
      "quality_rank": "S",
      "air_time": "매주 토요일 21:30",
      "description": "도시를 떠나 농업에 도전하는 청년들의 이야기",
      "reason": "사회적 가치와 완성도가 높지만 홍보 부족"
    },
    {
      "id": "hg_003",
      "program_name": "우리동네 장인",
      "channel": "MBC",
      "genre": "교양",
      "ki_score": 82.9,
      "viewership_rating": 1.8,
      "hidden_gem_score": 88.6,
      "is_hidden_gem": true,
      "quality_rank": "A+",
      "air_time": "매주 일요일 18:00",
      "description": "전통 기술을 지키는 장인들의 삶과 철학",
      "reason": "전문성과 교육적 가치가 뛰어나나 인지도 부족"
    },
    {
      "id": "hg_004",
      "program_name": "작은 도서관 이야기",
      "channel": "EBS",
      "genre": "교양",
      "ki_score": 84.3,
      "viewership_rating": 1.5,
      "hidden_gem_score": 90.1,
      "is_hidden_gem": true,
      "quality_rank": "S",
      "air_time": "매주 목요일 20:00",
      "description": "지역 도서관과 사서들의 감동적인 이야기",
      "reason": "교육적 가치와 감동이 높으나 시청률 저조"
    },
    {
      "id": "hg_005",
      "program_name": "환경지킴이",
      "channel": "KBS1",
      "genre": "다큐멘터리",
      "ki_score": 86.1,
      "viewership_rating": 2.3,
      "hidden_gem_score": 87.4,
      "is_hidden_gem": true,
      "quality_rank": "A+",
      "air_time": "매주 수요일 22:30",
      "description": "환경 보호를 위해 노력하는 사람들의 이야기",
      "reason": "시의성과 완성도가 높지만 인지도 부족"
    },
    {
      "id": "hg_006",
      "program_name": "전통음식 탐험",
      "channel": "KBS2",
      "genre": "교양",
      "ki_score": 81.7,
      "viewership_rating": 2.7,
      "hidden_gem_score": 85.9,
      "is_hidden_gem": true,
      "quality_rank": "A",
      "air_time": "매주 금요일 19:30",
      "description": "한국 전통 음식의 역사와 제조법을 탐구",
      "reason": "문화적 가치와 전문성이 높으나 홍보 부족"
    },
    {
      "id": "hg_007",
      "program_name": "시인의 마을",
      "channel": "EBS",
      "genre": "교양",
      "ki_score": 83.5,
      "viewership_rating": 1.9,
      "hidden_gem_score": 89.3,
      "is_hidden_gem": true,
      "quality_rank": "A+",
      "air_time": "매주 월요일 21:00",
      "description": "한국 문학과 시인들의 삶을 조명하는 프로그램",
      "reason": "예술적 완성도가 높지만 대중성 부족"
    },
    {
      "id": "hg_008",
      "program_name": "해양 생태계 탐험",
      "channel": "MBC",
      "genre": "다큐멘터리",
      "ki_score": 88.2,
      "viewership_rating": 2.0,
      "hidden_gem_score": 92.1,
      "is_hidden_gem": true,
      "quality_rank": "S",
      "air_time": "매주 토요일 20:00",
      "description": "한국 근해 바다 생물들의 생태를 탐구",
      "reason": "과학적 가치와 영상미가 뛰어나나 시청률 저조"
    },
    {
      "id": "hg_009",
      "program_name": "장애인 스포츠 영웅",
      "channel": "KBS1",
      "genre": "스포츠",
      "ki_score": 80.9,
      "viewership_rating": 1.7,
      "hidden_gem_score": 86.8,
      "is_hidden_gem": true,
      "quality_rank": "A",
      "air_time": "매주 일요일 19:00",
      "description": "패럴림픽 선수들의 도전과 성취를 담은 프로그램",
      "reason": "사회적 의미와 감동이 크나 인지도 부족"
    },
    {
      "id": "hg_010",
      "program_name": "숲속의 집",
      "channel": "EBS",
      "genre": "교양",
      "ki_score": 82.1,
      "viewership_rating": 2.4,
      "hidden_gem_score": 84.7,
      "is_hidden_gem": true,
      "quality_rank": "A",
      "air_time": "매주 화요일 21:30",
      "description": "생태 건축과 지속가능한 삶을 탐구",
      "reason": "환경 의식과 실용성이 높지만 홍보 부족"
    },
    {
      "id": "hg_011",
      "program_name": "민속음악의 혼",
      "channel": "KBS1",
      "genre": "음악",
      "ki_score": 85.6,
      "viewership_rating": 1.6,
      "hidden_gem_score": 91.8,
      "is_hidden_gem": true,
      "quality_rank": "S",
      "air_time": "매주 금요일 22:00",
      "description": "한국 전통음악의 아름다움과 역사를 소개",
      "reason": "문화적 깊이와 완성도가 높지만 대중성 부족"
    },
    {
      "id": "hg_012",
      "program_name": "소상공인의 도전",
      "channel": "MBC",
      "genre": "다큐멘터리",
      "ki_score": 79.8,
      "viewership_rating": 2.6,
      "hidden_gem_score": 83.2,
      "is_hidden_gem": true,
      "quality_rank": "A",
      "air_time": "매주 수요일 20:30",
      "description": "어려운 경제 상황 속 소상공인들의 분투기",
      "reason": "현실성과 공감대가 높지만 시청률 저조"
    },
    {
      "id": "hg_013",
      "program_name": "과학자의 실험실",
      "channel": "EBS",
      "genre": "교양",
      "ki_score": 87.3,
      "viewership_rating": 1.4,
      "hidden_gem_score": 93.6,
      "is_hidden_gem": true,
      "quality_rank": "S",
      "air_time": "매주 목요일 21:00",
      "description": "첨단 과학 연구 현장을 생생하게 전달",
      "reason": "교육적 가치와 전문성이 매우 높으나 인지도 부족"
    },
    {
      "id": "hg_014",
      "program_name": "할머니의 레시피",
      "channel": "KBS2",
      "genre": "교양",
      "ki_score": 81.4,
      "viewership_rating": 2.8,
      "hidden_gem_score": 82.9,
      "is_hidden_gem": true,
      "quality_rank": "A",
      "air_time": "매주 토요일 18:30",
      "description": "할머니들이 전하는 전통 요리의 지혜",
      "reason": "정서적 가치와 실용성이 높지만 홍보 부족"
    },
    {
      "id": "hg_015",
      "program_name": "청소년 발명가",
      "channel": "EBS",
      "genre": "교양",
      "ki_score": 84.7,
      "viewership_rating": 1.8,
      "hidden_gem_score": 90.5,
      "is_hidden_gem": true,
      "quality_rank": "A+",
      "air_time": "매주 일요일 20:30",
      "description": "창의적인 청소년 발명가들의 도전기",
      "reason": "교육적 영감과 창의성이 뛰어나나 시청률 저조"
    }
  ],
  "insights": {
    "top_channels": ["EBS", "KBS1", "KBS2", "MBC"],
    "dominant_genres": ["다큐멘터리", "교양", "음악", "스포츠"],
    "average_hidden_gem_score": 88.4,
    "improvement_suggestions": [
      "전문 채널의 우수 콘텐츠 홍보 강화",
      "교육적 가치가 높은 프로그램의 접근성 개선",
      "문화·예술 프로그램의 대중화 방안 모색"
    ]
  }
};

const mockContentGapsData = {
  "analysis_timestamp": "2025-06-28T12:45:30.123Z",
  "algorithm_version": "1.8.0",
  "regions_analyzed": 17,
  "genres_analyzed": 12,
  "total_gaps_identified": 24,
  "methodology": {
    "demand_calculation": "지역별 시청 선호도 + 인구 통계 + 문화적 요인",
    "supply_calculation": "현재 방송 프로그램 수 + 방송 시간 + 채널 다양성",
    "gap_score": "(수요점수 - 공급점수) / 수요점수 * 100"
  },
  "content_gaps": [
    {
      "region": "강원도",
      "genre": "지역 다큐멘터리",
      "demand_score": 87.3,
      "supply_score": 23.1,
      "gap_score": 73.5,
      "priority_rank": 1,
      "urgency": "매우 높음",
      "potential_audience": 450000,
      "current_programs": 3,
      "recommended_programs": 12,
      "gap_analysis": {
        "demand_factors": ["관광객 증가", "지역 문화 관심 증대", "자연환경 콘텐츠 선호"],
        "supply_shortage": "지역 특화 다큐 부족, 제작 인프라 미비",
        "opportunity": "강원도만의 독특한 자연·문화 콘텐츠 제작 가능"
      }
    },
    {
      "region": "전라북도",
      "genre": "전통문화",
      "demand_score": 82.7,
      "supply_score": 28.4,
      "gap_score": 65.6,
      "priority_rank": 2,
      "urgency": "높음",
      "potential_audience": 380000,
      "current_programs": 4,
      "recommended_programs": 10,
      "gap_analysis": {
        "demand_factors": ["한식 문화 관심", "전통 예술 재조명", "문화유산 가치 인식"],
        "supply_shortage": "전통문화 전문 채널 부족, 젊은층 접근성 미흡",
        "opportunity": "전주 한옥마을, 판소리 등 고유 문화자원 활용"
      }
    },
    {
      "region": "제주도",
      "genre": "환경·생태",
      "demand_score": 91.2,
      "supply_score": 34.8,
      "gap_score": 61.8,
      "priority_rank": 3,
      "urgency": "높음",
      "potential_audience": 290000,
      "current_programs": 6,
      "recommended_programs": 15,
      "gap_analysis": {
        "demand_factors": ["환경 보호 의식", "생태 관광 확산", "기후변화 관심"],
        "supply_shortage": "해양 생태 전문 프로그램 부족",
        "opportunity": "유네스코 자연유산 활용한 고품질 생태 콘텐츠"
      }
    },
    {
      "region": "경상북도",
      "genre": "역사 다큐멘터리",
      "demand_score": 85.9,
      "supply_score": 36.2,
      "gap_score": 57.8,
      "priority_rank": 4,
      "urgency": "중간",
      "potential_audience": 520000,
      "current_programs": 7,
      "recommended_programs": 16,
      "gap_analysis": {
        "demand_factors": ["신라 역사 관심", "문화재 가치 재발견", "역사 교육 수요"],
        "supply_shortage": "지역 역사 전문 제작진 부족",
        "opportunity": "경주, 안동 등 역사도시 스토리텔링"
      }
    },
    {
      "region": "충청남도",
      "genre": "농업·농촌",
      "demand_score": 78.4,
      "supply_score": 32.7,
      "gap_score": 58.3,
      "priority_rank": 5,
      "urgency": "중간",
      "potential_audience": 410000,
      "current_programs": 5,
      "recommended_programs": 11,
      "gap_analysis": {
        "demand_factors": ["청년 귀농 증가", "친환경 농업 관심", "로컬푸드 확산"],
        "supply_shortage": "농업 전문 방송 시간 부족",
        "opportunity": "스마트팜, 6차 산업화 등 현대적 농업 접근"
      }
    }
  ],
  "regional_insights": {
    "highest_gap_regions": ["강원도", "전라북도", "제주도"],
    "lowest_gap_regions": ["서울", "경기도", "충청북도"],
    "emerging_demand_genres": ["환경·생태", "전통문화", "과학기술", "지역 다큐멘터리"],
    "oversupplied_genres": ["연예·오락", "스포츠 중계", "일반 뉴스"]
  }
};

const mockBroadcastData = {
  "metadata": {
    "total_records": 247,
    "last_updated": "2025-06-28T12:45:30.123Z",
    "page": 1,
    "page_size": 50,
    "total_pages": 5
  },
  "programs": [
    {
      "id": "prog_001",
      "program_name": "시사기획 창",
      "channel": "KBS1",
      "genre": "시사교양",
      "ki_score": 82.4,
      "viewership_rating": 4.2,
      "air_time": "매주 화요일 22:00",
      "production_cost": "2억 3천만원",
      "target_age": "30-60대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 8.7
    },
    {
      "id": "prog_002",
      "program_name": "동물의 왕국",
      "channel": "KBS2",
      "genre": "다큐멘터리",
      "ki_score": 79.8,
      "viewership_rating": 3.1,
      "air_time": "매주 일요일 19:50",
      "production_cost": "1억 8천만원",
      "target_age": "전연령",
      "region": "전국",
      "quality_rating": "A",
      "social_impact_score": 7.9
    },
    {
      "id": "prog_003",
      "program_name": "무한도전 리턴즈",
      "channel": "MBC",
      "genre": "예능",
      "ki_score": 85.6,
      "viewership_rating": 12.3,
      "air_time": "매주 토요일 18:30",
      "production_cost": "4억 5천만원",
      "target_age": "20-40대",
      "region": "전국",
      "quality_rating": "S",
      "social_impact_score": 9.2
    },
    {
      "id": "prog_004",
      "program_name": "한국사 探",
      "channel": "EBS",
      "genre": "교육",
      "ki_score": 88.9,
      "viewership_rating": 2.1,
      "air_time": "매주 수요일 21:00",
      "production_cost": "1억 2천만원",
      "target_age": "10-60대",
      "region": "전국",
      "quality_rating": "S",
      "social_impact_score": 9.5
    },
    {
      "id": "prog_005",
      "program_name": "6시 내고향",
      "channel": "KBS1",
      "genre": "지역정보",
      "ki_score": 76.3,
      "viewership_rating": 8.7,
      "air_time": "매일 18:00",
      "production_cost": "8천만원",
      "target_age": "40-70대",
      "region": "전국(지역별)",
      "quality_rating": "A",
      "social_impact_score": 8.1
    },
    {
      "id": "prog_006",
      "program_name": "슈퍼맨이 돌아왔다",
      "channel": "KBS2",
      "genre": "예능",
      "ki_score": 83.2,
      "viewership_rating": 7.9,
      "air_time": "매주 일요일 17:20",
      "production_cost": "3억 1천만원",
      "target_age": "20-50대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 8.4
    },
    {
      "id": "prog_007",
      "program_name": "MBC 뉴스데스크",
      "channel": "MBC",
      "genre": "뉴스",
      "ki_score": 81.7,
      "viewership_rating": 6.4,
      "air_time": "매일 20:00",
      "production_cost": "1억 5천만원",
      "target_age": "30-70대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 8.8
    },
    {
      "id": "prog_008",
      "program_name": "과학탐구영역",
      "channel": "EBS",
      "genre": "교육",
      "ki_score": 87.1,
      "viewership_rating": 1.8,
      "air_time": "매주 목요일 20:30",
      "production_cost": "9천만원",
      "target_age": "10-30대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 9.1
    },
    {
      "id": "prog_009",
      "program_name": "트롯신이 떴다",
      "channel": "SBS",
      "genre": "음악",
      "ki_score": 78.9,
      "viewership_rating": 9.2,
      "air_time": "매주 일요일 18:00",
      "production_cost": "2억 7천만원",
      "target_age": "40-70대",
      "region": "전국",
      "quality_rating": "A",
      "social_impact_score": 7.6
    },
    {
      "id": "prog_010",
      "program_name": "런닝맨",
      "channel": "SBS",
      "genre": "예능",
      "ki_score": 84.3,
      "viewership_rating": 11.1,
      "air_time": "매주 일요일 17:00",
      "production_cost": "4억 2천만원",
      "target_age": "20-40대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 8.7
    },
    {
      "id": "prog_011",
      "program_name": "세계테마기행",
      "channel": "EBS",
      "genre": "다큐멘터리",
      "ki_score": 86.5,
      "viewership_rating": 2.9,
      "air_time": "매주 월-금 20:50",
      "production_cost": "1억 6천만원",
      "target_age": "30-60대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 8.3
    },
    {
      "id": "prog_012",
      "program_name": "국악한마당",
      "channel": "KBS1",
      "genre": "음악",
      "ki_score": 80.2,
      "viewership_rating": 2.3,
      "air_time": "매주 토요일 12:10",
      "production_cost": "1억 1천만원",
      "target_age": "50-80대",
      "region": "전국",
      "quality_rating": "A",
      "social_impact_score": 8.9
    },
    {
      "id": "prog_013",
      "program_name": "1박2일 시즌4",
      "channel": "KBS2",
      "genre": "예능",
      "ki_score": 83.7,
      "viewership_rating": 10.4,
      "air_time": "매주 일요일 18:30",
      "production_cost": "3억 8천만원",
      "target_age": "20-50대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 8.5
    },
    {
      "id": "prog_014",
      "program_name": "신비한TV 서프라이즈",
      "channel": "MBC",
      "genre": "교양",
      "ki_score": 77.6,
      "viewership_rating": 5.8,
      "air_time": "매주 일요일 18:30",
      "production_cost": "2억 4천만원",
      "target_age": "전연령",
      "region": "전국",
      "quality_rating": "A",
      "social_impact_score": 7.4
    },
    {
      "id": "prog_015",
      "program_name": "미래교실",
      "channel": "EBS",
      "genre": "교육",
      "ki_score": 89.2,
      "viewership_rating": 1.4,
      "air_time": "매주 화요일 19:00",
      "production_cost": "7천만원",
      "target_age": "10-20대",
      "region": "전국",
      "quality_rating": "S",
      "social_impact_score": 9.7
    },
    {
      "id": "prog_016",
      "program_name": "TV동물농장",
      "channel": "SBS",
      "genre": "교양",
      "ki_score": 79.4,
      "viewership_rating": 4.6,
      "air_time": "매주 일요일 09:30",
      "production_cost": "1억 9천만원",
      "target_age": "전연령",
      "region": "전국",
      "quality_rating": "A",
      "social_impact_score": 8.2
    },
    {
      "id": "prog_017",
      "program_name": "아침마당",
      "channel": "KBS1",
      "genre": "생활정보",
      "ki_score": 75.8,
      "viewership_rating": 6.2,
      "air_time": "매일 08:30",
      "production_cost": "1억 3천만원",
      "target_age": "40-70대",
      "region": "전국",
      "quality_rating": "A",
      "social_impact_score": 7.8
    },
    {
      "id": "prog_018",
      "program_name": "전국노래자랑",
      "channel": "KBS1",
      "genre": "음악",
      "ki_score": 78.1,
      "viewership_rating": 8.9,
      "air_time": "매주 일요일 12:10",
      "production_cost": "1억 7천만원",
      "target_age": "40-80대",
      "region": "전국(지역별)",
      "quality_rating": "A",
      "social_impact_score": 8.6
    },
    {
      "id": "prog_019",
      "program_name": "생로병사의 비밀",
      "channel": "KBS1",
      "genre": "의학정보",
      "ki_score": 84.6,
      "viewership_rating": 5.7,
      "air_time": "매주 수요일 22:00",
      "production_cost": "2억 1천만원",
      "target_age": "30-70대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 9.3
    },
    {
      "id": "prog_020",
      "program_name": "황금어장 라디오스타",
      "channel": "MBC",
      "genre": "토크쇼",
      "ki_score": 82.9,
      "viewership_rating": 7.3,
      "air_time": "매주 수요일 22:30",
      "production_cost": "2억 8천만원",
      "target_age": "20-50대",
      "region": "전국",
      "quality_rating": "A+",
      "social_impact_score": 8.1
    }
  ],
  "statistics": {
    "by_genre": {
      "예능": { "count": 6, "avg_ki_score": 83.3, "avg_viewership": 9.2 },
      "교육": { "count": 4, "avg_ki_score": 88.6, "avg_viewership": 1.8 },
      "다큐멘터리": { "count": 2, "avg_ki_score": 83.2, "avg_viewership": 3.0 },
      "뉴스": { "count": 1, "avg_ki_score": 81.7, "avg_viewership": 6.4 },
      "음악": { "count": 3, "avg_ki_score": 79.1, "avg_viewership": 6.8 },
      "교양": { "count": 3, "avg_ki_score": 80.5, "avg_viewership": 5.1 },
      "기타": { "count": 1, "avg_ki_score": 75.8, "avg_viewership": 6.2 }
    },
    "by_channel": {
      "KBS1": { "count": 7, "avg_ki_score": 79.8, "avg_viewership": 6.1 },
      "KBS2": { "count": 4, "avg_ki_score": 82.7, "avg_viewership": 7.9 },
      "MBC": { "count": 4, "avg_ki_score": 81.8, "avg_viewership": 7.2 },
      "SBS": { "count": 3, "avg_ki_score": 80.9, "avg_viewership": 8.3 },
      "EBS": { "count": 5, "avg_ki_score": 87.5, "avg_viewership": 2.2 }
    },
    "quality_distribution": {
      "S급": 4,
      "A+급": 9,
      "A급": 7
    }
  }
};