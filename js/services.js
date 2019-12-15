app.factory('utils', function($q, $filter, $rootScope) {
  var def
  // , host = "http://localhost/contract/"
  // , host = ""
  , host = "https://www.untermietvertrag.com/"

  return {
    isMobile: function(){
      if(    navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
          || window.innerWidth <= 768
        ){
        return true
      }
      else {
        return false
      }
    },
    fl: function(fil, arr, condition){
    	return $filter(fil)(arr, condition)
		},
	  failed: function(e) {
      // l(e)
	    l("There was an error attempting to send data.")
	  },
	  canceled: function(e) {
      // l(e)
	    l("The upload has been canceled by the user or the browser dropped the connection.")
    },
	  progress: function(evt){
	  	if(evt.lengthComputable){
	  		var prog = Math.round(evt.loaded * 100 / evt.total)
	  		$rootScope.$broadcast("progress", { prog: prog })
      }else{
	  		$rootScope.$broadcast("progress", { prog: 0 })
      }
	  },
		done: function(evt){
	    try{
	    	var res = JSON.parse(evt.target.response)
	    	def.resolve(res)
	    }catch(err){
	    	l(evt.target.response)
	    }
	  },
    post: function(url, data, files){
    	def = $q.defer()
      var fd = new FormData()
      var xhr = new XMLHttpRequest()

    	fd.append("params", angular.toJson(data))
    	if(files){
    		var paths = []
    		files.forEach(function(x){    			
	        fd.append("files[]", x.value)
	        paths.push(x.upPath)
    		})
      	fd.append("paths", angular.toJson(paths))
    	}

      xhr.upload.addEventListener("progress", this.progress, false)
      xhr.addEventListener("load", this.done, false)
      xhr.addEventListener("error", this.failed, false)
      xhr.addEventListener("abort", this.canceled, false)
      xhr.open("POST", url)
      xhr.send(fd)
    	return def.promise
    },
    getId: function(length){
      var chars = 'M30Z1xA0Nu5Pn8Yo2pXqB5Rly9Gz3vWOj1Hm46IeCfgSrTs7Q9aJb8F6DcE7d2twkUhKiL4V'
      , charLength = chars.length
      , randomStr = ''
      for (var i = 0; i < length; i++) {
        randomStr+= chars[Math.floor(Math.random() * (charLength - 1)) + 0]
      }
      return randomStr
    },
    space: function(c){
      return String.fromCharCode(160).repeat(c)
    },
    download: function(path, name, s){
      if(  navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
      ){
        // If apple, let user click a link
        s.dlPath = host + path
        $(".dl-modal-2").modal('hide')
        $(".dl-modal").modal('show')
      } else {
        // Else, download it
        var link = document.createElement("a")
        document.body.appendChild(link)
        link.href = host + path
        link.target = '_blank'
        link.download = name
        link.click()
        document.body.removeChild(link)
      }
    },
    focus: function(id, dir, arr){
      // l(dir)
      var curr = this.fl('filter', arr, {id: id})[0]
      , idx = arr.indexOf(curr)

      switch(dir){
        case 'prev':
          if(idx == 0){
            idx = arr.length - 1
          }else{
            idx--
          }
        break;
        
        case 'next':
          if(idx == arr.length - 1){
            idx = 0
          }else{
            idx++
          }
        break; 
      }
      var el = $('#' + arr[idx].id)
      el.focus()
      $(window).scrollTop(el.offset().top - 260 - 50)
    },
    zoom: function(level, dir){
      if(dir == "+"){
        if(level !== 1.5){
          level+=.1
        }
      }
      else if(dir == "-"){
        if(level !== 0){
          level-=.1
        }
      }
      
      $(".ctn-page").css({
        transform: "scale("+level+")",
        transformOrigin: "top",
        paddingBottom: (level * 100) + "px"
      })

      return parseFloat(level.toFixed(2))
    },
    scroll: function(amount){
      $('html, body').animate({ scrollTop: amount }, 500)
    },
    resizeFields: function(spans, arr) {
      spans.forEach(function(sp, idx){
        var mh = $(sp).height() + 10
        , mw = $(sp).width() + 10
        
        arr[idx].mh = mh
        arr[idx].mw = mw
        
        $(sp).css({
          minHeight : mh,
          minWidth : mw,
        })
      })
    },
    getHTML: function(type, data){
      var html = ""
      if(type == "pdf"){
        var s = angular.copy(data.sec)
        var t = angular.copy(data.t)
        t.css({ textAlign: "center" })
        t.append("<br>")
        t.removeAttr("class")
        html+= t.get(0).outerHTML
        s.forEach(function(obj){
          var jqObj = $(obj)
          jqObj.find(".ctn-action").remove()
          jqObj.css("margin", "20px 0")
          if(jqObj.hasClass("heading")){
            jqObj.css("margin", "40px 0")
          }
          jqObj.removeAttr("class ng-click")
          
          var spans = jqObj.find("span.edit")
          if(spans.length){
            spans.replaceWith(function(){
              return $("<b />", { html: $(this).text().replace(/\n/g, "<br>") })
            })
          }
          html+= jqObj.get(0).outerHTML
        })
        // l(html)
      }else{
        // l(data.h)
        html = $(data.h)
        html.find(".ctn-action").remove()
        html.find("span").replaceWith(function(){
          return $("<b />", { html: $(this).text().replace(/\n/g, "<br>") })
        })
        html = $(html[1]).html()
        // l(html)
      }
      return html
    },
    getContents: function(id){
    	def2 = $q.defer()
      this.post(host + "backend/contract.php", {
        t: "get",
				d: {
          id: id
        }
			}).then(function(res){
        if(res.result)
          def2.resolve(res)
        else
          alert(res.message)
      })
      return def2.promise
    },
    getFilledFields: function(arr){
      var filled = 0
      arr.forEach(function(obj){
        if(!angular.isUndefined(obj.v) && obj.v !== '' && !obj.r){
          filled++
        }
      })
      return filled
    },
    save: function(id, html){
      var def2 = $q.defer()
	    this.post(host + "backend/contract.php", {				
        t: "save",
				d: {
          id: id,
          html: this.getHTML("html", { h: html })
        }
			}).then(function(res){
        def2.resolve(res)
      })
      return def2.promise
    },
    createPdf: function(id, title, sections){
      var def2 = $q.defer()
	    this.post(host + "backend/contract.php", {
        t: "pdf",
				d: {
          id: id,
          html: this.getHTML("pdf", {t: title, sec: sections})
        }
			}).then(function(res){
        def2.resolve(res)
      })      
      return def2.promise
    },
	}
})