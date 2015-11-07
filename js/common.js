function processWheel() {
	//mouse horizontal scroll
	var wheel = 8000;

    var scrollTargetEls = document.querySelectorAll('.scroll');

    var t = 0.0;

	window.addEventListener("mousewheel", function(e) {
		var delta = (event.wheelDelta || event.detail) / wheel;

		t = t - delta; // y축의 방향때문에 - delta가 된다.
		if(t < 0.0) t = 0.0;
		if(t > 1.0) t = 1.0;//스크롤의 범위가 화면을 벗어나지 않도록 한다.

		// Parallex scroll
		for(var i = 0; i < scrollTargetEls.length; i++) {
			var scrollTargetEl = scrollTargetEls[i];
			var margin = scrollTargetEl.offsetWidth - window.innerWidth;
			scrollTargetEl.style.transform = 'translate(' + (-t * margin) + 'px, 0)';
		}
		// Motions - Easing 
		var targets = [
			{x: -3, y: 3, el: document.querySelector('.lotus')},
			{x: 5, y: -3, el: document.querySelector('.fish1')},
			{x: 5, y: 3, el: document.querySelector('.fish2')}
		];
		for(var i = 0; i < targets.length; i++) {
			var tx = cosine(0, 1, t * 3) * targets[i].x;
			var ty = sine(0, 1, t * 3) * targets[i].y;
			targets[i].el.style.transform = 'translate(' + (tx) + 'vh, ' + (ty) + 'vh)';
		}

		var opacity = cosine(1,0.7,t * 3);
    	document.querySelector('#sun').style.opacity = opacity;
    });		
}
function processDrag() {
	var baseWidth = document.querySelector('#drag02').offsetWidth - window.innerWidth;
	var baseHeight = document.querySelector('#drag02').offsetHeight - window.innerHeight;
	var gapx = baseWidth / 2
	var gapy = baseHeight / 2

    var drag02X = baseWidth / baseWidth;
    var drag02Y = baseHeight / baseHeight;

    var drag01X = (document.querySelector('#drag01').offsetWidth - window.innerWidth) / baseWidth;
    var drag01Y = (document.querySelector('#drag01').offsetHeight - window.innerHeight) / baseHeight;

    var coverX = (document.querySelector('#cover').offsetWidth - window.innerWidth) / baseWidth;
    var coverY = (document.querySelector('#cover').offsetHeight - window.innerHeight) / baseHeight;

    var bigX = (document.querySelector('#big').offsetWidth - window.innerWidth) / baseWidth;
    var bigY = (document.querySelector('#big').offsetHeight - window.innerHeight) / baseHeight;

    var tx = 0;
    var ty = 0;

    var dragMode = false;

    var under = document.querySelector('#under');
    under.addEventListener('mousedown', function(e) {
    	dragMode = true;
    });
    under.addEventListener('mouseup', function(e) {
    	dragMode = false;
    });
	under.addEventListener("mousemove", function(e) {
		if(!dragMode) return;
		var deltaX = e.movementX;
		var deltaY = e.movementY;

		tx = tx + deltaX;
		ty = ty + deltaY;

		if(tx < -gapx) tx = -gapx;
		if(tx > +gapx) tx = +gapx;
		if(ty < -gapy) ty = -gapy;
		if(ty > +gapy) ty = +gapy;

		var drag01El = document.querySelector('#drag01');
		drag01El.style.transform = 'translate(' + (tx * drag01X) +'px,  '+ (ty * drag01Y) + 'px)';
		var drag02El = document.querySelector('#drag02');
		drag02El.style.transform = 'translate(' + (tx * drag02X) +'px,  '+ (ty * drag02Y) + 'px)';
		var coverEl = document.querySelector('#cover');
		coverEl.style.transform = 'translate(' + (tx * coverX) +'px,  '+ (ty * coverY) + 'px)';
		var bigEl = document.querySelector('#big');
		bigEl.style.transform = 'translate(' + (tx * bigX) +'px,  '+ (ty * bigY) + 'px)';
    });	
}
function linear(start, end, ratio) {
    return ratio * (end - start) + start;
}
function sine(start, end, ratio) {
    var rad = ratio * Math.PI * 2;
    return Math.sin(rad) * (end - start) + start;
}
function cosine(start, end, ratio) {
    var rad = ratio * Math.PI * 2;
    return Math.cos(rad) * (end - start) + start;
}
// under
// css를 class로 만들어 클리모션에 따라 붙이고 뗄 수 있다.
var down = document.querySelector('#down');
var under = document.querySelector('#under');
var up = document.querySelector('#up');
down.addEventListener('click', function(event) {
	under.classList.add('show');
	event.preventDefault();
});
up.addEventListener('click',function(event){
	under.classList.remove('show');
});
// subjects
var subjects = document.querySelectorAll('.subject');
for(var i = 0; i < subjects.length; i++) {
	subjects[i].addEventListener('click', function(e) {
		var target = this.dataset.target;
		document.querySelector('#' + target).classList.add('pop');
		e.preventDefault();
	});
}
var exits = document.querySelectorAll('.exit');
for(var i = 0; i < exits.length; i++) {
	exits[i].addEventListener('click', function(e) {
		this.parentNode.classList.remove('pop');
		e.preventDefault();
	});
}
//로딩 후 메인화면 실행
var list = document.getElementsByTagName('img');
	var i = list.length;
	var intervalID;

	intervalID = setInterval(function(){
		var result = true;

    	while(i--){
    		if(!list[i].complete){
    			result = false;
    			break;
    		}
    	}
    	if(result){
    		//모든 이미지가 불러와짐
    		clearInterval(intervalID);
    		//로딩을 마치고 홈페이지를 시작함. 주 기능 실행.
    		processWheel();
			processDrag();
    	}
	},1000);