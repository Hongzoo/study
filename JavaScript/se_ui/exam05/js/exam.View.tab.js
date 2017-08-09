// - tab -
// 1. 테마(Number)를 클릭할 경우, 각 Number 와 매칭되는 컨텐츠(Number) 를 보여지게 한다.
// 2. 이전/다음 버튼을 클릭할 경우, 기존 Number 들을 -/+ 하면서 보여지게 하고, loop 되게 한다.
// 3. 해당 컨텐츠에 맞는 Number 를 페이징처럼 보여지게 한다. ( 4번째 컨텐츠이면, 4 / 8 )
// - carousel -
// 1. tab 과 똑같은 구조이므로, tab js 를 만든후 복붙해서 활용해본다.
// 보너스) 단순한 인터렉션보다는 fade 나 slide 가 더 예뻐보이면, 예뻐보이는걸로 한다.

var exam = exam || {};
exam.View = exam.View || {};

exam.View.mySlider = function(opts) {
	var defParams = {
		wrap: '.cast_box',
		btnArea: '.cast_tab',
		contArea: '.cast_cont',
		controlBtnArea: '.cast_btn',
		pageNum: false // 'page 번호 없음'이 기본세팅 값
	}
	this.opts = $.extend({}, defParams, opts); // opts 값 받아온 것 중 겹치는 키값 있으면 덮어쓰고, 겹치는 키값 없으면 기본 defParams 값으로 사용
	this.init();
};

exam.View.mySlider.prototype = {
	_nIndex: 0,
	_welCurrentBtn: null, // 선택된(current) paging 버튼 저장
	init: function() {
		this._assignElements();
		this._attachEventHandlers();
		this._initLayout(); // 도큐먼트 다 읽은 후 처음 1번 세팅 할 내용들
	},
	_assignElements: function() {
		this._welTabWrap = $(this.opts.wrap); // 플러그인(?) 호출시 옵션으로 받은 것이 있으면 사용하고, 받은 것이 없다면 기본값(defParams) 사용
		this._welTabArea = this._welTabWrap.find(this.opts.btnArea); // 플러그인(?) 호출시 옵션으로 받은 것이 있으면 사용하고, 받은 것이 없다면 기본값(defParams) 사용
		this._welTabItem = this._welTabArea.find('li');
		this._welTabBtn = this._welTabItem.find('a');
		this._welTabCont = this._welTabWrap.find(this.opts.contArea); // 플러그인(?) 호출시 옵션으로 받은 것이 있으면 사용하고, 받은 것이 없다면 기본값(defParams) 사용
		this._welControlBtns = this._welTabWrap.find(this.opts.controlBtnArea); // 플러그인(?) 호출시 옵션으로 받은 것이 있으면 사용하고, 받은 것이 없다면 기본값(defParams) 사용
		this._welTabPrevBtn = this._welControlBtns.find('button').eq(0);
		this._welTabNextBtn = this._welControlBtns.find('button').eq(1);

		if(this.opts.pageNum == true) { // 플러그인(?) 호출시 'pageNum: true' 로 옵션값을 넣어준 경우만 실행. pageNum 관련 추가 세팅
			this._welPageNumArea = this._welTabWrap.find(this.opts.pageNumArea);
			this._welCurrentPageNum = this._welPageNumArea.find('.current');
			this._welTotalPageNum = this._welPageNumArea.find('.total');
		}
	},
	_attachEventHandlers: function() {
		this._welTabBtn.on('click', $.proxy(this._onClickTabBtn, this));
		this._welTabPrevBtn.on('click', $.proxy(this._onClickPrevBtn, this));
		this._welTabNextBtn.on('click', $.proxy(this._onClickNextBtn, this));
	},
	_initLayout : function() {
		this._nIndex = this._welTabArea.find('li.active').index();
		if(this.opts.pageNum == true) {
			this._welTotalPageNum.text(this._welTabItem.length);
		}
	},
	_onClickTabBtn: function(e) {
		e.preventDefault();
		this._welCurrentBtn = $(e.currentTarget);
		this._activeTab(this._welCurrentBtn);
	},
	_onClickPrevBtn: function() {
		if(this._nIndex == 0) {
			this._activeTab(this._welTabItem.eq(this._welTabItem.length-1).find('a'));
			return false;
		}
		this._activeTab(this._welTabItem.eq(this._nIndex-1).find('a'));
	},
	_onClickNextBtn: function() {
		if(this._nIndex == (this._welTabItem.length-1)) {
			this._activeTab(this._welTabItem.eq(0).find('a'));
			return false;
		}
		this._activeTab(this._welTabItem.eq(this._nIndex+1).find('a'));
	},
	_activeTab: function(tabBtn) {
		var targetCont = tabBtn.attr('href');
		this._nIndex = tabBtn.parent().index();
		tabBtn.parent().addClass('active').siblings().removeClass('active');
		this._welTabCont.find(targetCont).addClass('active').siblings().removeClass('active');
		if(this.opts.pageNum == true) {
			this._refreshPageNum();
		}
	},
	_refreshPageNum: function() {
		this._welCurrentPageNum.text(this._nIndex+1);
	}
};

$(function() {
	var oMyTab = new exam.View.mySlider({
		pageNum: true,
		pageNumArea: '.cast_num'
	});
	var oMySlider = new exam.View.mySlider({
		wrap: '.slide_box',
		btnArea: '.slide_tab',
		contArea: '.slide_cont',
		controlBtnArea: '.slide_btn'
	});
})