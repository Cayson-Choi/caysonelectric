# 전기 교육 및 기술 서비스 홈페이지 구축 계획

## 목표 (Goal)
전기 기술(PLC, 전력계통, 피뢰/접지, KEC) 서비스 및 전문 자격증 교육을 제공하는 홈페이지를 구축합니다. 전문성을 강조하는 콘텐츠와 효율적인 교육 신청 시스템을 목표로 합니다.

## 기술 스택 & 시스템 아키텍처
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL) - 교육 과정, 일정, 신청자 관리
- **Forms**: React Hook Form + Zod (내부 폼) -> Supabase Direct Insert
- **Deployment**: Vercel

## 사이트맵 (Sitemap)

### 1. 회사 소개 (About)
- 회사 개요, 강사진 프로필, 오시는 길

### 2. 기술 서비스 (Services)
각 분야별 전문성을 강조하는 상세 페이지 구성:
- **산업 자동화 (PLC & Automation)**: 제어 시스템 설계, 스마트 팩토리, Python 자동화
- **전력계통 (Power System)**: 수배전반 설계, 보호계전, 전력품질 분석
- **피뢰/접지 (Lightning & Grounding)**: SPD 설계, 통합 접지, KEC 기준 적용
- **KEC 컨설팅**: 설계 검토, 적합성 분석, 기술지도

### 3. 교육 과정 (Education)
DB 연동을 통해 동적으로 과정 및 일정을 표시:
- **KEC 제·개정 해설**: 접지/피뢰 시스템, 분산형 전원 (4.24~4.25 일정 포함)
- **심화 B 과정**: 배선설비, 감전/과전류 보호 (4.3~4.4 일정 포함)
- **전문 A 과정**: 전력계통 해석, 보호계전기 기술
- **기타**: 실무 과정 및 자격증 과정

### 4. 자료실 & 문의
- 기술 자료실, 솔루션 문의, 통장 입금 안내

## 데이터베이스 구조 (Supabase)

### `courses` (교육 과정 마스터)
| Field | Type | Description |
|---|---|---|
| id | uuid | PK |
| category | text | 'KEC', 'Automation', 'Power', 'License' |
| title | text | 과정명 (예: KEC 제·개정 해설) |
| description | text | 마크다운 포맷의 상세 커리큘럼 |
| target_audience | text | 교육 대상 |
| price | int | 수강료 |

### `course_sessions` (개설 일정)
| Field | Type | Description |
|---|---|---|
| id | uuid | PK |
| course_id | uuid | FK -> courses.id |
| start_date | date | 시작일 (예: 2026-04-24) |
| end_date | date | 종료일 (예: 2026-04-25) |
| status | text | 'open', 'closed', 'full' |

### `applications` (신청 내역)
- 사용자 정보, 신청한 세션, 입금자명, 결제 상태(pending/paid)

## 상세 구현 계획

### Phase 1: 콘텐츠 및 신청 (MVP)
1. **메인 페이지**: 4대 핵심 서비스(PLC, 전력, 접지, KEC)를 카드 형태로 요약 노출
2. **서비스 페이지**: 제공된 마크다운 내용을 바탕으로 각 서비스별 상세 설명 구현
3. **교육 상세**: 커리큘럼, 일정, 교육 목표를 명확히 표시하고 '신청하기' 버튼 배치
4. **신청 연동**: 커스텀 Modal 폼을 통해 신청 -> Supabase DB 직접 저장 -> 신청 완료 메시지 및 상태 업데이트
5. **입금 안내 페이지**: `/payment-guide` 경로에 통장 사본, 예금주, 입금 주의사항 등을 안내하는 정적 페이지 구현

### Phase 2: 회원 및 마이페이지
- 이메일 로그인, 내 신청 현황 확인, 수료증 출력 등 확장

### Phase 3: 자동화
- 신청 접수 시 관리자 슬랙/메일 알림, 입금 확인 메일 자동 발송

## 디자인 컨셉
- **전문성**: 신뢰감을 주는 블루/네이비 컬러 배색
- **가독성**: 기술 용어와 커리큘럼이 잘 읽히는 타이포그래피 및 테이블 디자인
