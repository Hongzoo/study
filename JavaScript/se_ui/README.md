송윤혜 : https://github.com/yunhyesong/study
김하영 : https://github.com/hayoungkkim/study
최민성 : https://github.com/zestairlove/std_jsHive
홍주영 : https://github.com/Hongzoo/study/tree/gh-pages/JavaScript/se_ui
박태영 : https://github.com/bluetpark/study
최윤미 : https://github.com/choiyunmi/study

---

# 궁금한점 정리

---

## 07/18
### Q. function on_ClickAdd(e){...} : 함수정의할 때 e를 사용하진 않지만 괄호()에 들어있는 이유?
해당 함수가 버튼이나/앵커 같이 이벤트가 발생하는 객체(예를들어 .btn_1)에 쓰이면 인자값 e에는 .btn_1의 이벤트관련 정보들이 들어온다.
함수 안에서 console.log(e); 를 넣어 e에 대해 확인해보면 이벤트관련 정보들이 저장된 것을 확인할 수 있다.
그것을 가지고 관리하기 편하게 함수를 정리할수도 있고, 쓰임새가 다양하다.
