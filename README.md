# USPACE Back end
## 주소
https://sejong-uspace.herokuapp.com/
## 스택
* Backend: Nodejs, express
* DB: mongoDB
* Deploy: Heroku
## 서버 기능 설명
![학술제 파이프라인](https://user-images.githubusercontent.com/69383800/205207125-8d89749c-7b1d-459e-bf73-59feee5348a9.png)
### 1. 웹 - 서버
***
#### axios 통신으로 회원 가입, 주차 예약, 주차 확인, 입차, 출차 등의 기능을 할 수 있다.
#### Admin 계정을 통해 주차장 위치 별 주차된 차량을 확인하고, 사용자들의 정보를 확인할 수 있다.
### 2. 임베디드 - 서버
***
#### 크롤링으로 임베디드에서 측정한 주차장 상태(주차가능여부)를 서버에 들고오고, 이를 mongoDB에 저장한다. 그리고 이를 frontend에 보내줘 주차 예약할 때나 주차장 현 상태를 확인할 수 있게 한다.
### 3. 인공지능 - 서버
***
#### 크롤링으로 인공지능에서 차량 번호판을 인식한 값을 서버에 가져오고, 이를 mongoDB에 저장한다. 그리고 Frontend에서 예약한 차 번호와 인공지능으로 구한 차량 번호판이 같은지 확인하는 역할을 하여, 입차 여부를 확인한다.
