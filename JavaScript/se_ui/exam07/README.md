## 과제하며 생각한 것

### 1.
```javascript
this.nPosWindow = e.currentTarget.scrollY; // 실행 됨.
this.nPosWindow = $(e.currentTarget).scrollY; // $()로 감싸서 jQuery 선택자로 만들면 왜 안되는걸까... 

this.nPosWindow = $(e.currentTarget).scrollTop() // <┘ 이렇게 .scrollTop() 을 쓰면 된다
```
scrollY는 순수 자바스크립트고, jQuery 셀렉터에는 .scrollTop() 메서드를 써야 하나봐..    
jQuery 프로토타입에는 .scrollY 메서드가 없음!

### 2.
```javascript
$.fn === jQuery.prototype //true
```
fn객체는 자바스크립트의 prototype 객체를 의미한다.

### 3.
```javascript
$.fn.hongSticky = function() {
    for(var i=0, max=this.length; i < max; i++) {
        new ssg.View.Sticky(this.eq(i));
    }
};

$(function () {
    $('.filter_sort_wrap').hongSticky();
});
```
플러그인화 라는게 어디에서나 사용할 수 있도록 하기 위함이라면,    
jQuery의 prototype에 작성해야 범용적으로 쓸 수 있어서 이 방식을 쓰는걸까..? 다른 이유가 있는걸까?
