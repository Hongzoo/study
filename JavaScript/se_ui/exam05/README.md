# 5주차 과제 팀버전 정리 (윤혜, 윤미, )

## layerPopup
### 개선의견
* $.proxy로 호출한 함수 안에서 클릭된 타겟을 의미할 $(this)를 쓰고 싶을 땐 $(e.currentTarget)을 사용하면 된다.
* 하나의 버튼에 주어지는 하나의 이벤트(click)에 여러함수를 걸기보다는, 하나의 함수만 걸고 그 함수 안에서 여러 동작을 부르는 것이 어떨까.
* tabIndex는 레이어팝업 본체에 주기! (레이어팝업 안의 li나 다른 일부 구조에 주지 않는 것이 좋겠다.)

### 더 공부해 볼 내용들
* `e.target`, `e.currentTarget`, `e.delegateTarget` 차이
  * 레이어 팝업 예제에서 console.log(e)를 하면 target,currentTarget,delegateTarget이 같은 것을 가리킨다. 하지만 셋은 다르다. 정확한 차이점 알아보기.
  * 버블링 : 화면 안의 요소가 겹쳐있을 때(혹은 부모에 포함된 자식요소) 위 3가지의 차이점이 나타날 수도 있을 것 같다는 추측. 더 알아보기!
* `.text()`, `.html()` 차이
  * .text() : 단순히 태그 안의 텍스트에 대한 처리
  * .html() : 태그가 살아있는채로 편집 가능
* `.focus()`와`.blur()` / `.focusin()`과`.focusout()`
  * .focusout을 쓰니 원하는대로 동작하지 않았다는 사람발견! .focusout은 무엇이며 그 짝꿍들은 무슨 차이가 있을까?

## tab_carousel
### 개선의견
* 버튼 클릭 대상이 li가 아닌 버튼이 되도록 setElements() 작성시 체크할 것.
* 엘리먼트를 지정할 때, setElements()에 만들어놓은 변수가 있다면 잊지 말고 활용할 것ㅎㅎ
* 메서드 체이닝이 가능한 코드는 여러 줄보다는 1줄로 체이닝 하는 것이 어떨까.
  * $(this).parent().addClass('active');
  * $(this).parent().siblings().removeClass('active');
  * // ↓ 2줄을 1줄로 수정
  * $(this).parent().addClass('active').siblings().removeClass('active');
* 같은 클래스명을 가진 탭 구조가 한 페이지에 여러 번 나오면?
  * elements가 중복되어 스크립트가 꼬이는 것 같다.
  * 여러개여도 서로 영향받지 않도록 각 탭 wrapper(.cast_box)에 추가 클래스 .cast_box1, .cast_box2를 넣어 사용하면 해결!
* 아래 코드를 살펴보면 100%/-100% 값만 바꿔주면 반복적인 코드를 확 줄일 수 있을 것 같다. 1과 -1을 이용해 줄여보면 어떨까.
```
//네비게이션
if(type === 'prev'){
    //이전 슬라이드 내용
    this.$slideCont.eq(this.curIndex).css('left', '-100%').show();
    this.$slideCont.eq(this.orgIndex).stop().animate({
        left: '100%'
    },function(){
        $(this).hide().css('left','');
    });
    this.$slideCont.eq(this.curIndex).stop().animate({
        left:  0
    });
}else{
    //다음 슬라이드
    this.$slideCont.eq(this.curIndex).css('left', '100%').show();
    this.$slideCont.eq(this.orgIndex).stop().animate({
        left: '-100%'
    },function(){
        $(this).hide().css('left','');
    });
    this.$slideCont.eq(this.curIndex).stop().animate({
        left:  0
    });
}
```
* 요렇게 시도해보기
```
//애니메이션 방향처리
var nDirNum = 0;
if(type === 'prev'){
    nDirNum = -1; //왼쪽으로
}else if(type === 'next'){
    nDirNum = 1; //오른쪽으로
}

this.$tabCont.eq(this.nCurIndex).css('left', (100*nDirNum)+'%').show();
this.$tabCont.eq(this.nOrgIndex).stop().animate({
    left: (100*(-nDirNum))+'%'
},function(){
    $(this).hide().css('left','');
});
this.$tabCont.eq(this.nCurIndex).stop().animate({
    left: 0
});
```

### 더 공부해 볼 내용들
* `$.extend()` 에 대하여
  * `this.opts = $.extend({}, defParams, opts);` // {}자리에 deep이 올 수도 있다던데... 그게 무엇일까 더 알아보기
  * opts 값 받아온 것 중, 기본값이 defParams와 겹치는 것이 있다면 opts의 내용으로 덮어쓰고 겹치지 않는 것은 기본 defParams 내용으로 사용
