# 이메일 확인 활성화 설정 가이드

이메일 확인 기능이 활성화된 상태로 개발하기 위한 설정 및 플로우입니다.

## 📧 이메일 확인 플로우

1. **회원가입** (`/signup`)
   - 사용자가 모든 정보 입력 후 회원가입 버튼 클릭
   - Supabase Auth에 계정 생성
   - Profiles 테이블에 사용자 정보 저장

2. **이메일 확인 대기** (`/signup/check-email`)
   - 회원가입 완료 후 자동으로 이동
   - "이메일을 확인해주세요" 안내 페이지 표시
   - 사용자에게 이메일 확인 링크 클릭 안내

3. **이메일 확인**
   - 사용자가 이메일의 확인 링크 클릭
   - Supabase가 `/auth/callback?code=...`로 리다이렉트
   - 서버에서 코드를 세션으로 교환

4. **확인 완료** (`/mypage`)
   - 이메일 확인 완료 후 마이페이지로 자동 이동
   - "이메일 확인이 완료되었습니다! 환영합니다." 메시지 표시
   - 로그인된 상태로 모든 서비스 이용 가능

## ⚙️ Supabase 설정

### 1. 이메일 확인 활성화
Supabase Dashboard → Authentication → Settings → Email:
- ✅ **Confirm email** 을 **ON** 상태로 유지

### 2. 이메일 템플릿 설정 (선택사항)
Supabase Dashboard → Authentication → Email Templates → Confirm signup:

한국어 템플릿 예시:
```html
<h2>Cayson Electric에 오신 것을 환영합니다!</h2>
<p>안녕하세요,</p>
<p>아래 링크를 클릭하여 이메일 주소를 확인해주세요:</p>
<p><a href="{{ .ConfirmationURL }}">이메일 확인하기</a></p>
<p>감사합니다.<br>Cayson Electric 팀</p>
```

### 3. 리다이렉트 URL 설정
Supabase Dashboard → Authentication → URL Configuration:
- **Site URL**: `http://localhost:3000` (로컬) 또는 프로덕션 URL
- **Redirect URLs**:
  - `http://localhost:3000/auth/callback`
  - `https://yourdomain.com/auth/callback` (프로덕션)

## 🧪 테스트 방법

### 로컬 개발 환경에서 테스트

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **회원가입 테스트**
   - http://localhost:3000/signup 접속
   - 모든 필드 입력 (실제 이메일 주소 사용)
   - 회원가입 버튼 클릭
   - "이메일을 확인해주세요" 페이지로 이동 확인

3. **이메일 확인**
   - 입력한 이메일 주소의 받은편지함 확인
   - Supabase에서 온 확인 이메일 열기
   - "Confirm your mail" 링크 클릭
   - 자동으로 마이페이지로 이동 확인

4. **로그인 테스트**
   - 이메일 확인 전 로그인 시도 → "이메일 확인이 필요합니다" 오류 표시 확인
   - 이메일 확인 후 로그인 시도 → 정상 로그인 확인

## 🔧 개발 중 주의사항

### 실제 이메일 주소 필요
이메일 확인이 활성화되어 있으므로 테스트 시 **실제 접근 가능한 이메일 주소**를 사용해야 합니다.

권장 방법:
- 개인 Gmail, Naver 등 실제 이메일 사용
- 임시 이메일 서비스 사용 (예: temp-mail.org)
- 테스트용 이메일 계정 생성

### 이메일 수신 확인
Supabase는 기본적으로 이메일을 전송합니다. 만약 이메일이 오지 않는다면:
1. 스팸 메일함 확인
2. Supabase Dashboard → Authentication → Logs에서 이메일 전송 로그 확인
3. 이메일 주소 오타 확인

## 📝 변경된 파일

1. **src/app/auth/actions.ts**
   - 회원가입 후 `/signup/check-email`로 리다이렉트
   - 로그인 에러 메시지 한국어화 및 상세화

2. **src/app/signup/check-email/page.tsx** (새 파일)
   - 이메일 확인 안내 페이지

3. **src/app/login/page.tsx**
   - 이메일 미확인 에러 시 도움말 표시

4. **src/app/auth/callback/route.ts**
   - 이메일 확인 성공 후 환영 메시지와 함께 마이페이지로 리다이렉트

## 🚀 프로덕션 배포 시

Vercel 환경변수에 프로덕션 URL 설정:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Supabase에서 프로덕션 URL을 Redirect URLs에 추가:
```
https://yourdomain.com/auth/callback
```

## ✅ 체크리스트

- [ ] Supabase에서 "Confirm email" ON 확인
- [ ] 환경변수 NEXT_PUBLIC_SITE_URL 설정 확인
- [ ] Supabase Redirect URLs 설정 확인
- [ ] 실제 이메일 주소로 회원가입 테스트
- [ ] 이메일 수신 및 확인 링크 클릭 테스트
- [ ] 이메일 확인 전 로그인 차단 확인
- [ ] 이메일 확인 후 정상 로그인 확인
- [ ] 마이페이지 접근 확인
