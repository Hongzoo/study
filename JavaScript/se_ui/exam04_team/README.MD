# 170801 리뷰내용 정리

# cocaplay

## [개선의견]
- 'body'에 scrollTop을 사용할 경우 크로스브라우징을 위해 'html' 선택자도 함께 해 주어야 합니다. 예시: $("html, body").stop().animate({"scrollTop" : this._playCocaWrapY }, 700);
- 버튼이 a태그일 경우 e.preventDefault(); 로 앵커이동을 막아주어야 합니다.

## [더 알아볼 것들]
- .animate() 사용시 .stop() 을 함께 사용한 이유 : http://bit.ly/2u3dPp9
- .animate, .setTimeout 같이 또 function() {} 코드를 작성하고 그 내부에서 this를 사용하고 싶을 때 2가지 방법    
	1) 해당함수 호출시 $.proxy 로 호출.    
		예)   }, 300, this._runResult());    ->    }, 300, $.proxy(this._runResult, this));
	2) oself 변수에 this 객체를 담아서 oself._함수명() 으로 사용. (이마트신세계식 방법, 민성팀장님 코드 참고 http://bit.ly/2u3ornW)
- input checkbox checked 상태를 체크하는 다른 방법 .checked : https://www.w3schools.com/jsref/prop_checkbox_checked.asp
- scrollTop 사용시 크로스브라우징('html, body' 함께 사용)은 Old Browser만 필요한지, Modern Browser도 필요한지... (어떤 브라우저에서 문제가 되는지 정리된 자료를 찾지 못함)
- .promise() 와 .done() : animate 끝나는 시점을 알려주는 기능 (민성팀장님 코드 참고 http://bit.ly/2u3ornW)

# lineplay

## [네이밍]
- 객체의 함수명 구분하기 :    
	init: function() {},    
	_assignElements: function() {}    
	// 함수명에 '_'(언더바)를 쓰지 않으면 객체 밖에서든 공용으로 써도 된다는 관용적인 표현.    
	// 함수명에 '_'(언더바)를 쓰면 오직 객체 내부에서만 기능을 구현하기 위함으로, 객체.prototype에서만 사용할 것임을 알리는 관용적인 표현.
- elements명 규칙(이마트신세계식 표기법) :    
	this.welWrap = $('.create_wrap');    
	this.welItem  = this.welWrap.find('.swiper-slide');    
	// 'wel'을 붙이는 것은 신세계이마트의 규칙으로 추측되며 wrapper elements를 의미.    
	// 처음의 welWrap을 통해 내부의 요소를 탐색하면, welWrap이 캐싱되어져 다시 DOM 전체에서 탐색하지 않아도 되므로 효율적.
  
## [개선의견]
- 배열추가는 push를 사용합시다.
- 함수를 묶을 때 함수명(함수의목적)과 실제 담겨진 코드가 매칭이 잘 되도록 다듬어봅시다.

## [논의 해 볼만한 궁금증]
- 객체 안에서 변수를 만들 때 초기화 위치는 어느 곳이 합리적일까? (각 함수 안에서만 사용하고 파괴될 지역변수는 제외, 'this.변수명' <- 같은 형식으로 객체내에서 공유되는 변수만 생각합니다.)
	1) init: function() {} 상단에서 모두 초기화하기    
		장점 : 어떤 변수가 존재하는지 한눈에 알 수 있음    
		단점 : ?
	2) 일부는 필요한 시점의 함수에서 초기화하기    
		장점 : 연산하여 값을 얻는 변수일 경우, init: function() {}상단에서 리터럴방식으로 초기화 할 코드 1줄을 줄일 수 있다(?)    
		단점 : 어떤 변수가 존재하는지 한번에 파악하기 어려움    
	번외) 어떤 변수가 존재하는지 한눈에 파악하는 것이 좋지 않을까 하여 1번의 의견이 나왔는데, 정말 모든 변수를 한눈에 파악하고 있는 것이 스크립트 작성/유지보수에 긍정적인 기여도가 높은지 궁금합니다.
- 구현방법 2가지안 각각의 장단점은 무엇이 있을까?
	1) 배열에 0~11까지 순차적인 값을 넣은 후 배열 index를 무작위로 뽑아내기. (윤혜,주영st)    
		반성 : 코드작성시 랜덤인덱스(nCurrentIndex)와 랜덤인덱스가 가리키는 배열값-아바타번호(aAvatarNum[nCurrentIndex])를 자꾸 혼동했다..ㅜㅜ
	2) 배열에 0~11까지의 수를 무작위 순서로 넣은 후 첫번째 배열 index부터 순차적으로 뽑아내기. (민성팀장님st)    
    무작위로 넣은 후 배열 순서대로 뽑아낼 땐 다음 배열을 예측할 수도 있기 때문에 보안에 문제가 될 수 있다.
