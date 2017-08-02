/*
170801 리뷰내용 정리
[개선의견]
- 'body'에 scrollTop을 사용할 경우 크로스브라우징을 위해 'html' 선택자도 함께 해 주어야 합니다. 예시: $("html, body").stop().animate({"scrollTop" : this._playCocaWrapY }, 700);
- 버튼이 a태그일 경우 e.preventDefault(); 로 앵커이동을 막아주어야 합니다.

[더 알아볼 것들]
- .animate() 사용시 .stop() 을 함께 사용한 이유 : http://bit.ly/2u3dPp9
- .animate, .setTimeout 같이 또 function() {} 코드를 작성하고 그 내부에서 this를 사용하고 싶을 때 2가지 방법
	1) 해당함수 호출시 $.proxy 로 호출. 
		예)   }, 300, this._runResult());    ->    }, 300, $.proxy(this._runResult, this));
	2) oself 변수에 this 객체를 담아서 oself._함수명() 으로 사용. (이마트신세계식 방법, 민성팀장님 코드 참고 http://bit.ly/2u3ornW)
- input checkbox checked 상태를 체크하는 다른 방법 .checked : https://www.w3schools.com/jsref/prop_checkbox_checked.asp
- scrollTop 사용시 크로스브라우징('html, body' 함께 사용)은 Old Browser만 필요한지, Modern Browser도 필요한지... (어떤 브라우저에서 문제가 되는지 정리된 자료를 찾지 못함)
- .promise() 와 .done() : animate 끝나는 시점을 알려주는 기능 (민성팀장님 코드 참고 http://bit.ly/2u3ornW)
*/

var exam = exam || {};
exam.View = exam.View || {};

exam.View.cocaPlay = function() {
	this.init();
};

exam.View.cocaPlay.prototype = {
	sWinnerName: '홍주영',
	sInputName : '',
	bIsApply: false, //참가 여부
	nWinnerLane: 0,
	nWinnerPos: 98,
	nLoserPos: 75,
	nCheckedIndex : 0,
	init: function() {
		this._assignElements();
		this._attachEventHandlers();
		this.nGameAreaPos = $('.game_area').offset();
	},
	_assignElements: function() {
		// 개선점1 : 요소를 찾을 때 특정 wrapper를 두고 그 안에서 탐색하기 + 신세계이마트식 네이밍
		this.welWrap = $('.evt_wrap');
		this.welBtnRace = this.welWrap.find('.btn_app');
		this.welInpRadio = this.welWrap.find('.bxlst input[type="radio"]');
		this.welLane = this.welWrap.find('.game_area li');
		this.welGom = this.welLane.find('.gom');
	},
	_attachEventHandlers: function() {
		this.welBtnRace.on('click', $.proxy(this._onClickBtnRace, this));
	},
	_onClickBtnRace: function(e) {
		e.preventDefault(); // 개선점2 : 앵커인 경우 앵커다운 기능 해제하기
		if(this.bIsApply == true) {
			alert('이미 참여 하셨습니다');
		} else {
			this._playCocaBear();
		}
	},
	_getUserSelectIndex: function() {
		this.nCheckedIndex = this.welInpRadio.filter(':checked').parent().index();
		if(this.nCheckedIndex < 0) {
			// 선택한 폴라베어 없는 경우
			alert('폴라베어를 선택 후 버튼을 눌러주세요!');
			return false;
		} else {
			this.sInputName = prompt('참가자 이름을 입력해주세요!\n맞추고 싶다면 \'홍주영\'을 입력하세요 ㅋㅋ')
			
			if(this.sInputName == null || this.sInputName == '') {
				// prompt 창에 아무것도 입력하지 않고 확인을 눌렀거나, 취소를 누른 경우
				return false;
			} else if (this.sInputName.length > 0) {
				console.log('선택한 베어 index :', this.nCheckedIndex);
				return true;
			}
		}
	},
	_moveWinnerLane: function(idx) {
		this.welLane.eq(idx).find('.gom').animate({
			top: this.nWinnerPos
		}, 1000, function() {
			$(this).parent().addClass('winlane');
		});
	},
	_moveLoserLane: function(idx) {
		this.welLane.eq(idx).find('.gom').animate({
			top: this.nLoserPos
		}, 1000);
	},
	_moveBears: function() {
		for(var i=0, max=this.welLane.length; i<max; i++) {
			if(i == this.nWinnerLane) {
				this._moveWinnerLane(i);
			} else {
				this._moveLoserLane(i);
			}
		}
	},
	_runResult: function() {
		var oself = this;
		if(this.sInputName == this.sWinnerName) {
			this.nWinnerLane = this.nCheckedIndex; // 고른 숫자를 당첨 레인에 할당
			console.log('먼저 도착할 베어 index :', this.nWinnerLane);

			this._moveBears();

			// 개선점3(공부용) : 버튼이 움직이는 시점을 캐치(promise+done) + 함수 안에서 oself로 this사용
			this.welGom.promise().done(function() {
				console.log(oself.sInputName + '님 성공!!');
			});
		} else if(this.sInputName != this.sWinnerName) {
			// 고른 베어가 무조건 당첨되지 않도록 난수 발생
			var nUncheckedNum = 0;
			while(nUncheckedNum == this.nCheckedIndex) {
				nUncheckedNum = Math.floor(Math.random() * 3);
			}

			this.nWinnerLane = nUncheckedNum; // 고르지 않은 숫자를 당첨 레인에 할당
			console.log('먼저 도착할 베어 index :', this.nWinnerLane);

			this._moveBears();

			// 개선점3(공부용) : 버튼이 움직이는 시점을 캐치(promise+done) + 함수 안에서 oself로 this사용
			this.welGom.promise().done(function() {
				console.log(oself.sInputName + '님 실패!!');
			});
		}
	},
	_playCocaBear: function() {
		var bIsUserChecked = this._getUserSelectIndex();

		if(bIsUserChecked == true) {
			$('html, body').animate({
				scrollTop: this.nGameAreaPos.top
			}, 300, $.proxy(this._runResult(), this)); // 개선점4 : 올바른 this를 바라보도록 $.proxy 사용

			this.bIsApply = true;
		}
	}
}

$(function() {
	var examViewCocaPlay = new exam.View.cocaPlay();
});