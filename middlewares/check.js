// 权限设置
module.exports = {
    // 未登录状态， 跳转至登录页面
    // （是否设置登录过期 ?）
    isNotLogin: function isNotLogin (req, res, next) {				
        if (!req.session.user) {
          	req.flash('error', '未登录')
          	return res.redirect('/signin')
        }
        next()
	},

	isLogin: function isLogin (req, res, next) {
		if (req.session.user) {
			req.flash('error', '已登录')
      		return res.redirect('back')// 返回之前的页面
		}
		next()
	},
     
	// 判断权限选择功能 powerCode 0 管理员  1 库管 2 检测员 3 跟单 
	//4: a  5: b 6: c 7:售后 8：维修
 	checkPower: function checkPower (req, res, next) {		
		switch(req.session.user.authorCode) {
			case '1': 
				if (req.url != '/rk' && req.url != '/ck')
					return res.redirect('/posts/rk')
				break;
			case '2': 
				if (req.url != '/jc' && req.url != '/shjc')
					return res.redirect('/posts/jc')
				break;
			case '3': 
				if (req.url != '/gd')
					return res.redirect('/posts/gd')
				break;
			case '4': 
				if (req.url != '/a')
					return res.redirect('/posts/a')
				break;
			case '5': 
				if (req.url != '/b')
					return res.redirect('/posts/b')
				break;
			case '6': 
				if (req.url != '/c')
					return res.redirect('/posts/c')
				break;	
			case '7': 
				if (req.url != '/shsq' && req.url != '/sh' && req.url != '/shfh')
					return res.redirect('/posts/shsq')
				break;
			case '8': 
				if (req.url != '/wx')
					return res.redirect('/posts/shsq')
				break;
		}
		next()
		
	},

	// 
    
}