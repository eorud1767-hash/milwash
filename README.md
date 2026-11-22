# 명인산업 공식 홈페이지 (miwash.kr) — 보완판

정적 사이트입니다. 서버·데이터베이스 없이 `index.html` 하나와 `assets/` 폴더만으로 동작합니다.

## 구성

```
myeongin-web/
├── index.html          # 전체 페이지(원페이지)
├── assets/
│   ├── style.css       # 디자인·반응형
│   ├── app.js          # 메뉴·견적 폼·사진 확대
│   ├── logo.png        # 로고(흰 배경)
│   ├── favicon.png / apple-touch-icon.png
│   ├── og-image.jpg    # SNS 공유 미리보기 (1200×628)
│   ├── hero-factory.jpg        # 히어로: 본사 전경 + 배송 차량 3대
│   ├── factory-front.jpg       # 오시는 길: 본사 전경
│   ├── washer-sevenstar.jpg    # Seven Star KBW-100 대형 세탁기
│   ├── ironer-mitsubishi.jpg   # 대형 롤러 아이로너
│   ├── folder-toto.jpg         # TOTO FOLDER 자동 폴딩기
│   ├── sheet-cart.jpg          # 시트 정리 작업
│   ├── sorting-bins.jpg        # 세탁물 선별
│   ├── packed-linen.jpg        # 포장 완료 린넨
│   ├── truck-inside.jpg        # 출고·배송 준비
│   ├── folded-linen.jpg        # 호텔 린넨(접힘 마감)
│   ├── dorm-bedding.jpg        # 기숙사·산업체 침구
│   └── linen-table.jpg         # 회사소개: 다림질 마감 시트
├── CNAME               # miwash.kr
├── robots.txt
└── sitemap.xml
```

## 로컬에서 보기

```bash
cd myeongin-web && python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

## 배포 (도메인 구매 후)

1. GitHub에 저장소를 만들고 이 폴더 내용을 그대로 올립니다.
2. 저장소 Settings → Pages → Branch: `main` / root 로 지정합니다.
3. `CNAME` 파일이 `miwash.kr`로 되어 있으므로 도메인만 연결하면 됩니다.
4. DNS(도메인 구입처) 설정:
   - `A` 레코드(루트): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME`(www): `아이디.github.io`
   - GitHub Pages 설정에서 `Enforce HTTPS` 체크
5. 올린 뒤 `https://miwash.kr/robots.txt`, `https://miwash.kr/sitemap.xml`이 열리는지 확인하고, 네이버 서치어드바이저·구글 서치콘솔에 사이트를 등록합니다.

Netlify/Vercel을 쓰는 경우에도 폴더를 그대로 올리고 도메인만 연결하면 되며, 이때는 DNS 안내에 따라 `CNAME`을 발급받은 주소로 지정합니다.

## 배포 전 확인할 것

- [ ] 푸터 `사업자등록번호 · 대표자` — **확인 후 기입 예정**으로 비워 두었습니다(임의 숫자 기입 금지). 확정되면 `index.html`의 `pending` 항목과 `확인 후 기입 예정` 문구를 교체합니다.
- [ ] 네이버 플레이스 주소 — `https://map.naver.com/p/entry/place/3292283` 사용 중(플레이스 ID 3292283). 실제 노출 URL이 다르면 교체합니다.
- [ ] 네이버 블로그 — `https://blog.naver.com/eorud1767` 사용 중.
- [ ] 대표 전화 `010-4560-1767`, 이메일 `wonho1767@naver.com` — 변경 시 `index.html` 전체에서 찾아 바꿉니다.
- [ ] 사진 교체 시 `assets/`에 같은 파일명으로 넣으면 코드 수정 없이 반영됩니다(가로 1200px 내외, JPEG 품질 82 권장).
- [ ] 상표 `명인산업` 등록 완료 후 필요하면 로고 옆에 ® 표기를 추가합니다.

## 동작 메모

- 견적 폼은 서버로 전송하지 않고, 입력 내용을 **메일 앱(mailto)**·**문자 앱(sms)** 에 채워 주거나 **클립보드로 복사**합니다. 정적 호스팅만으로도 바로 사용할 수 있습니다.
- 문자 링크는 iOS/Android 모두에서 열리도록 `sms:01045601767?body=` / `&body=` 형식을 자동으로 구분합니다.
- 모든 이미지는 `loading="lazy"`(히어로 제외)로 지연 로딩하며, 공장 사진은 클릭하면 확대됩니다.
