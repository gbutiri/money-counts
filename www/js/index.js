$(document).ready(function() {
    var _total = [];
    
    function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
    
    function calculate_totals() {
        
        _total_money = 0.0;
        
        $('#steps .input').each(function() {
            var $this = $(this);
            var _id = $this.closest('.step').attr('data-id');
            var _val = parseInt($this.val());
            var _currency = parseInt(_id) / 100;
            
            
            if ($this.val().trim() != ''){
                _total[_id] = parseFloat(parseInt(_val) * _currency);
                _total_money += _total[_id];
            }
        });
        console.log(_total, _total_money);
        $('#lbl_total').text(addCommas(_total_money.toFixed(2)));
    }
    
    $(document).on('click', '.nav-btn', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $active = $('.step.active');
        var _direction = $this.hasClass('next') ? 1 : -1;
        if (_direction === 1) {
            var $next = $active.next();
        } else {
            var $next = $active.prev();
        }
        var _new_id = $next.attr('data-id');
        if (typeof(_new_id) !== 'undefined') {
            //console.log($next);
            var _id = $active.attr('data-id');
            // console.log(_id, _new_id, _direction);
            $active.removeClass('active').addClass('d-none');
            $next.removeClass('d-none').addClass('active');
        }
        
        calculate_totals();
        
    });
});