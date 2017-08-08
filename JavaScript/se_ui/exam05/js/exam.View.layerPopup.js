// 1. 레이어 띄우기 버튼을 클릭할 경우 .js-layer-area 를 보여지게 한다.
// 2. .js-layer-area 가 보이면, 포커스를 해당 레이어로 이동시킨다. tip) tabIndex & focus
// 3. 닫기 버튼을 누르면, .js-layer-area 가 닫힌후 레이어 띄우기 버튼으로 포커스를 이동시킨다.
// 보너스) 버튼을 여러개 만들어본후, 각 버튼을 클릭할때마다 같은 레이어를 띄우지만, 레이어가 닫힐경우 클릭한 버튼으로 포커스를 이동시켜본다.

var exam = exam || {};
exam.View = exam.View || {};

exam.View.layerPopup = function() {
	this.init();
};
exam.View.layerPopup.prototype = {
	init: function() {
		this._initVar(); // 객체내 함수들에서 공통으로 사용될 변수 모음
		this._assignElements();
		this._attachEventHandlers();
	},
	_initVar: function() {
		this.opener = null; // 레이어팝업을 Open시킨 대상(버튼) 저장용
	},
	_assignElements: function() {
		this.welCont = $('#container');
		this.welBtnOpen = this.welCont.find('.btn_pos button');
		this.welLayerWrap = this.welCont.find('.layer_area');
		this.welLayerPop = this.welLayerWrap.find('.layer_pos')
		this.welBtnClose = this.welLayerPop.find('.layer_close button');
	},
	_attachEventHandlers: function() {
		var oself = this;
		// this.welBtnOpen.on('click', function(e) {
		// 	// 여기가 사연이 있습니다.. 
		// 	// on 클릭시 함수부를 때 proxy를 쓰니 jquery this:$(this)를 쓸수가 없어져서 
		// 	// proxy로 onClickOpenLayer함수를 부르지 않고...
		// 	// 그냥 function으로 열어서 $(this)를 쓸 수 있게 하고
		// 	// 객체this는 oself 변수를 이용해서 유지시키도록 하였습니다!
		// 	// 객체의 this와 $(this)를 둘다 사용하고 싶을 땐, 이방법 밖에 없는지.. 
		// 	// 좀더 배운 사람 코드 같이 하려면 어떻게 하면 되는지 궁금합니다.
		// 	console.log(this);
		// 	console.log(e.toElement);
		// 	console.log(e);
		// 	oself.opener = $(this);
		// 	oself._onClickOpenLayer();
		// });
		this.welBtnOpen.on('click',  $.proxy(this._onClickOpenLayer, this));
		this.welBtnClose.on('click', $.proxy(this._onClickCloseLayer, this));
	},
	_onClickOpenLayer: function(e) {
		// this.opener = $(e.target); // e.target은 이벤트가 일어난 div
		this.opener = $(e.currentTarget); // e.currentTarget은 실제로 이벤트가 걸려있는 위치
		this.welLayerWrap.show();
		this.welLayerPop.attr('tabindex','0').focus();
	},
	_onClickCloseLayer: function() {
		this.welLayerWrap.hide();
		this.opener.focus();
	}
};

$(function() {
	var examViewLayerPopup = new exam.View.layerPopup();
});