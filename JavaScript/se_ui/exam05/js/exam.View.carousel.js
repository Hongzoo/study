// - tab -
// 1. 테마(Number)를 클릭할 경우, 각 Number 와 매칭되는 컨텐츠(Number) 를 보여지게 한다.
// 2. 이전/다음 버튼을 클릭할 경우, 기존 Number 들을 -/+ 하면서 보여지게 하고, loop 되게 한다.
// 3. 해당 컨텐츠에 맞는 Number 를 페이징처럼 보여지게 한다. ( 4번째 컨텐츠이면, 4 / 8 )
// - carousel -
// 1. tab 과 똑같은 구조이므로, tab js 를 만든후 복붙해서 활용해본다.
// 보너스) 단순한 인터렉션보다는 fade 나 slide 가 더 예뻐보이면, 예뻐보이는걸로 한다.

var exam = exam || {};
exam.View = exam.View || {};

exam.View.tab = function() {
	this.init();
};

exam.View.tab.prototype = {
	init: function() {
		this._assignElements();
		this._initVar();
		this._initFunc();
		this._attachEventHandlers();
	},
	_assignElements: function() {
		this.welTabWrap = $('.cast_box');
		this.welTabArea = this.welTabWrap.find('.cast_tab');
		this.welTabItem = this.welTabArea.find('li');
		this.welTabBtn = this.welTabItem.find('a');
		this.welTabCont = this.welTabWrap.find('.cast_cont');
		this.welTabPrevBtn = this.welTabWrap.find('.cast_btn button').eq(0);
		this.welTabNextBtn = this.welTabWrap.find('.cast_btn button').eq(1);
		this.welTabPageArea = this.welTabWrap.find('.cast_num');
		this.welTabCurrentPage = this.welTabPageArea.find('.current');
		this.welTabTotalPage = this.welTabPageArea.find('.total');
	},
	_initVar : function() {
		this.callBtn = null;
		this.nIndex = this.welTabArea.find('li.active').index();
	},
	_initFunc : function() {
		this.welTabTotalPage.text(this.welTabItem.length);
	},
	_attachEventHandlers: function() {
		var oself = this;
		this.welTabBtn.on('click', function(e) {
			oself.callBtn = $(this);
			oself._onClickTabBtn(e);
		});
		this.welTabPrevBtn.on('click', $.proxy(this._onClickPrevBtn, this));
		this.welTabNextBtn.on('click', $.proxy(this._onClickNextBtn, this));
	},
	_onClickTabBtn: function(e) {
		e.preventDefault();
		this._activeTab(this.callBtn);
	},
	_onClickPrevBtn: function() {
		if(this.nIndex == 0) {
			this._activeTab(this.welTabItem.eq(this.welTabItem.length-1).find('a'));
			return false;
		}
		this._activeTab(this.welTabItem.eq(this.nIndex-1).find('a'));
	},
	_onClickNextBtn: function() {
		if(this.nIndex == (this.welTabItem.length-1)) {
			this._activeTab(this.welTabItem.eq(0).find('a'));
			return false;
		}
		this._activeTab(this.welTabItem.eq(this.nIndex+1).find('a'));
	},
	_activeTab: function(callBtn) {
		var targetCont = callBtn.attr('href');
		this.nIndex = callBtn.parent().index();
		callBtn.parent().addClass('active').siblings().removeClass('active');
		this.welTabCont.find(targetCont).addClass('active').siblings().removeClass('active');
		this._refreshPageNum();
	},
	_refreshPageNum: function() {
		this.welTabCurrentPage.text(this.nIndex+1);
	}
};

$(function() {
	var oMyTab = new exam.View.tab();
})