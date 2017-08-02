/*
170801 리뷰내용 정리
[네이밍]
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

[개선의견]
- 배열추가는 push를 사용합시다.
- 함수를 묶을 때 함수명(함수의목적)과 실제 담겨진 코드가 매칭이 잘 되도록 다듬어봅시다.

[논의 해 볼만한 궁금증]
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
*/

var exam = exam || {};
exam.View = exam.View || {};

exam.View.linePlay = function() {
	this.init();
};

exam.View.linePlay.prototype = {
	aAvatarNum: [],
	nBeforeAvatarNum: 0,
	nCurrentIndex: 0,
	init: function() {
		this._assignElements();
		this._attachEventHandlers();
		this._initLinePlay(); // 개선점1 : 문서 로딩시 처음 1번은 실행되어야 할 기능은 _initLinePlay()에 묶어보기.
	},
	_assignElements: function() {
		// 개선점2 : 요소를 찾을 때 특정 wrapper를 두고 그 안에서 탐색하기 + 신세계이마트식 네이밍
		this.welLinePlayWrap = $('.create_wrap');
		this.welLinePlayItem = this.welLinePlayWrap.find('.swiper-slide');
		this.welLinePlayBtn  = this.welLinePlayWrap.find('.btn_random');
	},
	_attachEventHandlers: function() {
		this.welLinePlayBtn.on('click', $.proxy(this._onClickBtn, this));
	},
	_initLinePlay:function() {
		this.nItemLength = this.welLinePlayItem.length;
		this._initAvatarIndex();
		this._pickAvatarIndex();
		this._showAvatar();
	},
	_onClickBtn: function() {
		if(this.aAvatarNum.length != 0) {
			this._pickAvatarIndex();
		} else {
			this._initAvatarIndex();
			this._pickAvatarIndex();
			// 이전에 노출된 아바타번호와 현재 고른 아바타번호가 같으면 다시 고르기 // 개선점3 : 아바타번호 전체 초기화할때 처음 1번만 체크하면 되므로 else 조건에 묶음 (홍주영 기존코드는 매번 체크했음)
			while(this.nBeforeAvatarNum == this.aAvatarNum[this.nCurrentIndex]) {
				this._pickAvatarIndex();
			}
		}
		this._showAvatar();
	},
	_initAvatarIndex: function() {
		for(var i=0, max=this.nItemLength; i<max; i++) {
			this.aAvatarNum.push(i); // 개선점4 : 배열에 값을 추가할 때는 push를 사용
		}
		console.log('아바타번호 초기화', this.aAvatarNum);
	},
	_pickAvatarIndex: function() {
		this.nCurrentIndex = Math.floor(Math.random() * this.aAvatarNum.length); // 개선점5 : nRandom값으로 따로 받을 필요 없이 1줄로 수정 (홍주영 기존코드 참고 http://bit.ly/2uiRyz4)
		console.log('현재 선택된 랜덤index', this.nCurrentIndex, '현재 선택된 아바타번호', this.aAvatarNum[this.nCurrentIndex]);
	},
	_showAvatar: function() {
		this.nBeforeAvatarNum = this.aAvatarNum[this.nCurrentIndex]; // 노출된 아바타번호를 따로 보관 // 개선점6 : 랜덤값으로 사용할 index변수와 index가 가리킬 값이 자꾸 혼동되어 명시적으로 재구성 (홍주영 기존코드 참고)
		this.welLinePlayItem.hide().eq(this.nBeforeAvatarNum).show(); // 고른 아바타번호만 노출
		this.aAvatarNum.splice(this.nCurrentIndex, 1); // 남은 아바타번호 배열에서 노출된 아바타번호만 삭제
		console.log('남은 아바타 번호', this.aAvatarNum);
	}
};

$(function() { 
	var oExamViewLinePlay = new exam.View.linePlay();
});