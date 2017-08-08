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
	_welClickBtn: null,
	init: function() {
		this._assignElements();
		this._attachEventHandlers();
	},
	_assignElements: function() {
		this._welCont = $('#container');
		this._welBtnOpen = this._welCont.find('.btn_pos button');
		this._welLayerWrap = this._welCont.find('.layer_area');
		this._welLayerPop = this._welLayerWrap.find('.layer_pos')
		this._welBtnClose = this._welLayerPop.find('.layer_close button');
	},
	_attachEventHandlers: function() {
		this._welBtnOpen.on('click',  $.proxy(this._onClickOpenLayer, this));
		this._welBtnClose.on('click', $.proxy(this._onClickCloseLayer, this));
	},
	_onClickOpenLayer: function(e) {
		// this._welClickBtn = $(e.target); // e.target은 이벤트가 일어난 div
		this._welClickBtn = $(e.currentTarget); // e.currentTarget은 실제로 이벤트가 걸려있는 위치
		this._welLayerWrap.show();
		this._welLayerPop.attr('tabindex','0').focus();
	},
	_onClickCloseLayer: function() {
		this._welLayerWrap.hide();
		this._welClickBtn.focus();
	}
};

$(function() {
	var examViewLayerPopup = new exam.View.layerPopup();
});