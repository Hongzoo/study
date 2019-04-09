(function() {
    'use strict';

    var target = document.getElementById('target');
    var changeArea = document.getElementById('change_area');
    var blocks = changeArea.getElementsByTagName('div');
    var blockCount = blocks.length;
    var targetWidth = document.getElementById('target_width');
    var resizeTargetBtn = document.getElementById('resize_target_btn');
    var resizeBlockBtn = document.getElementById('resize_block_btn');

    resizeTargetBtn.addEventListener('click', function() {
        target.style.width = targetWidth.value + 'px';
    });

    resizeBlockBtn.addEventListener('click', function() {
        var i = 0;

        for(; i < blockCount; i += 1) {
            blocks[i].style.width = target.offsetWidth + 'px';
        }
    });
})();
