# commodity-management

## 상품 재고 관리 시스템
----
## 📆 개발 기간
- 개발 기간 : 2022-08-10 ~ 2022-08-11 (2일)

## 🧑🏻‍💻 팀 인원
- BE(1명) : [정진관](https://github.com/dingwan0331) 

## 🖥 주요기능

### 로그인 기능
- email 과 password 유효성 검사
- bcrypt를 이용한 회원 비밀번호 암호화 관리
- 유저 정보 유효성 검사 Validators 클래스화
- jwt 토큰 발급

     
### 상품 리스트 & 상세정보페이지
- page nation 기능 구현 (defalut)
- 유의미한 데이터 부재로 기본 ordering은 random값으로 지정
     
### (Admin) 상품 포스팅 기능
- jwt 토큰을 기반으로 유저 권한 확인
- id값의 유효성을 검사하는 validator 모듈화 (positive int type 검사)

### (Admin) 상품 삭제 기능
- Query params를 사용한 다중삭제 기능 구현
- JSON.parse를 사용하여 url상의 Array형태로 데이터 통신

# Error handling
- Database의 에러발생시 모든 Error 는 500으로 처리
- 토큰관련 권한 에러는 미들웨어 단에서 401에러 반환
- Body의 Key Error는 컨트롤러 단에서 400에러 반환
- 통신간의 사용하는 모든 Id값은 (Positive Int 형태를 기준으로 유효성검사)
- 상품 삭제시 하나라도 유효하지 않은 Id 값이 들어왔을경우 에러 반환
- 단일 삭제 기능도 Array 타입만 유효한 값으로 처리
----
## 💻 Backend 기술 스택

<table style="border:0;">
    <thead>
        <tr>
            <th>Language</th>
            <th>Framwork</th>
            <th>Database</th>
            <th>HTTP</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node&logoColor=white"></td>
            <td><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"></td>
            <td><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=black"></td>
            <td><img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"></td>
        </tr>
    </tbody>
</table>


# ERD
<img width="818" alt="image" src="https://user-images.githubusercontent.com/100751719/184083190-dede668f-fc1f-498f-9bac-9eeef4a67e90.png">
# End Poin
<img width="740" alt="image" src="https://user-images.githubusercontent.com/100751719/184083243-3be2ffe5-62f6-4165-a520-bfe937b6e02a.png">

# API Docs
[Link](https://grey-crater-811570.postman.co/workspace/My-Workspace~1303e0ea-2786-4902-8534-ef9bb3e7ba17/documentation/21516218-3f811f62-f42c-422f-8ac7-41be73881633)
## 🔖 Reference
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.

